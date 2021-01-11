import React from 'react';

interface RemoveButtonProps {
  onClick: () => void;
  styles?: React.CSSProperties;
}

const RemoveButton: React.FC<RemoveButtonProps> = (
  props: RemoveButtonProps
) => {
  const onClick = props.onClick;
  const styles = props.styles;

  return (
    <div onClick={onClick} style={styles}>
      [x]
    </div>
  );
};

export default RemoveButton;
