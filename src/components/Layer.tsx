import { css, cx } from '@linaria/core';

interface LayerProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
}

const Layer: React.FC<LayerProps> = ({ children, className, style }) => {
  return (
    <div className={cx(layerClass, className)} style={style}>
      {children}
    </div>
  );
};

export default Layer;

export const layerClass = css`
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: grid;
  justify-content: center;
  align-items: center;
`;
