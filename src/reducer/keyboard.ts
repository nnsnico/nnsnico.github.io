import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { none, Option, some } from 'fp-ts/Option';

import * as B from '../ext/boolean';
import { MAC_JIS_PCB } from '../keyframes';
import { KeycapSize } from '../types';

export interface KeyboardState {
  keyframes: KeyFrame[];
  pcbName: string;
}

export interface KeyFrame {
  position: Position;
  size: KeycapSize;
  isPut: boolean;
  keycap: Option<UsedKey>;
}

// keyboard上で使用されているkeycapのidと座標
export interface UsedKey {
  id: string;
  selected: boolean;
}

export interface Position {
  x: number;
  y: number;
}

//
// action payload
//
export interface InsertKeycapPayload {
  position: Position;
  usedKey: UsedKey;
  size: KeycapSize;
}

export interface UpdateKeyboardPayload {
  size: KeycapSize;
  usedKey: UsedKey;
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
    keyframes: MAC_JIS_PCB.keyframes,
    pcbName: MAC_JIS_PCB.pcbName,
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
      action: PayloadAction<InsertKeycapPayload>
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
              keycap: some(action.payload.usedKey),
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
            keyframe.position == action.payload.position,
            {
              position: action.payload.position,
              size: keyframe.size,
              isPut: false,
              keycap: none,
            } as KeyFrame,
            keyframe
          )
        ),
      }),
  },
});
export default keyboardSlice;
