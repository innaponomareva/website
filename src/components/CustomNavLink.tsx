import { css, cx } from '@linaria/core';
import { NavLink } from 'react-router';
import { colors } from '../common';

interface CustomNavLinkProps {
  to: string;
  label: string;
  active?: boolean;
  className?: string;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  label,
  className,
  active,
}) => {
  return (
    <NavLink to={to} className={cx(customNavLinkClass, className)}>
      {label}
      <div className={cx('divider', active && 'show')} />
    </NavLink>
  );
};

export default CustomNavLink;

export const customNavLinkClass = css`
  color: ${colors.WHITE_100};
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;

  .divider {
    opacity: 0;
    border-bottom: 1px solid ${colors.WHITE_100};
    margin: 0.3rem 0.3rem 0 0;
    transition: 0.3s ease-in;

    &.show {
      opacity: 1;
    }
  }
`;
