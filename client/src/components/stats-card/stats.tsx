import { useAppSelector } from '../../app/hooks/redux-hooks';
import { selectGameState } from '../pokemon-display/pokemonSlice';
import styles from './statsStyles.module.css';

function StatsCard() {
  const gameState = useAppSelector(selectGameState);

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <span>Turns Count: </span>
          <span className={styles.turn}>{gameState.turnCount}</span>
          <br />
          <span>Correct Answers: </span>
          <span className={styles.correct}>{gameState.correctAnswers}</span>
          <br />
          <span>Wrong Answers: </span>
          <span className={styles.wrong}>{gameState.wrongAnswers}</span>
        </div>
      </div>
    </>
  );
}

export default StatsCard;
