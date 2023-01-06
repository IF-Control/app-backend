import { Services } from "../Services";

interface CheckoutRequest{
    user_id: string;
    movement_id: string;
    room_id: string;
}

class CheckoutService extends Services{
    async execute({ user_id, movement_id, room_id }: CheckoutRequest){
        user_id = this.validate.sanitizeField(user_id);
        movement_id = this.validate.sanitizeField(movement_id);
        room_id = this.validate.sanitizeField(room_id);

        if(!user_id || !movement_id || !room_id){
            throw new Error("Campos faltantes na requisição.");
        }

        const movementExists = await this.prisma.movement.findFirst({
            where: {
                id: movement_id,
                user_id: user_id,
                room_id: room_id,
                draft: true
            }
        });

        if(!movementExists){
            throw new Error("Ação inválida - Movimento é inexistente.");
        }

        try{
            const checkOutDate = new Date().toLocaleString("pt-BR");
            const movement = await this.prisma.movement.update({
                data: {
                    checkout_date: checkOutDate, 
                    draft: false
                },
                where: {
                    id: movement_id
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
            
            return movement;
        }catch(error){
            throw new Error("Não foi possível realizar o check-out.");
        }
    }
}

export { CheckoutService }