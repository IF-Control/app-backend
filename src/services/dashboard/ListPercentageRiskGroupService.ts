import { Services } from "../Services";

class ListPercentageRiskGroupService extends Services{
    async execute(){
        try{
            const users = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    id: true,
                    created_at: true,
                    user: {
                        select: {
                            group_of_risk: true
                        } 
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19'
                }
            });

            const countUsersInGroupOfRisk = users.reduce(function(n, user) {
                return n + (user.user.group_of_risk === true);
            }, 0);

            const percentageOfRiskGroup = (countUsersInGroupOfRisk > 0) ? Math.round(((countUsersInGroupOfRisk / users.length) * 100)) : 0;
            return percentageOfRiskGroup;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem do número de infectados de grupo de risco.");
        }
    }
}

export { ListPercentageRiskGroupService }