import React from 'react';
import { useDrag } from 'react-dnd';

import { KeyCapId } from '../types';

interface KeyCapProps {
  id: KeyCapId;
  styles?: React.CSSProperties;
}

const KeyCap: React.FC<KeyCapProps> = (props: KeyCapProps) => {
  const id = props.id.toString();
  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'keycap', id },
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
      <span>{id}</span>
    </div>
  );
};

export default KeyCap;
