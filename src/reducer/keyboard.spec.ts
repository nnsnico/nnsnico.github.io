import { PayloadAction } from '@reduxjs/toolkit';
import { none, some } from 'fp-ts/Option';

import { initKeyBoard, removeKeycap, updateKeycap } from '.';
import keyboardSlice, {
  InitKeyBoardPayload,
  KeyboardState,
  RemoveKeyboardPayload,
  UpdateKeycapPayload,
} from './keyboard';

const stateFixture: KeyboardState = {
  keyframes: [
    {
      position: { x: 0, y: 0 },
      size: '1.5U',
      isPut: false,
      keycap: none,
    },
    {
      position: { x: 1, y: 0 },
      size: '1U',
      isPut: false,
      keycap: none,
    },
    {
      position: { x: 2, y: 0 },
      size: '1U',
      isPut: true,
      keycap: some({ id: '1U', selected: false }),
    },
  ],
  pcbName: 'pcbName',
};

describe('keyboardSlice', function () {
  describe('reducers', function () {
    describe('#initKeyBoard', function () {
      it('should not initKeyBoard when state incorrect position', function () {
        const payloadFixture: PayloadAction<InitKeyBoardPayload> = {
          type: initKeyBoard.type,
          payload: {
            keyboard: {
              keyframes: [
                {
                  position: { x: 0, y: 0 },
                  size: '1.5U',
                  isPut: false,
                  keycap: none,
                },
                {
                  position: { x: 1, y: 0 },
                  size: '1U',
                  isPut: false,
                  keycap: none,
                },
                {
                  position: { x: 2, y: 0 },
                  size: '1U',
                  isPut: true,
                  keycap: some({ id: '1U', selected: false }),
                },
              ],
              pcbName: 'pcbName',
            },
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });
    describe('#updateKeycap', function () {
      it('should not update when state incorrect position', function () {
        const payloadFixture: PayloadAction<UpdateKeycapPayload> = {
          type: updateKeycap.type,
          payload: {
            position: { x: 0, y: 0 },
            usedKey: { id: '1U', selected: true },
            size: '1U',
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });

      it('should not update when state incorrect size', function () {
        const payloadFixture: PayloadAction<UpdateKeycapPayload> = {
          type: updateKeycap.type,
          payload: {
            position: { x: 1, y: 0 },
            usedKey: { id: '2U', selected: true },
            size: '2U',
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });

      it('should update correctly', function () {
        const payloadFixture: PayloadAction<UpdateKeycapPayload> = {
          type: updateKeycap.type,
          payload: {
            position: { x: 1, y: 0 },
            usedKey: { id: '1U', selected: true },
            size: '1U',
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });

    describe('#removeKeycap', function () {
      it('should not remove when state incorrect position', function () {
        const payloadFixture: PayloadAction<RemoveKeyboardPayload> = {
          type: removeKeycap.type,
          payload: {
            position: { x: 3, y: 0 },
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });

      it('should not remove when isPut = false', function () {
        const payloadFixture: PayloadAction<RemoveKeyboardPayload> = {
          type: removeKeycap.type,
          payload: {
            position: { x: 1, y: 0 },
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: true,
              keycap: some({ id: '1U', selected: false }),
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });

      it('should remove correctly', function () {
        const payloadFixture: PayloadAction<RemoveKeyboardPayload> = {
          type: removeKeycap.type,
          payload: {
            position: { x: 2, y: 0 },
          },
        };
        const expected: KeyboardState = {
          keyframes: [
            {
              position: { x: 0, y: 0 },
              size: '1.5U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 1, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
            {
              position: { x: 2, y: 0 },
              size: '1U',
              isPut: false,
              keycap: none,
            },
          ],
          pcbName: 'pcbName',
        };
        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });
  });
});
