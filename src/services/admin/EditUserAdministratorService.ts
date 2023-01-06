import { Services } from "../Services";

interface UserRequest{
    id: string;
    name: string;
    active: boolean;
}

class EditUserAdministratorService extends Services{
    async execute({ id, name, active }: UserRequest){
        if(!id || !name){
            throw new Error("Campos faltantes na requisição.");
        }

        id = this.validate.sanitizeField(id);
        name = this.validate.sanitizeField(name);

        if(name.length > 64){
            throw new Error("Nome muito longo. Limite máximo aceitável é de 64 caracteres.");
        }

        try{
            const user = await this.prisma.user.update({
                where:{
                    id: id
                },
                data:{
                    name: name, 
                    active: active
                }
            });
            
            return user;
        }catch(error){
            throw new Error("Não foi possível editar este usuário no momento.");
        }
    }
}

export { EditUserAdministratorService }