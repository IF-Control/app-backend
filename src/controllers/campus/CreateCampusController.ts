import { Request, Response } from "express";
import { CreateCampusService } from "../../services/campus/CreateCampusService";

class CreateCampusController{
    async handle(req: Request, res: Response){
        const { name, state, city, map_uri } = req.body;

        const createCampusService = new CreateCampusService();

        const user = await createCampusService.execute({
            name,
            state, 
            city, 
            map_uri
        });

        return res.json(user);
    }
}

export { CreateCampusController }