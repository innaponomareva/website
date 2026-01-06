import { RiSendPlaneFill } from 'react-icons/ri';

interface AirplaneProps {
  className?: string;
}

const Airplane: React.FC<AirplaneProps> = ({ className }) => (
  <RiSendPlaneFill
    className={className}
    style={{ transform: 'rotate(45deg)' }}
  />
);
export default Airplane;
