import { PayloadAction } from '@reduxjs/toolkit';
import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { insertKeycap, updateKeycap } from '../reducer';
import { KeyboardPayload } from '../reducer/keyboard';
import { DragItem, KeycapSize, RootState } from '../types';
import RemovableKeycap from './molecules/removableKeycap';

const wrappedDivStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  top: 0,
  zIndex: -1,
};

const keyboardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
};

const KeyBoard: React.FC = () => {
  const { putKeycaps } = useSelector((state: RootState) => state.keyboard);
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'keycap',
    canDrop: () => true,
    drop: (_, monitor) => {
      const item = monitor.getItem() as DragItem;
      const handleActionByFlag = (
        position: XYCoord,
        lastUpdateLength: number
      ): PayloadAction<KeyboardPayload> =>
        pipe(
          O.bindTo('_')(item.isDragedFromTab),
          O.map(() =>
            insertKeycap({
              size: item.size,
              lastUpdateLength: lastUpdateLength + 1,
              usedKey: {
                id: item._key + '_' + lastUpdateLength,
                position,
                selected: false,
              },
            })
          ),
          O.getOrElse(() =>
            updateKeycap({
              size: item.size,
              lastUpdateLength: lastUpdateLength,
              usedKey: {
                id: item._key,
                position,
                selected: false,
              },
            })
          )
        );
      const action: O.Option<PayloadAction<KeyboardPayload>> = pipe(
        O.bindTo('position')(O.fromNullable(monitor.getSourceClientOffset())),
        O.bind('usedKeysLength', () =>
          pipe(
            O.of(putKeycaps.filter((v) => v.size === item.size)),
            O.map((keycaps) =>
              pipe(
                A.head(keycaps.map((v) => v.lastUpdateLength)),
                O.getOrElse(() => 0)
              )
            )
          )
        ),
        O.map((bind) => handleActionByFlag(bind.position, bind.usedKeysLength))
      );

      if (O.isSome(action)) {
        dispatch(action.value);
      } else {
        console.error('action is none');
      }
    },
  });

  return (
    <div style={{ ...wrappedDivStyle, ...keyboardStyle }} ref={drop}>
      {putKeycaps.flatMap((keycap) =>
        keycap.usedKeys.map((key) =>
          renderKeycap(
            key.id,
            keycap.size,
            key.position.x,
            key.position.y,
            key.selected
          )
        )
      )}
    </div>
  );
};

function renderKeycap(
  capId: string,
  size: KeycapSize,
  x: number,
  y: number,
  selected: boolean
): JSX.Element {
  return (
    <RemovableKeycap
      key={capId}
      _key={capId}
      size={size}
      keycapStyles={{ position: 'fixed', top: y, left: x }}
      selected={selected}
      position={{ x, y }}
    />
  );
}

export default KeyBoard;
