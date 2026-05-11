import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

export default function LockScreen() {
  const { user, unlockWithPin, logout } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pin.length < 4) return;

    setLoading(true);
    setError(false);
    
    try {
      const success = await unlockWithPin(pin);
      if (!success) {
        setError(true);
        setPin('');
      }
    } catch (err) {
      setError(true);
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 6) {
        // Auto-submit if PIN is 6 digits
        // Need a small delay to show the last digit
        setTimeout(() => {
           // We can't easily auto-submit with async without ref-checks, 
           // but we can just let user press the button or handle it here
        }, 100);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-fintrack-primary/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm text-center"
      >
        <Logo variant="white" className="h-20 mb-12 mx-auto" />
        
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 shadow-2xl">
          <div className="mb-6 relative">
            <div className="w-20 h-20 bg-fintrack-secondary rounded-3xl flex items-center justify-center mx-auto shadow-lg rotate-3">
              <Lock className="w-10 h-10 text-white -rotate-3" />
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-4 -right-2 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg"
              >
                PIN INCORRECT
              </motion.div>
            )}
          </div>

          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Session Verrouillée</h2>
          <p className="text-white/60 text-sm font-medium mb-8">
            Entrez votre code PIN pour reprendre
          </p>

          <div className="flex justify-center gap-3 mb-10">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  i < pin.length 
                    ? 'bg-fintrack-secondary border-fintrack-secondary scale-110 shadow-[0_0_15px_rgba(244,180,26,0.5)]' 
                    : 'bg-transparent border-white/30'
                } ${error ? 'border-red-500 bg-red-500/20 animate-shake' : ''}`}
              />
            ))}
          </div>

          <form onSubmit={handleUnlock} className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((val) => (
                <button
                  key={val}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                     if (val === 'C') setPin('');
                     else if (val === 'OK') handleUnlock();
                     else handlePinInput(val.toString());
                  }}
                  className={`h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all active:scale-95 ${
                    val === 'OK' 
                      ? 'bg-fintrack-secondary text-white' 
                      : val === 'C' 
                        ? 'bg-white/5 text-white/50 hover:text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {val === 'OK' ? <ArrowRight className="w-6 h-6" /> : val}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white/60" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Utilisateur</p>
                  <p className="text-xs font-bold text-white truncate max-w-[120px]">{user?.name}</p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={logout}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
