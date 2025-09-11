import { useGet151Query } from '../../store/api/apiSlice';
import { useState, type ReactElement, useEffect } from 'react';
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
  const { turnCount, correctAnswers, wrongAnswers } = useAppSelector(selectGameState);
  let pokemonDisplay: ReactElement | null = null;
  const [userInput, setUserInput] = useState('');
  const { data, isError } = useGet151Query(pokeIndex, {
    skip: pokeIndex === null,
  });
  const [backgroundColor, setBackgroundColor] = useState('normalBK');
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  const answerCount = correctAnswers + wrongAnswers;

  useEffect(() => {
    setPokeIndex(getRandomPokemon());
  }, [turnCount]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isCorrect === null) {
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
    if (isCorrect === null) {
      setUserInput(data?.species.name);
      setBackgroundColor('redBK');
      setIsCorrect(false);
      dispatch(incrementWrong());
    }
  }

  function handleNextClick() {
    if (answerCount === turnCount && isCorrect !== null) {
      setUserInput('');
      dispatch(incrementTurn());
      setIsCorrect(null);
      setBackgroundColor('normalBK');
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(() => event.target.value);
  }

  function getRandomPokemon() {
    const pokemonIndex = Math.floor(Math.random() * 151 + 1);
    return pokemonIndex;
  }

  if (isCorrect !== null) {
    if (isCorrect === false) {
      pokemonDisplay = (
        <img
          src={data?.sprites?.front_shiny}
          className={styles.defaultImgClass}
        />
      );
    } else if (isCorrect === true) {
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
          <div className={styles.imgContainer}>
            {isCorrect === null ? (
              <img
                src={data?.sprites?.front_shiny}
                className={styles.imgCover}
              />
            ) : (
              pokemonDisplay
            )}
          </div>
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
              spellCheck='false'
            ></input>
            <button className={styles.submitButton}>Submit</button>
          </form>
          <div className={styles.optionsContainer}>
            <button onClick={handleNextClick}>next</button>
            <button onClick={handleDontKnow}>I don't know</button>
          </div>
        </div>
      </div>
    </>
  );
}
