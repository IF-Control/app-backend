import { Services } from "../Services";

class ListRoomService extends Services{
    async execute(){
        try{
            const room = await this.prisma.room.findMany({
                select:{
                    name: true,
                    capacity: true,
                    type: true,
                    status: true,
                    building_id: true
                },
                where:{
                    deleted_at: null
                }
            });
    
            return room;
        }catch(error){
            throw new Error("Não foi possível processar esta requisição, por favor solicite novamente mais tarde.");
        }
    }
}

export { ListRoomService }