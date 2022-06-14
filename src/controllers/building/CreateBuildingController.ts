import { Request, Response } from "express";
import { CreateBuildingService } from "../../services/building/CreateBuildingService";

class CreateBuildingController{
    async handle(req: Request, res: Response){
        const { name, campus_id } = req.body;

        const createBuildingService = new CreateBuildingService();

        const building = await createBuildingService.execute({
            name,
            campus_id
        });

        return res.json(building);
    }
}

export { CreateBuildingController }