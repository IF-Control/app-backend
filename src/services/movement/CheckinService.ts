import prismaClient from "../../prisma";

interface MovementRequest{
    user_id: string;
    room_id: string;
}

class CheckinService{
    async execute({ user_id, room_id }: MovementRequest){

        const roomExists = await prismaClient.room.findFirst({
            where:{
                id: room_id
            }
        });

        if(!roomExists){
            throw new Error("Sala inexistente.");
        }

        const checkInDate = new Date().toLocaleString("pt-BR");

        var checkOutDate = new Date();
        checkOutDate.setHours(checkOutDate.getHours() + 2);
        const dataCheckOut = checkOutDate.toLocaleString("pt-BR");

        const movement = await prismaClient.movement.create({
            data:{
                user_id: user_id, 
                room_id: room_id,
                checkin_date: checkInDate,
                checkout_date: dataCheckOut
            },
            select:{
                id: true,
                checkin_date: true,
                checkout_date: true,
                room_id: true,
                user_id: true,
                draft: true
            }
        });
        
        return { movement };
    }
}

export { CheckinService }