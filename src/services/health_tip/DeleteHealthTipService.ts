import { Services } from "../Services";

interface HealthTipRequest{
    id: string;
}

class DeleteHealthTipService extends Services{
    async execute({ id }: HealthTipRequest){
        if(!id){
            throw new Error('ID da dica de saúde faltante na requisição.');
        }

        id = this.validate.sanitizeField(id);

        const healthTipHasBeenDeleted = await this.prisma.healthTip.findFirst({
            where: {
                id: id,
                AND: { deleted_at: null }
            },
            select: {
                deleted_at: true
            }
        });

        if(!healthTipHasBeenDeleted){
            throw new Error('Esta dica de saúde não existe.');
        }

        try{
            const healthTip = await this.prisma.healthTip.update({
                where: {
                    id: id
                },
                data: {
                    deleted_at: this.date.dateJStoISO()
                },
                select: {
                    id: true,
                    name: true,
                    deleted_at: true
                }
            });
            
            return healthTip;
        }catch(error){
            throw new Error("Não foi possível deletar esta dica de saúde neste momento. Por favor tente novamente mais tarde.");
        }
    }
}

export { DeleteHealthTipService }