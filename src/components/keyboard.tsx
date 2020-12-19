import React, {CSSProperties} from 'react';
import {useDrag} from 'react-dnd'

type Props = {
    text: string;
}

const w = {
    'position': 'absolute',
    'width': '100%',
    top: 0
} as CSSProperties;
const s = {
    'display': 'flex',
    'align-items': 'center',
    height: '100vh',
    'justify-content': 'center'
} as CSSProperties;

const KeyBoard: React.FC<Props> = ({text}) => {
    const [{opacity, width, margin}, dragRef] = useDrag({
        item: {type: "knight", text},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
            width: '400px',
            margin: '0 auto'
        })
    })
    return (
        <div style={w}>
            <div style={s}>
                <img
                    src={'https://1.bp.blogspot.com/-YnNw0nmy5WY/X5OcdKUoDhI/AAAAAAABb-w/Ws-6a4R4Io4IAWwuxtx8ilCxY9RgmKGHgCNcBGAsYHQ/s450/nature_ocean_kaisou.png'}
                    ref={dragRef}
                    style={{opacity, width, margin}}/>
            </div>
        </div>
    );
};

export default KeyBoard;