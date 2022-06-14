import { Request, Response } from "express";
import { CheckinService } from "../../services/movement/CheckinService";

class CheckinController{
    async handle(req: Request, res: Response){
        const { room_id } = req.body;
        const user_id = req.user_id;

        const checkinService = new CheckinService();

        const movement = await checkinService.execute({
            user_id, 
            room_id
        });

        return res.json(movement);
    }
}

export { CheckinController }