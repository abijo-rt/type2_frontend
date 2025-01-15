"use client"
import { useTheme } from "@/app/theme";
import { Add, Edit, Groups2, Person, Remove  } from "@mui/icons-material";


import localFont from 'next/font/local'
import { useRouter } from "next/navigation";
import { useState } from "react";

const jersey15 = localFont({
  src: '../../../../public/fonts/Jersey15-Regular.ttf', 
})

const CreateRoom = () => {

    const { currentTheme } = useTheme()
    const [noOfPlayer , setNoOfPlayer] = useState(2);

    const router = useRouter()

    const joinApi = () => {
        router.push('lobby');
    }

    const incr =()=>{
        if(noOfPlayer===10) return
        setNoOfPlayer(noOfPlayer+1)
    }
    const decr =()=>{
        if(noOfPlayer===2) return
        setNoOfPlayer(noOfPlayer-1)
    }

    return (
        <div className={`h-full w-full flex items-center justify-center ${currentTheme.background} `}>

            <div className={`rounded-2xl  ${currentTheme.secondary} h-96 w-96`} >

                <p className={`h-[15%] w-full flex items-center justify-center text-4xl ${jersey15.className} ${currentTheme.text}`} >
                    CREATE ROOM
                </p>

                <div className="h-[85%] flex flex-col justify-evenly items-center">   

                    <div className={` w-[80%] h-[15%] flex items-center rounded-xl  `}>
                        <Person sx={{ fontSize: 60 }} className={` text-xl ${currentTheme.text}`} />

                        <div className={`flex w-82 size-fit ${currentTheme.primary} rounded-xl`} >
                        <input className={`h-10 w-[80%] text-2xl pl-2 rounded-l-xl ${jersey15.className} ${currentTheme.background} `} type="text" />
                        <div onClick={()=>incr()} className=" h-10 w-[20%] flex items-center justify-center"  ><Edit sx={{ fontSize: 35 }} className={` text-xl ${currentTheme.text}`} /></div>

                        </div>
                    </div>
                    <div className={` w-[80%] h-[13%] flex items-center rounded-xl justify-between space-x-2 `}>

                        <Groups2 sx={{ fontSize: 55 }} className={` text-xl ${currentTheme.text}`} />
                        <div className= {`${currentTheme.primary} w-[80%] h-full  flex items-center rounded-xl justify-between `} >
                        <div onClick={()=>decr() } > <Remove sx={{ fontSize: 40 }} className={` text-xl ${currentTheme.text}`} /></div>
                        <div className={`text-2xl h-full w-[60%] flex items-center justify-center ${jersey15.className} ${currentTheme.text}  ${currentTheme.background} `}>{noOfPlayer}</div>
                        <div onClick={()=>incr() } ><Add sx={{ fontSize: 40 }} className={` text-xl ${currentTheme.text}`} /></div>

                    </div>

                </div>
                <button onClick={()=>{joinApi()}} className={`h-[15%] w-[80%] rounded-xl flex items-center justify-center text-4xl  ${jersey15.className} ${currentTheme.text} ${currentTheme.background} `}> Create Room </button>
                </div>
            </div>

        </div>
    )

}


export default CreateRoom;