import { css, cx } from '@linaria/core';
import CustomNavLink from './CustomNavLink';
import Button from './Button';
import { Layouts, useLayout } from '../hooks/useLayout';
import usePage, { Pages, RouteTypes } from '../hooks/usePage';
import { mediaMin } from '../utils/css';
import { Themes, useThemeContext } from '../hooks/useThemeContext';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { isAboutPage, isContactPage, isStartPage, isNotFoundPage } = usePage();
  const { layout } = useLayout();
  const { theme, changeTheme } = useThemeContext();

  return (
    <div className={cx(headerClass, className)}>
      <nav>
        {(isAboutPage ||
          isContactPage ||
          isNotFoundPage ||
          (isStartPage && layout === Layouts.PORTRAIT)) && (
          <>
            <CustomNavLink
              to={RouteTypes.START}
              label={Pages.START}
              active={isStartPage}
            />
            <CustomNavLink
              to={RouteTypes.ABOUT}
              label={Pages.ABOUT}
              active={isAboutPage}
            />
            <CustomNavLink
              to={RouteTypes.CONTACT}
              label={Pages.CONTACT}
              active={isContactPage}
            />
          </>
        )}
      </nav>
      <Button
        className="text"
        onClickHandler={() =>
          changeTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)
        }
      >
        {theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT}
      </Button>
    </div>
  );
};

export default Header;

export const headerClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  gap: 1rem;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;

  nav {
    display: flex;
    gap: 1rem;
  }

  ${mediaMin.xs} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }

  ${mediaMin.xl} {
    position: fixed;
    padding: 1.5rem;
  }
`;
