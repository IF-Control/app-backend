import prismaClient from "../../prisma";

class ListAllBuildingsService{
    async execute(){
        const room = await prismaClient.building.findMany({
            select:{
                id: true,
                name: true,
                campus_id: true
            }
        });
        return room;
    }
}

export { ListAllBuildingsService }