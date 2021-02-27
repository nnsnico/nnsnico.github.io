import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { convertNumberFromUnit } from '../../keycapSize';
import { updateKeycap } from '../../reducer';
import { Position } from '../../reducer/keyboard';
import { DragItem, KeycapSize } from '../../types';

interface KeyFrameProps {
  pcbViewHeight: number;
  pcbViewWidth: number;
  keycapTotalSize: number;
  position: Position;
  size: KeycapSize;
}

const KeyFrame: React.FC<KeyFrameProps> = (props: KeyFrameProps) => {
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'keycap',
    canDrop: () => true,
    drop: (_, monitor) => {
      const item = monitor.getItem() as DragItem;

      if (props.size == item.size) {
        dispatch(
          updateKeycap({
            size: props.size,
            position: props.position,
            usedKey: {
              id: item._key,
              selected: false,
            },
          })
        );
      }
    },
  });
  return (
    <div
      ref={drop}
      style={{
        width:
          (props.pcbViewWidth / props.keycapTotalSize) *
          convertNumberFromUnit(props.size),
        height: props.pcbViewHeight / props.keycapTotalSize,
        backgroundColor: 'red',
      }}>
      {props.size}
    </div>
  );
};
export default KeyFrame;
