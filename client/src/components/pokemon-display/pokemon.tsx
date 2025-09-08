import { useGet151Query } from '../../store/api/apiSlice';
import { useState, type ReactElement, useEffect } from 'react';

export default function Pokemon() {
  const [userInput, setUserInput] = useState('');
  const [userSearch, setUserSearch] = useState(userInput);
  const [pokeIndex, setPokeIndex] = useState<null | number>(null);
  const { data, isLoading, isError, error } = useGet151Query(pokeIndex, {
    skip: pokeIndex === null,
  });

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
    const pokemonIndex = Math.floor(Math.random() * 151);
    return pokemonIndex;
  }

  if (isLoading) {
    imgDisplay = <p>Loading</p>;
  } else if (isError) {
    imgDisplay = <p>{JSON.stringify(error)}</p>;
  } else if (data?.species?.name && userSearch?.toLowerCase() !== data?.species?.name) {
    imgDisplay = <p>{data?.species?.name}</p>;
  } else if (userSearch?.toLowerCase() === data?.species?.name) {
    imgDisplay = <p>You got it</p>;
  }

  return (
    <>
      {imgDisplay}
      <form
        onSubmit={handleSearch}
        id='Search'
      >
        <input
          value={userInput as string}
          onChange={handleInputChange}
          type='text'
          placeholder='Enter Pokemon Name'
        ></input>
        <button>Submit</button>
      </form>
      <button
        onClick={() => {
          setPokeIndex(getRandomPokemon());
        }}
      >
        next
      </button>
      <button>I don't know</button>
    </>
  );
}
