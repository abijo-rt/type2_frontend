"use client"

import {useTheme} from "../../theme"

const  Multi =() => {
    const { currentTheme, theme, changeTheme } = useTheme();

    return (
        <div className={`w-full h-full ${currentTheme.background}`}>
            Multi
        </div>
    )
    
    }
    
    
export default Multi;