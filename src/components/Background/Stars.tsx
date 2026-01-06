import { css, cx } from '@linaria/core';
import { FaRegStar } from 'react-icons/fa';
import { colors } from '../../common';
import { nthChild, range } from '../../utils/css';

const Star: React.FC = () => {
  return (
    <div className="star-wrapper">
      <FaRegStar />
    </div>
  );
};

interface StarsProps {
  className?: string;
}

const Stars: React.FC<StarsProps> = ({ className }) => {
  return (
    <div className={cx(starsClass, className)}>
      {Array.from({ length: 49 }).map((_, index) => (
        <Star key={index} />
      ))}
    </div>
  );
};

export default Stars;

const hiddenChildren = [
  nthChild(2),
  nthChild(3),
  nthChild(5),
  nthChild(7),
  nthChild(9),
  nthChild(12),
  ...range(14, 16),
  nthChild(18),
  ...range(20, 29),
  nthChild(31),
  nthChild(33),
  ...range(35, 37),
  nthChild(39),
  nthChild(42),
  nthChild(44),
  nthChild(46),
  nthChild(48),
].join(', ');

export const starsClass = css`
  position: absolute;
  inset: 0;
  z-index: 0;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10%;

  .star-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: ${colors.WHITE_100};
    opacity: 80%;
  }

  @keyframes twinkleOut {
    from {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(0.4, 0.4, 0.4);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes twinkleIn {
    from {
      transform: scale3d(0.4, 0.4, 0.4);
    }
    50% {
      transform: scale3d(1, 1, 1);
    }
    to {
      transform: scale3d(0.4, 0.4, 0.4);
    }
  }

  & > ${nthChild('odd')} {
    animation: twinkleOut 6s infinite;
  }

  & > ${nthChild('even')} {
    animation: twinkleIn 6s infinite;
  }

  & > :is(${hiddenChildren}) {
    opacity: 0;
  }
`;
