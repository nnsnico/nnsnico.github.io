import { PayloadAction } from '@reduxjs/toolkit';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { insertKeycap, removeKeycap, updateKeycap } from '../reducer';
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
        usedKeysLength: number
      ): PayloadAction<KeyboardPayload> =>
        pipe(
          O.bindTo('_')(item.isDragedFromTab),
          O.map(() =>
            insertKeycap({
              size: item.size,
              usedKey: {
                id: item._key + '_' + usedKeysLength,
                position,
                selected: false,
              },
            })
          ),
          O.getOrElse(() =>
            updateKeycap({
              size: item.size,
              usedKey: {
                id: item._key,
                position,
                selected: false,
              },
            })
          )
        );

      const action = pipe(
        O.bindTo('position')(O.fromNullable(monitor.getSourceClientOffset())),
        O.bind('usedKeysLength', () =>
          pipe(
            O.of(putKeycaps.filter((v) => v.size === item.size)),
            O.map((keycaps) =>
              keycaps.length !== 0
                ? O.some(keycaps.flatMap((v) => v.usedKeys).length)
                : O.none
            )
          )
        ),
        O.bind('action', (bind) =>
          pipe(
            O.bindTo('length')(bind.usedKeysLength),
            O.bind('action', (v) =>
              O.some(handleActionByFlag(bind.position, v.length))
            ),
            O.map((v) => O.some(v.action)),
            O.getOrElse(() =>
              O.some(
                insertKeycap({
                  size: item.size,
                  usedKey: {
                    id: item._key,
                    position: bind.position,
                    selected: false,
                  },
                })
              )
            )
          )
        ),
        O.map((bind) => bind.action)
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
            key.selected,
            () =>
              dispatch(
                removeKeycap({
                  size: keycap.size,
                  usedKey: {
                    id: key.id,
                    position: key.position,
                    selected: true,
                  },
                })
              ),
            () => {
              dispatch(
                updateKeycap({
                  size: keycap.size,
                  usedKey: {
                    id: key.id,
                    position: key.position,
                    selected: !key.selected,
                  },
                })
              );
            }
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
  selected: boolean,
  onClickDelete: () => void,
  onSelected: () => void
): JSX.Element {
  return (
    <RemovableKeycap
      key={capId}
      _key={capId}
      size={size}
      keycapStyles={{ position: 'fixed', top: y, left: x }}
      onClickDelete={onClickDelete}
      onSelected={onSelected}
      capId={capId}
      selected={selected}
    />
  );
}

export default KeyBoard;
