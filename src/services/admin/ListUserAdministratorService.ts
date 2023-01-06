import { Services } from "../Services";

class ListUserAdministratorService extends Services{
    async execute(){
        const user = await this.prisma.user.findMany({
            where:{
                type: 'Administrador',
                deleted_at: null
            },
            select:{
                id: true,
                name: true,
                email: true,
                active: true,
                enrollment: true
            }
        });
        return user;
    }
}

export { ListUserAdministratorService }