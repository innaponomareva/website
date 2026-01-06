interface RocketTailProps {
  className?: string;
}

const RocketTail: React.FC<RocketTailProps> = ({ className }) => {
  return (
    <svg
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 202.5 317.5"
    >
      <path
        d="M31.5,148.4c-8.9,4.2-8.9,16.8,0,21c26.4,12.5,68.2,31.9,83.7,36.6c21.4,6.5,44.3-3.3,55.5-21.9
			c11.5-19.2,8.8-43.8-7.1-59.7c-13.2-13.2-29.3-18-47.7-13C103.8,114.7,58.9,135.5,31.5,148.4z"
      />
    </svg>
  );
};

export default RocketTail;
