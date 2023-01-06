import { Request, Response } from "express";
import { ListAllBuildingsService } from "../../services/building/ListAllBuildingsService";

class ListAllBuildingsController{
    async handle(req: Request, res: Response){
        const listAllBuildingsService = new ListAllBuildingsService;
        const buildings = await listAllBuildingsService.execute();
        return res.json(buildings);
    }
}

export { ListAllBuildingsController }