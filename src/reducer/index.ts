import { combineReducers, createStore } from '@reduxjs/toolkit';

import counterSlice from './counter';
import keyboardSlice from './keyboard';
import pcbSlice from './pcb';

// reducers
const reducers = combineReducers({
  counter: counterSlice.reducer,
  keyboard: keyboardSlice.reducer,
  pcb: pcbSlice.reducer,
});

// actions
export const { increment, decrement } = counterSlice.actions;
export const {
  initKeyBoard,
  removeKeycap,
  updateKeycap,
} = keyboardSlice.actions;
export const { setPCBSize, setPCBId } = pcbSlice.actions;

// store
export const store = createStore(reducers);
