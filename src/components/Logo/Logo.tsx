import { css, cx } from '@linaria/core';
import LogoBack from './LogoBack';
import LogoTypo from './LogoTypo';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cx(logoClass, className)}>
      <LogoBack className="logo-back" />
      <LogoTypo className="logo-typo" />
    </div>
  );
};

export default Logo;

export const logoClass = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo-back {
    width: 100%;
  }

  .logo-typo {
    position: absolute;
    width: 57.5%;
  }
`;
