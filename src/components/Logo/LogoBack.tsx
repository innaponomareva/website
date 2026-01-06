import Circle from '../../assets/images/striped_circle_white_90.png';

interface LogoBackProps {
  className?: string;
}

const LogoBack: React.FC<LogoBackProps> = ({ className }) => (
  <img src={Circle} className={className} alt="logo-background" />
);

export default LogoBack;
