import { ExepecienceBar } from "../components/ExperienceBar";
import { Profile } from "./Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Contdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <ExepecienceBar/>

      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges/>
          <Countdown/>
        </div>
        <div>
          <ChallengeBox/>
        </div>
      </section>
      </CountdownProvider>
     </div>
  )
}
