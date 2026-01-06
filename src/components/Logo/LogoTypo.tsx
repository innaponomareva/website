import LogoLight from '../../assets/images/IP_Logo_full_blue_97_150ppi_RGB.png';
import LogoDark from '../../assets/images/IP_Logo_full_dark_95_150ppi_RGB.png';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';

interface LogoTypoProps {
  className?: string;
}

const LogoTypo: React.FC<LogoTypoProps> = ({ className }) => {
  const { theme } = useThemeContext();

  return (
    <img
      className={className}
      src={theme === Themes.LIGHT ? LogoLight : LogoDark}
      alt="logo-typo"
    />
  );
};

export default LogoTypo;
