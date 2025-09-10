import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../store/api/apiSlice';
import pokemonReducer from '../components/pokemon-display/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
// Should log: { turnCount: 1, correctAnswers: 0, wrongAnswers: 0 }
