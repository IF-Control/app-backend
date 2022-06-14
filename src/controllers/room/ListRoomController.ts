import { Request, Response } from "express";
import { ListRoomService } from "../../services/room/ListRoomService";

class ListRoomController{
    async handle(req: Request, res: Response){
        const listRoomService = new ListRoomService();

        const room = await listRoomService.execute();

        return res.json(room);
    }
}

export { ListRoomController }