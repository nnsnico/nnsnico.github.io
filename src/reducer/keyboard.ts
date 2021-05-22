import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as O from 'fp-ts/Option';

import * as B from '../ext/boolean';
import { KeycapSize, KeyFrame, Position, UsedKey } from '../types';

//
// action payload
//
export interface KeyboardState {
  keyframes: KeyFrame[];
  pcbName: string;
}
export interface UpdateKeycapPayload {
  position: Position;
  usedKey: UsedKey;
  size: KeycapSize;
}

export interface RemoveKeyboardPayload {
  position: Position;
}

export interface InitKeyBoardPayload {
  keyboard: KeyboardState;
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    keyframes: [],
    pcbName: '',
  } as KeyboardState,
  reducers: {
    initKeyBoard: (
      _: KeyboardState,
      action: PayloadAction<InitKeyBoardPayload>
    ): KeyboardState => {
      return action.payload.keyboard;
    },

    // update keycap
    updateKeycap: (
      state: KeyboardState,
      action: PayloadAction<UpdateKeycapPayload>
    ): KeyboardState =>
      Object.assign(state, {
        keyframes: state.keyframes.map((keyframe) =>
          B.fold(
            keyframe.position.x == action.payload.position.x &&
              keyframe.position.y == action.payload.position.y &&
              keyframe.size == action.payload.size,
            {
              position: action.payload.position,
              size: keyframe.size,
              isPut: true,
              keycap: O.some(
                Object.assign(action.payload.usedKey, { selected: false })
              ),
            } as KeyFrame,
            keyframe
          )
        ),
      }),
    //選択されたキーキャップをkeyboardから削除する
    removeKeycap: (
      state: KeyboardState,
      action: PayloadAction<RemoveKeyboardPayload>
    ): KeyboardState =>
      Object.assign(state, {
        keyframes: state.keyframes.map((keyframe) =>
          B.fold(
            keyframe.position.x === action.payload.position.x &&
              keyframe.position.y === action.payload.position.y,
            {
              position: action.payload.position,
              size: keyframe.size,
              isPut: false,
              keycap: O.none,
            } as KeyFrame,
            keyframe
          )
        ),
      }),
  },
});
export default keyboardSlice;
