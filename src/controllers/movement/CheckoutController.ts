import { Request, Response } from "express";
import { CheckoutService } from "../../services/movement/CheckoutService";

class CheckoutController{
    async handle(req: Request, res: Response){
        const { movement_id, room_id, confirm } = req.body;
        const user_id = req.user_id;

        const checkoutService = new CheckoutService();

        // recebe hora nova e parâmetro de verificação (se é checkout automático ou por entrada em outro ambiente)
        const movement = await checkoutService.execute({
            user_id,
            movement_id,
            room_id,
            confirm
        });

        return res.json(movement);
    }
}

export { CheckoutController }