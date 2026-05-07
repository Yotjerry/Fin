import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Lock as LockIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ChevronLeft,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function AgentAuthPage() {
  const [step, setStep] = useState<"login" | "change_pin" | "success">("login");
  const [showPin, setShowPin] = useState(false);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const navigate = useNavigate();

  const handleInitialLogin = () => {
    if (!phone || !pin) {
      alert("Veuillez entrer vos identifiants reçus (Téléphone + PIN).");
      return;
    }
    // Simulate finding that this is a first-time login
    setStep("change_pin");
  };

  const handleChangePin = () => {
    if (newPin.length < 4) {
      alert("Le nouveau code PIN doit contenir au moins 4 chiffres.");
      return;
    }
    if (newPin !== confirmPin) {
      alert("Les codes PIN ne correspondent pas.");
      return;
    }
    // Simulate activation success
    setStep("success");
    
    // In a real app, this would update the backend status to 'ACTIVE'
    setTimeout(() => {
      navigate("/agent/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-full bg-[#0B1B3D] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-fintrack-secondary/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        {step !== "success" && (
          <button 
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Retour au site</span>
          </button>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-white/10 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {step === "login" && (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-10 text-center">
                  <Logo className="h-20 mx-auto mb-6" />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#234D96] text-[10px] font-black uppercase tracking-widest mb-4">
                    <Smartphone size={12} /> Activation de Compte
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Accès Agent</h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">Utilisez les accès reçus par WhatsApp.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de téléphone</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#234D96] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="+229 01..." 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 focus:border-[#234D96] focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Code PIN Initial</label>
                    <div className="relative group">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#234D96] transition-colors" />
                      <input 
                        type={showPin ? "text" : "password"} 
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="••••••" 
                        maxLength={6}
                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 focus:border-[#234D96] focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                      >
                        {showPin ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-[#234D96] hover:bg-blue-900 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-900/20 text-sm uppercase tracking-widest mt-4"
                    onClick={handleInitialLogin}
                  >
                    <span>Continuer l'activation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "change_pin" && (
              <motion.div 
                key="change"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-10 text-center">
                  <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sécurisez votre accès</h3>
                  <p className="text-slate-400 text-sm font-medium mt-1">Veuillez définir votre code PIN personnel à 6 chiffres.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nouveau Code PIN</label>
                    <div className="relative group">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#234D96] transition-colors" />
                      <input 
                        type={showPin ? "text" : "password"} 
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="••••••" 
                        maxLength={6}
                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 focus:border-[#234D96] focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmer le code PIN</label>
                    <div className="relative group">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#234D96] transition-colors" />
                      <input 
                        type={showPin ? "text" : "password"} 
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        placeholder="••••••" 
                        maxLength={6}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 focus:border-[#234D96] focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-3">
                    <AlertCircle size={16} className="text-[#234D96] shrink-0" />
                    <p className="text-[10px] font-bold text-[#234D96] leading-tight">
                      Ce code PIN vous sera demandé pour chaque transaction. Gardez-le secret.
                    </p>
                  </div>

                  <button 
                    className="w-full bg-[#234D96] hover:bg-blue-900 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-900/20 text-sm uppercase tracking-widest mt-4"
                    onClick={handleChangePin}
                  >
                    <span>Valider mon PIN</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Compte Activé !</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Félicitations <strong>{phone}</strong>,<br />
                  votre compte est désormais actif et visible par votre marchand. 
                </p>
                <div className="mt-10 flex items-center justify-center gap-2 text-[#234D96] font-black text-xs uppercase tracking-widest animate-pulse">
                  <Logo className="h-6" /> redirection en cours...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step !== "success" && (
            <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Sécurisé par FinTrack Intelligence
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
