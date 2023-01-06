import { Services } from "../Services";

interface CampusRequest{
    id: string;
}

class DeleteCampusService extends Services{
    async execute({ id }: CampusRequest){
        if(!id){
            throw new Error("Identificador do prédio está faltando na requisição.");
        }

        id = this.validate.sanitizeField(id);

        const campusHasBeenDeleted = await this.prisma.campus.findFirst({
            where: {
                id: id,
                AND: { deleted_at: null }
            },
            select: {
                deleted_at: true
            }
        });
    
        if(!campusHasBeenDeleted){
            throw new Error('Este campus não existe.');
        }
            
        try{
            // Deletar também prédios e salas (cascata)
            const campus = await this.prisma.campus.update({
                where: {
                    id: id
                },
                data: {
                    deleted_at: new Date()
                },
                select: {
                    id: true,
                    name: true,
                    deleted_at: true
                }
            });

            return campus;
        }catch(error){
            throw new Error('Não foi possível deletar este campus.');
        }
    }
}

export { DeleteCampusService }