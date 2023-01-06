import { CheckoutAutomaticService } from "../../services/movement/CheckoutAutomaticService";

class CheckoutAutomaticController{
    async handle(){
        const checkOutAutomaticService = new CheckoutAutomaticService();
        const movement = await checkOutAutomaticService.execute();
        return movement;
    }
}

export { CheckoutAutomaticController }