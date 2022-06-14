import { Request, Response } from "express";
import { ListMovementsService } from "../../services/movement/ListMovementsService";

class ListMovementsController{
    async handle(req: Request, res: Response){
        const listMovementsService = new ListMovementsService();
        const movements = await listMovementsService.execute();
        return res.json(movements);
    }
}

export { ListMovementsController }