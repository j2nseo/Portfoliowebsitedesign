import { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface AnimatedSkillProps {
  name: string;
  targetValue: number;
}

export function AnimatedSkill({ name, targetValue }: AnimatedSkillProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // 1.5초
      const increment = targetValue / (duration / 16); // 60fps 기준

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCurrentValue(targetValue);
          clearInterval(timer);
        } else {
          setCurrentValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{currentValue}%</span>
      </div>
      <Progress value={currentValue} className="h-1" />
    </div>
  );
}
