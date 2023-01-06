import { Request, Response } from "express";
import { ListPercentageVaccineDosesService } from "../../services/dashboard/ListPercentageVaccineDosesService";

class ListPercentageVaccineDosesController{
    async handle(req: Request, res: Response){
        const listPercentageVaccineDosesService = new ListPercentageVaccineDosesService();
        const chart = await listPercentageVaccineDosesService.execute();
        return res.json(chart);
    }
}

export { ListPercentageVaccineDosesController }