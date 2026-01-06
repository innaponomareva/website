import { css, cx } from '@linaria/core';
import { colors } from '../../common';

export interface TextErrorProps {
  text: string | undefined;
  className?: string;
}

const ErrorMessage: React.FC<TextErrorProps> = ({ text, className }) => {
  return <p className={cx(errorMessageClass, className)}>{text}</p>;
};

export default ErrorMessage;

export const errorMessageClass = css`
  height: 3rem;
  padding-top: 0.25rem;

  font-family: Roboto-Light;
  font-size: 0.9rem;
  color: ${colors.WHITE_60};
`;
