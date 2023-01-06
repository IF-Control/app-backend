import { Request, Response } from "express";
import { ListPercentageRiskGroupService } from "../../services/dashboard/ListPercentageRiskGroupService";

class ListPercentageRiskGroupController{
    async handle(req: Request, res: Response){
        const listPercentageRiskGroupService = new ListPercentageRiskGroupService();
        const chart = await listPercentageRiskGroupService.execute();
        return res.json(chart);
    }
}

export { ListPercentageRiskGroupController }