import { fromNullable } from 'fp-ts/es6/Option';
import * as O from 'fp-ts/lib/Option';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { convertNumberFromUnit } from '../keycapSize';
import { DragItem, KeycapSize, RootState } from '../types';

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
  const keycapSize = props.size.toString();
  const isDragedFromTab = fromNullable(props.isDragedFromTab);
  const { size } = useSelector((state: RootState) => state.pcb);
  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: 'keycap',
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
        <img
          style={{
            width:
              (size.value.width / size.value.keycapTotalWidth) *
              convertNumberFromUnit(props.size),
            height: size.value.height / size.value.keycapTotalWidth,
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
  } else {
    return <div />;
  }
};

export default Keycap;
