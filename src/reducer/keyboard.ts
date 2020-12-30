import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';

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
}

interface Position {
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
  initialState: { putKeycaps: [] } as KeyboardState,
  reducers: {
    insertKeyCap: (
      state: KeyboardState,
      action: PayloadAction<KeyboardPayload>
    ) => {
      const newPutKeycaps: Keycap[] =
        // keyboard上で配置されているkeycapのsizeと同じか
        state.putKeycaps.filter((v) => v.size === action.payload.size)
          .length === 0
          ? // Keyboard上にないsizeのkeycapであれば、新規作成
            // state.putkeycap内のusedKeysに追加
            produce(state.putKeycaps, (draft) => {
              const newUsedKeycaps = produce(
                // sizeが一致しているobjectからusedKeysだけ抽出して追加
                draft
                  .filter((v) => v.size === action.payload.size)
                  .flatMap((v) => v.usedKeys),
                (draftUsedKeys) => {
                  draftUsedKeys.push(action.payload.usedKey);
                }
              );
              draft.push({
                size: action.payload.size,
                usedKeys: newUsedKeycaps,
              });
            })
          : // keyboard上に既にあるsizeならばsizeをもとにusedKeysに追加
            state.putKeycaps.map((keycap) =>
              keycap.size === action.payload.size
                ? produce(keycap, (draft) => {
                    draft.usedKeys.push(action.payload.usedKey);
                  })
                : keycap
            );

      return produce(state, (draft) => {
        draft.putKeycaps = newPutKeycaps;
      });
    },
    updateKeyCapPosition: (
      state: KeyboardState,
      action: PayloadAction<KeyboardPayload>
    ) => {
      // 新しくputkeycapsを作る
      const newPutKeycaps: Keycap[] = state.putKeycaps.flatMap((putKeycap) => {
        // idが一致していればusedKeyをそのまんま入れ替える
        const newUsedKeycaps = putKeycap.usedKeys.map((usedKey) =>
          usedKey.id === action.payload.usedKey.id
            ? action.payload.usedKey
            : usedKey
        );
        return produce(putKeycap, (draftPutKeycap) => {
          draftPutKeycap.usedKeys = newUsedKeycaps;
        });
      });

      return produce(state, (draft) => {
        draft.putKeycaps = newPutKeycaps;
      });
    },
  },
});

export default keyboardSlice;
