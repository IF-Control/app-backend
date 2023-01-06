import prismaClient from "../../prisma";

class ListMovementsService{
    async execute(){
        try{
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
        }catch(error){
            throw new Error("Não foi possível processar esta solicitação, por favor tente novamente mais tarde.");
        }
    }
}

export { ListMovementsService }