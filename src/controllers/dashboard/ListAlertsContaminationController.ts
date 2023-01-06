import { Request, Response } from "express";
import { ListAlertsContaminationService } from "../../services/dashboard/ListAlertsContaminationService";

class ListAlertsContaminationController{
    async handle(req: Request, res: Response){
        const listAlertsContaminationService = new ListAlertsContaminationService();
        const alerts = await listAlertsContaminationService.execute();
        return res.json(alerts);
    }
}

export { ListAlertsContaminationController }