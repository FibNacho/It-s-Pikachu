import { useGet151Query } from '../../store/api/apiSlice';
import { useState, type ReactElement, useEffect } from 'react';
import styles from './pokemonStyle.module.css';
import { incrementCorrect, incrementTurn, incrementWrong } from './pokemonSlice';
import { selectGameState } from './pokemonSlice';

export default function Pokemon() {
  const [userInput, setUserInput] = useState('');
  const [userSearch, setUserSearch] = useState(userInput);
  const [pokeIndex, setPokeIndex] = useState<null | number>(null);
  const [backgroundColor, setBackgroundColor] = useState('normalBK');
  const { data, isError, error } = useGet151Query(pokeIndex, {
    skip: pokeIndex === null,
  });

  // [] Use turn count vs the right vs wrong count to see if user has guessed on this pokemon yet
  // [] Only increment right or wrong answers with don't know button or submit button
  // [] Make sure to only change right and wrong count on first guess
  // [] move if statements from function body into the return statement
  // [] add proper styling to component

  let imgDisplay: ReactElement | null = null;

  useEffect(() => {
    setPokeIndex(getRandomPokemon());
  }, []);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUserSearch(userInput);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(() => event.target.value);
  }
  //use effect or ref
  function getRandomPokemon() {
    const pokemonIndex = Math.floor(Math.random() * 151 + 1);
    return pokemonIndex;
  }

  if (isError) {
    imgDisplay = <p>{JSON.stringify(error)}</p>;
  } else if (data?.species?.name && userSearch?.toLowerCase() !== data?.species?.name) {
    imgDisplay = (
      <img
        src={data?.sprites?.front_shiny}
        className={styles.imgCover}
      />
    );
  } else if (userSearch?.toLowerCase() === data?.species?.name) {
    imgDisplay = (
      <img
        src={data?.sprites?.front_shiny}
        className={styles.defaultImgClass}
      />
    );
  }

  return (
    <>
      <div className={styles.componentContainer}>
        <div className={styles[backgroundColor]}>
          {imgDisplay}
          <form
            onSubmit={handleSearch}
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
