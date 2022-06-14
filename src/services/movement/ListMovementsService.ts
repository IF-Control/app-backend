import prismaClient from "../../prisma";

class ListMovementsService{
    async execute(){
        const movement = await prismaClient.movement.findMany({
            select:{
                id: true,
                checkin_date: true,
                checkout_date: true,
                room_id: true,
                user_id: true,
                draft: true
            },
            where:{
                checkout_date: null,
                draft: true
            }
        });
        
        return movement;
    }
}

export { ListMovementsService }