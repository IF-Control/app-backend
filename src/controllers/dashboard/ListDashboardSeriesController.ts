import { Request, Response } from "express";
import { ListDashboardSeriesService } from "../../services/dashboard/ListDashboardSeriesService";

class ListDashboardSeriesController{
    async handle(req: Request, res: Response){
        const listDashboardSeriesService = new ListDashboardSeriesService();
        const chart = await listDashboardSeriesService.execute();
        return res.json(chart);
    }
}

export { ListDashboardSeriesController }