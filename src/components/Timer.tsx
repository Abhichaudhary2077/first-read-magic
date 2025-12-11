import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  initialSeconds: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

export function Timer({ initialSeconds, isRunning, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, onTimeUp]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds < 60;
  const isCritical = seconds < 30;

  return (
    <div 
      className={cn(
        'font-display text-4xl tracking-wider transition-colors duration-300',
        isCritical && 'text-destructive animate-pulse',
        isLow && !isCritical && 'text-yellow-500',
        !isLow && 'text-primary cyber-glow'
      )}
    >
      <span className="inline-block w-16 text-right">{String(minutes).padStart(2, '0')}</span>
      <span className={cn('mx-1', isCritical ? 'animate-terminal-blink' : '')}>:</span>
      <span className="inline-block w-16">{String(secs).padStart(2, '0')}</span>
    </div>
  );
}
