import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HackerLogProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function HackerLog({ isActive, onComplete }: HackerLogProps) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!isActive) {
      setLines([]);
      return;
    }

    const chars = '01#$%&@!?<>{}[]';
    let lineCount = 0;
    const maxLines = 15;

    const interval = setInterval(() => {
      if (lineCount >= maxLines) {
        clearInterval(interval);
        onComplete?.();
        return;
      }

      const gibberish = Array(40)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');

      setLines(prev => [...prev.slice(-10), gibberish]);
      lineCount++;
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  return (
    <div className="cyber-box p-4 h-48 overflow-hidden font-mono text-xs">
      <div className="text-primary/70 mb-2 uppercase tracking-wider text-[10px]">
        System Log
      </div>
      <div className="space-y-1">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-primary/60 leading-tight"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        {isActive && lines.length >= 15 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-destructive font-bold mt-4 text-center text-lg animate-glitch"
          >
            ACCESS DENIED
          </motion.div>
        )}
      </div>
    </div>
  );
}
