import { css, cx } from '@linaria/core';
import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { colors } from '../../common';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string | undefined;
  className?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, helperText, error, className, id, autoComplete = 'off', ...rest },
    ref
  ) => {
    const { theme } = useThemeContext();
    const reactId = useId();
    const inputId = id ?? reactId;
    const showError = Boolean(error);

    return (
      <div
        className={cx(
          textInputClass,
          className,
          theme === Themes.LIGHT ? Themes.LIGHT : Themes.DARK
        )}
      >
        {label && <Label text={label} htmlFor={inputId} />}
        <input
          id={inputId}
          ref={ref}
          placeholder={helperText}
          autoComplete={autoComplete}
          aria-label={label}
          {...rest}
        />
        <ErrorMessage text={showError ? error : ''} />
      </div>
    );
  }
);

export default TextInput;

export const textInputClass = css`
  display: grid;

  input {
    border: none;
    border-bottom: 0.075rem solid ${colors.WHITE_100};
    background: transparent;
    padding: 1rem;
    color: ${colors.BLUE_2};
    font-size: 1.07rem;
    font-weight: 300;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${colors.BLUE_2};
      opacity: 0.4;
    }

    &:-webkit-autofill {
      -webkit-background-clip: text;
      -webkit-text-fill-color: ${colors.BLUE_2};
    }
  }

  &.dark {
    input {
      border-bottom-color: ${colors.WHITE_80};
      color: ${colors.WHITE_80};

      &::placeholder {
        color: ${colors.WHITE_20};
        opacity: 1;
      }

      &:-webkit-autofill {
        -webkit-text-fill-color: ${colors.WHITE_80};
      }
    }
  }
`;
