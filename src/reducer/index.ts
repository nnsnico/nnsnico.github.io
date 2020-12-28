import {
  combineReducers,
  createSlice,
  createStore,
  PayloadAction,
} from '@reduxjs/toolkit';

import { KeyCapId } from '../components/keycap';

// reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});
const keyCapSlice = createSlice({
  name: 'transporter',
  initialState: -1 as KeyCapId,
  reducers: {
    setCapId: (state: KeyCapId, action: PayloadAction<KeyCapId>) =>
      action.payload,
  },
});
const reducers = combineReducers({
  counter: counterSlice.reducer,
  keyCap: keyCapSlice.reducer,
});

// actions
export const { increment, decrement } = counterSlice.actions;
export const { setCapId } = keyCapSlice.actions;

// store
export const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
