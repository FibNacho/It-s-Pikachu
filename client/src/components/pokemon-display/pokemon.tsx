import { useGetPokemonQuery } from '../../store/api/apiSlice';
import { useState } from 'react';

export default function Pokemon() {
  const [userInput, setUserInput] = useState<string | null>('');
  const [userSearch, setUserSearch] = useState(userInput);
  const { data, isLoading } = useGetPokemonQuery(userSearch);

  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserSearch(userInput);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(() => event.target.value);
  };

  return (
    <>
      {isLoading ? <p>loading</p> : <img src={data?.sprites?.front_shiny} />}
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
    </>
  );
}
