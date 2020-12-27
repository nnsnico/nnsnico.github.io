import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { RootState } from '../reducer';

const w: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  // TODO: これがあるとNavigationに覆いかぶさってしまう
  // top: 0,
};
const s: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
};

const KeyBoard: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter);
  const [{ opacity, width, margin }, dragRef] = useDrag({
    item: { type: 'example' },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
      width: '800px',
      margin: '0 auto',
    }),
  });
  return (
    <div style={w}>
      <div style={s}>
        <img
          src={
            'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'
          }
          ref={dragRef}
          style={{ opacity, width, margin }}
          onClick={() => console.log(count)}
        />
      </div>
    </div>
  );
};

export default KeyBoard;
