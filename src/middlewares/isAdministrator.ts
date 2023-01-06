import { NextFunction, Request, Response } from "express";
import { AuthAdminUserService } from "../services/admin/AuthAdminUserService";

export async function isAdministrator(req: Request, res: Response, next: NextFunction){
    const userID = req.user_id;

    if(!userID){
        return res.status(401).end();
    }

    try{
        const authAdminUserService = new AuthAdminUserService();
        const user = await authAdminUserService.execute({userID});

        if(user.type != 'Administrador'){
            return res.status(403).end();
        }

        return next();
    }catch(err){
        return res.status(401).end();
    }
}