import prismaClient from "../../prisma";

interface RoomRequest{
    name: string;
    capacity: number;
    latitude: string;
    longitude: string;
    altitude: string;
    type: string;
    status: string;
    building_id: string;
}

class CreateRoomService{
    async execute({name, capacity, latitude, longitude, altitude, type, status, building_id}: RoomRequest){

        const room = await prismaClient.room.create({
            data:{
                name: name,
                capacity: capacity,
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
                type: type,
                status: status,
                building_id: building_id
            }
        });
        
        return room;
    }
}

export { CreateRoomService }