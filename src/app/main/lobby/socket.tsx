import { getSocket } from "@/lib/socket"
import { customTosat } from "./Toast1";

type ToastFunction = (options: {
    variant?: string;
    title?: string;
    description?: string;
  }) => void;


export const incrPlayer = (roomid:string) => {
    const socket = getSocket();
    socket.emit("incr player",roomid,(response: {sucess:boolean})=>{
        console.log(response)
    });
}

export const decrPlayer = (roomid:string) => {
    const socket = getSocket();
    socket.emit("decr player",roomid,(response: {sucess:boolean})=>{
        console.log(response)
    });
}

export const playerJoined = (callback: (room: {name:string,id:string}[]) => void) => {
    const socket = getSocket();
    socket.on('player joined', ({room} ) => {
        console.log("ROOM DATA " , room)
        callback(room);
    });
};

export const playerLimitChangeListener = (callback : (incOrdecr : boolean) => void) => {
    const socket = getSocket();
    socket.on('player change', (data) => {
        callback(data)
    })
}

export const changePlayerCount = (incORdecr : boolean , userLimit : number,  currentNoPLayer : number ,roomid:string , toast : ToastFunction ) => {
    const socket = getSocket();

    if(incORdecr && userLimit < 10 ){
        socket.emit("change player count" ,{ incORdecr , roomid } , (response : boolean) => {
            if(response) customTosat(2,toast)
        } );
    }
    if(!incORdecr && userLimit > 2 ){
        socket.emit("change player count" ,{  incORdecr , roomid } , (response : boolean) => {
            if(response) customTosat(2,toast)
        } );
    }
}