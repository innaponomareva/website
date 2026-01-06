import { css, cx } from '@linaria/core';
import type { ButtonHTMLAttributes } from 'react';
import { colors } from '../common';
import { Themes, useThemeContext } from '../hooks/useThemeContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClickHandler?: () => void;
  className?: string;
  children?: React.ReactNode;
  hasBorder?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClickHandler,
  className,
  children,
  disabled,
  hasBorder = false,
  ...rest
}) => {
  const { theme } = useThemeContext();

  return (
    <button
      className={cx(
        buttonClass,
        className,
        theme === Themes.LIGHT ? 'light' : 'dark',
        hasBorder && 'border',
        disabled && 'disabled'
      )}
      onClick={onClickHandler}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

export const buttonClass = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  color: ${colors.WHITE_100};
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;

  &.border {
    border-width: 0.075rem;
    border-style: solid;
    border-color: ${colors.WHITE_100};
    padding: 0.5rem;
  }

  &.disabled {
    opacity: 40%;
    cursor: not-allowed;
  }

  &.dark {
    color: ${colors.WHITE_80};

    &.border {
      border-color: ${colors.WHITE_80};
    }

    &.disabled {
      opacity: 20%;
    }
  }
`;
