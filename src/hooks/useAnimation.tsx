import { animate, stagger, svg, utils } from 'animejs';
import { useEffect } from 'react';
import { useLayout } from './useLayout';

interface useAnimationProps {
  motionObjectSelector: string;
  duration: number;
}

const useAnimation = ({
  motionObjectSelector,
  duration,
}: useAnimationProps): void => {
  const { width, height } = useLayout();

  useEffect(() => {
    const $points = utils.$('.points path');
    const $motionObject = utils.$(motionObjectSelector);
    const $motionPath = utils.$('.motion-path path');

    if (!$points || !$motionPath || !$motionObject) return;

    const motionObjectAnimation = () => {
      animate($motionObject, {
        ease: 'linear',
        duration: duration,
        ...svg.createMotionPath($motionPath),
        loop: true,
      });
    };

    const pointsAnimation = () => {
      animate($points, {
        opacity: [0, 1],
        ease: 'linear',
        duration: duration / $points.length,
        delay: stagger(duration / $points.length),
        loop: true,
      });
    };

    motionObjectAnimation();
    pointsAnimation();
  }, [width, height]);
};

export default useAnimation;
