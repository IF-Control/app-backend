import { Request, Response } from "express";
import { EditThisUserAdministratorService } from "../../services/admin/EditThisUserAdministratorService";

class EditThisUserAdministratorController{
    async handle(req: Request, res: Response){
        const { name, password } = req.body;
        const id = req.user_id;

        const editThisUserAdministratorService = new EditThisUserAdministratorService();
        
        const user = await editThisUserAdministratorService.execute({
            id,
            name, 
            password
        });

        return res.json(user);
    }
}

export { EditThisUserAdministratorController }