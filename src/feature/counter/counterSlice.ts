import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 42,
};

export const counterSLice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, actions) => {
      state.value += actions.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSLice.actions;
