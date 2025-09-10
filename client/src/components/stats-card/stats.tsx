import { useAppSelector } from '../../app/hooks/redux-hooks';
import { selectGameState } from '../pokemon-display/pokemonSlice';
import style from './statsStyles.module.css';

function StatsCard() {
  const gameState = useAppSelector(selectGameState);

  return (
    <>
      <div className={style.cardWrapper}>
        <p>{`Turns Count:${gameState.turnCount}`}</p>
        <p>{`Correct Answers:${gameState.correctAnswers}`}</p>
        <p>{`Wrong Answers:${gameState.wrongAnswers}`}</p>
      </div>
    </>
  );
}

export default StatsCard;
