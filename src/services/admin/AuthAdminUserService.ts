import { sign } from "jsonwebtoken";
import { Services } from "../Services";

interface AuthRequest{
    userID: string;
}

class AuthAdminUserService extends Services{
    async execute({ userID }: AuthRequest){
        if(!userID){
            throw new Error("ID do usuário não é válido.");
        }

        let user_id = this.validate.sanitizeField(userID);

        try{
            const user = await this.prisma.user.findFirst({
                where:{
                    id: user_id,
                    active: true,
                    deleted_at: null,
                    type: 'Administrador'
                }
            });
    
            if(!user){
                throw new Error("Usuário e/ou senha incorretos.");
            }
    
            const token = sign(
                {
                    name: user.name,
                    email: user.email,
                    campus: user.campus_id
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: '30d'
                }
            );
    
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.type,
                campus: user.campus_id,
                token: token
            };
        }catch(error){
            throw new Error("Não foi possível validar o seu acesso.");
        }
    }
}

export { AuthAdminUserService };