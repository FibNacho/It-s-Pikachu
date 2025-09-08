import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => {
    return {
      get151: builder.query({
        query: (number) => `pokemon/${number}`,
      }),
    };
  },
});

export const { useGet151Query } = apiSlice;
