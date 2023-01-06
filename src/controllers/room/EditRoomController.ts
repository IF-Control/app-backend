import { Request, Response } from "express";
import { EditRoomService } from "../../services/room/EditRoomService";

class EditRoomController{
    async handle(req: Request, res: Response){
        const { id, name, capacity, latitude, longitude, altitude, type, status } = req.body;
        const editRoomService = new EditRoomService();

        const room = await editRoomService.execute({
            id,
            name,
            capacity,
            latitude,
            longitude,
            altitude,
            type,
            status
        });

        return res.json(room);
    }
}

export { EditRoomController }