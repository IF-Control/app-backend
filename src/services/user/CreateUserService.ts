import { hash } from "bcryptjs";
import { Services } from "../Services";

interface UserRequest{
    name: string;
    email: string;
    password: string;
    type: string;
    enrollment: string | any;
    campus_id: string;
    vaccine_doses: number;
    course: string;
    group_of_risk: boolean;
}

class CreateUserService extends Services{
    async execute({ name, email, password, type, enrollment, campus_id, vaccine_doses, course, group_of_risk }: UserRequest){
        let userAlreadyExists;
        const validate = this.validate;

        if(!name || !type || !campus_id){
            throw new Error("Campos estão em falta.");
        }

        name = validate.sanitizeField(name);
        campus_id = validate.sanitizeField(campus_id);

        if(enrollment){
            enrollment = validate.validateEnrollment(enrollment);
        }

        if(name.length > 64){
            throw new Error("Nome muito longo. O limite é de 64 caracteres.");
        }

        if(!validate.validateEmail(email)){
            throw new Error("E-Mail inválido.");
        }

        if(!validate.validatePassword(password)){
            throw new Error("Senha fraca.");
        }

        if(!validate.validateUserType(type)){
            throw new Error("Tipo não reconhecido.");
        }

        if(!(typeof vaccine_doses === "number")){
            throw new Error("Número de doses de vacina não é um valor numérico.");
        }

        if(!(typeof group_of_risk === "boolean")){
            throw new Error("Valor para o campo grupo de risco é inválido.");
        }
            
        if((vaccine_doses < 0) || (vaccine_doses >= 6)){
            throw new Error("Número de doses de vacina não é válido.");
        }

        if(!enrollment){
            userAlreadyExists = await this.prisma.user.findFirst({
                where: {
                    email: email
                }
            });
        }else{
            if(type == 'Estudante'){
                if(!course){
                    throw new Error("Nome do curso faltante na requisição.");
                }
    
                if(!validate.validateCourseType(course)){
                    throw new Error("Curso não reconhecido.");
                }
            }

            userAlreadyExists = await this.prisma.user.findFirst({
                where: {   
                    OR: [
                        {
                            enrollment: enrollment
                        },
                        { 
                            email: email 
                        }
                    ]
                }
            });
        }

        if(userAlreadyExists){
            throw new Error("Usuário já cadastrado.");
        }
        
        try{
            const passwordHash = await hash(password, 8);
            const user = await this.prisma.user.create({
                data: {
                    name: name, 
                    email: email, 
                    password: passwordHash, 
                    type: type, 
                    enrollment: enrollment,
                    campus_id: campus_id,
                    vaccine_doses: vaccine_doses,
                    course: course,
                    group_of_risk: group_of_risk
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

export { CreateUserService }