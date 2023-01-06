import { hash } from "bcryptjs";
import { Services } from "../Services";

class EditThisUserAdministratorService extends Services{
    async execute({ id, name, password }){
        if(!id || !name){
            throw new Error("Campos estão em falta na requisição.");
        }

        id = this.validate.sanitizeField(id);
        name = this.validate.sanitizeField(name);

        if(name.length > 64){
            throw new Error("Nome muito longo. Limite máximo aceitável é de 64 caracteres.");
        }

        let passwordHash;
        if(password){
            //password = this.validate.sanitizeField(password);
            if(!this.validate.validatePassword(password)){
                throw new Error("Senha fraca: Ela precisar ter letras maiúsculas e minúsculas, números e caracteres especiais e no mínimo 6 caracteres de tamanho.");
            }
            passwordHash = await hash(password, 8);
        }

        try{
            const user = await this.prisma.user.update({
                where:{
                    id: id
                },
                data:{
                    name: name,
                    password: passwordHash
                },
                select:{
                    email: true,
                    name: true,
                    type: true
                }
            });
    
            return user;
        }catch(error){
            throw new Error("Não foi possível processar esta solicitação, por favor tente novamente mais tarde.");
        }
    }  
}

export { EditThisUserAdministratorService }