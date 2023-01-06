import { Services } from "../Services";

class DeleteUserService extends Services{
    async execute(user_id: string){
        if(!user_id){
            throw new Error('ID do usuário está faltando no corpo da requisição.');
        }

        user_id = this.validate.sanitizeField(user_id);

        const userHasBeenDeleted = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                deleted_at: true
            }
        });

        if(userHasBeenDeleted.deleted_at){
            throw new Error('Este usuário já foi excluído.');
        }

        try{
            const user = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    deleted_at: this.date.dateJStoISO(),
                    active: false
                }
            });
    
            return user;
        }catch(error){
            throw new Error("Usuário inexistente.");
        }
    }
}

export { DeleteUserService }