import { PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateKeycap } from '../../../reducer';
import { UpdateKeycapPayload } from '../../../reducer/keyboard';
import { KeycapSize, Position } from '../../../type';
import Keycap from './keycap';
import RemoveButton from './removeButton';

export interface RemovableKeycapProps {
  size: KeycapSize;
  _key: string;
  selected: boolean;
  position: Position;
}

const RemovableKeycap: React.FC<RemovableKeycapProps> = (
  props: RemovableKeycapProps
) => {
  const dispatch = useDispatch();
  const toggleSelectAction: PayloadAction<UpdateKeycapPayload> = updateKeycap({
    position: props.position,
    usedKey: {
      id: props._key,
      selected: !props.selected,
    },
    size: props.size,
  });

  return (
    <Keycap
      _key={props._key}
      size={props.size}
      onClick={(): PayloadAction<UpdateKeycapPayload> =>
        dispatch(toggleSelectAction)
      }>
      <RemoveButton
        size={props.size}
        position={props.position}
        styles={{
          visibility: props.selected ? 'visible' : 'hidden',
          position: 'absolute',
          bottom: 0,
        }}
      />
    </Keycap>
  );
};

export default RemovableKeycap;
