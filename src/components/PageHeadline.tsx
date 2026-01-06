import { css, cx } from '@linaria/core';
import { colors } from '../common';

interface PageHeadlineProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeadline: React.FC<PageHeadlineProps> = ({ children, className }) => (
  <div className={cx(pageHeadlineClass, className)}>{children}</div>
);

export default PageHeadline;

export const pageHeadlineClass = css`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 1.1rem;
  color: ${colors.WHITE_100};
  line-height: 1.5rem;
  text-align: center;
`;
