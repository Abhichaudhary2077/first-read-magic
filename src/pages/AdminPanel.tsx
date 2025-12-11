import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '@/components/CyberButton';
import { CyberInput } from '@/components/CyberInput';
import { MatrixBackground } from '@/components/MatrixBackground';
import { loadGameData, saveGameData, GameData } from '@/lib/gameStore';
import { ArrowLeft, Save, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [data, setData] = useState<GameData | null>(null);

  useEffect(() => {
    setData(loadGameData());
  }, []);

  const handleSave = () => {
    if (data) {
      saveGameData(data);
      toast.success('Game Data Saved', {
        description: 'Settings have been updated',
      });
    }
  };

  if (!data) return null;

  return (
    <div className="min-h-screen matrix-bg scanline relative py-8">
      <MatrixBackground />

      <div className="container max-w-2xl mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back to Menu</span>
          </button>

          <div className="cyber-box p-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Settings className="w-6 h-6 text-accent" />
              <h1 className="font-display text-2xl text-accent cyber-glow-accent">
                Admin Control Panel
              </h1>
            </div>

            <div className="space-y-6">
              <CyberInput
                id="movie"
                label="Favorite Movie"
                value={data.favoriteMovie}
                onChange={e => setData({ ...data, favoriteMovie: e.target.value })}
                placeholder="Enter the movie name"
              />

              <CyberInput
                id="genre"
                label="Movie Genre"
                value={data.movieGenre}
                onChange={e => setData({ ...data, movieGenre: e.target.value })}
                placeholder="e.g. Sci-Fi, Horror, Comedy, Action"
              />

              <CyberInput
                id="password"
                label="Game Password"
                value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
                placeholder="Password to decrypt the message"
              />

              <CyberInput
                id="message"
                label="Secret Message"
                value={data.secretMessage}
                onChange={e => setData({ ...data, secretMessage: e.target.value })}
                placeholder="Message revealed on success"
              />

              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground text-xs mb-4 uppercase tracking-wider">
                  Admin Credentials
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <CyberInput
                    id="adminUser"
                    label="Admin Username"
                    value={data.adminUser}
                    onChange={e => setData({ ...data, adminUser: e.target.value })}
                  />
                  <CyberInput
                    id="adminPass"
                    label="Admin Password"
                    type="password"
                    value={data.adminPass}
                    onChange={e => setData({ ...data, adminPass: e.target.value })}
                  />
                </div>
              </div>

              <CyberButton
                variant="primary"
                size="lg"
                onClick={handleSave}
                className="w-full mt-8 flex items-center justify-center gap-3"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </CyberButton>
            </div>
          </div>

          {/* Preview section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 cyber-box p-6"
          >
            <h3 className="font-display text-sm text-muted-foreground mb-4">Preview Hints</h3>
            <div className="space-y-2 text-sm">
              <p className="text-primary">🎬 Movie starts with: '{data.favoriteMovie[0]}'</p>
              <p className="text-primary">🧩 {data.favoriteMovie.split(' ').length} word(s)</p>
              <p className="text-primary">🔤 {data.favoriteMovie.length} characters</p>
              <p className="text-primary">🎭 Genre: {data.movieGenre}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
