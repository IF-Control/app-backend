import { Services } from "../Services";

interface RoomRequest{
    id: string;
}

class DeleteRoomService extends Services{
    async execute({ id }: RoomRequest){
        if(!id){
            throw new Error("Não foi possível encontrar a sala, ID faltante na requisição.");
        }
        
        id = this.validate.sanitizeField(id);
        
        try{
            const room = await this.prisma.room.update({
                where: {
                    id: id
                },
                data: {
                    deleted_at: this.date.dateJStoISO()
                },
                select: {
                    id: true,
                    deleted_at: true
                }
            });
            
            return room;
        }catch(error){
            throw new Error("Sala inexistente.");
        }
    }
}

export { DeleteRoomService }