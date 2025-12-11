import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '@/components/CyberButton';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Shield, Play } from 'lucide-react';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center matrix-bg scanline relative">
      <MatrixBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4"
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-7xl text-primary cyber-glow mb-4 tracking-wider">
            CIPHER
          </h1>
          <h2 className="font-display text-3xl md:text-5xl text-secondary cyber-glow-secondary tracking-widest">
            CHARADES
          </h2>
          <p className="mt-6 text-muted-foreground text-sm tracking-wider uppercase">
            Movie Mystery Encryption Game
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-64 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12"
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <CyberButton
            variant="secondary"
            size="lg"
            onClick={() => navigate('/admin-login')}
            className="w-full max-w-xs mx-auto flex items-center justify-center gap-3"
          >
            <Shield className="w-5 h-5" />
            Admin Login
          </CyberButton>

          <CyberButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/play')}
            className="w-full max-w-xs mx-auto flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5" />
            Play Game
          </CyberButton>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-muted-foreground/50 text-xs"
        >
          [ Decrypt the secret. Guess the movie. ]
        </motion.p>
      </motion.div>
    </div>
  );
}
