import { fromNullable } from 'fp-ts/es6/Option';
import * as O from 'fp-ts/lib/Option';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { convertNumberFromUnit } from '../keycapSize';
import { DragItem, KeycapSize, RootState } from '../types';

export interface ISOEnterKeycapProps {
  _key: string;
  size: KeycapSize;
  styles?: React.CSSProperties;
  isDraggedFromTab?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ISOEnterKeycap: React.FC<ISOEnterKeycapProps> = (
  props: ISOEnterKeycapProps
) => {
  const _key = props._key;
  const keycapSize = props.size.toString();
  const isDragedFromTab = fromNullable(props.isDraggedFromTab);
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
        <div style={{ textAlign: 'right' }}>
          <img
            style={{
              width:
                (size.value.pixelWidth / size.value.rowTotalUnitSize) *
                convertNumberFromUnit('ISOEnter_TOP'),
              height: size.value.pixelHeight / size.value.rowTotalUnitSize,
              maxWidth: 'none',
              display: 'inline-block',
            }}
            src={
              'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'
            }
          />
          <img
            style={{
              width:
                (size.value.pixelWidth / size.value.rowTotalUnitSize) *
                convertNumberFromUnit('ISOEnter_BOTTOM'),
              height: size.value.pixelHeight / size.value.rowTotalUnitSize,
              maxWidth: 'none',
              display: 'inline-block',
            }}
            src={
              'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'
            }
          />
        </div>
        <span style={{ position: 'absolute', top: 0 }}>ISOEnter</span>
        {props.children}
      </div>
    );
  } else {
    return <div />;
  }
};

export default ISOEnterKeycap;
