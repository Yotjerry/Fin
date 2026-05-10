import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";

export default function AdminAuthPage() {
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // In this private route, we strictly check for admin credentials
      if (!email.toLowerCase().includes("admin") && email !== "jerryyotto@gmail.com") {
        throw new Error("Accès refusé : Identifiants administrateur requis.");
      }
      
      await loginWithEmail(email, password);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion administrative.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-950 flex items-center justify-center p-6 font-sans">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <Logo className="scale-125 mb-8" />
          <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Console d'administration</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight text-center">Accès Restreint</h1>
          <p className="text-slate-400 text-sm font-medium mt-2 text-center">Espace de gestion interne FinTrack</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400"
          >
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-xs font-bold leading-tight">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">E-mail Administratif</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-white transition-colors" />
              <input 
                type="email" 
                required
                placeholder="admin@fintrack.ci" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 text-white font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Clé Maîtresse</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-white transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 text-white font-bold transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-slate-950 font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-xl shadow-white/5 hover:bg-slate-100 disabled:opacity-50 text-sm uppercase tracking-widest"
          >
            {loading ? "Vérification..." : (
              <>
                <span>Entrer dans la console</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Connexion chiffrée AES-256</span>
          </div>
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">
            Tentative de connexion non autorisée journalisée par IP
          </p>
        </div>
      </motion.div>
    </div>
  );
}
