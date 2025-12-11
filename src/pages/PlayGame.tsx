import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '@/components/CyberButton';
import { CyberInput } from '@/components/CyberInput';
import { MatrixBackground } from '@/components/MatrixBackground';
import { HackerLog } from '@/components/HackerLog';
import { Timer } from '@/components/Timer';
import { SuccessAnimation } from '@/components/SuccessAnimation';
import { loadGameData, generateMovieHints } from '@/lib/gameStore';
import { encryptText, decryptText } from '@/lib/encryption';
import { ArrowLeft, Lightbulb, Send, Home } from 'lucide-react';
import { toast } from 'sonner';

const GAME_TIME_SECONDS = 30 * 60; // 30 minutes

export default function PlayGame() {
  const navigate = useNavigate();
  const [encryptedText, setEncryptedText] = useState('');
  const [guess, setGuess] = useState('');
  const [hints, setHints] = useState<string[]>([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    const data = loadGameData();
    const encrypted = encryptText(data.secretMessage, data.password);
    setEncryptedText(encrypted);
    setHints(generateMovieHints(data.favoriteMovie, data.movieGenre));
    setSecretMessage(data.secretMessage);
  }, []);

  const handleTimeUp = useCallback(() => {
    setGameOver(true);
    setTimerRunning(false);
    toast.error('Time\'s Up!', {
      description: 'The mystery remains unsolved...',
    });
  }, []);

  const handleGuess = () => {
    if (gameOver || !guess.trim()) return;

    const data = loadGameData();
    const result = decryptText(encryptedText, guess);

    if (result) {
      setSuccess(true);
      setGameOver(true);
      setTimerRunning(false);
    } else {
      setIsHacking(true);
      toast.error('Wrong Password', {
        description: 'Try again...',
      });
    }
  };

  const handleHint = () => {
    if (hintIndex < hints.length) {
      toast.info('Hint Revealed', {
        description: hints[hintIndex],
        duration: 5000,
      });
      setHintIndex(prev => prev + 1);
    } else {
      toast.warning('No More Hints', {
        description: 'You\'ve used all available hints!',
      });
    }
  };

  const handleHackComplete = () => {
    setIsHacking(false);
  };

  return (
    <div className="min-h-screen matrix-bg scanline relative py-8">
      <MatrixBackground />

      <AnimatePresence>
        {success && (
          <SuccessAnimation
            message={secretMessage}
            onClose={() => navigate('/')}
          />
        )}
      </AnimatePresence>

      <div className="container max-w-4xl mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider">Exit</span>
            </button>

            <Timer
              initialSeconds={GAME_TIME_SECONDS}
              isRunning={timerRunning}
              onTimeUp={handleTimeUp}
            />
          </div>

          {/* Encrypted Text Box */}
          <div className="cyber-box p-6 mb-6">
            <h3 className="font-display text-sm text-primary/70 uppercase tracking-wider mb-3">
              Encrypted Message
            </h3>
            <p className="font-mono text-secondary break-all text-sm leading-relaxed">
              {encryptedText}
            </p>
          </div>

          {/* System Log */}
          <div className="mb-6">
            <HackerLog isActive={isHacking} onComplete={handleHackComplete} />
          </div>

          {/* Controls */}
          <div className="cyber-box p-6">
            <h3 className="font-display text-sm text-primary/70 uppercase tracking-wider mb-4">
              Password Attempt
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <CyberInput
                  id="guess"
                  value={guess}
                  onChange={e => setGuess(e.target.value)}
                  placeholder="Enter your password guess..."
                  disabled={gameOver}
                  onKeyDown={e => e.key === 'Enter' && handleGuess()}
                />
              </div>

              <div className="flex gap-3">
                <CyberButton
                  variant="primary"
                  onClick={handleGuess}
                  disabled={gameOver || !guess.trim()}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </CyberButton>

                <CyberButton
                  variant="ghost"
                  onClick={handleHint}
                  disabled={gameOver}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint ({hints.length - hintIndex})
                </CyberButton>
              </div>
            </div>

            {/* Revealed hints */}
            {hintIndex > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-4 border-t border-border"
              >
                <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  Revealed Hints
                </h4>
                <div className="space-y-2">
                  {hints.slice(0, hintIndex).map((hint, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-primary/80"
                    >
                      {hint}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Game Over State */}
          {gameOver && !success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 cyber-box p-6 text-center"
            >
              <h2 className="font-display text-2xl text-destructive mb-4">
                GAME OVER
              </h2>
              <p className="text-muted-foreground mb-6">
                The mystery remains unsolved...
              </p>
              <CyberButton
                variant="primary"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 mx-auto"
              >
                <Home className="w-4 h-4" />
                Return Home
              </CyberButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
