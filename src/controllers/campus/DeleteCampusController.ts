import { Request, Response } from "express";
import { DeleteCampusService } from "../../services/campus/DeleteCampusService";

class DeleteCampusController{
    async handle(req: Request, res: Response){
        const { id } = req.body;
        const deleteCampusService = new DeleteCampusService();
        const campus = await deleteCampusService.execute({ id });

        return res.json(campus);
    }
}

export { DeleteCampusController }