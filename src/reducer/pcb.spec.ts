import { PayloadAction } from '@reduxjs/toolkit';
import * as O from 'fp-ts/lib/Option';

import { setPCBId, setPCBSize } from '.';
import pcbSlice, { PCBIdPayload, PCBSizePayload, PCBState } from './pcb';

const stateFixture: PCBState = {
  id: O.some('MacJis'),
  size: O.some({
    pixelWidth: 1,
    pixelHeight: 1,
    rowTotalUnitSize: 15,
  }),
};

describe('keyboardSlice', function () {
  describe('reducers', function () {
    describe('#setPCBSize', function () {
      it('should equal set payload state', function () {
        const payloadFixture: PayloadAction<PCBSizePayload> = {
          type: setPCBSize.type,
          payload: {
            size: {
              pixelWidth: 5,
              pixelHeight: 5,
              rowTotalUnitSize: 15,
            },
          },
        };
        const expected: PCBState = {
          id: stateFixture.id,
          size: O.some(payloadFixture.payload.size),
        };
        expect(pcbSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });
    describe('#setPCBId', function () {
      it('should equal set payload state', function () {
        const payloadFixture: PayloadAction<PCBIdPayload> = {
          type: setPCBId.type,
          payload: {
            id: 'MacJis',
          },
        };
        const expected: PCBState = {
          id: O.some(payloadFixture.payload.id),
          size: stateFixture.size,
        };
        expect(pcbSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });
  });
});
