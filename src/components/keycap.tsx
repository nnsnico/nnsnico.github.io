import React from 'react';
import { useDrag } from 'react-dnd';

type KeyboardProps = {
  text: string;
};

const KeyCap: React.FC = () => {
  const [{ opacity, width }, dragRef] = useDrag({
    item: { type: 'keycap' },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
      width: '200px',
    }),
  });
  return (
    <img
      src={
        'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'
      }
      ref={dragRef}
      style={{ opacity, width, zIndex: 1 }}
    />
  );
};

export default KeyCap;
