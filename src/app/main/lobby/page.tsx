"use client";
import { useTheme } from "@/app/theme";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { AccountCircle, Badge, Group, Timer, Lock, Help, Person } from "@mui/icons-material";
import { useState } from "react";

const jersey15 = localFont({
  src: "../../../../public/fonts/Jersey15-Regular.ttf",
});

interface ILooby {
  roomHost: string;
  noOfPlayer: number;
  roomId: string;
  playerJoined: number;
  playerDetails: { name: string }[];
}

const intiliaseData: ILooby = {
  roomHost: "DEVA ABIJO",
  noOfPlayer: 5,
  roomId: "ADCGTH",
  playerJoined: 1,
  playerDetails: [
    { name: "DEVA ABIJO R T" },
    { name: "UNKOWN" },
    { name: "UNKOWN" },
    { name: "UNKOWN" },
    { name: "UNKOWN" },
    { name: "LOCK" },
    { name: "LOCK" },
    { name: "LOCK" },
    { name: "LOCK" },
    { name: "LOCK" },
  ],
};

const Lobby = () => {
  const router = useRouter();

  // if (!router.isReady) {
  //     return <div>Loading...</div>;
  //   }
  // return <div>{router.query.name}</div>;

  const [roomData, setRoomData] = useState<ILooby>(intiliaseData);

  const { currentTheme } = useTheme();

  return (
    <div className={`h-full w-full flex flex-row ${currentTheme.background} `}>
      <div
        className={`h-full w-[30%]  p-8 ${jersey15.className} flex flex-col items-center justify-evenly`}
      >
        <div
          className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center  `}
        >

          {/* Host details */}
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5 ">
            <AccountCircle
              sx={{ fontSize: 30 }}
              className={` text-xl ${currentTheme.text}` }
              />
            <p className="text-2xl">Room Host </p>
          </div>
          <div className=" h-[60%] w-full flex items-center justify-center text-4xl ">
            {" "}
            {roomData.roomHost}{" "}
          </div>
        </div>
        <div
          className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center  `}
          >

          {/* Room details */}
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5 ">
            <Badge
              sx={{ fontSize: 30 }}
              className={` text-xl ${currentTheme.text}`}
            />
            <p className="text-2xl">Room ID </p>
          </div>
          <div className=" h-[60%] w-full flex items-center justify-center text-4xl ">
            {" "}
            {roomData.roomId}{" "}
          </div>
        </div>
        <div
          className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center  `}
        >
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5 ">
            <Group
              sx={{ fontSize: 30 }}
              className={` text-xl ${currentTheme.text}`}
            />
            <p className="text-2xl"> Players Joined </p>
          </div>
          <div className=" h-[60%] w-full flex items-center justify-center text-4xl ">
            {" "}
            {roomData.playerJoined} / {roomData.noOfPlayer}{" "}
          </div>
        </div>
        <div
          className={`${currentTheme.secondary} w-full h-[20%] rounded-xl flex flex-col justify-center items-center  `}
        >
          <div className="w-full h-[40%] rounded-xl flex flex-row justify-center items-end space-x-5 ">
            <Timer
              sx={{ fontSize: 30 }}
              className={` text-xl ${currentTheme.text}`}
            />
            <p className="text-2xl"> Timer </p>
          </div>
          <div className=" h-[60%] w-full flex items-center justify-center text-4xl ">
            {" "}
            DEVA ABIJO R T{" "}
          </div>
        </div>
      </div>
      <div className={` h-full w-[70%]  pr-8 pb-14 pt-14  `}>
        <div
          className={`h-full w-full rounded-xl ${currentTheme.secondary} ${jersey15.className}  `}
        >
          <div className="h-[10%] w-full text-center  text-4xl flex items-center justify-center ">
            {" "}
            Player Room{" "}
          </div>

          {/* Player BOX */}
          <div className="h-[80%] w-full grid grid-cols-5 p-5 gap-5">

            {roomData.playerDetails.map((player, index) => (
              <div
                key={index}
                className={` h-full w-full rounded-xl flex flex-col  ${currentTheme.primary}`}
              >

                {/*Player Icon*/}
                <div className={` w-full h-[80%] flex items-center justify-center`}>

                {player.name === "LOCK" ? (
                       <Lock sx={{ fontSize: 70 }}    className={` text-xl ${currentTheme.text}`}  />
                      ) : player.name === "UNKOWN" ? (
                        <Help sx={{ fontSize: 70 }}    className={` text-xl ${currentTheme.text}`}  /> 
                      ) : (
                    <Person sx={{ fontSize: 70 }}    className={` text-xl ${currentTheme.text}`}  /> 
                )}

                </div>

                {/*Player Icon*/}
                <div
                  className={` w-full h-[20%] ${currentTheme.border} border-2 rounded-b-xl ${currentTheme.secondary} flex items-center justify-center `}
                >
                  {player.name === "LOCK" ? (
                    "Locked"
                  ) : (
                    <>
                      {" "}
                      {index + 1}. {player.name}{" "}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="h-[10%] w-full text-center  text-4xl flex items-start justify-end pr-5 space-x-5 ">
            <button
              className={`h-[80%] w-[20%] border-2 rounded-xl ${currentTheme.border}`}
            >
              {" "}
              LEVAE ROOM{" "}
            </button>
            <button
              className={`h-[80%] w-[20%] border-2 rounded-xl ${currentTheme.border}`}
            >
              {" "}
              START{" "}
            </button>
          </div>

          {/* This need to be filled  with player joined */}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
