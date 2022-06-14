import prismaClient from "../../prisma";

interface ListRoomsRequest{
    campusId: string
}

class ListUserCampusRoomsService{
    async execute({campusId}: ListRoomsRequest){

        const roomsUserCampus = await prismaClient.building.findMany({
            select:{
                id: true,
                name: true,
                rooms: {
                    select:{
                        id: true,
                        name: true,
                        capacity: true,
                        type: true,
                        movements:{
                            select:{
                                id: true
                            },
                            where:{
                                draft: true
                            }
                        }
                    }
                }
            }, 
            where:{
                campus_id: campusId
            },
            orderBy:{
                name: 'asc'
            }
        });

        return roomsUserCampus;
    }
}

export { ListUserCampusRoomsService };