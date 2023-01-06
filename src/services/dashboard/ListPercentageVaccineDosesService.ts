import { Services } from "../Services";

class ListPercentageVaccineDosesService extends Services{
    async execute(){
        try{
            let naoVacinado = 0;
            let primeiraDose = 0;
            let segundaDose = 0;
            let terceiraDose = 0;
            let quartaDose = 0;

            const totalOfUsersInfected = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    id: true,
                    created_at: true,
                    user: {
                        select: {
                            vaccine_doses: true
                        }
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19'
                    // Verificar o tempo também se for necessário para saber se ainda está infectado ou não
                }
            });

            totalOfUsersInfected.forEach(u => {
                if(!u.user.vaccine_doses){
                    u.user.vaccine_doses = 0;
                }

                switch(u.user.vaccine_doses){
                    case 1:
                        primeiraDose++;
                        break;
                    case 2:
                        segundaDose++;
                        break;
                    case 3:
                        terceiraDose++;
                        break;
                    case 4:
                        quartaDose++;
                        break;
                    default:
                        naoVacinado++;
                        break;
                }
            });

            let percentualListOfVaccine = [naoVacinado, primeiraDose, segundaDose, terceiraDose, quartaDose];

            return percentualListOfVaccine;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem do número de infectados e suas respectivas doses de vacina.");
        }
    }
}

export { ListPercentageVaccineDosesService }