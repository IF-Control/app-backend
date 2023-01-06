import { Request, Response } from "express";
import { ListSeriesForCasesByCourseService } from "../../services/dashboard/ListSeriesForCasesByCourseService";

class ListSeriesForCasesByCourseController{
    async handle(req: Request, res: Response){
        const listSeriesForCasesByCourseService = new ListSeriesForCasesByCourseService();
        const chart = await listSeriesForCasesByCourseService.execute();
        return res.json(chart);
    }
}

export { ListSeriesForCasesByCourseController }