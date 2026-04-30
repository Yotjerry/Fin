import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Lock as LockIcon, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ChevronLeft,
  ShieldCheck,
  Shield,
  CheckCircle2,
  AlertCircle,
  Zap,
  Smartphone,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
    setStrength(0);
  };

  const calculateStrength = (p: string) => {
    let s = 0;
    if (p.length > 6) s++;
    if (p.length > 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  const getStrengthColor = () => {
    if (strength <= 1) return "text-red-500 shadow-red-500/20";
    if (strength <= 3) return "text-amber-500 shadow-amber-500/20";
    return "text-fintrack-secondary shadow-fintrack-secondary/20";
  };

  const getStrengthLabel = () => {
    if (password.length === 0) return "";
    if (strength <= 1) return "Faible";
    if (strength <= 3) return "Moyen";
    return "Fort";
  };

  return (
    <div className="min-h-full bg-slate-50 flex relative overflow-hidden font-sans">
      {/* Background Image Section - Covers all on mobile, 75% on desktop */}
      <div className="absolute inset-0 lg:w-3/4 h-full relative overflow-hidden z-0">
        <img 
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80" 
          alt="FinTrack Experience" 
          className="w-full h-full object-cover opacity-90 lg:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-fintrack-primary/95 via-fintrack-primary/80 to-fintrack-dark lg:from-fintrack-primary/95 lg:via-fintrack-primary/80 lg:to-fintrack-dark" />
        
        {/* Brand Content on Image - Only visible on desktop or large tablets */}
        <div className="hidden lg:flex absolute inset-0 flex-col justify-between p-16 z-10">
          <Logo variant="white" className="h-28" />

          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-black text-white mb-8 leading-[1.05] tracking-tighter"
            >
              Révolutionnez votre <br /> gestion financière.
            </motion.h2>
            <p className="text-white/80 text-xl leading-relaxed font-medium">
              Une plateforme robuste conçue pour les marchands modernes. 
              Sécurité, rapidité et transparence à chaque transaction.
            </p>
          </div>

          <div className="flex items-center gap-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-white/10" alt="User" referrerPolicy="no-referrer" />
              ))}
              <div className="w-12 h-12 rounded-full bg-fintrack-secondary flex items-center justify-center text-white font-bold text-xs border-4 border-white/10">+10k</div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-white/60 text-sm font-bold uppercase tracking-widest">
              Rejoignez la communauté FinTrack
            </div>
          </div>
        </div>
      </div>

      {/* 25% Empty/Space Section - Only on desktop */}
      <div className="hidden lg:block w-1/4 h-full bg-slate-50 ml-auto" />

      {/* Centered Form Card - Overlapping the 75/25 split */}
      <div className="absolute inset-0 flex flex-col items-center justify-start lg:block pointer-events-none z-20 overflow-y-auto no-scrollbar py-8 sm:py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg mx-4 bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 p-10 pointer-events-auto relative lg:absolute lg:top-1/2 lg:left-[75%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:my-0"
        >
          {/* Mobile Header: Logo + Back Button (Inside the card) */}
          <div className="lg:hidden mb-12 flex items-center justify-between">
            <Logo className="h-28" />
            <button 
              onClick={() => navigate("/")}
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-fintrack-primary active:scale-95 transition-all shadow-sm"
              title="Retour"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Back Button - Circular Arrow (Desktop only) */}
          <button 
            onClick={() => navigate("/")}
            className="hidden lg:flex fixed top-10 z-50 items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 text-slate-600 hover:text-fintrack-primary hover:scale-110 transition-all group pointer-events-auto lg:right-[calc(12.5%-24px)]"
            title="Retour au site"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="mb-8">
            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {isLogin ? "Bon retour" : "Créer un compte"}
            </h3>
            <p className="text-slate-500 font-medium">
              {isLogin ? "Accédez à votre tableau de bord sécurisé." : "Commencez votre expérience FinTrack."}
            </p>
          </div>

          <div className="space-y-6">
            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-slate-700 font-bold text-sm">Continuer avec Google</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Ou par email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prénom</label>
                      <div className="relative group">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-fintrack-primary transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Jean" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-fintrack-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom</label>
                      <div className="relative group">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-fintrack-primary transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Koffi" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-fintrack-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email professionnel</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-fintrack-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="nom@entreprise.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-fintrack-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mot de passe</label>
                {isLogin ? (
                  <button 
                    type="button"
                    className="text-[10px] font-black text-fintrack-primary hover:text-fintrack-dark transition-colors uppercase tracking-widest"
                  >
                    Mot de passe oublié ?
                  </button>
                ) : (
                  password.length > 0 && (
                    <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${getStrengthColor()}`}>
                      {strength <= 1 ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {getStrengthLabel()}
                    </div>
                  )
                )}
              </div>
              <div className="relative group">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-fintrack-primary transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-bold text-slate-900 ${
                    !isLogin && password.length > 0 
                      ? strength <= 1 ? "border-red-200 focus:border-red-500" : strength <= 3 ? "border-amber-200 focus:border-amber-500" : "border-fintrack-secondary/30 focus:border-fintrack-secondary"
                      : "border-slate-200 focus:border-fintrack-primary"
                  }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Strength Indicator Bar */}
              {!isLogin && password.length > 0 && (
                <div className="flex gap-1 px-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        i <= strength 
                          ? strength <= 1 ? "bg-red-500" : strength <= 3 ? "bg-amber-500" : "bg-fintrack-secondary"
                          : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirmer le mot de passe</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-fintrack-primary transition-colors" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
                      className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-bold text-slate-900 ${
                        confirmPassword.length > 0 
                          ? confirmPassword === password ? "border-fintrack-secondary/30 focus:border-fintrack-secondary" : "border-red-200 focus:border-red-500"
                          : "border-slate-200 focus:border-fintrack-primary"
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => navigate("/onboarding", { state: { firstName, lastName, email } })}
              className="w-full bg-slate-900 hover:bg-fintrack-primary text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-slate-900/20 hover:shadow-fintrack-primary/30 text-sm uppercase tracking-widest mt-4"
            >
              <span>{isLogin ? "Se connecter" : "Créer mon compte"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Demo Login - As requested by user */}
            <div className="relative mt-10">
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-100 -z-10" />
              <span className="bg-white px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mx-auto block w-fit">Accès Rapide</span>
            </div>

            <button 
              type="button"
              onClick={() => navigate("/onboarding", { state: { firstName: "Jean", lastName: "Koffi", email: "demo@fintrack.com" } })}
              className="w-full mt-6 py-5 bg-slate-50 border border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-[#234D96] hover:text-white hover:border-[#234D96] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 group"
            >
              <Zap className="w-4 h-4 text-amber-500 group-hover:text-white transition-colors" />
              <span>Connexion Automatique (Démo)</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate("/agent/auth")}
              className="w-full mt-3 py-5 bg-blue-50/50 border border-blue-100 text-[#234D96] font-black rounded-2xl hover:bg-blue-100 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 group"
            >
              <Smartphone className="w-5 h-5" />
              <span>Se connecter en tant qu'agent</span>
            </button>

            <button 
              type="button"
              onClick={() => navigate("/agent/dashboard")}
              className="w-full mt-3 py-5 bg-amber-50/50 border border-amber-100 text-amber-700 font-black rounded-2xl hover:bg-amber-100 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 group"
            >
              <Zap className="w-4 h-4 text-amber-500 group-hover:text-amber-500 transition-colors" />
              <span>Accès Direct Agent</span>
            </button>
            <button 
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full mt-3 py-5 bg-emerald-50/50 border border-emerald-100 text-emerald-700 font-black rounded-2xl hover:bg-emerald-100 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 group"
            >
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Accès Direct Marchand</span>
            </button>
            <button 
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="w-full mt-3 py-5 bg-indigo-50/50 border border-indigo-100 text-[#234D96] font-black rounded-2xl hover:bg-indigo-100 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 group"
            >
              <Shield className="w-5 h-5 text-[#234D96]" />
              <span>Accès Direct Admin (Superviseur)</span>
            </button>
          </form>
        </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm font-bold">
              {isLogin ? "Nouveau sur FinTrack ?" : "Déjà un compte ?"}
              <button 
                onClick={toggleAuth}
                className="ml-2 text-fintrack-primary font-black hover:text-fintrack-dark transition-colors uppercase text-xs tracking-wider"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 right-10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hidden lg:block">
        © 2026 FinTrack Technologies • SSL 256-bit
      </div>
    </div>
  );
}
