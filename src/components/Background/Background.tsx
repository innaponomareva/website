import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import Clouds from './Clouds';
import Stars from './Stars';
import { css, cx } from '@linaria/core';
import { colors } from '../../common';

interface BackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={cx(
        backgroundClass,
        theme === Themes.LIGHT ? 'light' : 'dark',
        className
      )}
    >
      {theme === Themes.LIGHT ? <Clouds /> : <Stars />}
      <div className="content">{children}</div>
    </div>
  );
};

export default Background;

const backgroundClass = css`
  position: relative;
  display: grid;

  &.light {
    background: linear-gradient(
      180deg,
      ${colors.BLUE_0} 0%,
      ${colors.BLUE_1} 100%
    );
  }

  &.dark {
    background-color: ${colors.BLUE_3};
  }

  .content {
    position: relative;
    z-index: 1;
  }
`;
