"use client";
import { useSearchParams } from "next/navigation";
import { Typing } from "./canvas";
import { TrackBoard } from "./trackboard";
import { useTheme } from "@/app/theme";
import { useEffect, useState } from "react";

import localFont from "next/font/local";
const courierPrime = localFont({
  src: "../../../../../public/fonts/CourierPrime-Bold.ttf", // Adjust the path based on your font file location
});

const GameSpace = () => {
  const { currentTheme } = useTheme();
  const searchParams = useSearchParams();
  const gameDataString = searchParams.get("data");
  
  const gameData = gameDataString ? JSON.parse(decodeURIComponent(gameDataString)) : null;
  const [startTyping, setStartTyping] = useState(false);
  const [matchStartTimer, setStartTimer] = useState(5);

  useEffect(() => {

    if (!startTyping && matchStartTimer > 0) {
      const interval = setInterval(() => {
        setStartTimer((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    if (matchStartTimer == 0) {setStartTyping(true);
      console.log(gameData)
      console.log("Full search params:", searchParams.toString());
      console.log("gameDataString:", searchParams.get("data"));

    }

  }, [matchStartTimer, startTyping]);

  return (
    <div
      className={`w-full h-full ${currentTheme.background} flex flex-col items-center`}
    >
      {matchStartTimer != 0 && (
        <div className="h-full w-full fixed top-0 flex items-center">
          <p
            className={`backdrop-blur-lg w-full py-64 flex justify-center text-xl ${courierPrime.className} `}
          >
            MATCH START IN : {matchStartTimer}
          </p>
        </div>
      )}

      <div className="h-[85%] flex flex-col items-center">
        <div className="w-[60%] h-[80%] flex justify-center items-center">
          <Typing sentence={gameData?.sentence || "Default sentence"}startTyping={startTyping} roomid={gameData.roomData.roomId} />
        </div>
        <div className="w-[80%] h-[20%] flex justify-center items-center">
          <TrackBoard noOfPlayer = {gameData.roomData.playerJoined} len={gameData.sentence.length}></TrackBoard>
        </div>
      </div>
    </div>
  );
};

export default GameSpace;
