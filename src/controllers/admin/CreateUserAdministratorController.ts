import { Request, Response } from "express";
import { CreateUserAdministratorService } from "../../services/admin/CreateUserAdministratorService";

class CreateUserAdministratorController{
    async handle(req: Request, res: Response){
        const { name, email, password } = req.body;
        const createUserAdministratorService = new CreateUserAdministratorService();
        const user = await createUserAdministratorService.execute({
            name,
            email,
            password
        });

        return res.json(user);
    }
}

export { CreateUserAdministratorController }