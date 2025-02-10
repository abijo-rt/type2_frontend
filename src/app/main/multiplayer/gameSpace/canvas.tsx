import { useEffect, useState } from "react";
import { useTheme } from "@/app/theme";



import localFont from 'next/font/local'
import { updateWpm } from "./socket";
const courierPrime = localFont({
  src: '../../../../../public/fonts/CourierPrime-Bold.ttf', // Adjust the path based on your font file location

})

// interface TypingProps {
//     startTyping: () => void; 
//     gameStatus : boolean,
//     restartStatus : boolean,
//     nextSentence : boolean,
//     setNext:React.Dispatch<React.SetStateAction<boolean>>;
//     isDialogOpen : boolean ;
//     setDialogOpen : React.Dispatch<React.SetStateAction<boolean>>
//     setResult : React.Dispatch<React.SetStateAction<{
//         WPM: number;
//         Accuracy: number;
//         Error: number;
//     }>>
// }

interface TypingProps { 

    sentence : string
    startTyping : boolean
    roomid : number
}

export const Typing: React.FC<TypingProps> = ({sentence , startTyping , roomid }) => {

    const {currentTheme} = useTheme();
    

    const [inputStatus, setInputStatus] = useState<(null | 'correct' | 'wrong')[]>([]); 
    const [currIndex, setCurrIndex] = useState(0); 
    const [typingStarted, setTypingStarted] = useState(false); 
    const [totalCharsTyped, setTottalCharTyped] = useState(0); 
    const [totalCorrect, setTotalCorrect] = useState(0); 

    

    const initTypingSetup = () => {

        if(startTyping) setTypingStarted(true);

        setInputStatus(Array(sentence.length).fill(null)); 
        setCurrIndex(0); 

    };

    useEffect(() => {
        initTypingSetup();
    }, [startTyping]);

  
    
    // useEffect(()=>{
        // alert(gameStatus)
        // if(gameStatus){
        //     let totalChar = 0
        //     let correct = 0
        //     const min = 15
        //     inputStatus.forEach(element => {
        //         if(element==='correct') correct++;
        //         if(element !=null) totalChar++;
        //     });

        //     const { wpm, accuracy, errors } = calculateTypingStats(correct,totalChar,min)

        //     setResult({
        //         WPM: wpm,
        //         Accuracy: accuracy, // Convert string to a number if needed
        //         Error: errors,
        //     });

           
        //  initTypingSetup();
        //     setDialogOpen(true)
        // }
    // },[gameStatus])

    const keylogger = (event: KeyboardEvent) => {
      if (event.key === 'Backspace' && currIndex > 0) {
          setInputStatus((prev) => {
              const updatedStatus = [...prev];
              updatedStatus[currIndex - 1] = null;                // Reset the previous character status
              return updatedStatus;
          });
          setCurrIndex(prev => prev - 1);                        // Move cursor backward
          setTottalCharTyped(prev => Math.max(prev - 1, 0));     // Decrement total typed chars
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
          setTottalCharTyped(prev => prev + 1); // Count every key press
          if (isCorrect) {
              setTotalCorrect(prev => prev + 1); // Only count correct ones
          }
      }
          let correct = 0
          let totalChar = 0
           inputStatus.forEach(element => {
                if(element==='correct') correct++;
                if(element !=null) totalChar++;
            });

            const { wpm, accuracy, errors } = calculateTypingStats(correct,totalChar,15)

            updateWpm({correct,roomid})
  };
  

    useEffect(() => {

        const handleKeyPress = (event: KeyboardEvent) => {
            if(!typingStarted) return;
            keylogger(event); // Process the key press
        };

        document.addEventListener('keydown', handleKeyPress); 

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [ typingStarted, currIndex]);

   

    const calculateTypingStats = (correctChars: number, totalCharsTyped: number, elapsedTimeInSeconds: number) => {

        const safeElapsedTime = Math.max(elapsedTimeInSeconds, 1); // Ensure at least 1 second
        const timeInMinutes = safeElapsedTime / 60;
    
        const wpm = timeInMinutes > 0 ? Math.floor((correctChars / 5) / timeInMinutes) : 0;
        const accuracy = totalCharsTyped > 0
            ? ((correctChars / totalCharsTyped) * 100)
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
