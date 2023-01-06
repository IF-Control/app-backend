import { Services } from "../Services";

class ListDashboardSeriesService extends Services{
    async execute(){
        try{
            const series = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    id: true,
                    created_at: true,
                    case_type: true,
                    user: {
                        select: {
                            group_of_risk: true,
                            vaccine_doses: true
                        }
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19',
                    created_at: {
                        gte: this.date.dateJStoSQLdateTime()
                    }
                }
            });

            let jan = 0;
            let fev = 0;
            let mar = 0;
            let abr = 0;
            let mai = 0;
            let jun = 0;
            let jul = 0;
            let ago = 0;
            let set = 0;
            let out = 0;
            let nov = 0;
            let dez = 0;

            series.forEach(serie => {
                const month = ((serie.created_at).toString()).split(" ");

                if(month[1] == 'Jan'){
                    jan++;
                } 
                
                if(month[1] == 'Feb'){
                    fev++;
                } 
                
                if(month[1] == 'Mar'){
                    mar++;
                } 
                
                if(month[1] == 'Apr'){
                    abr++;
                } 
                
                if(month[1] == 'May'){
                    mai++;
                } 
                
                if(month[1] == 'Jun'){
                    jun++;
                } 
                
                if(month[1] == 'Jul'){
                    jul++;
                } 
                
                if(month[1] == 'Aug'){
                    ago++;
                }
                
                if(month[1] == 'Sep'){
                    set++;
                } 
                
                if(month[1] == 'Oct'){
                    out++;
                } 
                
                if(month[1] == 'Nov'){
                    nov++;
                } 
                
                if(month[1] == 'Dec'){
                    dez++;
                } 
            });

            let seriesList = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];

            return seriesList;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem de casos por mês.");
        }
    }
}

export { ListDashboardSeriesService }