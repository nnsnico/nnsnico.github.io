import React from 'react';

import { convertNumberFromUnit } from '../../keycapSize';
import { Position, UsedKey } from '../../reducer/keyboard';
import { KeycapSize } from '../../types';

interface KeyFrameProps {
  pcbViewWidth: number;
  keycapSize: number;
  position: Position;
  size: KeycapSize;
}

const KeyFrame: React.FC<KeyFrameProps> = (props: KeyFrameProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: props.position.y * 50,
        left: props.position.x * 50,
        width:
          (props.pcbViewWidth / props.keycapSize) *
          convertNumberFromUnit(props.size),
        height: props.pcbViewWidth / props.keycapSize,
        backgroundColor: 'red',
      }}>
      {props.size}
    </div>
  );
};
export default KeyFrame;
