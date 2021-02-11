import { combineReducers, createStore } from '@reduxjs/toolkit';

import counterSlice from './counter';
import keyboardSlice from './keyboard';

// reducers
const reducers = combineReducers({
  counter: counterSlice.reducer,
  keyboard: keyboardSlice.reducer,
});

// actions
export const { increment, decrement } = counterSlice.actions;
export const { removeKeycap, updateKeycap } = keyboardSlice.actions;

// store
export const store = createStore(reducers);
