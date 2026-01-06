import { css, cx } from '@linaria/core';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={cx(layoutClass, className)}>{children}</div>
);

export default Layout;

export const layoutClass = css`
  padding: 9rem 2.5rem;
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
`;
