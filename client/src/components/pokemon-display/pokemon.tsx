import { useGet151Query } from '../../store/api/apiSlice';
import { useState, type ReactElement, useEffect, useRef } from 'react';
import styles from './pokemonStyle.module.css';
import {
  incrementCorrect,
  incrementTurn,
  incrementWrong,
  selectGameState,
} from './pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux-hooks';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Pokemon() {
  const [pokeIndex, setPokeIndex] = useState<null | number>(null);

  const dispatch = useAppDispatch();

  const gameState = useAppSelector(selectGameState);

  let pokemonDisplay: ReactElement | null = null;
  //Use only for updating what is seen in text box
  const [userInput, setUserInput] = useState('');

  const { data, isError } = useGet151Query(pokeIndex, {
    skip: pokeIndex === null,
  });

  const [backgroundColor, setBackgroundColor] = useState('normalBK');

  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  // [] Use turn count vs the right vs wrong count to see if user has guessed on this pokemon yet
  // [] Only increment right or wrong answers with don't know button or submit button
  // [] Make sure to only change right and wrong count on first guess
  // [] move if statements from function body into the return statement
  // [] add proper styling to component

  //Gets
  useEffect(() => {
    setPokeIndex(getRandomPokemon());
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (gameState.correctAnswers + gameState.wrongAnswers !== gameState.turnCount) {
      if (userInput.toLowerCase() === data.species.name) {
        setBackgroundColor('greenBK');
        setIsCorrect(true);
        dispatch(incrementCorrect());
      } else if (userInput.toLowerCase() !== data.species.name) {
        setBackgroundColor('redBK');
        setIsCorrect(false);
        dispatch(incrementWrong());
        setUserInput(data?.species.name);
      }
    }
  }

  function handleDontKnow() {
    if (gameState.correctAnswers + gameState.wrongAnswers !== gameState.turnCount) {
      setUserInput(data?.species.name);
      setBackgroundColor('redBK');
      setIsCorrect(false);
      dispatch(incrementWrong());
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(() => event.target.value);
  }
  //use effect or ref
  function getRandomPokemon() {
    const pokemonIndex = Math.floor(Math.random() * 151 + 1);
    return pokemonIndex;
  }

  if (gameState.correctAnswers + gameState.wrongAnswers !== gameState.turnCount) {
    if (isError) {
      pokemonDisplay = <FaExclamationTriangle />;
    } else if (data) {
      pokemonDisplay = (
        <img
          src={data?.sprites?.front_shiny}
          className={styles.imgCover}
        />
      );
    }
  }

  if (gameState.correctAnswers + gameState.wrongAnswers === gameState.turnCount) {
    if (isCorrect === true) {
      pokemonDisplay = (
        <img
          src={data?.sprites?.front_shiny}
          className={styles.defaultImgClass}
        />
      );
    } else if (isCorrect === false) {
      pokemonDisplay = (
        <img
          src={data?.sprites?.front_shiny}
          className={styles.defaultImgClass}
        />
      );
    } else {
      pokemonDisplay = (
        <img
          src={data?.sprites?.front_shiny}
          className={styles.imgCover}
        />
      );
    }
  }

  return (
    <>
      <div className={styles.componentContainer}>
        <div className={styles[backgroundColor]}>
          {pokemonDisplay}
          <form
            onSubmit={handleSubmit}
            id='Search'
            className={styles.pokemonSearch}
          >
            <input
              value={userInput as string}
              onChange={handleInputChange}
              type='text'
              placeholder='Enter Pokemon Name'
            ></input>
            <button className={styles.submitButton}>Submit</button>
          </form>
          <div className={styles.optionsContainer}>
            <button
              onClick={() => {
                setUserInput('');
                setPokeIndex(getRandomPokemon());
                setBackgroundColor('normalBK');
                setIsCorrect(null);
                dispatch(incrementTurn());
              }}
            >
              next
            </button>
            <button onClick={handleDontKnow}>I don't know</button>
          </div>
        </div>
      </div>
    </>
  );
}
