import prismaClient from "../../prisma";

class ListBuildingsService{
    async execute(campus: string){
        if(!campus){
            throw new Error("Campus inválido.");
        }

        const room = await prismaClient.building.findMany({
            select:{
                id: true,
                name: true,
                campus_id: true
            },
            where:{
                campus_id: campus
            }
        });
        return room;
    }
}

export { ListBuildingsService }