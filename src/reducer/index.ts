import { combineReducers, createStore } from '@reduxjs/toolkit';

import keyboardSlice from './keyboard';
import pcbSlice from './pcb';

// reducers
const reducers = combineReducers({
  keyboard: keyboardSlice.reducer,
  pcb: pcbSlice.reducer,
});

// actions
export const {
  initKeyBoard,
  removeKeycap,
  updateKeycap,
} = keyboardSlice.actions;
export const { setPCBSize, setPCBId } = pcbSlice.actions;

// store
export const store = createStore(reducers);
