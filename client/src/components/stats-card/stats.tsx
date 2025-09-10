import { useAppSelector } from '../../app/hooks/redux-hooks';
import { selectGameState } from '../pokemon-display/pokemonSlice';

function StatsCard() {
  const gameState = useAppSelector(selectGameState);

  return (
    <>
      <p>{`Turns Count:${gameState.turnCount}`}</p>
      <p>{`Correct Answers:${gameState.correctAnswers}`}</p>
      <p>{`Wrong Answers:${gameState.wrongAnswers}`}</p>
    </>
  );
}

export default StatsCard;
