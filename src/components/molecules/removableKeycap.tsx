import React from 'react';

import { KeycapSize } from '../../types';
import KeyCap from '../keycap';
import RemoveButton from '../removeButton';

interface KeyCapProps {
  capId: string;
  size: KeycapSize;
  _key: string;
  selected: boolean;
  onSelected: () => void;
  onClickDelete: () => void;
  keycapStyles?: React.CSSProperties;
}

const RemovableKeyCap: React.FC<KeyCapProps> = (props: KeyCapProps) => (
  <KeyCap
    styles={props.keycapStyles}
    _key={props.capId}
    size={props.size}
    onClick={props.onSelected}>
    <RemoveButton
      styles={{ visibility: props.selected ? 'visible' : 'hidden' }}
      onClick={props.onClickDelete}
    />
  </KeyCap>
);
export default RemovableKeyCap;
