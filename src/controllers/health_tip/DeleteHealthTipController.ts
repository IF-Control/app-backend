import { Request, Response } from "express";
import { DeleteHealthTipService } from "../../services/health_tip/DeleteHealthTipService";

class DeleteHealthTipController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string;
        const deleteHealthTipService = new DeleteHealthTipService();
        const healthTip = await deleteHealthTipService.execute({ id });
        return res.json(healthTip);
    }
}

export { DeleteHealthTipController }