import { Request, Response } from "express";
import { DeleteBuildingsService } from "../../services/building/DeleteBuildingsService";

class DeleteBuildingsController{
    async handle(req: Request, res: Response){
        const { id } = req.body;
        const deleteBuildingsService = new DeleteBuildingsService();

        const building = await deleteBuildingsService.execute({
            id
        });

        return res.json(building);
    }
}

export { DeleteBuildingsController }