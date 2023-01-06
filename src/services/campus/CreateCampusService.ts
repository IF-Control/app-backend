import { Services } from "../Services";

interface CampusRequest{
    name: string;
    state: string;
    city: string;
    map_uri: string;
}

class CreateCampusService extends Services{
    async execute({ name, state, city, map_uri }: CampusRequest){
        if(!name || !state || !city){
            throw new Error("Campos estão em falta.");
        }

        name = this.validate.sanitizeField(name);
        state = this.validate.sanitizeField(state);
        city = this.validate.sanitizeField(city);
        map_uri = this.validate.sanitizeField(map_uri);

        if(name.length > 22){
            throw new Error("Nome do campus é muito longo. O limite é de 22 caracteres.");
        }

        if(city.length > 32){
            throw new Error("Nome da cidade é muito longo. O limite é de 32 caracteres.");
        }

        if(state.length > 26){
            throw new Error("Nome do estado é muito longo. O limite é de 26 caracteres.");
        }

        if(map_uri.length > 42){
            throw new Error("Nome da imagem é muito longo. O limite é de 42 caracteres.");
        }
        
        const campus = await this.prisma.campus.create({
            data: {
                name: name, 
                state: state,
                city: city,
                map_uri: map_uri
            },
            select: {
                id: true,
                name: true, 
                state: true,
                city: true,
                map_uri: true
            }
        });
        
        return campus;
    }
}

export { CreateCampusService }