// import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { useTheme } from "@/app/theme";
import { useEffect, useState } from "react";
import { Schedule } from "@mui/icons-material";

import { Courier_Prime } from 'next/font/google';

 const courierPrime = Courier_Prime({
  weight: '700',
  subsets: ['latin'],
});

interface Itimer {
    time: {
        sec: number;
        min: number;
      },
      timerStatus : boolean,
      ResetTimer:boolean,
      setReset:React.Dispatch<React.SetStateAction<boolean>>;
      stopTimer:React.Dispatch<React.SetStateAction<boolean>>;
      gameStatusChanger : () => void;
}


export const Timer : React.FC<Itimer> = ({ time , timerStatus ,ResetTimer , setReset,stopTimer ,gameStatusChanger}) => {

    const [sec, setSec] = useState(time.sec);
    const [min,setMin]  = useState(time.min);
    const {currentTheme} = useTheme()

    useEffect(() => {

        setSec(time.sec);
        setMin(time.min);
        setReset(false)
        stopTimer(false)
      }, [ResetTimer]);

    useEffect(() => {
        setSec(time.sec);
        setMin(time.min);
      }, [time]);

      useEffect(() => {
        if (timerStatus) {
          const intervalId = setInterval(() => {
            if (sec === 0 && min === 0) {
              // alert("game over");
              gameStatusChanger()
              stopTimer(true);
              clearInterval(intervalId); // Stop the interval immediately
            } else if (sec === 0) {
              setMin((prev) => prev - 1);
              setSec(59);
            } else {
              setSec((prev) => prev - 1);
            }
          }, 1000);
      
          return () => clearInterval(intervalId);
        }
      }, [timerStatus, sec, min, stopTimer]);
      
      

    return (

        <div className={ ` ${currentTheme.secondary}  ${currentTheme.border} h-fit w-fit p-2 pl-4 pr-4 border rounded-2xl  `}>         

           <div className={`space-x-5 flex items-center justify-evenly font-bold ${currentTheme.text} `}>
            <Schedule sx={{ fontSize: 30 }} className={`${currentTheme.text}`} ></Schedule>
          
            <span className={`${courierPrime.className} ${currentTheme.text} text-2xl flex items-center`}>
                   {String(min).padStart(2, "0")} : {String(sec).padStart(2, "0")}
                 </span>
            </div> 
        </div>
    )
}