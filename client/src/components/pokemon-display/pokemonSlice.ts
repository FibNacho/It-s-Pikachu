import { createSlice } from '@reduxjs/toolkit';

//Create a type for game state / initial state

export interface initialGameState {
  turnCount: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const initialState: initialGameState = {
  turnCount: 1,
  correctAnswers: 0,
  wrongAnswers: 0,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    incrementTurn: (state) => {
      state.turnCount += 1;
    },
    incrementCorrect: (state) => {
      state.correctAnswers += 1;
    },
    incrementWrong: (state) => {
      state.wrongAnswers += 1;
    },
  },
  selectors: {
    selectGameState: (pokemonSlice) => {
      return pokemonSlice;
    },
  },
});

export const { incrementCorrect, incrementTurn, incrementWrong } = pokemonSlice.actions;

export const { selectGameState } = pokemonSlice.selectors;

export default pokemonSlice.reducer;
