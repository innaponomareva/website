import { css, cx } from '@linaria/core';
import { colors } from '../../common';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';

interface ColumnTitleProps {
  className?: string;
  title?: string;
}

const ColumnTitle: React.FC<ColumnTitleProps> = ({ className, title }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={cx(
        columnTitleClass,
        className,
        theme === Themes.DARK && 'dark'
      )}
    >
      <div className="column-title">{title}</div>
    </div>
  );
};

export default ColumnTitle;

export const columnTitleClass = css`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;
  color: ${colors.WHITE_100};

  border-bottom: 0.075rem solid;
  border-color: ${colors.WHITE_100};

  padding-bottom: 5px;
  margin-bottom: 25px;

  &.dark {
    color: ${colors.WHITE_80};
    border-color: ${colors.WHITE_80};
  }
`;
