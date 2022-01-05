import { createStore } from '@reduxjs/toolkit';
import { Option } from 'fp-ts/es6/Option';
import * as O from 'fp-ts/Option';
import { reducers } from '../reducer';

export type Url = `http${'s' | ''}://${string}`;

type HexChar =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F';
export type Color = `#${HexChar[6]}`;

export const keycapSize = [
  '1U',
  '1.25U',
  '1.5U',
  '1.75U',
  '2U',
  '2.25U',
  '3U',
  '3.5U',
  '5U',
  '6U',
  '6.25U',
  '6.5U',
  'ISOEnter_TOP',
  'ISOEnter_BOTTOM',
] as const;

export type KeycapSize = typeof keycapSize[number];

const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DragItem = {
  _key: string;
  size: KeycapSize;
  isDragedFromTab: Option<boolean>;
};

export interface KeyFrame {
  position: Position;
  size: KeycapSize;
  isPut: boolean;
  keycap: O.Option<UsedKey>;
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
