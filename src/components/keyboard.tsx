import * as N from 'fp-ts/Eq/';
import { fold, Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as B from '../ext/boolean';
import getPCB from '../pcb';
import { initKeyBoard, setPCBId, setPCBSize } from '../reducer';
import { PCBSize } from '../reducer/pcb';
import {
  KeycapSize,
  KeyFrame as KeyFrameType,
  RootState,
  UsedKey,
} from '../types';
import KeyFrame from './atomic/keyframe';
import ISOEnterKeycap from './isoEnterKeycap';
import Keycap from './keycap';

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
              pixelWidth: config.pixelWidth,
              pixelHeight: config.pixelHeight,
              rowTotalUnitSize: config.rowTotalUnitSize,
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

  const rowKeyframes = pipe(
    A.bindTo('y')(
      pipe(
        keyframes.map((v) => v.position.y),
        A.uniq(N.eqNumber)
      )
    ),
    A.map((v) => (
      <div key={`column_${v.y + 1}`} style={{ display: 'flex' }}>
        {pipe(
          keyframes.filter((keyframe) => keyframe.position.y == v.y),
          A.map((v) => renderKeyframe(v, size))
        )}
      </div>
    ))
  );

  return (
    <div style={{ ...wrappedDivStyle, ...keyboardStyle }}>{rowKeyframes}</div>
  );
};

function renderKeyframe(
  keyframe: KeyFrameType,
  size: Option<PCBSize>
): JSX.Element {
  return B.fold(
    keyframe.isPut,
    renderKeycap(
      keyframe.keycap,
      keyframe.size,
      keyframe.position.x,
      keyframe.position.y
    ),
    pipe(
      size,
      O.fold(
        () => <div />,
        (pcbSize) => (
          <KeyFrame
            key={`${keyframe.position.x}_${keyframe.position.y}`}
            keycapTotalSize={pcbSize.rowTotalUnitSize}
            position={keyframe.position}
            pcbViewWidth={pcbSize.pixelWidth}
            pcbViewHeight={pcbSize.pixelHeight}
            size={keyframe.size}
          />
        )
      )
    )
  );
}

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
      (usedKey) => {
        if (usedKey.id == 'ISOEnter') {
          return (
            <ISOEnterKeycap _key={`${usedKey.id}_${x}_${y}`} size={size} />
          );
          //TODO 直したい =3
        } else if (usedKey.id == 'ISOEnter_BOTTOM') {
          return <div />;
        } else {
          return <Keycap _key={`${usedKey.id}_${x}_${y}`} size={size} />;
        }
      }
    )
  );
}

export default KeyBoard;
