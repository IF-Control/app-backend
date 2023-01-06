import { Request, Response } from "express";
import { ListUserAdministratorService } from "../../services/admin/ListUserAdministratorService";

class ListUserAdministratorController{
    async handle(req: Request, res: Response){
        const listUserAdministratorService = new ListUserAdministratorService();
        const user = await listUserAdministratorService.execute();
        return res.json(user);
    }
}

export { ListUserAdministratorController }