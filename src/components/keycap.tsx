import { fromNullable } from 'fp-ts/es6/Option';
import React from 'react';
import { useDrag } from 'react-dnd';

import { convertNumberFromUnit } from '../keycapSize';
import { MAC_JIS_PCB } from '../keyframes';
import { DragItem, KeycapSize } from '../types';

export interface KeycapProps {
  _key: string;
  size: KeycapSize;
  styles?: React.CSSProperties;
  isDragedFromTab?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Keycap: React.FC<KeycapProps> = (props: KeycapProps) => {
  const _key = props._key;
  const size = props.size.toString();
  const isDragedFromTab = fromNullable(props.isDragedFromTab);
  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'keycap', _key, size, isDragedFromTab } as DragItem,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

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
      <img
        style={{
          width:
            (MAC_JIS_PCB.width / MAC_JIS_PCB.keycapTotalWidth) *
            convertNumberFromUnit(props.size),
          height: MAC_JIS_PCB.height / MAC_JIS_PCB.keycapTotalWidth,
          maxWidth: 'none',
        }}
        src={
          'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'
        }
      />
      <span style={{ position: 'absolute', top: 0 }}>{_key}</span>
      {props.children}
    </div>
  );
};

export default Keycap;
