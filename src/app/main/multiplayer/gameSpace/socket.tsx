import { getSocket } from "@/lib/socket" 


 export const updateWpm = ({correct , roomid} : {correct :number, roomid : number}) => {

    const socket = getSocket();
    socket.emit('update wpm', {correct , roomid});

}

export const playerWpmUpdater = (callback : (data:any) =>  void ) => {

    const socket = getSocket();
    socket.on('player wpm' , (data)=>{
        callback(data)
    })
}