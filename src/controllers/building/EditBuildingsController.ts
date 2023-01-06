import { Request, Response } from "express";
import { EditBuildingsService } from "../../services/building/EditBuildingsService";

class EditBuildingsController{
    async handle(req: Request, res: Response){
        const { id, name } = req.body;

        const editBuildingsService = new EditBuildingsService();

        const building = await editBuildingsService.execute({
            id,
            name
        });

        return res.json(building);
    }
}

export { EditBuildingsController }