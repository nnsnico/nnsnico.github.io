import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

import { KeycapSize } from '../types';

// keyboard上に設置されているKeycapのリスト
export interface KeyboardState {
  putKeycaps: Keycap[];
}

// sizeをキーにして同じsizeのkeycapを管理している
interface Keycap {
  size: KeycapSize;
  usedKeys: UsedKey[];
}

// keyboard上で使用されているkeycapのidと座標
interface UsedKey {
  id: string;
  position: Position;
  selected: boolean;
}

export interface Position {
  x: number;
  y: number;
}

// action payload
export interface KeyboardPayload {
  size: KeycapSize;
  usedKey: UsedKey;
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: { putKeycaps: [], selectedKeycapIds: [] } as KeyboardState,
  reducers: {
    // insert new keycap in keyboard
    insertKeycap: (
      state: KeyboardState,
      action: PayloadAction<KeyboardPayload>
    ): KeyboardState => {
      const createInSameSizeKey: Keycap[] = pipe(
        state.putKeycaps,
        A.map((keycap) =>
          keycap.size === action.payload.size
            ? {
                size: keycap.size,
                usedKeys: A.snoc(keycap.usedKeys, action.payload.usedKey),
              }
            : keycap
        )
      );

      const createNewKeys: Keycap[] = pipe(
        A.of(state),
        A.chain((state) =>
          A.snoc(state.putKeycaps, {
            size: action.payload.size,
            usedKeys: A.of(action.payload.usedKey),
          })
        )
      );

      return A.isEmpty(
        state.putKeycaps.filter((v) => v.size === action.payload.size)
      )
        ? {
            putKeycaps: createNewKeys,
          }
        : {
            putKeycaps: createInSameSizeKey,
          };
    },

    //選択されたキーキャップをkeyboardから削除する
    removeKeycap: (
      state: KeyboardState,
      action: PayloadAction<KeyboardPayload>
    ): KeyboardState => {
      const selectedKeycapsFilterById: Keycap[] = pipe(
        state.putKeycaps,
        A.map((keycap) =>
          keycap.size === action.payload.size
            ? {
                size: action.payload.size,
                usedKeys: pipe(
                  keycap.usedKeys,
                  A.filter((usedKey) => usedKey.id != action.payload.usedKey.id)
                ),
              }
            : keycap
        )
      );

      return {
        putKeycaps: selectedKeycapsFilterById,
      };
    },
    // update keycap
    updateKeycap: (
      state: KeyboardState,
      action: PayloadAction<KeyboardPayload>
    ): KeyboardState => {
      const replacePositionMatchesSize: Keycap[] = pipe(
        state.putKeycaps,
        A.map((keycap) =>
          keycap.size === action.payload.size
            ? {
                size: action.payload.size,
                usedKeys: pipe(
                  keycap.usedKeys,
                  A.map((usedKey) =>
                    usedKey.id === action.payload.usedKey.id
                      ? action.payload.usedKey
                      : usedKey
                  )
                ),
              }
            : keycap
        )
      );

      return {
        putKeycaps: replacePositionMatchesSize,
      };
    },
  },
});
export default keyboardSlice;
