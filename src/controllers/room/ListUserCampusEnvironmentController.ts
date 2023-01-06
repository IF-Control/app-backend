import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { ListUserCampusEnvironmentService } from "../../services/room/ListUserCampusEnvironmentService";

class ListUserCampusEnvironmentController{
    async handle(req: Request, res: Response){
        const [, authToken ] = (req.headers.authorization).split(" ");
        const token = decode(authToken);
        const campusId = token['campus'];
        const listUserCampusEnvironmentService = new ListUserCampusEnvironmentService();
        const room = await listUserCampusEnvironmentService.execute({ campusId });
        return res.json(room);
    }
}

export { ListUserCampusEnvironmentController }