import { Services } from "../Services";

class ListAlertsContaminationService extends Services{
    async execute(){
        try{
            const hoje = this.date.dateJStoISO();
            let dataTresMeses = new Date(hoje);
            dataTresMeses.setDate(dataTresMeses.getDate() - 93); // Aroximadamente três meses para trás

            const usuariosInfectados = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    created_at: true,
                    user: {
                        select: {
                            id: true,
                            enrollment: true,
                            email: true,
                            vaccine_doses: true,
                            movements: {
                                take: 12,
                                select: {
                                    id: true,
                                    checkin_date: true,
                                    room: {
                                        select: {
                                            name: true
                                        }
                                    }
                                },
                                orderBy: {
                                    created_at: 'desc',
                                }
                            }
                        }
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19',
                    created_at: {
                        gte: dataTresMeses
                    }
                }
            });

            // retornar um array de objetos

            return usuariosInfectados;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem dos alertas.");
        }
    }
}

export { ListAlertsContaminationService }