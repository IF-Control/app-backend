import { Services } from "../Services";

interface BuildingRequest{
    name: string;
    campus_id: string;
}

class CreateBuildingService extends Services{
    async execute({ name, campus_id }: BuildingRequest){
        if(!name || !campus_id){
            throw new Error("A requisição possui campos faltantes.");
        }

        name = this.validate.sanitizeField(name);
        campus_id = this.validate.sanitizeField(campus_id);

        if(name.length > 32){
            throw new Error("Nome muito longo. O limite é de 32 caracteres.");
        }

        const campusExists = await this.prisma.campus.findFirst({
            select:{
                id: true
            },
            where:{
                id: campus_id,
                AND: { deleted_at: null }
            }
        })

        if(!campusExists){
            throw new Error("Este campus não existe.");
        }

        try{
            const building = await this.prisma.building.create({
                data:{
                    name: name, 
                    campus_id: campus_id
                },
                select:{
                    id: true,
                    campus_id: true,
                    name: true
                }
            });
            
            return building;
        }catch(error){
            throw new Error("Identificador do campus está incorreto.");
        }
    }
}

export { CreateBuildingService }