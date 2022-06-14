import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
    type: string;
    enrollment: string;
    campus_id: string;
}

class CreateUserService{
    async execute({name, email, password, type, enrollment, campus_id}: UserRequest){
        
        if(!email){
            throw new Error("Email incorreto.");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(userAlreadyExists){
            throw new Error("Usuário já cadastrado.");
        }

        if(enrollment != ''){
            const enrollmentAlreadyExists = await prismaClient.user.findFirst({
                where:{
                    enrollment: enrollment
                }
            });

            if(enrollmentAlreadyExists){
                throw new Error("Usuário já cadastrado.");
            }
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name, 
                email: email, 
                password: passwordHash, 
                type: type, 
                enrollment: enrollment,
                campus_id: campus_id
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        });
        
        return user;
    }
}

export { CreateUserService }