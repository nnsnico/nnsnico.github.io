import { PayloadAction } from '@reduxjs/toolkit';
import React, { Dispatch } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { convertNumberFromUnit } from '../../keycapConverter';
import { updateKeycap } from '../../reducer';
import { UpdateKeycapPayload } from '../../reducer/keyboard';
import { DragItem, KeycapSize, Position } from '../../types';

export interface KeyFrameProps {
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

      //keyframeとkeycapのサイズが一致した時
      if (props.size == item.size) {
        if (item.size.match(/ISOEnter_(TOP|BOTTOM)/)) {
          putISOEnter(
            dispatch,
            props.position,
            props.size as 'ISOEnter_TOP' | 'ISOEnter_BOTTOM'
          );
          return;
        } else {
          return dispatch(
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
      }
      //ISOEnter_BOTTOMのkeyframeにISOEnter_TOPのkeycapが当てられた時、もしくはその逆
      else if (item.size.match(/ISOEnter_(TOP|BOTTOM)/)) {
        putISOEnter(
          dispatch,
          props.position,
          props.size as 'ISOEnter_TOP' | 'ISOEnter_BOTTOM'
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
        border: '1px solid gray',
      }}>
      <span>{props.size}</span>
    </div>
  );

  function putISOEnter(
    dispatch: Dispatch<PayloadAction<UpdateKeycapPayload>>,
    position: Position,
    ISOEnterSize: 'ISOEnter_TOP' | 'ISOEnter_BOTTOM'
  ): void {
    if (ISOEnterSize.includes('TOP')) {
      dispatch(
        updateKeycap({
          size: 'ISOEnter_TOP',
          position: position,
          usedKey: {
            id: 'ISOEnter',
            selected: false,
          },
        })
      );
      dispatch(
        updateKeycap({
          size: 'ISOEnter_BOTTOM',
          position: {
            x: position.x,
            y: position.y + 1,
          },
          usedKey: {
            id: 'ISOEnter_BOTTOM',
            selected: false,
          },
        })
      );
    } else {
      dispatch(
        updateKeycap({
          size: 'ISOEnter_TOP',
          position: {
            x: position.x,
            y: position.y - 1,
          },
          usedKey: {
            id: 'ISOEnter',
            selected: false,
          },
        })
      );
      dispatch(
        updateKeycap({
          size: 'ISOEnter_BOTTOM',
          position: position,
          usedKey: {
            id: 'ISOEnter_BOTTOM',
            selected: false,
          },
        })
      );
    }
  }
};
export default KeyFrame;
