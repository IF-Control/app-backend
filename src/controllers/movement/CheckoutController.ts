import { Request, Response } from "express";
import { CheckoutService } from "../../services/movement/CheckoutService";

class CheckoutController{
    async handle(req: Request, res: Response){
        const { movement_id, room_id } = req.body;
        const user_id = req.user_id;

        const checkoutService = new CheckoutService();

        const movement = await checkoutService.execute({
            user_id,
            movement_id,
            room_id
        });

        return res.json(movement);
    }
}

export { CheckoutController }