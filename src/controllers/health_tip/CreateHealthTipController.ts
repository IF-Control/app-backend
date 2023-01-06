import { Request, Response } from "express";
import { CreateHealthTipService } from "../../services/health_tip/CreateHealthTipService";

class CreateHealthTipController{
    async handle(req: Request, res: Response){
        const { name, description } = req.body;
        const archiveTypes = ["image/png", "image/jpg", "image/jpeg"];

        const createHealthTipService = new CreateHealthTipService();

        if(!req.file){
            throw new Error("Erro ao fazer o upload do arquivo");
        }else{
            const { filename: image, mimetype, size } = req.file;
            
            if(!archiveTypes.includes(mimetype)){
                throw new Error("Envie apenas arquivos do tipo PNG, JPG ou JPEG.");
            }

            const healthTip = await createHealthTipService.execute({
                name,
                description,
                image
            });
    
            return res.json(healthTip);
        }
    }
}

export { CreateHealthTipController }