import { css } from '@linaria/core';
import CustomNavLink from './CustomNavLink';
import { colors } from '../common';
import Layer from './Layer';
import Layout from './Layout';

interface NavStartProps {
  className?: string;
}

const NavStart: React.FC<NavStartProps> = () => {
  return (
    <Layer>
      <nav className={navStartClass}>
        <Layout className="layout">
          <div className="grid-wrapper">
            <div className="nav-item">
              <CustomNavLink to="/about" label="about" className="text" />
            </div>
            <div className="nav-item">
              <CustomNavLink to="/contact" label="contact" className="text" />
            </div>
          </div>
        </Layout>
      </nav>
    </Layer>
  );
};

export default NavStart;

export const navStartClass = css`
  .layout {
    grid-template-columns: minmax(auto, 1200px);
    padding: 0 2.5rem;
  }

  .grid-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 11%;
    z-index: 2;
  }

  .text {
    color: ${colors.WHITE_100};
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.2rem;
    font-size: 0.95rem;
  }

  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-item:nth-child(1) {
    grid-column: 1/2;
  }

  .nav-item:nth-child(2) {
    grid-column: 3/4;
  }
`;
