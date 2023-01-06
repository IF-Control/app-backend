import prismaClient from "../prisma";
import { DateManager } from "../helpers/DateManager";
import { Validators } from "../helpers/Validators";

class Services{
    public prisma;
    public date: DateManager;
    public validate: Validators;

    constructor(){
        this.prisma = prismaClient;
        this.date = new DateManager();
        this.validate = new Validators();
    }
}

export { Services }