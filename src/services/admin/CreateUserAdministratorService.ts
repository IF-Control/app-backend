import { hash } from "bcryptjs";
import { Services } from "../Services";

interface UserAdminRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserAdministratorService extends Services{
    async execute({ name, email, password }: UserAdminRequest){
        const validate = this.validate;

        if(!email || !name || !password){
            throw new Error("Campos estão em falta na requisição.");
        }

        name = validate.sanitizeField(name);
        email = validate.sanitizeField(email);
        password = validate.sanitizeField(password);

        if(name.length > 64){
            throw new Error("Nome muito longo. O limite é de 64 caracteres.");
        }

        if(!validate.validateEmail(email)){
            throw new Error("E-Mail inválido.");
        }

        if(!validate.validatePassword(password)){
            throw new Error("Senha fraca: Ela precisar ter letras maiúsculas e minúsculas, números e caracteres especiais e no mínimo 6 caracteres de tamanho.");
        }

        const userAlreadyExists = await this.prisma.user.findFirst({
            where: {   
                email: email 
            }
        });

        if(userAlreadyExists){
            throw new Error("Usuário já é existente no sistema.");
        }

        try {
            const passwordHash = await hash(password, 8);
    
            const user = await this.prisma.user.create({
                data: {
                    name: name, 
                    email: email, 
                    password: passwordHash, 
                    type: "Administrador", 
                    campus_id: "ce7a3707-55d7-49c1-b092-b9227df39433",
                    vaccine_doses: 0,
                    group_of_risk: false
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            
            return user;
        }catch(error){
            throw new Error("Não foi possível processar esta solicitação, por favor tente novamente mais tarde.");
        }
    }
}

export { CreateUserAdministratorService }