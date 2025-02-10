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

// change the data of inOReder to number from boolean in case of probmen change to boolean ;
export const playerLimitChangeListener = (callback : (incOrdecr : number) => void) => {
    const socket = getSocket();
    socket.on('player change', (data) => {
        callback(data)
    })
}

export const gameStart = (callback : (sentence : string) => void ) => {
    const socket = getSocket();
    socket.on('notify game start', (sentence : string) => {
        callback(sentence);
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

export const startGame = ( roomid : string , callback:(status : boolean)=>void ) => {

    const socket = getSocket()
    socket.emit("start game" , { roomid } ,(response : boolean) => { 
        callback(response);
    })


}