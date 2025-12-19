import { motion } from 'framer-motion';

interface SuccessAnimationProps {
  message: string;
  onClose: () => void;
}

export function SuccessAnimation({ message, onClose }: SuccessAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-center p-12 cyber-box max-w-lg mx-4"
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-3xl text-primary cyber-glow mb-4"
        >
          ACCESS GRANTED
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-secondary text-xl mb-8"
        >
          {message}
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all font-display uppercase tracking-wider"
          onClick={onClose}
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
