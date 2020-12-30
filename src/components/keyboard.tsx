import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { insertKeyCap, updateKeyCapPosition, RootState } from '../reducer';
import { KeyboardPayload } from '../reducer/keyboard';
import { KeycapSize } from '../types';
import KeyCap from './keycap';

const wrappedDivStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  top: 0,
  zIndex: -1,
};

const keyboardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
};

const KeyBoard: React.FC = () => {
  // const { draggingKeycapId } = useSelector((state: RootState) => state.keyCap);
  const { putKeycaps } = useSelector((state: RootState) => state.keyboard);
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'keycap',
    canDrop: () => true,
    drop: (_, monitor) => {
      const offset = monitor.getClientOffset();
      const size = monitor.getItem().size;
      if (offset != null) {
        const usedSizeSet = putKeycaps.map((v) => v.size);
        // キーボード画面上に同じ大きさのキーキャップがあればidにsuffixをつけて新しく生成。さもなければsuffixなしで生成。
        if (usedSizeSet.includes(size)) {
          const usedKeysMatchesSize = putKeycaps
            .filter((v) => v.size === size)
            .flatMap((v) => v.usedKeys);
          // ドラッグしたキーキャップがタブからドラッグしていれば新しく生成。さもなければidをチェックして座標を更新するコンポーネントを選択
          if (monitor.getItem().isDragedFromTab != null) {
            dispatch(
              insertKeyCap({
                size,
                usedKey: {
                  id: size + '_' + usedKeysMatchesSize.length,
                  position: {
                    x: offset.x,
                    y: offset.y,
                  },
                },
              })
            );
          } else {
            const keycap: KeyboardPayload = {
              size: monitor.getItem().size,
              usedKey: {
                id: monitor.getItem()._key,
                position: {
                  x: offset.x,
                  y: offset.y,
                },
              },
            };
            dispatch(updateKeyCapPosition(keycap));
          }
        } else {
          dispatch(
            insertKeyCap({
              size,
              usedKey: {
                id: size,
                position: {
                  x: offset.x,
                  y: offset.y,
                },
              },
            })
          );
        }
      }
    },
  });

  return (
    <div style={wrappedDivStyle}>
      <div style={keyboardStyle} ref={drop}>
        {putKeycaps.map((keycap) =>
          keycap.usedKeys.map((key) =>
            renderKeyCap(key.id, keycap.size, key.position.x, key.position.y)
          )
        )}
      </div>
    </div>
  );
};

function renderKeyCap(capId: string, size: KeycapSize, x: number, y: number) {
  if (capId != null) {
    return (
      <KeyCap
        key={capId}
        _key={capId}
        size={size}
        styles={{ position: 'fixed', top: y, left: x }}
      />
    );
  }
}

export default KeyBoard;
