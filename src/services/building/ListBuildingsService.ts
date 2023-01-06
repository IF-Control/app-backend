import { Services } from "../Services";

class ListBuildingsService extends Services{
    async execute(campus: string){
        campus = this.validate.sanitizeField(campus);
        
        if(!campus){
            throw new Error("Campus inválido.");
        }

        try{
            const building = await this.prisma.building.findMany({
                select:{
                    id: true,
                    name: true,
                    campus_id: true
                },
                where:{
                    campus_id: campus,
                    deleted_at: null,
                    campus: { 
                        deleted_at: null
                    }
                },
                orderBy: [
                    {
                        name: 'asc'
                    }
                ]
            });
    
            return building;
        }catch(error){
            throw new Error("Impossível processar a solicitação.");
        }
    }
}

export { ListBuildingsService }