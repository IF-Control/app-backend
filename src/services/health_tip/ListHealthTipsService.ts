import { Services } from "../Services";

class ListHealthTipsService extends Services{
    async execute(){
        try{
            const healthTipsList = await this.prisma.healthTip.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            
            return healthTipsList; 
        }catch(error){
            throw new Error("Não foi possível listar as dicas de saúde.");
        }
    }
}

export { ListHealthTipsService }