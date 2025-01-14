import { useTheme } from "@/app/theme";
import { ArrowRightAlt, ChevronLeft, ChevronRight, Replay } from "@mui/icons-material";


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
             <div className={`${currentTheme.border} ${currentTheme.secondary} flex justify-evenly items-center space-x-5 h-fit w-fit p-2 pl-4 pr-4 border rounded-2xl`}>
           
               <div onClick={()=>resetTyping()}>
                 <Replay sx={{ fontSize: 30 }} className={`${currentTheme.text}`} />
               </div>

               <div className="flex h-fit w-fit ">
                 <div onClick={() => setTime(0)}>
                   <ChevronLeft sx={{ fontSize: 30 }} className={`${currentTheme.text} `} />
                 </div>
                 <span className={`${currentTheme.text} text-2xl flex items-center font-bold`}>
                   {String(timer.min).padStart(2, "0")} : {String(timer.sec).padStart(2, "0")}
                 </span>
                 <div onClick={() => setTime(1)}>
                   <ChevronRight sx={{ fontSize: 30 }} className={`${currentTheme.text}`} />
                 </div>
               </div>

              <div onClick={()=>nextTyping()}> <ArrowRightAlt sx={{ fontSize: 30 }} className={`${currentTheme.text}`}></ArrowRightAlt></div>
             
             </div>
           );
}

