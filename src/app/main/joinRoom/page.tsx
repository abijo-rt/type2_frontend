"use client"
import { useTheme } from "@/app/theme";
import {  Edit,  Person ,Badge } from "@mui/icons-material";

import localFont from 'next/font/local'
import { useRouter } from "next/navigation";

const jersey15 = localFont({
  src: '../../../../public/fonts/Jersey15-Regular.ttf', 
})

const JoinRoom = () => {

    const router = useRouter()



    const { currentTheme } = useTheme()

    const edit = () => {
        // this is used to edi the user
        // need api to check the name avialbelity
    }

    const joinApi = () => {
        router.push('lobby');
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
                    <input className={`h-10 w-[80%] text-2xl pl-4 rounded-xl ${jersey15.className} ${currentTheme.background} `} placeholder="Enter Room ID" type="text" />
                </div>

                
                <button onClick={()=>joinApi() } className={` h-[15%] w-[80%] rounded-xl flex items-center justify-center text-4xl ${jersey15.className} ${currentTheme.text} ${currentTheme.background} `}> Join Room </button>
                </div>
            </div>

        </div>
    )

}


export default JoinRoom;