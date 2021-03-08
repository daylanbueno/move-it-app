import { createContext, ReactNode, useEffect, useState } from 'react'

import challenges from '../../challenges.json';

interface challenge {
    type: 'body' | 'eye';
    description: string,
    amount: number,
}

interface ChallengsContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChanllege: challenge,
    experienceToNextLevel: number;
    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengsContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {
    
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChanllege, setAtiveChallenge] =useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randomChallengeIndex];

        setAtiveChallenge(challenge)

        if(Notification.permission === 'granted') {
            new Notification('novo desafio', {
                body: `Valento ${challenge.amount}xp`
            })
            new Audio('/notification.mp3').play()
        }
    }

    function levelUp () {
        setLevel(level + 1)
    }

    function resetChallenge () {
        setAtiveChallenge(null)
    }
    

    function completeChallenge () {
        if(!activeChanllege) {
            return;
        }

        const {  amount } =  activeChanllege;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience =  finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalExperience)
        setAtiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level,
                levelUp,
                currentExperience,
                challengesCompleted ,
                startNewChallenge,
                activeChanllege,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge
             }}>
            {children}
        </ChallengesContext.Provider>
    )
}