import * as O from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/function';
import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { insertKeyCap, updateKeyCapPosition } from '../reducer';
import { DragItem, KeycapSize, RootState } from '../types';
import KeyCap from './keycap';

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
  // const { draggingKeycapId } = useSelector((state: RootState) => state.keyCap);
  const { putKeycaps } = useSelector((state: RootState) => state.keyboard);
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'keycap',
    canDrop: () => true,
    drop: (_, monitor) => {
      const item = monitor.getItem() as DragItem;
      const handledPayloadByFlag = (position: XYCoord) =>
        pipe(
          item.isDragedFromTab,
          O.map(
            () =>
              putKeycaps
                .filter((v) => v.size === item.size)
                .flatMap((v) => v.usedKeys).length
          ),
          O.map((length) =>
            dispatch(
              insertKeyCap({
                size: item.size,
                usedKey: {
                  id: item._key + '_' + length,
                  position,
                },
              })
            )
          ),
          O.getOrElse(() =>
            dispatch(
              updateKeyCapPosition({
                size: item.size,
                usedKey: {
                  id: item._key,
                  position,
                },
              })
            )
          )
        );

      pipe(
        O.fromNullable(monitor.getClientOffset()),
        O.chain((position) =>
          putKeycaps.filter((v) => v.size === item.size).length !== 0
            ? O.some(handledPayloadByFlag(position))
            : O.some(
                dispatch(
                  insertKeyCap({
                    size: item.size,
                    usedKey: {
                      id: item._key,
                      position,
                    },
                  })
                )
              )
        )
      );
    },
  });

  return (
    <div style={wrappedDivStyle}>
      <div style={keyboardStyle} ref={drop}>
        {putKeycaps.map((keycap) =>
          keycap.usedKeys.map((key) =>
            renderKeyCap(key.id, keycap.size, key.position.x, key.position.y)
          )
        )}
      </div>
    </div>
  );
};

function renderKeyCap(capId: string, size: KeycapSize, x: number, y: number) {
  if (capId != null) {
    return (
      <KeyCap
        key={capId}
        _key={capId}
        size={size}
        styles={{ position: 'fixed', top: y, left: x }}
      />
    );
  }
}

export default KeyBoard;
