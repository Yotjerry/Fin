
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authService } from '../services/authService';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLocked: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAgent: (phone: string, password: string) => Promise<{ isFirstLogin: boolean }>;
  logout: () => void;
  updateAgentPin: (userId: string, newPin: string) => Promise<void>;
  validatePin: (pin: string) => Promise<boolean>;
  unlockWithPin: (pin: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const INACTIVITY_LIMIT = 60000; // 60 seconds

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const userSnap = await getDoc(doc(db, 'users', fbUser.uid));
          if (userSnap.exists()) {
            setUser(userSnap.data() as User);
          }
        } catch (e) {
          console.error("Auth sync error", e);
        }
      } else {
        const savedUser = localStorage.getItem('fintrack_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Inactivity Timer Implementation
  useEffect(() => {
    if (!user || isLocked) return;

    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsLocked(true);
      }, INACTIVITY_LIMIT);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user, isLocked]);

  const loginWithGoogle = async () => {
    const loggedUser = await authService.loginWithGoogle();
    setUser(loggedUser);
    localStorage.setItem('fintrack_user', JSON.stringify(loggedUser));
    setIsLocked(false);
  };

  const loginAgent = async (phone: string, password: string) => {
    const { user: loggedUser, isFirstLogin } = await authService.loginAgent(phone, password);
    setUser(loggedUser);
    localStorage.setItem('fintrack_user', JSON.stringify(loggedUser));
    setIsLocked(false);
    return { isFirstLogin };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsLocked(false);
    localStorage.removeItem('fintrack_user');
  };

  const unlockWithPin = async (pin: string) => {
    if (!user) return false;
    const isValid = await authService.validatePin(user.id, pin);
    if (isValid) {
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const updateAgentPin = async (userId: string, newPin: string) => {
    await authService.updateAgentPin(userId, newPin);
    if (user && user.id === userId) {
      const updatedUser = { ...user, status: 'ACTIVE' as const };
      setUser(updatedUser);
      localStorage.setItem('fintrack_user', JSON.stringify(updatedUser));
    }
  };

  const validatePin = async (pin: string) => {
    if (!user) return false;
    return await authService.validatePin(user.id, pin);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLocked, 
      loginWithGoogle, 
      loginAgent, 
      logout, 
      updateAgentPin, 
      validatePin, 
      unlockWithPin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
