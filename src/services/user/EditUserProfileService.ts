import { Services } from "../Services";

interface UserRequest{
    id: string;
    name: string;
    group_of_risk: boolean;
    vaccine_doses: number;
    course: string;
}

class EditUserProfileService extends Services{
    async execute({ id, name, group_of_risk, course, vaccine_doses }: UserRequest){

        if(!id || !name){
            throw new Error("Identificador do usuário e/ou seu nome estão em falta.");
        }

        id = this.validate.sanitizeField(id);
        name = this.validate.sanitizeField(name);

        if(!(typeof vaccine_doses === "number")){
            throw new Error("Número de doses de vacina não é um número.");
        }

        if(!(typeof group_of_risk === "boolean")){
            throw new Error("Valor para o campo grupo de risco é inválido.");
        }
            
        if((vaccine_doses < 0) || (vaccine_doses >= 6)){
            throw new Error("Número de doses de vacina não é válido.");
        }

        if(name.length > 64){
            throw new Error("Nome muito longo. O limite é de 64 caracteres.");
        }

        if(course){
            if(!this.validate.validateCourseType(course)){
                throw new Error("Curso não reconhecido.");
            }
        }

        try{
            const user = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    group_of_risk: group_of_risk,
                    course: course,
                    vaccine_doses: vaccine_doses,
                    updated_at: this.date.dateJStoISO()
                },
                select: {
                    email: true,
                    name: true,
                    type: true,
                    group_of_risk: true,
                    course: true,
                    vaccine_doses: true
                }
            });
    
            return user;
        }catch(error){
            throw new Error("Não foi possível processar esta solicitação, por favor tente novamente mais tarde.");
        }
    }  
}

export { EditUserProfileService }