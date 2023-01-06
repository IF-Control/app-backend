import { Services } from "../Services";

class ListSeriesForCasesByYearService extends Services{
    async execute(){
        try{
            let listaDeCasosSeparadosPorAno = {
                casos: [],
                anos: []
            }

            const totalOfCases = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'],
                select: {
                    id: true,
                    created_at: true,
                    user: {
                        select: {
                            id: true,
                            course: true
                        }
                    }
                },
                where: {
                    case_type: 'Positivo',
                    disease: 'COVID-19'
                },
                orderBy: {
                    created_at: 'asc'
                }
            });

            totalOfCases.forEach(infection => {
                const year = ((infection.created_at).toString()).split(" ");
                infection.ano = year[3];
            });

            function findOcc(arr, key){
                let arr2 = [];
                arr.forEach((x)=>{
                   if(arr2.some((val)=>{ return val[key] == x[key] })){
                        arr2.forEach((k)=>{
                            if(k[key] === x[key]){ 
                                k["occurrence"]++
                            }
                        })
                   }else{
                     let a = {}
                     a[key] = x[key]
                     a["occurrence"] = 1
                     arr2.push(a);
                   }
                })
                return arr2
            }

            let newObjectArray = findOcc(totalOfCases, "ano");
            let i = 0;

            newObjectArray.forEach(e => {
                listaDeCasosSeparadosPorAno.casos[i] = e.occurrence;
                listaDeCasosSeparadosPorAno.anos[i] = e.ano;
                i++;
            });

            return listaDeCasosSeparadosPorAno;
        }catch(error){
            throw new Error("Não foi possível efetuar a listagem do número de casos por ano.");
        }
    }
}

export { ListSeriesForCasesByYearService }