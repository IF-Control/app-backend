import { Request, Response } from "express";
import { ListDashboardCardsService } from "../../services/dashboard/ListDashboardCardsService";

class ListDashboardCardsController{
    async handle(req: Request, res: Response){
        const listDashboardCardsService = new ListDashboardCardsService();
        const chart = await listDashboardCardsService.execute();
        return res.json(chart);
    }
}

export { ListDashboardCardsController }