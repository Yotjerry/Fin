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
  History,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Menu,
  X,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [agreed, setAgreed] = useState(false);
  
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
    /* Validation relaxée pour le test utilisateur */
    /* 
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
    */
    
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
    if (!agreed) {
      setErrors(["Vous devez accepter les conditions pour soumettre votre dossier."]);
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
      <div className="min-h-screen bg-transparent selection:bg-fintrack-primary selection:text-white font-sans antialiased text-slate-900">
        {/* Navigation - Enhanced with navigation context */}
        <header className="fixed top-0 left-0 w-full z-50 px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] px-8 py-0 flex items-center justify-between shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] h-20 sm:h-24">
              <Link to="/">
                <Logo className="w-auto h-18 sm:h-20" />
              </Link>
              <nav className="flex items-center gap-4 sm:gap-6">
                <Link to="/" className="text-slate-400 hover:text-fintrack-primary text-[10px] font-black uppercase tracking-widest transition-colors">Accueil</Link>
                <div className="h-4 w-px bg-slate-100 hidden sm:block" />
                <a 
                  href="mailto:support@fintrack.com"
                  className="bg-fintrack-primary/10 text-fintrack-primary px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-fintrack-primary hover:text-white transition-all"
                >
                  Support
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-24 px-6 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl text-center space-y-10"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm rotate-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Dossier Soumis avec Succès</h1>
              <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Merci {formData.firstName}. Votre demande d'adhésion est en cours de traitement. Un administrateur FinTrack Network vous contactera par email ou téléphone après vérification manuelle.
              </p>
            </div>

            {/* Action Importante: Suivi de dossier */}
            <div className="p-8 bg-slate-900 rounded-[2.2rem] text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fintrack-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-fintrack-primary/30 transition-all" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-fintrack-secondary text-[10px] font-black uppercase tracking-widest">Référence de suivi</p>
                  <p className="text-3xl font-black text-white tracking-widest sm:text-4xl">FT-{Math.floor(Math.random() * 900000 + 100000)}</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Conservez ce code précieusement</p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all backdrop-blur-md">
                    Imprimer le reçu
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-left flex items-start gap-5">
              <ShieldCheck className="w-6 h-6 text-fintrack-primary shrink-0 mt-2" />
              <div>
                <p className="font-bold text-slate-900 leading-tight text-lg">Vérification en cours</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                  Nous analysons actuellement votre RCCM et vos documents d'identité. Ce processus prend généralement entre 24h et 48h ouvrées.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Retour à l'accueil
              </Link>
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-fintrack-primary text-white rounded-2xl font-bold hover:bg-fintrack-dark transition-all shadow-xl shadow-fintrack-primary/20 hover:scale-105 active:scale-95"
              >
                Accéder au Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </main>

        <FooterSectionOnboarding />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-sans antialiased text-slate-900 selection:bg-fintrack-primary selection:text-white">
      {/* Navigation - Exact same logic as Homepage navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/85 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] px-8 py-0 flex items-center justify-between shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06)] h-20 sm:h-24">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo className="w-auto h-18 sm:h-20" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-all border border-emerald-100"
              >
                Accès Démo (Dev)
              </Link>
              <Link 
                to="/"
                className="text-slate-600 hover:text-fintrack-primary font-bold text-sm transition-colors flex items-center gap-2 pr-4"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Quitter l'inscription</span>
                <span className="sm:hidden text-xs">Quitter</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-36 sm:pt-40 pb-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-5xl space-y-12">
          {/* Cool & Posey Step Indicator (Glassmorphic Bento) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div 
                  key={step.id}
                  className={`relative flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 overflow-hidden group ${
                    isActive 
                      ? "bg-fintrack-primary text-white border-fintrack-primary shadow-2xl shadow-fintrack-primary/40 scale-105 z-10" 
                      : isCompleted 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-white/50 text-slate-400 border-slate-100 backdrop-blur-md"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-step-glow"
                      className="absolute inset-0 bg-gradient-to-r from-fintrack-primary via-fintrack-dark to-fintrack-primary bg-[length:200%_100%] animate-pulse opacity-20"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                  
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black font-mono transition-all duration-500 ${
                    isActive ? "bg-white text-fintrack-primary" : isCompleted ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black ${isActive ? "text-white" : "text-slate-900/60"}`}>
                      {step.title}
                    </span>
                    {isActive && (
                      <motion.span 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[8px] font-bold text-white/70"
                      >
                        {step.desc}
                      </motion.span>
                    )}
                  </div>

                  {isActive && (
                    <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-full -mr-4 -mt-4" />
                  )}
                </div>
              );
            })}
          </div>

          <motion.div 
            layout
            className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="p-10 sm:p-16">
              <div className="mb-14 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fintrack-primary/5 border border-fintrack-primary/10 text-fintrack-primary text-[9px] font-black mb-4">
                  Étape {currentStep} sur 4
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
                  {steps[currentStep-1].title}
                </h1>
                <p className="text-slate-500 font-medium text-base">
                  {steps[currentStep-1].desc}
                </p>
              </div>

              {errors.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-10 p-5 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-600 flex items-start gap-4"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-black text-red-600">Erreur de conformité</p>
                    <ul className="list-disc list-inside">
                      {errors.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                  </div>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {currentStep === 1 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <SimpleInput label="Nom" value={formData.lastName} onChange={(v) => setFormData(prev => ({ ...prev, lastName: v }))} />
                      <SimpleInput label="Prénom(s)" value={formData.firstName} onChange={(v) => setFormData(prev => ({ ...prev, firstName: v }))} />
                      <SimpleInput label="Email" type="email" value={formData.email} onChange={(v) => setFormData(prev => ({ ...prev, email: v }))} />
                      <SimpleInput label="Téléphone" value={formData.phone} onChange={(v) => setFormData(prev => ({ ...prev, phone: v }))} />
                      <SimpleInput label="Date de naissance" type="date" value={formData.birthDate} onChange={(v) => setFormData(prev => ({ ...prev, birthDate: v }))} />
                      <SimpleInput label="Lieu de naissance" value={formData.birthPlace} onChange={(v) => setFormData(prev => ({ ...prev, birthPlace: v }))} />
                      <div className="sm:col-span-2">
                        <SimpleInput label="Adresse Personnelle" placeholder="Ville, Quartier, Repère" value={formData.personalAddress} onChange={(v) => setFormData(prev => ({ ...prev, personalAddress: v }))} />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <SimpleInput label="Dénomination de l'Agence" placeholder="ex: Ets La Béninoise" value={formData.businessName} onChange={(v) => setFormData(prev => ({ ...prev, businessName: v }))} />
                      </div>
                      <SimpleInput label="Numéro IFU" value={formData.ifu} onChange={(v) => setFormData(prev => ({ ...prev, ifu: v }))} />
                      <SimpleInput label="Numéro RCCM" value={formData.rccm} onChange={(v) => setFormData(prev => ({ ...prev, rccm: v }))} />
                      <div className="sm:col-span-2">
                        <SimpleInput label="Adresse de l'Agence" placeholder="Ville, Quartier" value={formData.businessAddress} onChange={(v) => setFormData(prev => ({ ...prev, businessAddress: v }))} />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <SimpleUpload label="Pièce d'Identité (Recto)" id="idFront" file={formData.idFront} onUpload={(f) => handleFileUpload('idFront', f)} />
                      <SimpleUpload label="Pièce d'Identité (Verso)" id="idBack" file={formData.idBack} onUpload={(f) => handleFileUpload('idBack', f)} />
                      <SimpleUpload label="Registre de Commerce (RCCM)" id="rccmDoc" file={formData.rccmDoc} onUpload={(f) => handleFileUpload('rccmDoc', f)} />
                      <SimpleUpload label="Selfie de Vérification" id="selfie" file={formData.selfiePhoto} onUpload={(f) => handleFileUpload('selfiePhoto', f)} />
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <p className="text-sm text-emerald-800 font-medium">
                          Votre signature authentifie ce dossier. Il sera examiné manuellement par un administrateur FinTrack pour l'activation finale.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400">Signature officielle</label>
                        <div className="aspect-[3/1] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl relative group hover:border-fintrack-primary transition-colors overflow-hidden">
                          <input type="file" className="hidden" accept="image/*" id="sig-upload" onChange={(e) => {
                            const f = e.target.files?.[0] || null;
                            if (f) setFormData(prev => ({ ...prev, signatureFile: f, signaturePreview: URL.createObjectURL(f) }));
                          }} />
                          <label htmlFor="sig-upload" className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-6 text-center">
                            {formData.signaturePreview ? (
                              <img src={formData.signaturePreview} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="Sig" />
                            ) : (
                              <>
                                <PenTool className="w-6 h-6 text-slate-300 mb-2" />
                                <span className="text-xs font-bold text-slate-400 tracking-tight">Importer votre signature manuscrite (JPG/PNG)</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="agree" 
                          className="w-5 h-5 rounded border-slate-300 text-fintrack-primary focus:ring-fintrack-primary cursor-pointer transition-all" 
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label htmlFor="agree" className="text-sm font-bold text-slate-600 cursor-pointer select-none">
                          Je certifie l'exactitude des informations et j'accepte la vérification administrative.
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between gap-4">
                <button 
                  type="button" 
                  onClick={prevStep} 
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-0 disabled:pointer-events-none`}
                >
                  Précédent
                </button>
                {currentStep < 4 ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="px-8 py-3 bg-fintrack-primary text-white rounded-lg font-bold text-sm hover:bg-fintrack-dark transition-all flex items-center gap-2"
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Chargement..." : "Soumettre le dossier"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <FooterSectionOnboarding />
    </div>
  );
}

function SimpleInput({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-400 ml-1">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-fintrack-primary/10 focus:border-fintrack-primary outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
}

function SimpleUpload({ label, id, file, onUpload }: { label: string; id: string; file: File | null; onUpload: (f: File | null) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-400 ml-1">{label}</label>
      <label htmlFor={id} className={`block aspect-video rounded-2xl border-2 border-dashed cursor-pointer relative group overflow-hidden transition-all ${
        file ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:border-fintrack-primary hover:bg-slate-100"
      }`}>
        <input type="file" id={id} className="hidden" onChange={(e) => onUpload(e.target.files?.[0] || null)} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          {file ? (
            <div className="space-y-2">
              <Check className="w-6 h-6 text-emerald-500 mx-auto" />
              <p className="text-[10px] font-bold text-emerald-900 truncate max-w-[120px]">{file.name}</p>
            </div>
          ) : (
            <>
              <UploadCloud className="w-5 h-5 text-slate-300 group-hover:text-fintrack-primary transition-colors" />
              <p className="text-[10px] font-bold text-slate-400 mt-2">Importer</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
}

function FooterSectionOnboarding() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <Logo className="h-28 mb-8" />
          <p className="text-slate-400 text-[10px] sm:text-xs leading-relaxed max-w-[200px]">
            FinTrack - La plateforme de confiance pour la gestion des opérations financières sur le terrain.
          </p>
        </div>
        
        <div>
          <h5 className="font-bold text-slate-900 mb-6 text-base">Services</h5>
          <ul className="space-y-3 text-xs text-slate-500 font-medium">
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Gestion des Ventes</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Dépôts Bancaires</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Suivi de Caisse</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Supervision Agents</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-6 text-base">Support & Légal</h5>
          <ul className="space-y-3 text-xs text-slate-500 font-medium">
            <li><a href="/#faq" className="hover:text-fintrack-secondary transition-colors">FAQ</a></li>
            <li><a href="mailto:support@fintrack.com" className="hover:text-fintrack-secondary transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Conditions d'utilisation</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-6 text-base">Social</h5>
          <div className="flex flex-wrap gap-2">
            <SocialIcon icon={<Twitter />} />
            <SocialIcon icon={<Linkedin />} />
            <SocialIcon icon={<Github />} />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        <p>FinTrack - Gestion Mobile & Fintech</p>
        <p>Copyright &copy; 2026 FinTrack</p>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-fintrack-primary hover:text-white transition-all cursor-pointer shadow-sm">
      <div className="w-5 h-5 font-bold">
        {icon}
      </div>
    </a>
  );
}
