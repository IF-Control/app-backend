import prismaClient from "../../prisma";
import { Services } from "../Services";

interface RoomRequest{
    id: string;
    name: string;
    capacity: number;
    latitude: string;
    longitude: string;
    altitude: string;
    type: string;
    status: string;
}

class EditRoomService extends Services{
    async execute({ id, name, capacity, latitude, longitude, altitude, type, status }: RoomRequest){
        if(!id){
            throw new Error("Não foi possível encontrar a sala, ID faltante na requisição.");
        }

        id = this.validate.sanitizeField(id);

        if(!name){
            throw new Error("Nome do ambiente não pode ser vazio.");
        }

        name = this.validate.sanitizeField(name);

        if(!(typeof capacity === "number") || capacity < 0){
            throw new Error("Capacidade do ambiente inválida.");
        }

        if(latitude || longitude || altitude){
            latitude = this.validate.sanitizeField(latitude);
            longitude = this.validate.sanitizeField(longitude);
            altitude = this.validate.sanitizeField(altitude);
        }

        if(name.length > 46){
            throw new Error("Nome da sala é muito longo. O limite é de 46 caracteres.");
        }

        if(!(this.validate.validateRoomType(type)) || !type){
            throw new Error("Tipo da sala inválido.");
        }

        if(!(this.validate.validateRoomStatusType(status)) || !status){
            throw new Error("Status da sala inválido.");
        }

        try{
            const room = await prismaClient.room.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    capacity: capacity,
                    latitude: latitude,
                    longitude: longitude,
                    altitude: altitude,
                    type: type,
                    status: status
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
            throw new Error("Esta sala não existe.");
        }
    }
}

export { EditRoomService }