import { css, cx } from '@linaria/core';
import { BsCloudyFill } from 'react-icons/bs';
import { colors } from '../../common';
import { nthChild, range } from '../../utils/css';

const Cloud: React.FC = () => {
  return (
    <div className="cloud-wrapper">
      <BsCloudyFill />
    </div>
  );
};

interface CloudsProps {
  className?: string;
}

const Clouds: React.FC<CloudsProps> = ({ className }) => {
  return (
    <div className={cx(cloudsClass, className)}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Cloud key={index} />
      ))}
    </div>
  );
};

export default Clouds;

const hiddenChildren = [
  nthChild(1),
  nthChild(3),
  nthChild(5),
  ...range(7, 9),
  nthChild(11),
  nthChild(13),
  nthChild(15),
].join(', ');

export const cloudsClass = css`
  position: absolute;
  inset: 0;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  .cloud-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 70%;
      height: 70%;
      color: ${colors.WHITE_100};
      opacity: 15%;
    }
  }

  & > :is(${hiddenChildren}) {
    opacity: 0;
  }
`;
