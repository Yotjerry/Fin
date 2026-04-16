import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  FileText,
  Smartphone,
  Lock as LockIcon,
  Camera as CameraIcon,
  Check,
  UploadCloud,
  IdCard,
  Building,
  Phone,
  MapPin,
  Calendar,
  PenTool,
  AlertTriangle,
  X,
  History,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Scan,
  UserCheck,
  Mail
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import SignatureCanvas from "react-signature-canvas";
import { differenceInYears, format } from "date-fns";

interface MerchantData {
  // Phase 1: Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  personalAddress: string;
  
  // Phase 2: Business
  businessName: string;
  ifu: string;
  rccm: string;
  businessAddress: string;

  // Phase 3: Identity Documents (Files)
  idFront: File | null;
  idBack: File | null;
  rccmDoc: File | null;
  selfiePhoto: File | null;
  
  // Phase 4: Signature
  signatureFile: File | null;
  signaturePreview: string | null;
}

export default function MerchantOnboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<MerchantData>({
    firstName: location.state?.firstName || "Jean", // Mock pre-filled
    lastName: location.state?.lastName || "Dupont", // Mock pre-filled
    email: location.state?.email || "jean.dupont@email.com", // Mock pre-filled
    phone: "",
    birthDate: "",
    birthPlace: "",
    personalAddress: "",
    businessName: "",
    ifu: "",
    rccm: "",
    businessAddress: "",
    idFront: null,
    idBack: null,
    rccmDoc: null,
    selfiePhoto: null,
    signatureFile: null,
    signaturePreview: null
  });

  const steps = [
    { id: 1, title: "Gérant", icon: <UserIcon className="w-5 h-5" />, desc: "Identité & Contact" },
    { id: 2, title: "Structure", icon: <Building className="w-5 h-5" />, desc: "Infos Officielles" },
    { id: 3, title: "Justificatifs", icon: <UploadCloud className="w-5 h-5" />, desc: "Dépôt des Pièces" },
    { id: 4, title: "Validation", icon: <PenTool className="w-5 h-5" />, desc: "Signature & Accord" }
  ];

  const handleFileUpload = (field: keyof MerchantData, file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const nextStep = () => {
    setErrors([]);
    if (currentStep === 1) {
      const age = formData.birthDate ? differenceInYears(new Date(), new Date(formData.birthDate)) : 0;
      if (age < 18) {
        setErrors(["Vous devez avoir au moins 18 ans pour utiliser FinTrack."]);
        return;
      }
      if (!formData.phone || !formData.birthPlace || !formData.personalAddress) {
        setErrors(["Veuillez remplir tous les champs obligatoires."]);
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.businessName || !formData.ifu || !formData.rccm || !formData.businessAddress) {
        setErrors(["Veuillez remplir toutes les informations d'entreprise."]);
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.idFront || !formData.rccmDoc || !formData.selfiePhoto) {
        setErrors(["Veuillez uploader les documents obligatoires (ID Recto, RCCM, Selfie)."]);
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.signatureFile) {
      setErrors(["La signature est obligatoire pour finaliser l'inscription."]);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 2500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Immersive Background Imagery */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-[0.05] grayscale"
            alt="Tech background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/90 to-white" />
        </div>

        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-fintrack-primary/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-fintrack-secondary/10 rounded-full blur-[160px]" />
        </div>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white/80 backdrop-blur-3xl rounded-[4.5rem] shadow-[0_48px_100px_-20px_rgba(0,0,0,0.12)] border border-white p-12 sm:p-20 text-center relative z-10"
        >
            <div className="w-40 h-40 bg-fintrack-secondary/15 rounded-[3.5rem] flex items-center justify-center mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-fintrack-secondary rounded-[3.5rem] animate-ping opacity-20 scale-110" />
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.3 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-fintrack-secondary stroke-[2.5]" />
                </motion.div>
                <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                  <ShieldCheck className="w-6 h-6 text-fintrack-primary" />
                </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Dossier Certifié! <br/><span className="text-fintrack-primary text-[0.8em]">en attente de validation</span>
            </h2>
            
            <p className="text-slate-500 text-lg mb-12 leading-relaxed font-bold max-w-md mx-auto">
                Félicitations, {formData.firstName}. Vos informations ont été scellées sous cryptage militaire et transmises à nos équipes.
            </p>

            <div className="bg-white/50 backdrop-blur-md rounded-[3rem] p-8 mb-12 text-left border border-white flex items-start gap-6 shadow-sm">
                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <UserCheck className="w-8 h-8 text-fintrack-secondary relative z-10" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                      <span className="font-black text-[10px] uppercase tracking-[0.3em] text-fintrack-primary">Statut Administratif</span>
                      <div className="px-3 py-1 bg-emerald-500/10 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-500/20">Audit Prioritaire</div>
                  </div>
                  <p className="text-slate-600 text-[13px] font-black leading-relaxed">
                      Un <span className="text-slate-900">auditeur agréé FinTrack</span> vérifie manuellement votre RCCM et votre identité. Activation sous <span className="text-slate-900">15 à 45 minutes</span>.
                  </p>
                </div>
            </div>

            <button 
                onClick={() => navigate("/")}
                className="group relative w-full inline-flex items-center justify-center gap-5 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] overflow-hidden transition-all hover:bg-fintrack-primary hover:shadow-[0_20px_40px_rgba(35,77,150,0.3)]"
            >
                <span className="relative z-10">Accéder à mon tableau de bord</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Référence Officielle du Dossier</span>
              <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-black text-slate-900 tracking-widest">
                FT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden antialiased selection:bg-fintrack-primary/10 selection:text-fintrack-primary">
      {/* Immersive Background Imagery */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-full object-cover opacity-[0.03] grayscale"
          alt="Tech background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/95 to-white" />
      </div>

      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-fintrack-primary/10 rounded-full blur-[160px] animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-fintrack-secondary/10 rounded-full blur-[160px] animate-pulse duration-[8s]" />
      </div>

      {/* Bespoke Header */}
      <header className="px-8 border-b border-white/40 bg-white/40 backdrop-blur-3xl sticky top-0 z-50 h-20 sm:h-24 flex items-center">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <div className="flex items-center gap-6">
            <Logo className="h-14 sm:h-16 hover:scale-105 transition-transform" />
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200" />
            <div className="hidden lg:flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 leading-none">Certification Gérant</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dossier de conformité bancaire</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Connexion Sécurisée</span>
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">SSL / AES-256 BIT</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group cursor-help relative">
                <ShieldCheck className="w-6 h-6 text-fintrack-secondary group-hover:scale-110 transition-transform" />
                <div className="absolute top-full right-0 mt-3 w-48 p-3 bg-slate-900 text-white rounded-xl text-[8px] uppercase tracking-widest font-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none z-[100] shadow-2xl">
                  Vos données sont cryptées et vérifiées manuellement par nos agents.
                </div>
              </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-6 sm:px-12 max-w-7xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-start">
          {/* LEFT SIDEBAR: Advanced Steps Indicator */}
          <aside className="lg:sticky lg:top-36 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="space-y-6">
                <div className="p-5 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rotate-12 -translate-y-12" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60 text-fintrack-secondary relative z-10">Statut du Dossier</h3>
                  <div className="flex justify-between items-end relative z-10">
                    <span className="text-4xl font-black tabular-nums">{Math.round((currentStep / 4) * 100)}%</span>
                    <div className="flex flex-col items-end">
                      <div className="w-8 h-1 bg-white/20 rounded-full mb-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-fintrack-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: `${(currentStep / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-black uppercase opacity-70">Complété</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => isCompleted && setCurrentStep(step.id)}
                        disabled={!isCompleted && !isActive}
                        className={`w-full group relative flex items-center gap-5 p-4 rounded-[2.2rem] transition-all duration-500 border ${
                          isActive 
                          ? "bg-white border-slate-100 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] translate-x-1" 
                          : isCompleted 
                          ? "border-transparent text-fintrack-secondary hover:bg-fintrack-secondary/5" 
                          : "border-transparent opacity-30 grayscale pointer-events-none"
                        }`}
                      >
                        <div className={`relative w-12 h-12 rounded-[1.3rem] flex items-center justify-center transition-all duration-500 ${
                          isActive 
                          ? "bg-fintrack-primary text-white scale-110 shadow-lg shadow-fintrack-primary/20 rotate-3" 
                          : isCompleted 
                          ? "bg-fintrack-secondary/10 text-fintrack-secondary" 
                          : "bg-slate-100 text-slate-300"
                        }`}>
                          <div className="relative z-10">
                            {isCompleted ? <Check className="w-6 h-6 stroke-[3]" /> : step.icon}
                          </div>
                          {isActive && (
                            <div className="absolute inset-0 bg-fintrack-primary rounded-[1.3rem] blur-sm opacity-40 animate-pulse" />
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <p className={`text-[8px] font-black uppercase tracking-widest ${isActive ? "text-fintrack-primary" : "text-slate-400"}`}>
                            Phase 0{step.id}
                          </p>
                          <p className={`text-[11px] font-black tracking-tight uppercase ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                            {step.title}
                          </p>
                        </div>
                        {isActive && (
                          <motion.div 
                            layoutId="activePointer"
                            className="absolute -right-2 w-1.5 h-10 bg-fintrack-primary rounded-full shadow-[0_0_15px_rgba(35,77,150,0.4)]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Specialist Trust Badge */}
            <div className="px-8 py-10 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-fintrack-primary/5 rounded-xl flex items-center justify-center">
                    <History className="w-5 h-5 text-fintrack-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest">Audit Historique</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Vérification en 15min</span>
                 </div>
              </div>
              <div className="h-[1px] bg-slate-200/50 w-full" />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <span>Conformité</span>
                  <span className="text-emerald-500">Active</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <span>Serveur</span>
                  <span className="text-emerald-500">Protégé</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Immersive Form Section */}
          <div className="space-y-12">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-fintrack-primary/10 rounded-full border border-fintrack-primary/15 text-fintrack-primary"
              >
                <div className="w-2 h-2 bg-fintrack-primary rounded-full animate-ping" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] leading-none">Protocole de Sécurité BCEAO</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                {steps[currentStep-1].title} <br/>
                <span className="text-fintrack-primary">{steps[currentStep-1].desc}</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl bg-white/30 p-2 rounded-xl backdrop-blur-sm">
                Veuillez fournir les détails officiels. Vos données sont soumises à une vérification stricte par un administrateur agréé.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/90 backdrop-blur-2xl rounded-[4.5rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.06)] border border-white p-10 sm:p-16 relative group"
              >
                {/* Immersive Glass Overlays */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fintrack-primary/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-fintrack-secondary/5 rounded-full blur-[80px] -ml-36 -mb-36 pointer-events-none" />

                {errors.length > 0 && (
                  <div className="mb-12 p-8 bg-red-50 border border-red-100 rounded-[3rem] flex items-center gap-6 shadow-xl shadow-red-500/5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-red-100">
                      <AlertTriangle className="w-7 h-7 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-black text-red-900 uppercase tracking-widest mb-1">Audit de Conformité : Erreur</p>
                      <ul className="text-xs font-bold text-red-600 leading-relaxed grid sm:grid-cols-2 gap-x-6">
                        {errors.map((e, i) => <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-400 rounded-full" /> {e}
                        </li>)}
                      </ul>
                    </div>
                  </div>
                )}

              {/* STEP 1: PERSONAL & CONTACT */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom & Prénom(s)</label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="text" 
                            value={`${formData.firstName} ${formData.lastName}`}
                            onChange={(e) => {
                              const [f, ...l] = e.target.value.split(" ");
                              setFormData({...formData, firstName: f, lastName: l.join(" ")});
                            }}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de Téléphone Principal</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="tel" 
                            placeholder="+229 00 00 00 00"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse Email</label>
                        <div className="relative opacity-60">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input type="email" value={formData.email} disabled className="w-full pl-12 pr-5 py-4 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm cursor-not-allowed" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date de naissance (18+ requis)</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="date" 
                            value={formData.birthDate}
                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lieu de naissance</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="Ville, Pays"
                            value={formData.birthPlace}
                            onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse Personnelle Complète</label>
                        <input 
                          type="text" 
                          placeholder="Ville, Quartier, Repère précis"
                          value={formData.personalAddress}
                          onChange={(e) => setFormData({...formData, personalAddress: e.target.value})}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: BUSINESS INFO */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dénomination de la structure / Agence</label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="ex: Ets La Béninoise"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro IFU (Identifiant Fiscal)</label>
                        <div className="relative">
                          <Scan className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="Numéro à 13 chiffres"
                            value={formData.ifu}
                            onChange={(e) => setFormData({...formData, ifu: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro RCCM (Commerce)</label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="ex: RB/COT/..."
                            value={formData.rccm}
                            onChange={(e) => setFormData({...formData, rccm: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse de la structure</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="Ville, Quartier de l'agence"
                            value={formData.businessAddress}
                            onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:border-fintrack-primary transition-all" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DOCUMENT UPLOADS */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ID FRONT */}
                    <div className="space-y-3 px-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <UserCheck className="w-3 h-3 text-fintrack-primary" />
                        Pièce d'identité (Recto)
                      </label>
                      <label className="block aspect-video bg-white border border-slate-200 rounded-[2rem] hover:border-fintrack-primary hover:shadow-xl hover:shadow-fintrack-primary/5 transition-all cursor-pointer relative overflow-hidden group">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*,application/pdf" 
                          onChange={(e) => handleFileUpload('idFront', e.target.files?.[0] || null)}
                        />
                        {formData.idFront ? (
                          <div className="w-full h-full p-2">
                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                              {formData.idFront.type.includes('image') ? (
                                <img src={URL.createObjectURL(formData.idFront)} alt="ID Front" className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex flex-col items-center gap-2">
                                  <FileText className="w-10 h-10 text-fintrack-primary" />
                                  <span className="text-[10px] font-bold text-slate-500">{formData.idFront.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-fintrack-primary transition-colors" />
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-900 uppercase">Importer le Recto</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG ou PDF</p>
                            </div>
                          </div>
                        )}
                        {formData.idFront && <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full shadow-lg"><Check className="w-3 h-3" /></div>}
                      </label>
                    </div>

                    {/* ID BACK */}
                    <div className="space-y-3 px-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <UserCheck className="w-3 h-3 text-fintrack-primary" />
                        Pièce d'identité (Verso)
                      </label>
                      <label className="block aspect-video bg-white border border-slate-200 rounded-[2rem] hover:border-fintrack-primary hover:shadow-xl hover:shadow-fintrack-primary/5 transition-all cursor-pointer relative overflow-hidden group">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*,application/pdf" 
                          onChange={(e) => handleFileUpload('idBack', e.target.files?.[0] || null)}
                        />
                        {formData.idBack ? (
                          <div className="w-full h-full p-2">
                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                              {formData.idBack.type.includes('image') ? (
                                <img src={URL.createObjectURL(formData.idBack)} alt="ID Back" className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex flex-col items-center gap-2">
                                  <FileText className="w-10 h-10 text-fintrack-primary" />
                                  <span className="text-[10px] font-bold text-slate-500">{formData.idBack.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-fintrack-primary transition-colors" />
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-900 uppercase">Importer le Verso</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG ou PDF</p>
                            </div>
                          </div>
                        )}
                        {formData.idBack && <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full shadow-lg"><Check className="w-3 h-3" /></div>}
                      </label>
                    </div>

                    {/* RCCM */}
                    <div className="space-y-3 px-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-fintrack-primary" />
                        Registre de Commerce (RCCM)
                      </label>
                      <label className="block aspect-video bg-white border border-slate-200 rounded-[2rem] hover:border-fintrack-primary hover:shadow-xl hover:shadow-fintrack-primary/5 transition-all cursor-pointer relative overflow-hidden group">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*,application/pdf" 
                          onChange={(e) => handleFileUpload('rccmDoc', e.target.files?.[0] || null)}
                        />
                        {formData.rccmDoc ? (
                          <div className="w-full h-full p-2">
                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                              {formData.rccmDoc.type.includes('image') ? (
                                <img src={URL.createObjectURL(formData.rccmDoc)} alt="RCCM" className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex flex-col items-center gap-2">
                                  <FileText className="w-10 h-10 text-fintrack-primary" />
                                  <span className="text-[10px] font-bold text-slate-500">{formData.rccmDoc.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-fintrack-primary transition-colors" />
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-900 uppercase">Importer l'attestation</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG ou PDF</p>
                            </div>
                          </div>
                        )}
                        {formData.rccmDoc && <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full shadow-lg"><Check className="w-3 h-3" /></div>}
                      </label>
                    </div>
                  </div>

                  <div className="p-10 bg-white border border-slate-200 rounded-[3rem] overflow-hidden relative group shadow-sm">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-fintrack-primary/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                       <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center shrink-0 border border-slate-100 shadow-inner">
                          <UserCheck className="w-12 h-12 text-fintrack-primary" />
                       </div>
                       <div className="flex-1 text-center md:text-left space-y-6">
                          <div>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Selfie d'Identification</h4>
                            <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                              Veuillez importer une photo claire de vous en tenant votre pièce d'identité (CNI ou Passeport) près de votre visage. Ceci garantit que vous êtes bien le titulaire des documents fournis.
                            </p>
                          </div>
                          <label className="inline-flex items-center gap-4 px-10 py-5 bg-fintrack-primary text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-fintrack-primary/20">
                            <ImageIcon className="w-4 h-4" />
                            <span>Importer le Selfie</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={(e) => handleFileUpload('selfiePhoto', e.target.files?.[0] || null)}
                            />
                          </label>
                       </div>
                       {formData.selfiePhoto && (
                         <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-emerald-500 shrink-0 shadow-2xl relative">
                           <img src={URL.createObjectURL(formData.selfiePhoto)} className="w-full h-full object-cover" alt="Selfie" />
                           <div className="absolute inset-0 bg-emerald-500/10" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: AUTHENTICATION & SIGNATURE */}
              {currentStep === 4 && (
                <div className="space-y-10">
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                            <ShieldCheck className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-sm font-black text-emerald-900 tracking-tight">Certification Digitale</h4>
                             <p className="text-[11px] font-medium text-emerald-700 leading-relaxed">
                               En fournissant votre signature ci-contre, vous vous engagez formellement envers le réseau FinTrack. Cette signature a pleine valeur juridique pour l'activation de votre compte marchand.
                             </p>
                          </div>
                       </div>
                       
                       <div className="bg-slate-50 p-6 rounded-[2.5rem] space-y-4 border border-slate-100">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <LockIcon className="w-3 h-3" />
                            Engagement & Sécurité
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-fintrack-primary" /> Signature sur papier blanc fortement recommandée
                            </li>
                            <li className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-fintrack-primary" /> Doit correspondre à la pièce d'identité
                            </li>
                            <li className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-fintrack-primary" /> Fichier JPG/PNG haute résolution
                            </li>
                          </ul>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Déposez votre signature scannée</label>
                      <label className="block aspect-[4/3] bg-white border-4 border-dashed border-slate-100 rounded-[3rem] hover:border-fintrack-primary hover:bg-fintrack-primary/5 transition-all cursor-pointer relative group overflow-hidden shadow-inner">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            if (file) {
                              setFormData(prev => ({ 
                                ...prev, 
                                signatureFile: file, 
                                signaturePreview: URL.createObjectURL(file) 
                              }));
                            }
                          }}
                        />
                        {formData.signaturePreview ? (
                          <div className="w-full h-full flex items-center justify-center p-8 bg-white">
                            <img src={formData.signaturePreview} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="Signature" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <PenTool className="w-8 h-8 text-slate-300 group-hover:text-fintrack-primary transition-colors" />
                            </div>
                            <div className="text-center px-6">
                              <p className="text-[10px] font-black text-slate-900 uppercase">Importer ma signature</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Photo nette sur fond blanc</p>
                            </div>
                          </div>
                        )}
                        {formData.signatureFile && <div className="absolute top-6 right-6 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg"><Check className="w-4 h-4" /></div>}
                      </label>
                      {formData.signatureFile && (
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, signatureFile: null, signaturePreview: null }))}
                          className="w-full text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline"
                        >
                          Changer la signature
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <input type="checkbox" required className="w-6 h-6 rounded-lg accent-fintrack-primary cursor-pointer" id="terms" />
                    <label htmlFor="terms" className="text-[10px] font-black text-slate-500 leading-relaxed uppercase tracking-widest cursor-pointer">
                      Je certifie l'exactitude des informations et j'accepte les clauses de sécurité du réseau marchand.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons Refined */}
              <div className="mt-14 pt-10 border-t border-slate-50 flex flex-col sm:flex-row gap-6 relative z-10">
                {currentStep > 1 && (
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-6 px-10 bg-white border border-slate-100 text-slate-400 rounded-[2.2rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Précédent
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="flex-[2] py-6 px-10 bg-slate-900 text-white rounded-[2.2rem] font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 hover:bg-fintrack-primary hover:shadow-[0_20px_40px_rgba(35,77,150,0.3)] transition-all active:scale-95"
                  >
                    Phase Suivante
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-[2] py-6 px-10 bg-emerald-600 text-white rounded-[2.2rem] font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 hover:bg-emerald-700 hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Soumettre mon Dossier
                        <ShieldCheck className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
            Protégé par sécurité bancaire AES-256
          </p>
          </div>
        </div>
      </main>

      {/* Security Footer */}
      <footer className="py-12 px-12 border-t border-slate-100 bg-white grid md:grid-cols-3 gap-10 items-center">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0"><LockIcon className="w-5 h-5 text-slate-400" /></div>
              <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Cryptage AES-256</span>
                  <p className="text-[10px] text-slate-400 font-bold">Standard de sécurité militaire</p>
              </div>
          </div>
          <div className="flex flex-col items-center text-center">
             <Logo className="h-6 grayscale opacity-20 mb-4" showText={false} />
             <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Opéré par FinTrack Technologies S.A.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Système de Vérification en Ligne</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold tracking-[0.1em]">© 2026 • SIÈGE SOCIAL - COTONOU, BÉNIN</p>
          </div>
      </footer>
    </div>
  );
}
