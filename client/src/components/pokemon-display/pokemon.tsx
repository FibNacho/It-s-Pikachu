import { useGet151Query } from '../../store/api/apiSlice';
import { useState, type ReactElement, useEffect, useRef } from 'react';
import styles from './pokemonStyle.module.css';
import { incrementCorrect, incrementTurn, incrementWrong } from './pokemonSlice';
import { selectGameState } from './pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux-hooks';
import { FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Pokemon() {
  const [pokeIndex, setPokeIndex] = useState<null | number>(null);

  const dispatch = useAppDispatch();
  const { correctAnswers, wrongAnswers, turnCount } = useAppSelector(selectGameState);

  //Use only for updating what is seen in text box
  const [userInput, setUserInput] = useState('');

  const { data, isError, error } = useGet151Query(pokeIndex, {
    skip: pokeIndex === null,
  });

  const [backgroundColor, setBackgroundColor] = useState('normalBK');
  const refDisplayValue = useRef(<FaQuestionCircle />);

  // [] Use turn count vs the right vs wrong count to see if user has guessed on this pokemon yet
  // [] Only increment right or wrong answers with don't know button or submit button
  // [] Make sure to only change right and wrong count on first guess
  // [] move if statements from function body into the return statement
  // [] add proper styling to component

  useEffect(() => {
    setPokeIndex(getRandomPokemon());
  }, []);


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (correctAnswers + wrongAnswers !== turnCount) {
      if (userInput.toLowerCase() === data.species.name) {
 
        );
        dispatch(incrementTurn());
        setBackgroundColor('greenBK');
      }
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

  if (correctAnswers + wrongAnswers !== turnCount) {
    if (isError) {
      refDisplayValue.current = <FaExclamationTriangle />;
    } else if (data && ) {
      refDisplayValue.current = (
        <img
          src={data?.sprites?.front_shiny}
          className={styles.imgCover}
        />
      );
    }
  }

        //  refDisplayValue.current = (
        //   <img
        //     src={data?.sprites?.front_shiny}
        //     className={styles.defaultImgClass}
        //   />

  return (
    <>
      <div className={styles.componentContainer}>
        <div className={styles[backgroundColor]}>
          {refDisplayValue.current}
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
                setUserSearch('');
                setUserInput('');
                setPokeIndex(getRandomPokemon());
              }}
            >
              next
            </button>
            <button
              onClick={() => {
                setUserInput(data?.species.name);
                setUserSearch(data?.species.name);
              }}
            >
              I don't know
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
