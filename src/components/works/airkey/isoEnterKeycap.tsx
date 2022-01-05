import { fromNullable } from 'fp-ts/es6/Option';
import * as O from 'fp-ts/lib/Option';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { DragItem, KeycapSize, RootState } from '../../../type';
import {
  convertKeyCapSizeToColor,
  convertNumberFromUnit,
} from '../../../util/keycapConverter';

export interface ISOEnterKeycapProps {
  _key: string;
  size: KeycapSize;
  isDraggedFromTab?: boolean;
}

const ISOEnterKeycap: React.FC<ISOEnterKeycapProps> = (
  props: ISOEnterKeycapProps
) => {
  const _key = props._key;
  const keycapSize = props.size.toString();
  const isDragedFromTab = fromNullable(props.isDraggedFromTab);
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
      <div style={{ position: 'relative' }}>
        <div
          ref={dragRef}
          style={{
            position: 'absolute',
            opacity,
            zIndex: 1,
          }}>
          <div
            style={{
              width:
                (size.value.pixelWidth / size.value.rowTotalUnitSize) *
                convertNumberFromUnit('ISOEnter_TOP'),
              height: size.value.pixelHeight / size.value.rowTotalUnitSize,
              maxWidth: 'none',
              backgroundColor: convertKeyCapSizeToColor(props.size),
            }}>
            <span>{keycapSize}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                width:
                  (size.value.pixelWidth / size.value.rowTotalUnitSize) *
                  convertNumberFromUnit('ISOEnter_BOTTOM'),
                height: size.value.pixelHeight / size.value.rowTotalUnitSize,
                maxWidth: 'none',
                display: 'inline-block',
                backgroundColor: convertKeyCapSizeToColor(props.size),
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ISOEnterKeycap;
