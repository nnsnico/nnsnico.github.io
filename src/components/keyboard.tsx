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

  return (
    <div
      style={{ ...wrappedDivStyle, ...keyboardStyle, width: '80%' }}
      ref={drop}>
      {keyframes.map((keyframe) =>
        B.fold(
          keyframe.isPut,
          renderKeycap(
            keyframe.keycap,
            keyframe.size,
            keyframe.position.x,
            keyframe.position.y
          ),
          <KeyFrame
            keycapSize={14.5}
            position={keyframe.position}
            pcbViewWidth={1000}
            size={keyframe.size}
          />
        )
      )}
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
