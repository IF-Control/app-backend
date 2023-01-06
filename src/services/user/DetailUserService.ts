import { Services } from "../Services";

class DetailUserService extends Services{
    async execute(user_id: string){
        user_id = this.validate.sanitizeField(user_id);

        if(!user_id){
            throw new Error("Identificador do usuário solicitante está faltando na requisição.");
        }

        try{
            const user = await this.prisma.user.findFirst({
                where: {
                    id: user_id,
                    active: true,
                    deleted_at: null
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    enrollment: true,
                    type: true,
                    vaccine_doses: true
                }
            });
    
            return user;
        }catch(error){
            throw new Error("Não foi possível localizar este usuário.");
        }
    }
}

export { DetailUserService }