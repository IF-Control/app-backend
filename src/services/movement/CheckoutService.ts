import prismaClient from "../../prisma";

interface CheckoutRequest{
    user_id: string;
    movement_id: string;
    room_id: string;
    confirm: boolean | undefined;
}

class CheckoutService{
    async execute({ user_id, movement_id, room_id, confirm }: CheckoutRequest){

        const movementExists = await prismaClient.movement.findFirst({
            where:{
                id: movement_id,
                user_id: user_id,
                room_id: room_id,
                draft: true
            }
        });

        if(!movementExists){
            throw new Error("Ação inválida");
        }

        if(confirm){
            const movement = await prismaClient.movement.update({
                data:{
                    draft: false
                },
                where:{
                    id: movement_id
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
            return movement;
        }else{
            const checkOutDate = new Date().toLocaleString("pt-BR");
    
            const movement = await prismaClient.movement.update({
                data:{
                    checkout_date: checkOutDate, 
                    draft: false
                },
                where:{
                    id: movement_id
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
            return movement;
        }
    }
}

export { CheckoutService }