
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockAuthService } from '../services/mockAuth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  loginAgent: (phone: string, pin: string) => Promise<{ isFirstLogin: boolean }>;
  logout: () => void;
  updateAgentPin: (phone: string, newPin: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('fintrack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    const loggedUser = await mockAuthService.loginWithEmail(email, pass);
    setUser(loggedUser);
    localStorage.setItem('fintrack_user', JSON.stringify(loggedUser));
  };

  const loginAgent = async (phone: string, pin: string) => {
    const { user: loggedUser, isFirstLogin } = await mockAuthService.loginAgent(phone, pin);
    setUser(loggedUser);
    localStorage.setItem('fintrack_user', JSON.stringify(loggedUser));
    return { isFirstLogin };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fintrack_user');
  };

  const updateAgentPin = async (phone: string, newPin: string) => {
    await mockAuthService.updateAgentPin(phone, newPin);
    if (user && user.phone === phone.replace(/\s/g, "")) {
      const updatedUser = { ...user, status: 'ACTIVE' as const };
      setUser(updatedUser);
      localStorage.setItem('fintrack_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithEmail, loginAgent, logout, updateAgentPin }}>
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
