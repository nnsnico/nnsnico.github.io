import React from 'react';

import { convertNumberFromUnit } from '../../keycapSize';
import { Position } from '../../reducer/keyboard';
import { KeycapSize } from '../../types';

interface KeyFrameProps {
  pcbViewHeight: number;
  pcbViewWidth: number;
  keycapSize: number;
  position: Position;
  size: KeycapSize;
}

const KeyFrame: React.FC<KeyFrameProps> = (props: KeyFrameProps) => {
  return (
    <div
      key={(props.position.x + 1) * (props.position.y + 1)}
      style={{
        width:
          (props.pcbViewWidth / props.keycapSize) *
          convertNumberFromUnit(props.size),
        height: props.pcbViewHeight / props.keycapSize,
        backgroundColor: 'red',
      }}>
      {props.size}
    </div>
  );
};
export default KeyFrame;
