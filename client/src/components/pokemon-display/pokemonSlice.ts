import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../../app/store';

//Create a type for game state / initial state

export interface initialGameState {
  turnCount: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const initialState: initialGameState = {
  turnCount: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    incrementTurn: (state) => {
      state.turnCount = state.turnCount += 1;
    },
    incrementCorrect: (state) => {
      state.turnCount = state.turnCount += 1;
    },
    incrementWrong: (state) => {
      state.turnCount = state.turnCount += 1;
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
