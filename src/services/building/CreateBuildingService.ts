import prismaClient from "../../prisma";

interface BuildingRequest{
    name: string;
    campus_id: string;
}

class CreateBuildingService{
    async execute({ name, campus_id }: BuildingRequest){

        const building = await prismaClient.building.create({
            data:{
                name: name, 
                campus_id: campus_id
            }
        });
        
        return building;
    }
}

export { CreateBuildingService }