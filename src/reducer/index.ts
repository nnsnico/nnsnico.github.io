import {
  combineReducers,
  createSlice,
  createStore,
  PayloadAction,
} from '@reduxjs/toolkit';

import { KeyCapId } from '../types';

// counter state
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

// keyboard state
interface KeyboardState {
  putKeycaps: KeyCap[]; // keyboard上に設置されているKeycapのリスト
}
interface KeyCap {
  id: KeyCapId;
  position: Position;
}
interface Position {
  x: number;
  y: number;
}
const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: { putKeycaps: [] } as KeyboardState,
  reducers: {
    // TODO: 同じタイプのキーを置きたいとき(Shiftキーなど)、一意性をもたせるためにはどうするべきか
    insertKeyCap: (state: KeyboardState, action: PayloadAction<KeyCap>) =>
      Object.assign(state, {
        putKeycaps: state.putKeycaps.concat([action.payload]),
      }),
    updateKeyCapPosition: (
      state: KeyboardState,
      action: PayloadAction<KeyCap>
    ) =>
      Object.assign(state, {
        putKeycaps: state.putKeycaps.map((v) =>
          v.id == action.payload.id ? action.payload : v
        ),
      }),
  },
});

// reducers
const reducers = combineReducers({
  counter: counterSlice.reducer,
  keyboard: keyboardSlice.reducer,
});

// actions
export const { increment, decrement } = counterSlice.actions;
export const { insertKeyCap, updateKeyCapPosition } = keyboardSlice.actions;

// store
export const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
