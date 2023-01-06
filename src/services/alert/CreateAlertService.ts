import prismaClient from "../../prisma";
import { Services } from "../Services";

interface AlertRequest{
    user_id: string;
    case_type: string;
}

class CreateAlertService extends Services{
    async execute({ user_id, case_type }: AlertRequest){
        try{
            // MOVIMENTAÇÕES DE 7 DIAS ATRÁS (a partir de hoje [momento em que o usuário falou que está infectado])
            const hoje = this.date.dateJStoISO();
            let data = new Date(hoje);
            data.setDate(data.getDate() - 7); // Considerar 9 dias devido fim de semana e o período de incubação do vírus (a partir do momento que ele fala que está contaminado)

            const infectedUserMoveList = await prismaClient.movement.findMany({
                where:{
                    user_id: user_id,
                    AND: { 
                        created_at: {
                            gte: data
                        }
                    }
                },
                select:{
                    id: true,
                    checkin_date: true,
                    checkout_date: true,
                    created_at: true,
                    room_id: true,
                    user_id: true,
                    draft: true
                }
            });

            // check-ins nos mesmos dias e nas mesmas salas
            let listaMoves = [];
            infectedUserMoveList.forEach(move => {
                listaMoves.push(move.room_id)
            });

            // Tira duplicados
            listaMoves = listaMoves.filter((move, i) => listaMoves.indexOf(move) === i);

            const infectedUserRoomList = await prismaClient.movement.findMany({
                where:{
                    room_id: {
                        in: listaMoves
                    },
                    AND: { 
                        created_at: {
                            gte: data
                        }
                    }
                },
                select:{
                    id: true,
                    checkin_date: true,
                    checkout_date: true,
                    created_at: true,
                    room_id: true,
                    user_id: true
                }
            });

            let usuariosQueTiveramContatoComOinfectado = [];
            infectedUserRoomList.forEach(usuario => {
                if(usuario.user_id != user_id){
                    usuariosQueTiveramContatoComOinfectado.push(usuario.user_id);
                }
            });

            function converterDate(date: string){
                let dataSeparada = date.split(" ");
                let separaDiaMesAno = dataSeparada[0].split("/");

                let separaHoraMinutoSegundo = dataSeparada[1].split(":");
                let somaTresHoras = (parseInt(separaHoraMinutoSegundo[0]) + 3).toString();
                
                let novaData = new Date(separaDiaMesAno[2] + "-" + separaDiaMesAno[1] + "-" + separaDiaMesAno[0] + "T" + dataSeparada[1] + "Z");
                return {
                    dataFormatada: novaData, 
                    diaMesAno: dataSeparada[0], 
                    horaMinutoSegundo: dataSeparada[1],
                    horario3Horas: somaTresHoras+":"+separaHoraMinutoSegundo[1]+":"+separaHoraMinutoSegundo[2]
                };
            }

            let alertas = [];
            let alerta = {};
            let tipoDaMensagem = "";

            // Verificar se o caso é suspeito ou confirmado

            infectedUserMoveList.forEach(move => {
                let checkinUsuarioContaminado = converterDate(move.checkin_date);
                let checkoutUsuarioContaminado = converterDate(move.checkout_date);

                infectedUserRoomList.forEach(user => {
                    if(user.user_id != user_id){
                        
                        let checkinUsuarioNormal = converterDate(user.checkin_date);
                        let checkoutUsuarioNormal = converterDate(user.checkout_date);

                        //  Verifica existência do contato
                        if((move.room_id == user.room_id) && (checkinUsuarioNormal.diaMesAno == checkinUsuarioContaminado.diaMesAno)){
                            // Verificar entrou antes e saiu antes (Não existe contato direto)

                            if(
                                (checkinUsuarioNormal.horaMinutoSegundo == checkinUsuarioContaminado.horaMinutoSegundo || checkoutUsuarioNormal.horaMinutoSegundo == checkoutUsuarioContaminado.horaMinutoSegundo) || // Entraram ou saíram juntos
                                (checkinUsuarioNormal.horaMinutoSegundo < checkinUsuarioContaminado.horaMinutoSegundo && checkoutUsuarioNormal.horaMinutoSegundo > checkoutUsuarioContaminado.horaMinutoSegundo) ||   // Usuário normal entrou antes e saiu depois
                                (checkinUsuarioNormal.horaMinutoSegundo < checkinUsuarioContaminado.horaMinutoSegundo && checkinUsuarioContaminado.horaMinutoSegundo < checkoutUsuarioNormal.horaMinutoSegundo) ||    // Usuário entrou antes e saiu enquanto o contaminado estava lá
                                (checkinUsuarioNormal.horaMinutoSegundo > checkinUsuarioContaminado.horaMinutoSegundo && checkoutUsuarioNormal.horaMinutoSegundo < checkoutUsuarioContaminado.horaMinutoSegundo) ||   // Usuário entrou depois e saiu antes
                                (checkinUsuarioNormal.horaMinutoSegundo > checkinUsuarioContaminado.horaMinutoSegundo && checkinUsuarioNormal.horaMinutoSegundo < checkoutUsuarioContaminado.horaMinutoSegundo)       // Usuário entrou depois e saiu enquanto o contaminado estava lá
                            ){
                                tipoDaMensagem="Contato Direto";
                            }else if((checkinUsuarioNormal.horaMinutoSegundo <= checkoutUsuarioContaminado.horario3Horas) && (checkinUsuarioNormal.horaMinutoSegundo > checkoutUsuarioContaminado.horaMinutoSegundo)){
                                tipoDaMensagem="Contato Indireto";
                            }else if(checkinUsuarioNormal.horaMinutoSegundo > checkoutUsuarioContaminado.horario3Horas){
                                tipoDaMensagem="Atenção";
                            }else{
                                tipoDaMensagem="";
                            }

                            if(tipoDaMensagem != ""){
                                alerta = { 
                                    message_type: case_type == "Positivo" ? tipoDaMensagem : "Contato com Caso Suspeito",
                                    date: checkinUsuarioNormal.dataFormatada,
                                    user_id: user.user_id,
                                    movement_id: user.id
                                }
    
                                alertas.push(alerta)
                            }
                        }
                    }
                });
            });

            console.log('here')

            const alert = await prismaClient.alert.createMany({
                data: alertas
            });

            return alert;
        }catch(error){
            throw new Error("Não foi possível efetuar a criação do alerta.");
        }
    }
}

export { CreateAlertService }