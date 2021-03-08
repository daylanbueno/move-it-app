
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox ( ) {

    const { activeChanllege, resetChallenge, completeChallenge } = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext)
    
    function handleChallengeCompleted() {
        completeChallenge()
        resetCountdown()
    }    

    function handleChallengeFailed () {
        resetCountdown()
        resetChallenge()
    }

    return (
        <div className={styles.challengeContainer}>

            {activeChanllege ? (
                <div  className={styles.chalegeAtive}>
                    <header>Ganhe {activeChanllege.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChanllege.type}.svg`} alt="body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChanllege.description}</p>
                    </main>
                    <footer>
                        <button 
                             type="button"
                             onClick={() => handleChallengeFailed()}
                             className={styles.challegeFailedButton}>
                                 Falhei
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChallengeCompleted()}
                            className={styles.challegeCompleteButton}>
                                Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challegeNotAtive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level-up"/>
                        Avance de level completado desafios
                    </p>
                </div>
            )}
        </div>
    )
}