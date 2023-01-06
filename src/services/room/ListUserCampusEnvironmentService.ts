import { Services } from "../Services";

interface ListRoomsRequest{
    campusId: string
}

class ListUserCampusEnvironmentService extends Services{
    async execute({ campusId }: ListRoomsRequest){
        campusId = this.validate.sanitizeField(campusId);

        if(!campusId){
            throw new Error("Não foi possível listar os ambientes, identificador do campus está faltando na requisição.");
        }

        try{
            const environmentUserCampus = await this.prisma.building.findMany({
                select:{
                    id: true,
                    name: true,
                    rooms:{
                        select:{
                            id: true,
                            name: true,
                            capacity: true,
                            type: true,
                            status: true,
                            building_id: true,
                            movements:{
                                select:{
                                    id: true
                                },
                                where:{
                                    draft: true
                                }
                            }
                        },
                        where:{
                            deleted_at: null
                        },
                        orderBy:{
                            name: 'asc'
                        }
                    }
                }, 
                where:{
                    campus_id: campusId,
                    rooms: {
                        some:{
                            type: 'Espaço Comum'    
                        }
                    },
                    deleted_at: null
                },
                orderBy:{
                    name: 'asc'
                }
            });
    
            return environmentUserCampus;
        }catch(error){
            throw new Error("Não foi possível processar esta solicitação, por favor tente novamente mais tarde.");
        }
    }
}

export { ListUserCampusEnvironmentService };