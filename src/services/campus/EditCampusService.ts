import { Services } from "../Services";

interface CampusRequest{
    id: string;
    name: string;
    state: string;
    city: string;
    map_uri: string;
}

class EditCampusService extends Services{
    async execute({ id, name, state, city, map_uri }: CampusRequest){
        if(!id){
            throw new Error("O identificador do campus está faltando.");
        }

        id = this.validate.sanitizeField(id);
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

        const campusExists = await this.prisma.campus.findFirst({
            where: {
                id: id,
                AND: { deleted_at: null }
            },
            select: {
                id: true
            }
        });

        if(campusExists){
            try{
                const campus = await this.prisma.campus.update({
                    where: {
                        id: id
                    },
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
            }catch(error){
                throw new Error("Não foi possível editar o campus.");
            }
        }else{
            throw new Error("Este campus não existe.");
        }
    }
}

export { EditCampusService }