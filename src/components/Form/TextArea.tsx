import { css, cx } from '@linaria/core';
import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { colors } from '../../common';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';

export interface TextAriaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAriaProps>(
  ({ label, helperText, error, className, id, ...rest }, ref) => {
    const { theme } = useThemeContext();
    const reactId = useId();
    const textareaId = id ?? reactId;
    const showError = Boolean(error);

    return (
      <div
        className={cx(
          textAreaClass,
          className,
          theme === Themes.LIGHT ? 'light' : 'dark'
        )}
      >
        {label && <Label text={label} htmlFor={textareaId} />}
        <textarea
          id={textareaId}
          ref={ref}
          placeholder={helperText}
          aria-label={label}
          {...rest}
        />
        <ErrorMessage text={showError ? error : ''} />
      </div>
    );
  }
);

export default TextArea;

export const textAreaClass = css`
  display: grid;

  textarea {
    border: none;
    background: transparent;

    resize: none;
    height: 12rem;
    padding: 1rem;
    border-bottom: 0.075rem solid ${colors.WHITE_100};
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
  }

  &.dark {
    textarea {
      border-bottom-color: ${colors.WHITE_80};
      color: ${colors.WHITE_80};

      &::placeholder {
        color: ${colors.WHITE_20};
        opacity: 1;
      }
    }
  }
`;
