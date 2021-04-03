import { fold, Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/lib/Option';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as B from '../ext/boolean';
import getPCB from '../pcb';
import { setPCBSize, initKeyBoard, setPCBId } from '../reducer';
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
  marginTop: '80px',
};

const KeyBoard: React.FC = () => {
  const { keyframes } = useSelector((state: RootState) => state.keyboard);
  const { size, id } = useSelector((state: RootState) => state.pcb);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPCBId({ id: 'MacJis' }));
  }, [dispatch]);

  useEffect(() => {
    (async (): Promise<void> => {
      if (O.isSome(id)) {
        const config = await getPCB(id.value);
        dispatch(
          setPCBSize({
            size: {
              width: config.width,
              height: config.height,
              keycapTotalWidth: config.keycapTotalWidth,
            },
          })
        );
        dispatch(
          initKeyBoard({
            keyboard: {
              keyframes: config.keyframes,
              pcbName: config.pcbName,
            },
          })
        );
      }
    })();
  }, [dispatch, id]);

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
        pipe(
          size,
          O.fold(
            () => <div />,
            (pcbSize) => (
              <KeyFrame
                key={`${keyframes[i].position.x}_${keyframes[i].position.y}`}
                keycapTotalSize={pcbSize.keycapTotalWidth}
                position={keyframes[i].position}
                pcbViewWidth={pcbSize.width}
                pcbViewHeight={pcbSize.height}
                size={keyframes[i].size}
              />
            )
          )
        )
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
