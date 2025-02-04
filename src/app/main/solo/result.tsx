import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "../../theme";
import React, { useEffect } from "react";
const jersey15 = localFont({
  src: '../../../../public/fonts/Jersey15-Regular.ttf', // Adjust the path based on your font file location

})
// import localFont from "next/font/local";
// import { Courier_Prime } from 'next/font/google';

//  const courierPrime = Courier_Prime({
//   weight: '700',
//   subsets: ['latin'],
// });

import localFont from 'next/font/local'
const courierPrime = localFont({
  src: '../../../../public/fonts/CourierPrime-Regular.ttf', // Adjust the path based on your font file location

})

interface IResult {
    result: {
        WPM: number;
        Accuracy: number;
        Error: number;
    };
    restart: () => void;
    next: () => void;
    isDialogOpen : boolean
    setDialogOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

export const Result: React.FC<IResult> = ({ result, restart, next ,setDialogOpen ,isDialogOpen}) => {
    const { currentTheme } = useTheme();


    useEffect(()=>{
        if(isDialogOpen){
            openDialog()
            setDialogOpen(false)
        }
    },[setDialogOpen])

    // Function to open the dialog
    const openDialog = () => setDialogOpen(true);

    // Function to close the dialog
    const closeDialog = () => setDialogOpen(false);

    return (
        <>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <button
                        className="hidden"
                        aria-hidden="true"
                    >
                        Open Dialog
                    </button>
                </DialogTrigger>
                <DialogContent className={`${currentTheme.background}`}>
                    <DialogHeader>
                        <DialogTitle className={` font-semibold ${courierPrime.className} ${currentTheme.text} ` }>
                            RESULT
                        </DialogTitle>

                        <div className={`${jersey15.className}`}>
                            <p className="text-8xl" >WPM: {result.WPM}</p>
                           <div className="flex space-x-3"> <p className="text-5xl" >Accuracy: {String(result.Accuracy.toFixed(0))}%</p> <p className="text-5xl">|</p>
                            <p className="text-5xl">Errors: {result.Error}</p></div>
                        </div>

                        <div className="flex w-full justify-evenly space-x-4">
                            <button
                                onClick={restart}
                                className={` px-4 py-2 font-bold ${courierPrime.className} ${currentTheme.secondary} rounded-lg`}
                            >
                                Restart
                            </button>
                            <button
                                onClick={() => {
                                    closeDialog();
                                    next();
                                }}
                                className={`px-4 py-2 ${courierPrime.className} ${currentTheme.secondary} text-black  rounded-lg`}

                            >
                                Next
                            </button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
