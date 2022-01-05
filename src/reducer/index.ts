import { combineReducers, createStore } from '@reduxjs/toolkit';
import { CombinedState, Store } from 'redux';
import keyboardSlice, { KeyboardState } from './keyboard';
import pcbSlice, { PCBState } from './pcb';

// reducers
export const reducers = combineReducers({
  keyboard: keyboardSlice.reducer,
  pcb: pcbSlice.reducer,
});

// actions
export const { initKeyBoard, removeKeycap, updateKeycap } =
  keyboardSlice.actions;
export const { setPCBSize, setPCBId } = pcbSlice.actions;

export default (
  preloadedState: CombinedState<{
    keyboard: KeyboardState;
    pcb: PCBState;
  }>
): Store<
  CombinedState<{
    keyboard: KeyboardState;
    pcb: PCBState;
  }>
> => createStore(reducers, preloadedState);
