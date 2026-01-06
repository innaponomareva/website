import { css, cx } from '@linaria/core';
import { colors } from '../../common';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';

export interface TextLabelProps {
  text: string;
  htmlFor: string;
  className?: string;
}

const Label: React.FC<TextLabelProps> = ({ text, htmlFor, className }) => {
  const { theme } = useThemeContext();

  return (
    <label
      className={cx(
        labelClass,
        className,
        theme === Themes.LIGHT ? 'light' : 'dark'
      )}
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
};

export default Label;

export const labelClass = css`
  font-size: 0.95rem;
  font-weight: 300;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: ${colors.WHITE_100};

  &.dark {
    color: ${colors.WHITE_80};
  }
`;
