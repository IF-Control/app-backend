import { Request, Response } from "express";
import { DeleteRoomService } from "../../services/room/DeleteRoomService";

class DeleteRoomController{
    async handle(req: Request, res: Response){
        const { id } = req.body;
        const deleteRoomService = new DeleteRoomService();
        const room = await deleteRoomService.execute({ id });
        return res.json(room);
    }
}

export { DeleteRoomController }