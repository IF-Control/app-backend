import { Request, Response } from "express";
import { ListCampusService } from "../../services/campus/ListCampusService";

class ListCampusController{
    async handle(req: Request, res: Response){
        const listCampusService = new ListCampusService();
        const campus = await listCampusService.execute();

        return res.json(campus);
    }
}

export { ListCampusController }