import { Services } from "../Services";

class ListDashboardCardsService extends Services{
    async execute(){
        try{
            let valorPrincipalCard1 = 0;
            let valorDeCasosDesteAno = 0;
            let valorSecundarioCard2 = 0;
            let valorPrincipalCard3 = 0;
            let valorPrincipalCard4 = 0;

            const cards = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    id: true,
                    created_at: true,
                    case_type: true,
                    user: {
                        select: {
                            group_of_risk: true,
                            vaccine_doses: true
                        }
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19'
                },
                orderBy: {
                    created_at: 'asc'
                }
            });

            valorPrincipalCard1 = cards.length;

            cards.forEach(card => {
                // Card1
                const ano = ((card.created_at).toString()).split(" ");

                if(ano[3] == this.date.getActualYear()){
                    valorDeCasosDesteAno++;
                }

                // Card2
                if(ano[1] == this.date.getActualMonth() && ano[3] == this.date.getActualYear()){
                    valorSecundarioCard2++;
                }
            });

            const totalDeUsuariosContaminados = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    created_at: true,
                    user: {
                        select: {
                            id: true,
                            group_of_risk: true,
                            vaccine_doses: true
                        } 
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19'
                }
            });

            totalDeUsuariosContaminados.forEach(card2 => {
                const ano = ((card2.created_at).toString()).split(" ");
                // Card3
                if(card2.user.vaccine_doses >= 1 && ano[3] == this.date.getActualYear()){
                    valorPrincipalCard3++;
                }

                // Card4
                if(card2.user.group_of_risk && ano[3] == this.date.getActualYear()){
                    valorPrincipalCard4++;
                }
            });

            let valorSecundarioCard1 = Math.round(((valorDeCasosDesteAno / valorPrincipalCard1) * 100));

            let cartoes = {
                Card1: {
                    titulo_principal: 'Total de usuários infectados',
                    valor_principal: valorPrincipalCard1, //Total de usuários infectados em todos os anos
                    titulo_secundario: 'esse ano',
                    valor_secundario: valorSecundarioCard1 + '%', //Percentual = Total usuários infectados no ano atual / Total de usuários infectados em todos os anos
                    icon: 'fa-virus-covid'
                },
                Card2: {
                    titulo_principal: 'Usuários infectados nesse ano',
                    valor_principal: valorDeCasosDesteAno, // Total de usuários contaminados no ano atual
                    titulo_secundario: 'esse mês',
                    valor_secundario: valorSecundarioCard2, // Total de usuários contaminados no mês atual, no ano atual
                    icon: 'fa-viruses'
                },
                Card3: {
                    titulo_principal: 'Aderência a 1° dose da vacina',
                    valor_principal: Math.round(((valorPrincipalCard3 / totalDeUsuariosContaminados.length) * 100)) + '%', // Percentual = total de usuários contaminados que tomaram no mínimo 1 dose da vacina / Total de usuários contaminados no total em todos os anos
                    titulo_secundario: 'Entre os casos positivos confirmados',
                    valor_secundario: '',
                    icon: 'fa-syringe'
                },
                Card4: {
                    titulo_principal: 'Total dentro do grupo de risco', // Total de infectados no ano
                    valor_principal: valorPrincipalCard4, // Total de usuários contaminados em todos os anos que fazem parte do grupo de risco
                    titulo_secundario: 'do total',
                    valor_secundario: ((valorPrincipalCard4 > 0) ? Math.round(((valorPrincipalCard4 / totalDeUsuariosContaminados.length) * 100)) : 0) + '%', //Percentual = usuários contaminados em todos os anos que fazem parte do grupo de risco / usuários contaminados em todos os anos
                    icon: 'fa-lungs-virus'
                }
            }
            
            return cartoes;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem dos cards.");
        }
    }
}

export { ListDashboardCardsService }