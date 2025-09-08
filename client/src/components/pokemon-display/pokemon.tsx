import { useGetPokemonQuery } from '../../store/api/apiSlice';

export default function Pokemon() {
  const { data } = useGetPokemonQuery({});

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
