import { Request, Response } from "express";
import { CreateDiseaseContaminationReportService } from "../../services/disease_contamination/CreateDiseaseContaminationReportService";

class CreateDiseaseContaminationReportController{
    async handle(req: Request, res: Response){
        const { contamination_date, symptomatic, case_type } = req.body;
        const user_id = req.user_id;

        const createDiseaseContaminationReportService = new CreateDiseaseContaminationReportService();

        if(case_type == 'Positivo'){
            if(!req.file){
                throw new Error("Erro ao enviar o arquivo.");
            }else{
                const { filename: report, mimetype, size } = req.file;
                
                if(mimetype != "application/pdf"){
                    throw new Error("Envie apenas arquivos do tipo PDF.");
                }
    
                const contaminationReport = await createDiseaseContaminationReportService.execute({
                    user_id,
                    contamination_date: "", 
                    report, 
                    symptomatic, 
                    case_type
                });
        
                return res.json(contaminationReport);
            }
        }else{
            const contaminationReport = await createDiseaseContaminationReportService.execute({
                user_id,
                contamination_date: "", 
                report: "report-none", 
                symptomatic, 
                case_type
            });
    
            return res.json(contaminationReport);
        }
    }
}

export { CreateDiseaseContaminationReportController }