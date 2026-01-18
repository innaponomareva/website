import { css, cx } from '@linaria/core';
import { colors } from '../common';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';

export enum AlertTypes {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AlertProps {
  className?: string;
  type?: AlertTypes;
  message?: React.ReactNode;
  open: boolean;
  hide: () => void;
}

const Alert: React.FC<AlertProps> = ({
  open,
  hide,
  message = null,
  type = AlertTypes.PRIMARY,
  className,
}) => {
  if (!open) return null;

  return (
    <div className={cx(alertClass, className, type)} role="alert">
      <Button className="close-btn" type="button" onClick={hide}>
        <MdOutlineClose />
      </Button>
      <>{message}</>
    </div>
  );
};

export default Alert;

export const alertClass = css`
  display: grid;
  justify-content: center;
  min-width: 15rem;
  min-height: 3.5rem;
  padding: 1rem 2rem 1rem 1rem;
  background-color: ${colors.BLUE_1};

  font-size: 0.95rem;
  line-height: 1.5rem;
  color: ${colors.BLUE_2};

  &.${AlertTypes.PRIMARY} {
    background-color: ${colors.BLUE_1};
  }

  &.${AlertTypes.SUCCESS} {
    background-color: ${colors.GREEN};
  }

  &.${AlertTypes.ERROR} {
    background-color: ${colors.RED};
  }

  .close-btn {
    width: 1.7rem;
    height: 1.7rem;
    color: ${colors.BLUE_2};

    position: absolute;
    top: 0;
    right: 0;
  }
`;
