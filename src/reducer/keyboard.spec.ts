import { insertKeycap, removeKeycap, updateKeycap } from '.';
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
          selected: false,
        },
        {
          id: '2U_1',
          position: {
            x: 38,
            y: 382,
          },
          selected: false,
        },
      ],
    },
  ],
};

describe('keyboardSlice', function () {
  describe('reducers', function () {
    describe('#insertKeycap', function () {
      it('should insert to `state#putKeycaps` when state is empty', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: insertKeycap.type,
          payload: {
            size: '2.25U',
            usedKey: {
              id: '2.25U',
              position: {
                x: 0,
                y: 0,
              },
              selected: false,
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
                  selected: false,
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
          type: insertKeycap.type,
          payload: {
            size: '2.25U',
            usedKey: {
              id: '2.25U',
              position: {
                x: 0,
                y: 0,
              },
              selected: false,
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
                  selected: false,
                },
                {
                  id: '2U_1',
                  position: {
                    x: 38,
                    y: 382,
                  },
                  selected: false,
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
                  selected: false,
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
          type: insertKeycap.type,
          payload: {
            size: '2U',
            usedKey: {
              id: '2U_2',
              position: {
                x: 0,
                y: 0,
              },
              selected: false,
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
                  selected: false,
                },
                {
                  id: '2U_1',
                  position: {
                    x: 38,
                    y: 382,
                  },
                  selected: false,
                },
                {
                  id: '2U_2',
                  position: {
                    x: 0,
                    y: 0,
                  },
                  selected: false,
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

    describe('#removeKeycap', function () {
      it('should remove `state#putKeycaps#usedKey`', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: removeKeycap.type,
          payload: {
            size: '2.25U',
            usedKey: {
              id: '2.25U',
              position: {
                x: 0,
                y: 0,
              },
              selected: false,
            },
          },
        };
        const expected: KeyboardState = {
          putKeycaps: [
            {
              size: '2.25U',
              usedKeys: [],
            },
          ],
        };

        expect(
          keyboardSlice.reducer(
            {
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
                      selected: false,
                    },
                  ],
                },
              ],
            },
            payloadFixture
          )
        ).toEqual(expected);
      });

      it('should not remove `state#putKeycaps#usedKey`', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: removeKeycap.type,
          payload: {
            size: '2.25U',
            usedKey: {
              id: '2.25U',
              position: {
                x: 0,
                y: 0,
              },
              selected: false,
            },
          },
        };
        const expected: KeyboardState = {
          putKeycaps: [],
        };

        expect(
          keyboardSlice.reducer({ putKeycaps: [] }, payloadFixture)
        ).toEqual(expected);
      });
    });

    describe('#updateKeycap', function () {
      it('should update `state#putKeycaps#usedKeys` when `usedKey#id` of payload is equal to `state#putKeycaps#usedKeys#id`', function () {
        const payloadFixture: { type: string; payload: KeyboardPayload } = {
          type: updateKeycap.type,
          payload: {
            size: '2U',
            usedKey: {
              id: '2U_1',
              position: {
                x: 123,
                y: 456,
              },
              selected: false,
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
                  selected: false,
                },
                {
                  id: '2U_1',
                  position: {
                    x: 123,
                    y: 456,
                  },
                  selected: false,
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
