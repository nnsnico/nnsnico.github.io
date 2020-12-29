import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { KeyCapId } from '../types';

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

export default keyboardSlice;
