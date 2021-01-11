import { PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';

import { removeKeycap } from '../reducer';
import { KeyboardPayload, Position } from '../reducer/keyboard';
import { KeycapSize } from '../types';

interface RemoveButtonProps {
  size: KeycapSize;
  id: string;
  position: Position;
  styles?: React.CSSProperties;
}

const RemoveButton: React.FC<RemoveButtonProps> = (
  props: RemoveButtonProps
) => {
  const dispatch = useDispatch();
  const remove = removeKeycap({
    size: props.size,
    usedKey: {
      id: props.id,
      position: props.position,
      selected: true,
    },
  });
  const styles = props.styles;

  return (
    <div
      onClick={(): PayloadAction<KeyboardPayload> => dispatch(remove)}
      style={styles}>
      [x]
    </div>
  );
};

export default RemoveButton;
