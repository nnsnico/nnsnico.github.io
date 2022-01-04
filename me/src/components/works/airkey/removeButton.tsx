import { PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';

import { removeKeycap } from '../../../reducer';
import { RemoveKeyboardPayload } from '../../../reducer/keyboard';
import { KeycapSize, Position } from '../../../type';

interface RemoveButtonProps {
  size: KeycapSize;
  position: Position;
  styles?: React.CSSProperties;
}

const RemoveButton: React.FC<RemoveButtonProps> = (
  props: RemoveButtonProps
) => {
  const dispatch = useDispatch();
  const remove = removeKeycap({
    position: props.position,
  });
  const styles = props.styles;

  return (
    <div
      onClick={(): PayloadAction<RemoveKeyboardPayload> => dispatch(remove)}
      style={styles}>
      [x]
    </div>
  );
};

export default RemoveButton;
