import { Services } from "../Services";

interface BuildingRequest{
    id: string;
}

class DeleteBuildingsService extends Services{
    async execute({ id }: BuildingRequest){
        if(!id){
            throw new Error("Identificador do prédio está faltando na requisição.");
        }

        id = this.validate.sanitizeField(id);
        
        try{
            const actualMoment = this.date.dateJStoISO();

            const building = await this.prisma.building.update({
                where: {
                    id: id
                },
                data: {
                    deleted_at: actualMoment
                }
            });

            await this.prisma.room.updateMany({
                where: {
                    building_id: id
                },
                data: {
                    deleted_at: actualMoment
                }
            });
            
            return building;
        }catch(error){
            throw new Error("Identificador do prédio está incorreto.");
        }
    }
}

export { DeleteBuildingsService }