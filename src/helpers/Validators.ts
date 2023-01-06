
class Validators{
    private allowedUserTypes: Array<String>;
    private allowedCourseTypes: Array<String>;
    private allowedCaseTypes: Array<String>;
    private allowedRoomTypes: Array<String>;
    private allowedRoomStatusTypes: Array<String>;

    constructor(){
        this.allowedUserTypes = ['Estudante', 'Visitante', 'Docente', 'Colaborador'];
        this.allowedCourseTypes = ['Mecatrônica', 'Informática', 'Aut. Industrial', 'Eng. Controle e Automação', 'Matemática', 'ADS', 'GSI', 'Outros'];
        this.allowedCaseTypes = ['Positivo', 'Suspeita'];
        this.allowedRoomTypes = ['Laboratório', 'Espaço Comum', 'Orientação', 'Sala de Aula', 'Auditório'];
        this.allowedRoomStatusTypes = ['Disponível', 'Manutenção', 'Interditada', 'Em Limpeza', 'Contaminada'];
    }

    public validateEmail(email: string): boolean{
        const emailRegex =  /^([a-zA-Z][^<>\"'!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegex.test(String(email).toLowerCase())
    }

    public validatePassword(passwd: string): boolean{
        const passwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/
        return passwdRegex.test(String(passwd))
    }

    public validateUserType(type: string): boolean{
        return this.allowedUserTypes.includes(type);
    }

    public validateCourseType(courseType: string): boolean{
        return this.allowedCourseTypes.includes(courseType);
    }

    public validateCaseType(type: string): boolean{
        return this.allowedCaseTypes.includes(type);
    }

    public validateRoomType(type: string): boolean{
        return this.allowedRoomTypes.includes(type);
    }

    public validateRoomStatusType(typeStatus: string): boolean{
        return this.allowedRoomStatusTypes.includes(typeStatus);
    }

    public validateEnrollment(enrollment: string){
        // Deve começar com GU, ser seguido por 6 número e terminar com um número ou uma letra (sem hífen entre essa última condição)
        const enrollRegEx = /^[G-U]{2}[0-9]{6}[A-X0-9]{1}$/
        enrollment = (enrollment.toUpperCase()).replace("-", "");
        if(enrollment.length <= 10 && enrollRegEx.test(String(enrollment))){
            return enrollment;
        }else{
            throw new Error("Prontuário invalido.");
        }
    }

    public sanitizeField(fieldData: string): string{
        fieldData = fieldData.replace("SELECT", "");
        fieldData = fieldData.replace("INSERT", "");
        fieldData = fieldData.replace("DELETE", "");
        fieldData = fieldData.replace("FROM", "");
        fieldData = fieldData.replace("WHERE", "");
        fieldData = fieldData.replace("DROP", "");
        fieldData = fieldData.replace("TABLE", "");
        fieldData = fieldData.replace("script", "");
        fieldData = fieldData.replace("--", "");
        fieldData = fieldData.replace("'", "");
        fieldData = fieldData.replace("\"", "");
        fieldData = fieldData.replace("<", "");
        fieldData = fieldData.replace(">", "");
        fieldData = fieldData.replace("</", "");
        fieldData = fieldData.replace("/>", "");
        fieldData = fieldData.replace("`", "");
        fieldData = fieldData.replace("||", "");
        fieldData = fieldData.replace("&&", "");
        fieldData = fieldData.replace("==", "");
        fieldData = fieldData.replace("!=", "");
        fieldData = fieldData.replace("===", "");
        fieldData = fieldData.replace("//", "");
        fieldData = fieldData.replace("true", "");
        fieldData = fieldData.replace("false", "");
        fieldData = fieldData.replace("{", "");
        fieldData = fieldData.replace("}", "");
        fieldData = fieldData.replace("[", "");
        fieldData = fieldData.replace("]", "");
        return fieldData;
    }
}

export { Validators }