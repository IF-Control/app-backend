import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { ListBuildingsService } from "../../services/building/ListBuildingsService";

class ListBuildingsController{
    async handle(req: Request, res: Response){
        const [, authToken ] = (req.headers.authorization).split(" ");
        const token = decode(authToken);

        const listBuildingsService = new ListBuildingsService;
        const buildings = await listBuildingsService.execute(token['campus']);

        return res.json(buildings);
    }
}

export { ListBuildingsController }