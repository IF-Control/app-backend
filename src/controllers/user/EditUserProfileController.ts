import { Request, Response } from "express";
import { EditUserProfileService } from "../../services/user/EditUserProfileService";

class EditUserProfileController{
    async handle(req: Request, res: Response){
        const { name, group_of_risk, course, vaccine_doses } = req.body;
        const id = req.user_id;

        const editUserProfileService = new EditUserProfileService();
        
        const user = await editUserProfileService.execute({
            id,
            name, 
            group_of_risk,
            course,
            vaccine_doses
        });

        return res.json(user);
    }
}

export { EditUserProfileController }