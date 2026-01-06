import { css, cx } from '@linaria/core';
import { FaRegStar } from 'react-icons/fa';
import { colors } from '../../common';
import { mediaMin, nthChild, range } from '../../utils/css';

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
      {Array.from({ length: 50 }).map((_, index) => (
        <Star key={index} />
      ))}
    </div>
  );
};

export default Stars;

const hiddenChildren = [
  nthChild(1),
  nthChild(3),
  nthChild(5),
  nthChild(7),
  nthChild(9),
  nthChild(12),
  ...range(14, 16),
  nthChild(18),
  ...range(20, 21),
  ...range(23, 27),
  nthChild(29),
  nthChild(32),
  nthChild(34),
  nthChild(36),
  nthChild(38),
  ...range(40, 41),
  nthChild(43),
  nthChild(45),
  nthChild(47),
  nthChild(49),
].join(', ');

const twinkleOutChildren = [
  nthChild(2),
  nthChild(6),
  nthChild(10),
  nthChild(13),
  nthChild(19),
  nthChild(22),
  nthChild(30),
  nthChild(33),
  nthChild(37),
  nthChild(42),
  nthChild(46),
  nthChild(50),
].join(', ');

const twinkleInChildren = [
  nthChild(4),
  nthChild(8),
  nthChild(11),
  nthChild(15),
  nthChild(17),
  nthChild(28),
  nthChild(31),
  nthChild(35),
  nthChild(39),
  nthChild(44),
  nthChild(48),
].join(', ');

export const starsClass = css`
  position: absolute;
  inset: 0;
  z-index: 0;
  height: 100%;
  padding-top: 4rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 12%;

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

  & > :is(${twinkleOutChildren}) {
    animation: twinkleOut 6s infinite;
  }

  & > :is(${twinkleInChildren}) {
    animation: twinkleIn 6s infinite;
  }

  & > :is(${hiddenChildren}) {
    opacity: 0;
    color: red;
  }

  ${mediaMin.xs} {
    padding-top: 1rem;
  }

  ${mediaMin.lg} {
    gap: 10%;
  }
`;
