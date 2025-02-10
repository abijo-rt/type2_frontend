import { useEffect, useRef, useState } from "react";
import { playerWpmUpdater } from "./socket";
import localFont from "next/font/local";

const jersey15 = localFont({
  src: '../../../../../public/fonts/Jersey15-Regular.ttf', 
})

interface Iuser {
  id: string;
  name: string;
  wpm: number;
}

interface wrpI {
  noOfPlayer: number;
  len: number;
}

const playerColor = ["#578FCA",
  "#FFCCE1",
  "#00FF9C",
  "#FFE700",
  "#E5D9F2",
  "#FF8A8A",
  "#7743DB",
  "#FEFFAC",
  "#n-300",
  "#n-300",
  "#n-300",
  "#n-300",
]

export const TrackBoard: React.FC<wrpI> = ({ noOfPlayer, len }) => {

  const [x, setX] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [userList, setUserList] = useState<number[]>(() => {
    return new Array(noOfPlayer).fill(0);
  });

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    playerWpmUpdater((data: Iuser[]) => {
      
      const newArray = userList.map((val , index)=>{
          return data[index].wpm
      })
      setUserList(newArray);

      console.log(data)

    });
  }, []);

  useEffect(()=>{
    console.log(left);
    console.log(top)
  },[top,left])

  useEffect(() => {
    if (trackRef.current) {
      const newTop = trackRef.current.offsetHeight / noOfPlayer - 2;
      const newLeft = trackRef.current.offsetWidth / len;
      setLeft(newLeft);
      setTop(newTop);
      console.log( " no of plauer " + noOfPlayer)
      console.log(newTop)
      console.log(newLeft)
    }
  }, [noOfPlayer, len]);

  return (
    <div ref={trackRef} className="relative w-full h-full bg-black flex items-center justify-evenly transform skew-x-12 overflow-hidden ">
     
      {userList.map((item, index) => (
        <div
          key={index}
          className={`absolute rounded-full size-10  transition-all duration-1000 linear`}
          style={{ left: `${userList[index]*left}px`, top: `${top * index}px` , backgroundColor : `${playerColor[index]}`}}
        >
          
        </div>
      ))}

<div className={`bg-white w-[5%] h-full flex items-center justify-center text-3xl ${jersey15.className} ` }>
        <span className="rotate-90 text-black" >START</span>
      </div>

    <div className=" flex items-center justify-evenly w-[90%] h-full">

      <div className="w-[10%] bg-white text-white flex items-center justify-center">.</div>
      <div className="w-[10%] bg-white text-white flex items-center justify-center">.</div>
      <div className="w-[10%] bg-white text-white flex items-center justify-center">.</div>
      <div className="w-[10%] bg-white text-white flex items-center justify-center">.</div>
      <div className="w-[10%] bg-white text-white flex items-center justify-center">.</div>
      <div className="w-[10%] bg-white text-white flex items-center justify-center">.</div>
    </div>
    
      <div className={`bg-white w-[5%] h-full flex items-center justify-center text-3xl ${jersey15.className} ` }>
        <span className="rotate-90 text-black" >FINISH</span>
      </div>
    </div>
  );
};