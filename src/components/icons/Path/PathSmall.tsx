interface PathSmallProps {
  className?: string;
}

const PathSmall: React.FC<PathSmallProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 2253.54 2238.93">
      <path
        fill="none"
        d="M2238.5,1119.47c0,614-497.74,1111.73-1111.73,1111.73S15,1733.46,15,1119.47,512.78,7.74,1126.77,7.74,2238.42,505.4,2238.5,1119.32"
      />
    </svg>
  );
};

export default PathSmall;
