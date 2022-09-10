import { fromNullable } from 'fp-ts/es6/Option';
import * as O from 'fp-ts/lib/Option';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import {
  convertKeyCapSizeToColor,
  convertNumberFromUnit,
} from '../../../util/keycapConverter';
import { DragItem, KeycapSize, RootState } from '../../../type';

export interface KeycapProps {
  _key: string;
  size: KeycapSize;
  styles?: React.CSSProperties;
  isDragedFromTab?: boolean;
  onClick?: () => void;
  children?: React.ReactNode
}

const Keycap: React.FC<KeycapProps> = (props: KeycapProps) => {
  const _key = props._key;
  const keycapSize = props.size.toString();
  const isDragedFromTab = fromNullable(props.isDragedFromTab);
  const { size } = useSelector((state: RootState) => state.pcb);
  const [{ opacity }, dragRef] = useDrag({
    type: 'keycap',
    item: {
      _key,
      size: keycapSize,
      isDragedFromTab,
    } as DragItem,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  if (O.isSome(size)) {
    return (
      <div
        onClick={props.onClick}
        ref={dragRef}
        style={{
          ...props.styles,
          position: 'relative',
          opacity,
          zIndex: 1,
        }}>
        <div
          style={{
            width:
              (size.value.pixelWidth / size.value.rowTotalUnitSize) *
              convertNumberFromUnit(props.size),
            height: size.value.pixelHeight / size.value.rowTotalUnitSize,
            maxWidth: 'none',
            backgroundColor: convertKeyCapSizeToColor(props.size),
            border: '1px solid gray',
            boxSizing: 'border-box',
          }}
        />
        <span style={{ position: 'absolute', top: 0 }}>{keycapSize}</span>
      </div>
    );
  } else {
    return <div />;
  }
};

export default Keycap;
