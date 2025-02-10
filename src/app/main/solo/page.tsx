"use client";

import { useState } from "react";

// import { useRef, useState } from 'react';
import { useTheme } from '../../theme';
import { Timer } from "./timer";
import { Typing } from "./typing";
import { Bnav } from "./bottomNav";
import { Result } from "./result";


const initresult = {
  WPM: 0,
  Accuracy: 0,
  Error: 0
}


const Solo = () => {

  const { currentTheme } = useTheme();
  const [timer,setTimer] = useState({sec:0,min:1})
  const [timerStatus,SetTimerStatus] = useState(false)
  const [resetTimerStatus,SetResetTimerStatus] = useState(false)
  const [nextStatus,SetNextStatus] = useState(true)
  const [gameOver,setGameOver] = useState(false)
  const [showResult , setShowResult] = useState(false)
  const [result , setResult] = useState(initresult)

  const startTyping = () => {
    SetTimerStatus(true)
  }
  
  const resetTyping = () => {
    SetResetTimerStatus(!resetTimerStatus)
    SetTimerStatus(false)
    setShowResult(false)
    setGameOver(false)
  }
  
  const gameStatus =()=> {
    setGameOver(true)
  }
  
  // setShowResult(false)
  
  const nextTyping = () => {
    SetTimerStatus(false)
    SetNextStatus(true)
    SetResetTimerStatus(!resetTimerStatus)
    setShowResult(false)
    setGameOver(false)
  }
  
  const setTime = (flag: number) => {
    // flag = 1 for incrementing, flag = 0 for decrementing
    setTimer(prevState => {
      if (flag === 1) {
        let newSec = prevState.sec + 15;
        let newMin = prevState.min;
        
        if (newSec >= 60) {
          newMin += Math.floor(newSec / 60); 
          newSec = newSec % 60; 
        }
  
        return { min: newMin, sec: newSec }; 
      } else {
        let newSec = prevState.sec - 15;
        let newMin = prevState.min;
        
        if (newSec < 0) {
          newMin -= 1; 
          newSec = 60 + newSec; 
        }
        if (newMin < 0) newMin = 0;
        return { min: newMin, sec: newSec }; 
      }
    });

    console.log(timer)
  };
  
 

  return (
    <div className={`w-full h-full ${currentTheme.background} flex flex-col items-center`}>
           <div className="h-[85%] flex flex-col  items-center">
            <div className="h-[20%]"> <Timer gameStatusChanger={gameStatus} time={timer} timerStatus = {timerStatus} ResetTimer = { resetTimerStatus} setReset={SetResetTimerStatus} stopTimer = {SetTimerStatus}/></div>
             <div className="w-[60%] h[20%]"><Typing setResult={setResult} startTyping={startTyping} gameStatus={gameOver} restartStatus={resetTimerStatus} nextSentence={nextStatus} setNext={SetNextStatus} setDialogOpen = {setShowResult} isDialogOpen={showResult} /> </div>
            <Result restart={resetTyping} next={nextTyping} result = {result} setDialogOpen = {setShowResult} isDialogOpen={showResult}></Result>
           </div>
            <Bnav setTime = {setTime} timer={timer} nextTyping={nextTyping} resetTyping={resetTyping} /> 
         </div>
  )


}

export default Solo ;