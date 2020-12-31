import { Option } from 'fp-ts/es6/Option';
import { DragObjectWithType } from 'react-dnd';

import { store } from '../reducer';

export const keycapSize = [
  '1U',
  '1.25U',
  '1.5U',
  '1.75U',
  '2U',
  '2.25U',
  '2.75U',
  '5U',
  '6U',
  '6.25U',
  '6.5U',
  'ISOEnter',
] as const;

export type KeycapSize = typeof keycapSize[number];

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DragItem = DragObjectWithType & {
  _key: string;
  size: KeycapSize;
  isDragedFromTab: Option<boolean>;
};
