import { Request, Response } from "express";
import { ListContaminedStudantsService } from "../../services/dashboard/ListContaminedStudantsService";

class ListContaminedStudantsController{
    async handle(req: Request, res: Response){
        const listContaminedStudantsService = new ListContaminedStudantsService();
        const studants = await listContaminedStudantsService.execute();
        return res.json(studants);
    }
}

export { ListContaminedStudantsController }