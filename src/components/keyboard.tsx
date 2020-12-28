import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useSelector } from 'react-redux';

import { RootState } from '../reducer';
import KeyCap, { KeyCapId } from './keycap';

const w: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  top: 0,
  zIndex: -1,
};
const s: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
};
let x = 0;
let y = 0;
const KeyBoard: React.FC = () => {
  const capId: KeyCapId = useSelector((state: RootState) => state.keyCap);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'keycap',
    canDrop: () => true,
    drop: (item, monitor) => {
      //keyCap描画
      const off: XYCoord | null = monitor.getClientOffset();
      if (off != null) {
        x = off.x;
        y = off.y;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div style={w}>
      <div style={s} ref={drop}>
        {renderKeyCap(capId, x, y)}
      </div>
    </div>
  );
};

function renderKeyCap(capId: KeyCapId, x: number, y: number) {
  if (capId != -1) {
    return (
      <KeyCap id={capId} styles={{ position: 'fixed', top: y, left: x }} />
    );
  }
}

export default KeyBoard;
