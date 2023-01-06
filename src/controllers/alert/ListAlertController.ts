import { Request, Response } from "express";
import { ListAlertService } from "../../services/alert/ListAlertService";

class ListAlertController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;
        const listAlertService = new ListAlertService();
        const user = await listAlertService.execute({ user_id });
        return res.json(user);
    }
}

export { ListAlertController }