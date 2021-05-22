import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as O from 'fp-ts/lib/Option';

import { PCBId } from '../pcb';

export interface PCBState {
  id: O.Option<PCBId>;
  size: O.Option<PCBSize>;
}

export interface PCBSize {
  pixelWidth: number;
  pixelHeight: number;
  rowTotalUnitSize: number;
}

export interface PCBIdPayload {
  id: PCBId;
}

export interface PCBSizePayload {
  size: PCBSize;
}

const pcbSlice = createSlice({
  name: 'pcb',
  initialState: { id: O.none, size: O.none } as PCBState,
  reducers: {
    setPCBSize: (
      state: PCBState,
      action: PayloadAction<PCBSizePayload>
    ): PCBState =>
      Object.assign(state, {
        size: O.some(action.payload.size),
      }),
    setPCBId: (
      state: PCBState,
      action: PayloadAction<PCBIdPayload>
    ): PCBState =>
      Object.assign(state, {
        id: O.some(action.payload.id),
      }),
  },
});

export default pcbSlice;
