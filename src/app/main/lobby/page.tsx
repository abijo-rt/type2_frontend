/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useTheme } from "@/app/theme";
import {  useSearchParams } from "next/navigation";
import localFont from "next/font/local";
import { AccountCircle, Badge, Group, Timer, Lock, Help, Person, AddCircle, RemoveCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"
import { customTosat } from "./Toast1";
import { changePlayerCount,  playerJoined, playerLimitChangeListener } from "./socket";
import { initializeSocket } from "@/lib/socket";

const jersey15 = localFont({
  src: "../../../../public/fonts/Jersey15-Regular.ttf",
});

interface IcreateRoom {
  sucess: boolean;
  roomDetils: {
    your_name: string
    host: string
    userLimit: number
    user: Array<{id: string, name: string}>
    status: string
    roomId: string
    timer: {min: number, sec: number}
  }
}

interface ILooby {
  your_name: string;
  roomHost: string;
  noOfPlayer: number;
  roomId: string;
  playerJoined: number;
  timer: {
    min: number,
    sec: number
  };
  playerDetails: Array<{name: string, id?: string}>;
}

const re_align = (
  playerJoined: number,
  playerLimit: number,
  playerDetails: Array<{name: string, id: string}>,
  context: string
) => {
  // console.log(`Re-align called from: ${context}`);
  // console.log("Input playerDetails:", playerDetails);
  
  const result = new Array(10).fill(null).map((_, index) => {
    if (index < playerJoined) {
      return {
        name: playerDetails[index]?.name || "ERROR",
        id: playerDetails[index]?.id || ""
      };
    } else if (index < playerLimit) {
      return { name: "UNKNOWN", id: "" };
    } else {
      return { name: "LOCK", id: "" };
    }
  });

  console.log("Result:", result);
  return result;
};

const Lobby = () => {
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const roomDataNew: IcreateRoom | null = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
  const socket = initializeSocket();
  const { toast } = useToast();
  const { currentTheme } = useTheme();

  // Initialize state with proper error handling
  const [roomData, setRoomData] = useState<ILooby>(() => {
    if (!roomDataNew) {
      throw new Error("Room data is required");
    }

    const { roomDetils } = roomDataNew;
    return {
      your_name: roomDetils.your_name,
      roomHost: roomDetils.host,
      noOfPlayer: roomDetils.userLimit,
      roomId: roomDetils.roomId,
      playerJoined: roomDetils.user.length,
      timer: roomDetils.timer,
      playerDetails: re_align(
        roomDetils.user.length,
        roomDetils.userLimit,
        roomDetils.user,
        "initialization"
      )
    };
  });

  useEffect(() => {
    const handlePlayerJoined = (players: Array<{id: string, name: string}>) => {
      setRoomData(prev => ({
        ...prev,
        playerJoined: players.length,
        playerDetails: re_align(
          players.length,
          prev.noOfPlayer,
          players,
          "socket update"
        )
      }));
      customTosat(1,toast)
    };

    const handlePlayerChange = (incrOrdecr : number) => {
        setRoomData(prev =>({
          ...prev,
          noOfPlayer : incrOrdecr
        }))
    }

    playerLimitChangeListener(handlePlayerChange)
    playerJoined(handlePlayerJoined);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLimitChange", handlePlayerChange);
    };
  }, []);


  return (
    <div className={`h-full w-full flex flex-row ${currentTheme.background}`}>
      <div className={`h-full w-[30%] p-8 ${jersey15.className} flex flex-col items-center justify-evenly`}>
        {/* Host details */}
        <div className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center`}>
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5">
            <AccountCircle sx={{ fontSize: 30 }} className={`text-xl ${currentTheme.text}`} />
            <p className="text-2xl">Room Host</p>
          </div>
          <div className="h-[60%] w-full flex items-center justify-center text-4xl">
            {roomData.roomHost}
          </div>
        </div>

        {/* Room details */}
        <div className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center`}>
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5">
            <Badge sx={{ fontSize: 30 }} className={`text-xl ${currentTheme.text}`} />
            <p className="text-2xl">Room ID</p>
          </div>
          <div className="h-[60%] w-full flex items-center justify-center text-4xl">
            {roomData.roomId}
          </div>
        </div>

        {/* Players details */}
        <div className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center`}>
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5">
            <Group sx={{ fontSize: 30 }} className={`text-xl ${currentTheme.text}`} />
            <p className="text-2xl">Players Joined</p>
          </div>
          <div className="h-[60%] w-full flex items-center justify-center text-4xl space-x-5">
            <div onClick={()=>changePlayerCount(false,roomData.noOfPlayer,roomData.playerDetails.length,roomData.roomId,toast)}>
              <RemoveCircle sx={{ fontSize: 40 }} className={`text-xl ${currentTheme.text}`} />
            </div>
            <span>{roomData.playerJoined} / {roomData.noOfPlayer}</span>
            <div onClick={()=>changePlayerCount(true,roomData.noOfPlayer,roomData.playerDetails.length,roomData.roomId,toast)}>
              <AddCircle sx={{ fontSize: 40 }} className={`text-xl ${currentTheme.text}`} />
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center`}>
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5">
            <Timer sx={{ fontSize: 30 }} className={`text-xl ${currentTheme.text}`} />
            <p className="text-2xl">Timer</p>
          </div>
          <div className="h-[60%] w-full flex items-center justify-center text-4xl">
            {roomData.timer.min} : {roomData.timer.sec}
          </div>
        </div>
      </div>

      {/* Player room */}
      <div className={`h-full w-[70%] pr-8 pb-14 pt-14`}>
        <div className={`h-full w-full rounded-xl ${currentTheme.secondary} ${jersey15.className}`}>
          <div className="h-[10%] w-full text-center text-4xl flex items-end justify-between pl-6 pr-6">
            <span>Player Room</span>
            <div>{roomData.your_name}</div>
          </div>

          {/* Player BOX */}
          <div className="h-[80%] w-full grid grid-cols-5 p-5 gap-5">
            {roomData.playerDetails.map((player, index) => (
              <div key={index} className={`h-full w-full rounded-xl flex flex-col ${currentTheme.primary}`}>
                {/* Player Icon */}
                <div className={`w-full h-[80%] flex items-center justify-center`}>
                  {player.name === "LOCK" ? (
                    <Lock sx={{ fontSize: 70 }} className={`text-xl ${currentTheme.text}`} />
                  ) : player.name === "UNKNOWN" ? (
                    <Help sx={{ fontSize: 70 }} className={`text-xl ${currentTheme.text}`} />
                  ) : (
                    <Person sx={{ fontSize: 70 }} className={`text-xl ${currentTheme.text}`} />
                  )}
                </div>

                {/* Player Name */}
                <div className={`w-full h-[20%] ${currentTheme.border} border-2 rounded-b-xl ${currentTheme.secondary} flex items-center justify-center`}>
                  {player.name === "LOCK" ? (
                    "Locked"
                  ) : (
                    <>{index + 1}. {player.name}</>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="h-[10%] w-full text-center text-4xl flex items-start justify-end pr-5 space-x-5">
            <Link 
              href="/main"
              className={`h-[80%] w-[20%] border-2 rounded-xl ${currentTheme.border} flex items-center justify-center`}
            >
              LEAVE ROOM
            </Link>

          {   roomData.roomHost === roomData.your_name &&
            <button 
              onClick={() => {
                customTosat(1, toast);
                console.log('Room Data:', roomDataNew);
              }}
              className={`h-[80%] w-[20%] border-2 rounded-xl ${currentTheme.border}`}
            >
              START
            </button>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;