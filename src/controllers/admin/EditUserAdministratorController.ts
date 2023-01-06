import { Request, Response } from "express";
import { EditUserAdministratorService } from "../../services/admin/EditUserAdministratorService";

class EditUserAdministratorController{
    async handle(req: Request, res: Response){
        const { id, name, active } = req.body;
        const editUserAdministratorService = new EditUserAdministratorService();

        const user = await editUserAdministratorService.execute({
            id,
            name,
            active
        });
        
        return res.json(user);
    }
}

export { EditUserAdministratorController }