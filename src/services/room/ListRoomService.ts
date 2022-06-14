import prismaClient from "../../prisma";

class ListRoomService{
    async execute(){
        const room = await prismaClient.room.findMany({
            select:{
                name: true,
                capacity: true,
                type: true,
                status: true,
                building_id: true
            }
        });
        return room;
    }
}

export { ListRoomService }