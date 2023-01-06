import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserAdministratorController{
    async handle(req: Request, res: Response){
        const { id } = req.body;
        const deleteUserService = new DeleteUserService();
        const user = await deleteUserService.execute(id);
        return res.json(user);
    }
}

export { DeleteUserAdministratorController }