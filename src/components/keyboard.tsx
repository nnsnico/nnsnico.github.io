import { fold, Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import React from 'react';
import { useSelector } from 'react-redux';

import * as B from '../ext/boolean';
import { MAC_JIS_PCB } from '../keyframes';
import { UsedKey } from '../reducer/keyboard';
import { KeycapSize, RootState } from '../types';
import KeyFrame from './atomic/keyframe';
import RemovableKeycap from './molecules/removableKeycap';

const wrappedDivStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  zIndex: -1,
};

const keyboardStyle: React.CSSProperties = {
  // height: '100vh',
  marginTop: '80px',
};

const KeyBoard: React.FC = () => {
  const { keyframes } = useSelector((state: RootState) => state.keyboard);

  const block = [];
  let column: JSX.Element[] = [];
  let y = 0;
  for (let i = 0; i < keyframes.length; i++) {
    if (y != keyframes[i].position.y) {
      y = keyframes[i].position.y;
      block.push(
        <div key={`column_${y}`} style={{ display: 'flex' }}>
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
          key={`${keyframes[i].position.x}_${keyframes[i].position.y}`}
          keycapTotalSize={MAC_JIS_PCB.keycapTotalWidth}
          position={keyframes[i].position}
          pcbViewWidth={MAC_JIS_PCB.width}
          pcbViewHeight={MAC_JIS_PCB.height}
          size={keyframes[i].size}
        />
      )
    );
  }
  block.push(
    <div key={`column_${y + 1}`} style={{ display: 'flex' }}>
      {column}
    </div>
  );

  return <div style={{ ...wrappedDivStyle, ...keyboardStyle }}>{block}</div>;
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
          key={`${usedKey.id}_${x}_${y}`}
          _key={usedKey.id}
          size={size}
          selected={usedKey.selected}
          position={{ x, y }}
        />
      )
    )
  );
}

export default KeyBoard;
