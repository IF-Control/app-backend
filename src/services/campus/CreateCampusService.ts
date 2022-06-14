import prismaClient from "../../prisma";

interface CampusRequest{
    name: string;
    state: string;
    city: string;
    map_uri: string;
}

class CreateCampusService{
    async execute({name, state, city, map_uri}: CampusRequest){

        const campus = await prismaClient.campus.create({
            data:{
                name: name, 
                state: state,
                city: city,
                map_uri: map_uri
            }
        });
        
        return campus;
    }
}

export { CreateCampusService }