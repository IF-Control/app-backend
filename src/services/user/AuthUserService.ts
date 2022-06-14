import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        const user = await prismaClient.user.findFirst({
            where:{
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
            type: user.type,
            campus: user.campus_id,
            token: token
        };
    }
}

export { AuthUserService };