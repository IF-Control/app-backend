import prismaClient from "../../prisma";
import { Services } from "../Services";

interface MovementRequest{
    user_id: string;
    room_id: string;
}

class CheckinService extends Services{
    async execute({ user_id, room_id }: MovementRequest){
        user_id = this.validate.sanitizeField(user_id);
        room_id = this.validate.sanitizeField(room_id);

        if(!user_id || !room_id){
            throw new Error("Campos faltantes na requisição.");
        }

        const roomExists = await this.prisma.room.findFirst({
            where: {
                id: room_id
            }
        });

        if(!roomExists){
            throw new Error("Sala inexistente.");
        }
        
        try{
            await this.prisma.movement.updateMany({
                where: {
                    user_id: user_id,
                    draft: true
                },
                data: {
                    draft: false
                }
            });

            const dateCheckIn = new Date().toLocaleString("pt-BR");

            let checkOutDate = new Date();
            checkOutDate.setHours(checkOutDate.getHours() + 2);

            const dateCheckOut = checkOutDate.toLocaleString("pt-BR");

            const movement = await this.prisma.movement.create({
                data: {
                    user_id: user_id, 
                    room_id: room_id,
                    checkin_date: dateCheckIn,
                    checkout_date: dateCheckOut
                },
                select: {
                    id: true,
                    checkin_date: true,
                    checkout_date: true,
                    room_id: true,
                    user_id: true,
                    draft: true
                }
            });
            
            return { movement };
        }catch(error){
            throw new Error("Não foi possível realizar o check-in.");
        }
    }
}

export { CheckinService }