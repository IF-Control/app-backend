import { Services } from "../Services";

class ListContaminedStudantsService extends Services{
    async execute(){
        try{
            const totalDeAlunosContaminados = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    created_at: true,
                    user: {
                        select: {
                            id: true,
                            enrollment: true,
                            group_of_risk: true,
                            vaccine_doses: true
                        } 
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19',
                    user: {
                        type: 'Estudante'
                    }
                }
            });
            
            return totalDeAlunosContaminados;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem de alunos contaminados.");
        }
    }
}

export { ListContaminedStudantsService }