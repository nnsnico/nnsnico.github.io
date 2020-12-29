import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { insertKeyCap, updateKeyCapPosition, RootState } from '../reducer';
import { KeyCapId } from '../types';
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
    // keyboard内でD&Dしたときに呼ばれる
    drop: (_, monitor) => {
      const offset = monitor.getClientOffset();
      const id = monitor.getItem().id;
      if (offset != null) {
        const idSet = putKeycaps.map((v) => v.id);
        const keycap = {
          id: monitor.getItem().id,
          position: {
            x: offset.x,
            y: offset.y,
          },
        };
        if (idSet.includes(id)) {
          dispatch(updateKeyCapPosition(keycap));
        } else {
          dispatch(insertKeyCap(keycap));
        }
      }
    },
  });

  return (
    <div style={wrappedDivStyle}>
      <div style={keyboardStyle} ref={drop}>
        {putKeycaps.map((keycap) =>
          renderKeyCap(keycap.id, keycap.position.x, keycap.position.y)
        )}
      </div>
    </div>
  );
};

function renderKeyCap(capId: KeyCapId, x: number, y: number) {
  if (capId != null) {
    return (
      <KeyCap
        key={capId}
        id={capId}
        styles={{ position: 'fixed', top: y, left: x }}
      />
    );
  }
}

export default KeyBoard;
