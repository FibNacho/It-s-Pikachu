import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => {
    return {
      getPokemon: builder.query({
        query: () => 'pokemon',
      }),
    };
  },
});

export const { useGetPokemonQuery } = apiSlice;
