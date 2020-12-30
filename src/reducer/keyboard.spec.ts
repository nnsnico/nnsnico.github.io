import { insertKeyCap, updateKeyCapPosition } from '.';
import keyboardSlice, { KeyboardPayload, KeyboardState } from './keyboard';

const stateFixture: KeyboardState = {
  putKeycaps: [
    {
      size: '2U',
      usedKeys: [
        {
          id: '2U',
          position: {
            x: 212,
            y: 238,
          },
        },
        {
          id: '2U_1',
          position: {
            x: 38,
            y: 382,
          },
        },
      ],
    },
  ],
};

describe('keyboardSlice', function () {
  describe('reducers', function () {
    describe('#insertKeyCap', function () {
      it('should insert to `state#putKeycaps` when state is empty', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: insertKeyCap.type,
          payload: {
            size: '2.25U',
            usedKey: {
              id: '2.25U',
              position: {
                x: 0,
                y: 0,
              },
            },
          },
        };
        const expected: KeyboardState = {
          putKeycaps: [
            {
              size: '2.25U',
              usedKeys: [
                {
                  id: '2.25U',
                  position: {
                    x: 0,
                    y: 0,
                  },
                },
              ],
            },
          ],
        };

        expect(
          keyboardSlice.reducer({ putKeycaps: [] }, payloadFixture)
        ).toEqual(expected);
      });

      it('should insert to `state#putKeycaps` when `size` of payload is not equal `state#putKeycaps#size`', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: insertKeyCap.type,
          payload: {
            size: '2.25U',
            usedKey: {
              id: '2.25U',
              position: {
                x: 0,
                y: 0,
              },
            },
          },
        };
        const expected: KeyboardState = {
          putKeycaps: [
            {
              size: '2U',
              usedKeys: [
                {
                  id: '2U',
                  position: {
                    x: 212,
                    y: 238,
                  },
                },
                {
                  id: '2U_1',
                  position: {
                    x: 38,
                    y: 382,
                  },
                },
              ],
            },
            {
              size: '2.25U',
              usedKeys: [
                {
                  id: '2.25U',
                  position: {
                    x: 0,
                    y: 0,
                  },
                },
              ],
            },
          ],
        };

        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });

      it('should insert to `state#putKeycaps#usedKeys` with a new id when `size` of payload is equal `state#putKeycaps#size`', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: insertKeyCap.type,
          payload: {
            size: '2U',
            usedKey: {
              id: '2U_2',
              position: {
                x: 0,
                y: 0,
              },
            },
          },
        };
        const expected: KeyboardState = {
          putKeycaps: [
            {
              size: '2U',
              usedKeys: [
                {
                  id: '2U',
                  position: {
                    x: 212,
                    y: 238,
                  },
                },
                {
                  id: '2U_1',
                  position: {
                    x: 38,
                    y: 382,
                  },
                },
                {
                  id: '2U_2',
                  position: {
                    x: 0,
                    y: 0,
                  },
                },
              ],
            },
          ],
        };

        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });

    describe('#updateKeyCapPosition', function () {
      it('should update `state#putKeycaps#usedKeys#position` when `usedKey#id` of payload is equal to `state#putKeycaps#usedKeys#id`', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: updateKeyCapPosition.type,
          payload: {
            size: '2U',
            usedKey: {
              id: '2U_1',
              position: {
                x: 123,
                y: 456,
              },
            },
          },
        };
        const expected: KeyboardState = {
          putKeycaps: [
            {
              size: '2U',
              usedKeys: [
                {
                  id: '2U',
                  position: {
                    x: 212,
                    y: 238,
                  },
                },
                {
                  id: '2U_1',
                  position: {
                    x: 123,
                    y: 456,
                  },
                },
              ],
            },
          ],
        };

        expect(keyboardSlice.reducer(stateFixture, payloadFixture)).toEqual(
          expected
        );
      });
    });
  });
});
