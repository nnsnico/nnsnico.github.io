import { fold, Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import * as B from '../ext/boolean';
import { updateKeycap } from '../reducer';
import { UsedKey } from '../reducer/keyboard';
import { DragItem, KeycapSize, RootState } from '../types';
import KeyFrame from './atomic/keyframe';
import RemovableKeycap from './molecules/removableKeycap';

const wrappedDivStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  zIndex: -1,
};

const keyboardStyle: React.CSSProperties = {
  height: '100vh',
};

const KeyBoard: React.FC = () => {
  const { keyframes } = useSelector((state: RootState) => state.keyboard);
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'keycap',
    canDrop: () => true,
    drop: (_, monitor) => {
      const item = monitor.getItem() as DragItem;
      dispatch(
        updateKeycap({
          size: item.size,
          position: { x: 2, y: 2 },
          usedKey: {
            id: item._key,
            selected: false,
          },
        })
      );
    },
  });

  const block = [];
  let column: JSX.Element[] = [];
  let y = 0;
  for (let i = 0; i < keyframes.length; i++) {
    if (y != keyframes[i].position.y) {
      y = keyframes[i].position.y;
      block.push(
        <div key={i * 100} style={{ display: 'flex' }}>
          {column}
        </div>
      );
      column = [];
    }
    column.push(
      B.fold(
        keyframes[i].isPut,
        renderKeycap(
          keyframes[i].keycap,
          keyframes[i].size,
          keyframes[i].position.x,
          keyframes[i].position.y
        ),
        <KeyFrame
          keycapSize={14.5}
          position={keyframes[i].position}
          pcbViewWidth={1000}
          pcbViewHeight={1000}
          size={keyframes[i].size}
        />
      )
    );
  }
  block.push(
    <div key={400} style={{ display: 'flex' }}>
      {column}
    </div>
  );

  return (
    <div style={{ ...wrappedDivStyle, ...keyboardStyle }} ref={drop}>
      {block}
    </div>
  );
};

function renderKeycap(
  maybeUsedKey: Option<UsedKey>,
  size: KeycapSize,
  x: number,
  y: number
): JSX.Element {
  return pipe(
    maybeUsedKey,
    fold(
      () => <div />,
      (usedKey) => (
        <RemovableKeycap
          key={usedKey.id}
          _key={usedKey.id}
          size={size}
          keycapStyles={{ position: 'fixed', top: y, left: x }}
          selected={usedKey.selected}
          position={{ x, y }}
        />
      )
    )
  );
}

export default KeyBoard;
