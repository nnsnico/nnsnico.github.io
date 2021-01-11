import React from 'react';

import { KeycapSize } from '../../types';
import Keycap from '../keycap';
import RemoveButton from '../removeButton';

interface RemovableKeycapProps {
  capId: string;
  size: KeycapSize;
  _key: string;
  selected: boolean;
  onSelected: () => void;
  onClickDelete: () => void;
  keycapStyles?: React.CSSProperties;
}

const RemovableKeycap: React.FC<RemovableKeycapProps> = (
  props: RemovableKeycapProps
) => (
  <Keycap
    styles={props.keycapStyles}
    _key={props.capId}
    size={props.size}
    onClick={props.onSelected}>
    <RemoveButton
      styles={{ visibility: props.selected ? 'visible' : 'hidden' }}
      onClick={props.onClickDelete}
    />
  </Keycap>
);
export default RemovableKeycap;
