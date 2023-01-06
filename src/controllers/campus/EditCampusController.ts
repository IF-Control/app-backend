import { Request, Response } from "express";
import { EditCampusService } from "../../services/campus/EditCampusService";

class EditCampusController{
    async handle(req: Request, res: Response){
        const { id, name, state, city, map_uri } = req.body;

        const editCampusService = new EditCampusService();

        const campus = await editCampusService.execute({
            id,
            name,
            state, 
            city, 
            map_uri
        });

        return res.json(campus);
    }
}

export { EditCampusController }