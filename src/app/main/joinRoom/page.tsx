"use client"
import { useTheme } from "@/app/theme";
import { initializeSocket } from "@/lib/socket";
import {  Edit,  Person ,Badge } from "@mui/icons-material";

import localFont from 'next/font/local'
import { useRouter } from "next/navigation";
import { useState } from "react";

const jersey15 = localFont({
  src: '../../../../public/fonts/Jersey15-Regular.ttf', 
})

interface IJoinRoom {
    status : string ;
    name : string;
    room : {
      creator : string 
      userLimit : number 
      user : [{id:string,name : string}]
      status: string 
      roomId : string 
      timer : {min : number ,   sec :number}
  }
  }

const JoinRoom = () => {

    const router = useRouter()
    const { currentTheme } = useTheme()

    const edit = () => {
        // this is used to edi the user
        // need api to check the name avialbelity
    }

    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the state with the new value
  };

    const joinApi = (roomid : string) => {
       
        const socket = initializeSocket()
        console.log(roomid)
        socket.emit("join room" , {roomid} , (response: IJoinRoom  )=> {
            console.log(response)
            
            if(response.status == 'room not found' ){
              alert("ROOM NOT FOUND")
              return ;
            }
            if(response.status == 'ROOM_FULL' ){
              alert("ROOM FULL")
              return ;
            }
            
            console.log(response)
            const room = {
              sucess : true ,
              roomDetils : {
                your_name : response.name ,
                host : response.room.creator ,
                userLimit : response.room.userLimit ,
                user : response.room.user,
                status: response.room.status ,
                roomId : response.room.roomId ,
                timer : response.room.timer
                
              }

            }
            const serializedData = encodeURIComponent(JSON.stringify(room));
            router.push(`lobby?data=${serializedData}`);

          });
    }

    return (
        <div className={`h-full w-full flex items-center justify-center ${currentTheme.background} `}>

            <div className={`rounded-2xl  ${currentTheme.secondary} h-96 w-96`} >
                
                <p className={`h-[15%] w-full flex items-center justify-center text-4xl ${jersey15.className} ${currentTheme.text}`} >
                    JOIN ROOM
                </p>

                <div className="h-[85%] flex flex-col justify-evenly items-center">   

                <div className={` w-[80%] h-[15%] flex items-center rounded-xl  `}>
                    <Person sx={{ fontSize: 60 }} className={` text-xl ${currentTheme.text}`} />
                    <div className={`flex w-82 size-fit ${currentTheme.primary} rounded-xl`} >
                    <input className={`h-10 w-[80%] text-2xl pl-4 rounded-l-xl ${jersey15.className} ${currentTheme.background} `} type="text" />
                    <div onClick={()=>edit()} className=" h-10 w-[20%] flex items-center justify-center"  ><Edit sx={{ fontSize: 35 }} className={` text-xl ${currentTheme.text}`} /></div>
                    </div>
                </div>
                <div className={` w-[80%] h-[15%] flex items-center rounded-xl space-x-2 justify-center `}>
                    <Badge sx={{ fontSize: 55 }} className={` text-xl ${currentTheme.text}`} />
                    <input className={`h-10 w-[80%] text-2xl pl-4 rounded-xl ${jersey15.className} ${currentTheme.background} `} placeholder="Enter Room ID" type="text" 
                      value={inputValue} 
                      onChange={handleInputChange} 
                    />
                </div>

                
                <button onClick={()=>joinApi(inputValue) } className={` h-[15%] w-[80%] rounded-xl flex items-center justify-center text-4xl ${jersey15.className} ${currentTheme.text} ${currentTheme.background} `}> Join Room </button>
                </div>
            </div>

        </div>
    )

}


export default JoinRoom;