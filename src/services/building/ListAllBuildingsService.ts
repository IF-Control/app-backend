import { Services } from "../Services";

class ListAllBuildingsService extends Services{
    async execute(){
        try{
            const building = await this.prisma.building.findMany({
                select:{
                    id: true,
                    name: true,
                    campus_id: true
                },
                where:{
                    deleted_at: null
                }
            });
    
            return building;
        }catch(error){
            throw new Error("Impossível processar a solicitação.");
        }
    }
}

export { ListAllBuildingsService }