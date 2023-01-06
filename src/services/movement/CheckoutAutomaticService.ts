import prismaClient from "../../prisma";

class CheckoutAutomaticService{
    async execute(){
        const actualDate = new Date().toLocaleString("pt-BR", {timeZone: process.env.TZ});

        try{
            const movements = await prismaClient.movement.updateMany({
                where:{
                    checkout_date:{
                        lte: actualDate
                    },
                    draft: true
                },
                data:{
                    draft: false
                }
            });
    
            return movements;
        }catch(error){
            throw new Error("Neste momento não foi possível concluir o serviço de check-out automático.");
        }
    }
}

export { CheckoutAutomaticService }