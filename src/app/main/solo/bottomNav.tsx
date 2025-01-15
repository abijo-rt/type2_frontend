import { useTheme } from "@/app/theme";
import {  ChevronLeft, KeyboardDoubleArrowRight ,ChevronRight
  , Replay, 
  Home} from "@mui/icons-material";

import { Courier_Prime } from 'next/font/google';
import Link from "next/link";

 const courierPrime = Courier_Prime({
  weight: '700',
  subsets: ['latin'],
});



interface Ibnav {
    timer:{
        sec:number,
        min:number
    }
    setTime : (flag:number) => void;
    nextTyping: () => void; 
    resetTyping: () => void; 
}

export const Bnav  : React.FC<Ibnav> = ({setTime,timer,nextTyping,resetTyping}) => {
    

   const { currentTheme } = useTheme();

    return (
      <div className="flex space-x-4">
           <div className={`${currentTheme.border} ${currentTheme.secondary} flex justify-evenly items-center space-x-5 h-fit w-fit p-2 pl-4 pr-4 border rounded-2xl`}>
           <div onClick={()=>resetTyping()}>
                <Link href="/main"> <Home sx={{ fontSize: 30 }} className={`${currentTheme.text}`} /></Link>
               </div>
           </div>


             <div className={`${currentTheme.border} ${currentTheme.secondary} flex justify-evenly items-center space-x-5 h-fit w-fit p-2 pl-4 pr-4 border rounded-2xl`}>
           
               <div onClick={()=>resetTyping()}>
                 <Replay sx={{ fontSize: 30 }} className={`${currentTheme.text}`} />
               </div>

               <div className="flex h-fit w-fit ">
                 <div onClick={() => setTime(0)}>
                   <ChevronLeft sx={{ fontSize: 30 }} className={`${currentTheme.text} `} />
                 </div>
                 <span className={`${currentTheme.text} text-2xl flex items-center font-bold ${courierPrime.className}`}>
                   {String(timer.min).padStart(2, "0")} : {String(timer.sec).padStart(2, "0")}
                 </span>
                 <div onClick={() => setTime(1)}>
                   <ChevronRight sx={{ fontSize: 30 }} className={`${currentTheme.text}`} />
                 </div>
               </div>

              <div onClick={()=>nextTyping()}> <KeyboardDoubleArrowRight sx={{ fontSize: 30 }} className={`${currentTheme.text}`}></KeyboardDoubleArrowRight></div>
             
             </div>

             </div>
           );
}

