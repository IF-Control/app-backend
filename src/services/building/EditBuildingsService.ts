import { Services } from "../Services";

interface BuildingRequest{
    id: string;
    name: string;
}

class EditBuildingsService extends Services{
    async execute({ id, name }: BuildingRequest){
        if(!id || !name){
            throw new Error("Campos estão faltando na requisição.");
        }

        id = this.validate.sanitizeField(id);
        name = this.validate.sanitizeField(name);

        try{
            const building = await this.prisma.building.update({
                where:{
                    id: id
                },
                data:{
                    name: name
                }
            });
            
            return building;
        }catch(error){
            throw new Error("Prédio inexistente.");
        }
    }
}

export { EditBuildingsService }