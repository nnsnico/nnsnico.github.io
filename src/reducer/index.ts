import { combineReducers, createSlice, createStore } from '@reduxjs/toolkit';

// reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

const reducers = combineReducers({
  counter: counterSlice.reducer,
});

// actions
export const { increment, decrement } = counterSlice.actions;

// store
export const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
