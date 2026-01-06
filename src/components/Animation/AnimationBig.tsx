import { css } from '@linaria/core';
import PathBig from '../icons/Path/PathBig';
import PathPointsBig from '../icons/Path/PathPointsBig';
import { colors } from '../../common';
import Airplane from '../icons/Airplane';
import Layer from '../Layer';
import { mediaMin } from '../../utils/css';
import useAnimation from '../../hooks/useAnimation';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import Rocket from '../icons/Rocket/Rocket';
import Layout from '../Layout';

const AnimationBig = () => {
  const { theme } = useThemeContext();
  useAnimation({ motionObjectSelector: '.motion-object', duration: 30000 });

  return (
    <div className={animationBigClass}>
      <Layer>
        <Layout className="layout">
          <PathBig className="motion-path" />
          <div className="motion-object">
            {theme === Themes.LIGHT && <Airplane className="airplane" />}
            {theme === Themes.DARK && <Rocket className="rocket" />}
          </div>
        </Layout>
      </Layer>
      <Layer>
        <Layout className="layout">
          <PathPointsBig color={colors.WHITE_100} className="points" />
        </Layout>
      </Layer>
    </div>
  );
};

export default AnimationBig;

export const animationBigClass = css`
  .layout {
    grid-template-columns: minmax(auto, 1200px);
    padding: 0 2.5rem;
  }

  .motion-object {
    width: 3rem; // <-- rocket size
    height: 2rem;
    position: absolute;
    top: -1rem;
    left: 1rem;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .airplane {
    font-size: 2.2rem;
    color: ${colors.WHITE_100};
  }

  .points path {
    opacity: 1;
  }

  ${mediaMin.md} {
    .motion-object {
      width: 3.5rem;
      left: 0.5rem;
    }

    .airplane {
      font-size: 2.5rem;
    }
  }

  ${mediaMin.xl} {
    .motion-object {
      width: 4rem;
    }
    .airplane {
      font-size: 3rem;
    }
  }
`;
