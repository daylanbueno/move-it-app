import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    secods: number;
    hasFinished: boolean;
    isActive: boolean;
    startContdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}


export const CountdownContext = createContext({}  as CountdownContextData)

export function CountdownProvider ( { children }: CountdownProviderProps ) {

    let contdownTimeout: NodeJS.Timeout; // cancleando executção setTimeOut

    const tempoDesafio = 0.1*60
    

    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] =  useState(tempoDesafio);
    const [isActive, setAtive] = useState(false)
    const [hasFinished, setHasfinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const secods = time % 60;

    function startContdown () {
        setAtive(true)
    }

    function resetCountdown () {
        clearTimeout(contdownTimeout) // cancleando executção setTimeOut
        setAtive(false)
        setTime(tempoDesafio)
        setHasfinished(false)
    }

    useEffect(() => {
        if(isActive && time > 0) {
            contdownTimeout =   setTimeout(() => {
                setTime(time -1)
            },1000)
        } else if (isActive && time === 0) {
            setHasfinished(true)
            setAtive(false)
            startNewChallenge()
        }
    },[isActive, time, startNewChallenge])

    return (
        <CountdownContext.Provider
         value={{
            minutes,
            secods,
            hasFinished,
            isActive,
            startContdown,
            resetCountdown
         }}> 
            {children}
        </CountdownContext.Provider>
    )
} 