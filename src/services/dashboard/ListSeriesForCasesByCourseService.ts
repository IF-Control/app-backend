import { Services } from "../Services";

class ListSeriesForCasesByCourseService extends Services{
    async execute(){
        try{
            const usersAllowed = ['Estudante', 'Docente'];
            const totalOfStudentsInfected = await this.prisma.diseaseContamination.findMany({
                distinct: ['user_id'], // busca usuário
                select: {
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
                    disease: 'COVID-19',
                    user: {
                        type: {
                            in: usersAllowed
                        }
                    }
                    // ,created_at: {
                    //     gte: this.date.dateJStoSQLdateTime() // Seleciona somente casos deste ano
                    // }
                }
            });

            let listaDeCursos = []

            totalOfStudentsInfected.forEach(estudante => {
                if(estudante.user.course != null){
                    listaDeCursos.push(estudante.user.course)
                }
            });

            function countItems(arr){
                const countMap = Object.create(null);
                for(const element of arr){
                    if(!countMap[element]){
                        countMap[element] = 1;
                    }else{
                        countMap[element] += 1;
                    }
                }
                return countMap;
            }

            const totalDeCasosPorCurso = countItems(listaDeCursos);

            const cursosCasos = {
                cursos: Object.keys(totalDeCasosPorCurso),
                casos: Object.values(totalDeCasosPorCurso)
            };

            return cursosCasos;
        }catch(error){
            throw new Error("Não foi possível listar o número de casos por cursos neste momento, por favor tente novamente mais tarde.");
        }
    }
}

export { ListSeriesForCasesByCourseService }