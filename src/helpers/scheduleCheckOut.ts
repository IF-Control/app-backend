const nodeSchedule = require('node-schedule');
import { CheckoutAutomaticController } from "../controllers/movement/CheckoutAutomaticController";

const job = nodeSchedule.scheduleJob('*/10 * * * *', async () => {
    console.log("Execute: " + new Date());
    await new CheckoutAutomaticController().handle();
});

export { job };