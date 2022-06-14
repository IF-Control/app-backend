import { Request, Response } from "express";
import { CreateRoomService } from "../../services/room/CreateRoomService";

class CreateRoomController{
    async handle(req: Request, res: Response){
        const { name, capacity, latitude, longitude, altitude, type, status, building_id } = req.body;

        const createRoomService = new CreateRoomService();

        const room = await createRoomService.execute({
            name,
            capacity,
            latitude,
            longitude,
            altitude,
            type,
            status,
            building_id
        });

        return res.json(room);
    }
}

export { CreateRoomController }