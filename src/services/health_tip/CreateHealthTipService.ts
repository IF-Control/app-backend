import { Services } from "../Services";

interface HealthTipRequest{
    name: string;
    description: string;
    image: string;
}

class CreateHealthTipService extends Services{
    async execute({ name, description, image }: HealthTipRequest){
        if(!name || !description || !image){
            throw new Error("Existem campos faltantes na requisição.");
        }

        name = this.validate.sanitizeField(name);
        description = this.validate.sanitizeField(description);

        if(name.length > 32){
            throw new Error("Nome da dica de saúde é muito longo. O limite de caracteres é 32.");
        }

        if(description.length > 230){
            throw new Error("Descrição da dica de saúde é muito longo. O limite de caracteres é 230.");
        }

        try{
            const healthTip = await this.prisma.healthTip.create({
                data: {
                    name: name,
                    description: description, 
                    image: image
                },
                select: {
                    id: true,
                    name: true,
                    description: true, 
                    image: true
                }
            });
            
            return healthTip;
        }catch(error){
            throw new Error("Não foi possível criar a dica de saúde. Por favor tente novamente mais tarde.");
        }
    }
}

export { CreateHealthTipService }