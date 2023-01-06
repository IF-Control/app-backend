import { Services } from "../Services";

interface AlertRequest{
    user_id: string;
}

class ListAlertService extends Services{
    async execute({ user_id }: AlertRequest){
        if(!user_id){
            throw new Error("ID do usuário está em falta na requisição.");
        }

        user_id = this.validate.sanitizeField(user_id);

        try{
            const alerts = await this.prisma.alert.findMany({
                select:{
                    id: true,
                    message_type: true,
                    date: true,
                    movement: {
                        select:{
                            id: true,
                            room:{
                                select:{
                                    name: true
                                }
                            }
                        }
                    }
                },
                where:{
                    user_id: user_id
                }
            });

            let listOfAlerts = [];
            let formattedDate;

            alerts.forEach(alert => {
                formattedDate = this.date.separateDate(alert.date);

                listOfAlerts.push({
                    id: alert.id,
                    message_type: alert.message_type,
                    date: formattedDate.dayMonthYear,
                    hour: formattedDate.hourMinuteSecond,
                    room: alert.movement.room.name
                });
            });

            return listOfAlerts;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem dos alertas.");
        }
    }
}

export { ListAlertService }