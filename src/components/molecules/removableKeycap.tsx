import { PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateKeycap } from '../../reducer';
import { KeyboardPayload, Position } from '../../reducer/keyboard';
import { KeycapSize } from '../../types';
import Keycap from '../keycap';
import RemoveButton from '../removeButton';

interface RemovableKeycapProps {
  size: KeycapSize;
  _key: string;
  selected: boolean;
  position: Position;
  keycapStyles?: React.CSSProperties;
}

const RemovableKeycap: React.FC<RemovableKeycapProps> = (
  props: RemovableKeycapProps
) => {
  const dispatch = useDispatch();
  const toggleSelectAction: PayloadAction<KeyboardPayload> = updateKeycap({
    size: props.size,
    usedKey: {
      id: props._key,
      position: props.position,
      selected: !props.selected,
    },
  });

  return (
    <Keycap
      styles={props.keycapStyles}
      _key={props._key}
      size={props.size}
      onClick={(): PayloadAction<KeyboardPayload> =>
        dispatch(toggleSelectAction)
      }>
      <RemoveButton
        size={props.size}
        id={props._key}
        position={props.position}
        styles={{ visibility: props.selected ? 'visible' : 'hidden' }}
      />
    </Keycap>
  );
};

export default RemovableKeycap;
