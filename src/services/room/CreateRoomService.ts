import { Services } from "../Services";

interface RoomRequest{
    name: string;
    capacity: number;
    latitude: string;
    longitude: string;
    altitude: string;
    type: string;
    status: string;
    building_id: string;
}

class CreateRoomService extends Services{
    async execute({ name, capacity, latitude, longitude, altitude, type, status, building_id }: RoomRequest){
        if(!name || !capacity || !type || !building_id){
            throw new Error("Campos faltantes na requisição.");
        }

        name = this.validate.sanitizeField(name);
        building_id = this.validate.sanitizeField(building_id);

        if(latitude != '' || longitude != '' || altitude != ''){
            latitude = this.validate.sanitizeField(latitude);
            longitude = this.validate.sanitizeField(longitude);
            altitude = this.validate.sanitizeField(altitude);
        }

        if(name.length > 46){
            throw new Error("Nome da sala é muito longo. O limite é de 46 caracteres.");
        }

        if(!this.validate.validateRoomType(type)){
            throw new Error("Tipo da sala inválido.");
        }

        if(!this.validate.validateRoomStatusType(status)){
            throw new Error("Status da sala inválido.");
        }
        
        try{
            const room = await this.prisma.room.create({
                data: {
                    name: name,
                    capacity: capacity,
                    latitude: latitude,
                    longitude: longitude,
                    altitude: altitude,
                    type: type,
                    status: status,
                    building_id: building_id
                },
                select: {
                    name: true,
                    capacity: true,
                    type: true,
                    status: true
                }
            });
            
            return room;
        }catch(error){
            throw new Error("Prédio não existente.");
        }
    }
}

export { CreateRoomService }