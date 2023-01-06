import { CreateAlertService } from "../../services/alert/CreateAlertService";

class CreateAlertController{
    async handle(user_id: string, case_type: string){
        const createAlertService = new CreateAlertService();
        const alert = await createAlertService.execute({ user_id, case_type });
        return alert;
    }
}

export { CreateAlertController }