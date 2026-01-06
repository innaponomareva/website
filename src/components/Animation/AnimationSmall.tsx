import { css } from '@linaria/core';
import { colors } from '../../common';
import Airplane from '../icons/Airplane';
import Layer from '../Layer';
import PathSmall from '../icons/Path/PathSmall';
import PathPointsSmall from '../icons/Path/PathPointsSmall';
import useAnimation from '../../hooks/useAnimation';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import Rocket from '../icons/Rocket/Rocket';
import Layout from '../Layout';

const AnimationSmall = () => {
  const { theme } = useThemeContext();
  useAnimation({
    motionObjectSelector: '.motion-object',
    duration: 15000,
  });

  return (
    <div className={animationSmallClass}>
      <Layer>
        <Layout className="layout">
          <PathSmall className="motion-path" />
          <div className="motion-object">
            {theme === Themes.LIGHT && <Airplane className="airplane" />}
            {theme === Themes.DARK && <Rocket className="rocket" />}
          </div>
        </Layout>
      </Layer>
      <Layer>
        <Layout className="layout">
          <PathPointsSmall color={colors.WHITE_100} className="points" />
        </Layout>
      </Layer>
    </div>
  );
};

export default AnimationSmall;

export const animationSmallClass = css`
  .layout {
    grid-template-columns: minmax(auto, 500px);
    padding: 0 2.5rem;
  }

  .motion-object {
    width: 3.5rem; // <-- rocket size
    height: 2rem;
    position: absolute;
    top: -1rem;
    left: 0.75rem;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .airplane {
    font-size: 2.5rem;
    color: ${colors.WHITE_100};
  }

  .points path {
    opacity: 1;
  }
`;
