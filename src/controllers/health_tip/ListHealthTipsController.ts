import { Request, Response } from "express";
import { ListHealthTipsService } from "../../services/health_tip/ListHealthTipsService";

class ListHealthTipsController{
    async handle(req: Request, res: Response){
        const listHealthTipsService = new ListHealthTipsService();
        const healthTipsList = await listHealthTipsService.execute();
        return res.json(healthTipsList);
    }
}

export { ListHealthTipsController }