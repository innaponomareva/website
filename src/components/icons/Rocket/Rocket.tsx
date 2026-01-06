import { css, cx } from '@linaria/core';
import RocketBody from './RocketBody';
import RocketTail from './RocketTail';
import { colors } from '../../../common';

interface RocketProps {
  className?: string;
}

const Rocket: React.FC<RocketProps> = ({ className }) => {
  return (
    <div className={cx(rocketClass, className)}>
      <RocketTail className="rocket-tail" />
      <RocketBody className="rocket-body" />
    </div>
  );
};

export default Rocket;

export const rocketClass = css`
  display: flex;

  .rocket-tail,
  .rocket-body {
    fill: ${colors.BLUE_3};
    stroke-width: 0.4rem;
    stroke: ${colors.WHITE_100};
  }

  .rocket-body {
    width: 100%;
  }

  .rocket-tail {
    width: 47%;
    margin-right: -3px;
    animation: tailMove 2s infinite;
  }

  @keyframes tailMove {
    from {
      transform: scale3d(1, 0.8, 1);
    }
    50% {
      transform: scale3d(0.8, 1, 0.8);
    }
    to {
      transform: scale3d(1, 0.8, 1);
    }
  }
`;
