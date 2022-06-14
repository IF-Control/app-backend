import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { ListUserCampusRoomsService } from "../../services/room/ListUserCampusRoomsService";

class ListUserCampusRoomsController{
    async handle(req: Request, res: Response){
        const [, authToken ] = (req.headers.authorization).split(" ");
        const token = decode(authToken);
        const campusId = token['campus'];

        const listUserCampusRoomsService = new ListUserCampusRoomsService();
        const room = await listUserCampusRoomsService.execute(campusId);
        return res.json(room);
    }
}

export { ListUserCampusRoomsController }