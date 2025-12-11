import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '@/components/CyberButton';
import { CyberInput } from '@/components/CyberInput';
import { MatrixBackground } from '@/components/MatrixBackground';
import { loadGameData } from '@/lib/gameStore';
import { ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleLogin = () => {
    const data = loadGameData();
    
    if (username === data.adminUser && password === data.adminPass) {
      toast.success('Access Granted', {
        description: 'Welcome, Administrator',
      });
      navigate('/admin-panel');
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      toast.error('Access Denied', {
        description: 'Invalid credentials',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center matrix-bg scanline relative">
      <MatrixBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4 z-10"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider">Back</span>
        </button>

        <div className="cyber-box p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Lock className="w-6 h-6 text-secondary" />
            <h1 className="font-display text-2xl text-secondary cyber-glow-secondary">
              Admin Login
            </h1>
          </div>

          <div className="space-y-6">
            <CyberInput
              id="username"
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter admin username"
              autoComplete="username"
            />

            <CyberInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />

            <CyberButton
              variant="secondary"
              size="lg"
              onClick={handleLogin}
              className="w-full mt-8"
            >
              Authenticate
            </CyberButton>
          </div>

          <p className="mt-6 text-center text-muted-foreground/50 text-xs">
            Default: admin / 1234
          </p>
        </div>
      </motion.div>
    </div>
  );
}
