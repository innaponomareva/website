import { css } from '@linaria/core';
import AnimationBig from '../components/Animation/AnimationBig.tsx';
import AnimationSmall from '../components/Animation/AnimationSmall.tsx';
import Background from '../components/Background/Background.tsx';
import NavStart from '../components/NavStart.tsx';
import Header from '../components/Header.tsx';
import { Layouts, useLayout } from '../hooks/useLayout.tsx';
import Logo from '../components/Logo/Logo.tsx';
import Layer from '../components/Layer.tsx';
import { mediaMin } from '../utils/css/index.tsx';

const Start = () => {
  const { layout } = useLayout();

  return (
    <Background className={startClass}>
      <Header />
      <Layer>
        <Logo className="logo" />
      </Layer>
      {layout === Layouts.LANDSCAPE && (
        <>
          <NavStart />
          <AnimationBig />
        </>
      )}
      {layout === Layouts.PORTRAIT && <AnimationSmall />}
    </Background>
  );
};

export default Start;

const startClass = css`
  min-height: 100vh;
  min-height: 100svh;

  .logo {
    width: 200px;
  }

  ${mediaMin.xs} {
    .logo {
      width: 250px;
    }
  }

  ${mediaMin.xl} {
    .logo {
      width: 300px;
    }
  }
`;
