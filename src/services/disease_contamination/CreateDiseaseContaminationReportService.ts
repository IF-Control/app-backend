import prismaClient from "../../prisma";
import { CreateAlertService } from "../alert/CreateAlertService";
import { Services } from "../Services";

interface DiseaseContaminationRequest{
    user_id: string,
    contamination_date: string, 
    report: string, 
    symptomatic: boolean | string, 
    case_type: string
}

class CreateDiseaseContaminationReportService extends Services{
    async execute({ user_id, contamination_date, report, symptomatic, case_type }: DiseaseContaminationRequest){
        if(!user_id || !symptomatic || !case_type){
            throw new Error("Campos faltantes na requisição.");
        }

        user_id = this.validate.sanitizeField(user_id);

        if(!this.validate.validateCaseType(case_type)){
            throw new Error("Tipo do caso inválido. Somente são aceitos os valores Positivo ou Suspeita.")
        }

        try{
            const disease_contamination = await prismaClient.diseaseContamination.create({
                data: {
                    user_id: user_id, 
                    contamination_date: '',
                    report: report,
                    symptomatic: (symptomatic === 'true'),
                    case_type: case_type,
                    disease: 'COVID-19'
                },
                select: {
                    id: true,
                    user_id: true,
                    contamination_date: true,
                    report: true,
                    symptomatic: true,
                    case_type: true
                }
            });

            const createAlerts = new CreateAlertService();
            createAlerts.execute({ user_id, case_type });
            
            return { disease_contamination };
        }catch(error){
            throw new Error("Não foi possível criar o report da contaminação.");
        }
    }
}

export { CreateDiseaseContaminationReportService }