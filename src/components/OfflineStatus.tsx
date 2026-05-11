import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, WifiOff, RefreshCw, X, Info } from 'lucide-react';

export default function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setSyncing(true);
      
      // Keep "Online" message for 5 seconds, then hide
      setTimeout(() => {
        setSyncing(false);
        setTimeout(() => setShowStatus(false), 2000);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
      setSyncing(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check: if offline, always show status
    if (!navigator.onLine) {
      setShowStatus(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-sm"
        >
          <div className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center gap-4 ${
            isOnline 
              ? 'bg-emerald-50/90 border-emerald-100 text-emerald-800' 
              : 'bg-slate-900/95 border-slate-700 text-white'
          }`}>
            <div className={`p-3 rounded-xl ${isOnline ? 'bg-emerald-100' : 'bg-slate-800'}`}>
              {isOnline ? (
                syncing ? <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" /> : <Wifi className="w-5 h-5 text-emerald-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-slate-400" />
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-black uppercase tracking-tight">
                {isOnline ? (syncing ? 'Synchronisation...' : 'Mode En Ligne') : 'Mode Hors Ligne'}
              </h4>
              <p className="text-[11px] font-medium opacity-80 leading-snug">
                {isOnline 
                  ? 'Connexion rétablie. Vos données sont en cours de mise à jour.' 
                  : 'Vous utilisez l\'application sans connexion internet. Vos modifications seront synchronisées plus tard.'}
              </p>
            </div>

            <button 
              onClick={() => setShowStatus(false)}
              className="p-1 rounded-lg hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </motion.div>
      )}
      
      {!isOnline && !showStatus && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setShowStatus(true)}
          className="fixed bottom-6 right-6 z-[9999] p-3 bg-slate-900 text-white rounded-full shadow-lg border border-slate-700 flex items-center gap-2"
        >
          <WifiOff className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest pr-2">Hors Ligne</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
