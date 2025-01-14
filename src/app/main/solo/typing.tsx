import { useEffect, useState } from "react";
import { useTheme } from "@/app/theme";
import fetchSentence from "@/lib/sentenceProvider";

import { Courier_Prime } from 'next/font/google';

 const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

interface TypingProps {
    startTyping: () => void; 
    gameStatus : boolean,
    restartStatus : boolean,
    nextSentence : boolean,
    setNext:React.Dispatch<React.SetStateAction<boolean>>;
    isDialogOpen : boolean ;
    setDialogOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export const Typing: React.FC<TypingProps> = ({ startTyping , gameStatus , restartStatus ,nextSentence ,setNext , isDialogOpen , setDialogOpen}) => {

    const {currentTheme} = useTheme();
    
    const [sentence, setSentence] = useState("Type this sentence."); 
    const [inputStatus, setInputStatus] = useState<(null | 'correct' | 'wrong')[]>([]); 
    const [currIndex, setCurrIndex] = useState(0); 
    const [typingStarted, setTypingStarted] = useState(false); 

    const initTypingSetup = () => {

        let sen = sentence;
        console.log("nexu" , nextSentence)
        if(nextSentence){
             sen = fetchSentence()
        }
        setNext(false)
        setTypingStarted(false)
        setSentence(sen)
        setInputStatus(Array(sentence.length).fill(null)); 
        setCurrIndex(0); 

    };

    useEffect(() => {
        initTypingSetup();
    }, [sentence,restartStatus,nextSentence]);

    useEffect(()=>{
        // alert(gameStatus)
        if(gameStatus){
            let totalChar = 0
            let correct = 0
            const min = 15
            inputStatus.forEach(element => {
                if(element==='correct') correct++;
                if(element !=null) totalChar++;
            });

            console.log(calculateTypingStats(correct,totalChar,min))

            setDialogOpen(true)
            // set Real RESULT //


        }
    },[gameStatus])

    const keylogger = (event: KeyboardEvent) => {

        if (event.key === 'Backspace' && currIndex > 0) {
            setInputStatus((prev) => {
                const updatedStatus = [...prev];
                updatedStatus[currIndex - 1] = null; // Reset the previous character status
                return updatedStatus;
            });
            setCurrIndex(prev => prev - 1); // Move cursor backward
            return;
        }

        if (currIndex < sentence.length && event.key.length === 1) { 
            const isCorrect = event.key === sentence[currIndex]; 
            setInputStatus((prev) => {
                const updatedStatus = [...prev];
                updatedStatus[currIndex] = isCorrect ? 'correct' : 'wrong'; 
                return updatedStatus;
            });
            setCurrIndex(prev => prev + 1); // Move cursor forward
        }
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (!typingStarted && event.key.length === 1) {
                startTyping(); // Trigger the timer to start
                setTypingStarted(true); // Mark typing as started
            }
            keylogger(event); // Process the key press
        };

        document.addEventListener('keydown', handleKeyPress); // Use 'keydown' instead of 'keypress'

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [startTyping, typingStarted, currIndex]);

   

    const calculateTypingStats = (correctChars: number, totalCharsTyped: number, elapsedTimeInSeconds: number) => {

        const safeElapsedTime = Math.max(elapsedTimeInSeconds, 1); // Ensure at least 1 second
        const timeInMinutes = safeElapsedTime / 60;
    
        const wpm = timeInMinutes > 0 ? Math.floor((correctChars / 5) / timeInMinutes) : 0;
        const accuracy = totalCharsTyped > 0
            ? ((correctChars / totalCharsTyped) * 100).toFixed(2)
            : 0;
        const errors = totalCharsTyped - correctChars;
    
        return { wpm, accuracy, errors };
    };
    
      

    return (
        <div
          className={`text-2xl `}
          style={{
            textAlign: 'justify', 
            wordBreak: 'break-word', 
            lineHeight: '2', 
          }}
        >

          {sentence.split('').map((char, index) => (
            <span
              key={index}
              className={`${index === currIndex ? currentTheme.secondary : 'transparent'} ${courierPrime.className}   `}
              style={{
                color:
                  inputStatus[index] === 'correct'
                    ? 'green'
                    : inputStatus[index] === 'wrong'
                    ? 'red'
                    : 'black',
                textDecoration: inputStatus[index] === 'wrong' ? 'underline' : 'none',
              }}
            >
              {char}
            </span>
          ))}

        </div>
      );
      
};
