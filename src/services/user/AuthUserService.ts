import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Services } from "../Services";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService extends Services{
    async execute({ email, password }: AuthRequest){
        const validate = this.validate;

        if(!email || !password){
            throw new Error("Campos estão em falta.");
        }

        if(!validate.validateEmail(email)){
            throw new Error("E-Mail inválido.");
        }

        try{
            const user = await this.prisma.user.findFirst({
                where: {
                    email: email,
                    active: true,
                    deleted_at: null
                }
            });
    
            if(!user){
                throw new Error("Usuário e/ou senha incorretos.");
            }
    
            const passwordMatch = await compare(password, user.password);
    
            if(!passwordMatch){
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
                enrollment: user.enrollment,
                type: user.type,
                campus: user.campus_id,
                course: user.course,
                vaccine_doses: user.vaccine_doses,
                group_of_risk: user.group_of_risk,
                token: token
            }
        }catch(error){
            throw new Error("Usuário e/ou senha incorretos.");
        }
    }
}

export { AuthUserService };