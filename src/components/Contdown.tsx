import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown () {

    const { minutes, secods, hasFinished, isActive, resetCountdown, startContdown } = useContext(CountdownContext)
    
    const [minuteLeft, minuteRight]  = String(minutes).padStart(2, '0').split('')
    const [secodLeft, secodRight]  = String(secods).padStart(2, '0').split('')

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secodLeft}</span>
                    <span>{secodRight}</span>
                </div>
            </div>

            {hasFinished ? (
                   <button 
                    disabled
                    className={styles.countdownButton}>
                        Ciclo encerrado <img src="icons/check-circle.svg" alt="check"/>
                  </button>
            ): (
                <>
                    { isActive  ? (
                        <button 
                        type="button"
                        onClick={resetCountdown}
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                        Abodonar o ciclo
                    </button>
                    ) : (
                        <button 
                            type="button"
                            onClick={startContdown}
                            className={styles.countdownButton}>
                                Iniciar um ciclo
                        </button>
                    )}
                </>
            )}
           
        </div>
        
    )
}