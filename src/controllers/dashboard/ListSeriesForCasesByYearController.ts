import { Request, Response } from "express";
import { ListSeriesForCasesByYearService } from "../../services/dashboard/ListSeriesForCasesByYearService";

class ListSeriesForCasesByYearController{
    async handle(req: Request, res: Response){
        const listSeriesForCasesByYearService = new ListSeriesForCasesByYearService();
        const chart = await listSeriesForCasesByYearService.execute();
        return res.json(chart);
    }
}

export { ListSeriesForCasesByYearController }