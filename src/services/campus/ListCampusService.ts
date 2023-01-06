import { Services } from "../Services";

class ListCampusService extends Services{
    async execute(){
        try{
            const campus = await this.prisma.campus.findMany({
                select: {
                    id: true,
                    name: true, 
                    state: true,
                    city: true,
                    map_uri: true
                },
                where: {
                    deleted_at: null
                }
            });
            
            return campus;
        }catch(error){
            throw new Error('Não foi possível listar os campi.');
        }
    }
}

export { ListCampusService }