import { css, cx } from '@linaria/core';
import { colors } from '../common';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useState } from 'react';

export enum AlertTypes {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AlertProps {
  open: boolean;
  children?: React.ReactNode;
  type?: 'primary' | 'success' | 'error';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  open,
  children,
  type = AlertTypes.PRIMARY,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div
      className={cx(
        alertClass,
        className,
        isOpen ? 'visible' : 'hidden',
        type === AlertTypes.SUCCESS && AlertTypes.SUCCESS,
        type === AlertTypes.ERROR && AlertTypes.ERROR
      )}
      role="alert"
    >
      <Button className="close-btn" onClick={() => setIsOpen(false)}>
        <MdOutlineClose />
      </Button>
      <>{children}</>
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

  &.visible {
    opacity: 1;
  }

  &.hidden {
    opacity: 0;
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
