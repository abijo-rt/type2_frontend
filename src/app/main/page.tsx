'use client';
import localFont from 'next/font/local'
const jersey15 = localFont({
  src: '../../../public/fonts/Jersey15-Regular.ttf', 
})

import { useTheme } from '../theme';
import Link from 'next/link';
import { initializeSocket } from '@/lib/socket';
import { useRouter } from 'next/navigation';

interface IcreateRoom {
  sucess : boolean ;
  roomDetils : {
    host : string 
    userLimit : number 
    user : [{id:string,username : string}]
    status: string 
    roomId : string 
    timer : {min : number ,   sec :number}
}
}


const Main = () => {

  const { currentTheme } = useTheme();

  const router = useRouter()

  const createRoom = () => {
      const socket = initializeSocket()

      socket.emit("create room" , (response: IcreateRoom  )=> {
       
        console.log(response)
        const serializedData = encodeURIComponent(JSON.stringify(response));
        router.push(`main/lobby?data=${serializedData}`);

      });
  }



  return (
  
          <div className={ `h-full flex items-center justify-center  w-screen ${currentTheme.background} ${jersey15.className} space-x-10 `}>

          <div className={`space-y-10 w-96 h-96 flex flex-col items-center justify-center rounded-2xl ${currentTheme.secondary} `}>
          <h1 className={`text-5xl  ${currentTheme.text}`} >Solo Player</h1>
          <div className='text-3xl hover:underline'><Link href="main/solo" className={`  ${currentTheme.text}`} >Start Typing</Link></div>
          <div className='text-3xl hover:underline'><Link href="main/multiplayer" className={`  ${currentTheme.text}`} >Pratice Mode</Link></div>
          </div>

          <div className={`space-y-10 w-96 h-96 flex flex-col items-center justify-center rounded-2xl ${currentTheme.secondary} `}>
          <h1 className={`text-5xl  ${currentTheme.text}`} >Multiplayer Player </h1>
          <div className='text-3xl hover:underline'><button onClick={()=>createRoom()} className= {`${currentTheme.text}`} >Create Room</button></div>
          {/* <div className='text-3xl hover:underline'><Link href="main/createRoom" className={`  ${currentTheme.text}`} >Create Room</Link></div> */}
          <div className='text-3xl hover:underline'><Link href="main/joinRoom" className={`  ${currentTheme.text}`} >Join Room</Link></div>
          </div>

      </div>
  );
};

export default Main;


  