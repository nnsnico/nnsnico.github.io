import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { AppDispatch, setCapId } from '../reducer';

export type KeyCapId = number;
type KeyCapProps = {
  id: KeyCapId;
  styles: React.CSSProperties;
};

const KeyCap: React.FC<KeyCapProps> = (props: KeyCapProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [{ opacity, width }, dragRef] = useDrag({
    item: { type: 'keycap' },
    begin: () => {
      dispatch(setCapId(props.id));
    },
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
      style={Object.assign({ opacity, width, zIndex: 1 }, props.styles)}
    />
  );
};

export default KeyCap;
