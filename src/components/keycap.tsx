import React from 'react';
import { useDrag } from 'react-dnd';

import { KeycapSize } from '../types';

interface KeyCapProps {
  _key: string;
  size: KeycapSize;
  styles?: React.CSSProperties;
  isDragedFromTab?: boolean;
}

const KeyCap: React.FC<KeyCapProps> = (props: KeyCapProps) => {
  const _key = props._key;
  const size = props.size.toString();
  const isDragedFromTab = props.isDragedFromTab;
  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'keycap', _key, size, isDragedFromTab },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  return (
    <div
      ref={dragRef}
      style={Object.assign(
        { opacity, width: '200px', zIndex: 1 },
        props.styles
      )}>
      <img
        src={
          'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'
        }
      />
      <span>{_key}</span>
    </div>
  );
};

export default KeyCap;
