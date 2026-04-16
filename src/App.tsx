/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate 
} from "react-router-dom";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
import Logo from "./components/Logo";
import AuthPage from "./pages/AuthPage";
import MerchantOnboarding from "./pages/MerchantOnboarding";
import { 
  ChevronDown, 
  Search, 
  Play, 
  Workflow, 
  BarChart3, 
  Link as LinkIcon,
  Settings,
  Layers,
  Zap,
  Cloud,
  PieChart,
  Activity,
  Rocket,
  Shield,
  TrendingUp,
  MousePointer2,
  FileText,
  Database,
  Lock as LockIcon,
  Check,
  Wallet,
  Landmark,
  Smartphone,
  History as HistoryIcon,
  Camera as CameraIcon,
  Users,
  ShieldCheck, 
  CheckCircle2,
  ArrowRight, 
  Twitter, 
  Linkedin, 
  Github,
  Download,
  Menu,
  X,
  Mail
} from "lucide-react";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<MerchantOnboarding />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const testimonials = [
    {
      name: "Jean-Marc Koffi",
      role: "Marchand Général",
      image: "https://picsum.photos/seed/jean/200/200",
      quote: "FinTrack a révolutionné notre gestion ! Nous avons réduit les écarts de caisse de 60% dès le premier mois.",
      stats: { savings: "60%", roi: "95%" }
    },
    {
      name: "Awa Diop",
      role: "Superviseur de Terrain",
      image: "https://picsum.photos/seed/awa/200/200",
      quote: "La meilleure plateforme de suivi pour nos agents mobiles. La remontée des fonds est devenue fluide et transparente.",
      stats: { savings: "40%", roi: "110%" }
    },
    {
      name: "Moussa Traoré",
      role: "Directeur Financier",
      image: "https://picsum.photos/seed/moussa/200/200",
      quote: "L'analyse en temps réel a changé notre prise de décision. Le suivi des dépôts bancaires est d'une précision chirurgicale.",
      stats: { savings: "55%", roi: "150%" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent selection:bg-fintrack-primary selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 py-1 sm:px-6 sm:py-2 animate-in fade-in slide-in-from-top duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] px-8 py-0 flex items-center justify-between shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] h-20 sm:h-24">
            <Logo className="w-auto h-18 sm:h-20" />

            <div className="hidden lg:flex items-center gap-8">
              <NavItem label="Accueil" href="#accueil" />
              <NavItem label="Fonctionnalités" href="#fonctionnalites" />
              <NavItem label="Solutions" href="#solutions" />
              <NavItem label="Tarification" href="#tarifs" />
              <NavItem label="À propos" href="#a-propos" />
              <NavItem label="Contact" href="#contact" />
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden sm:flex items-center gap-6">
                <button 
                  onClick={() => navigate("/auth")}
                  className="text-slate-600 hover:text-fintrack-primary font-bold text-sm transition-colors"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => navigate("/auth")}
                  className="bg-fintrack-primary hover:bg-fintrack-dark text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-bold text-xs transition-all shadow-xl shadow-fintrack-primary/20 hover:scale-105 active:scale-95"
                >
                  Commencer
                </button>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-fintrack-primary transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:hidden mt-4 bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col gap-6">
                  <NavItem label="Accueil" href="#accueil" mobile />
                  <NavItem label="Fonctionnalités" href="#fonctionnalites" mobile />
                  <NavItem label="Solutions" href="#solutions" mobile />
                  <NavItem label="Tarification" href="#tarifs" mobile />
                  <NavItem label="À propos" href="#a-propos" mobile />
                  <NavItem label="Contact" href="#contact" mobile />
                  <hr className="border-slate-100" />
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/auth");
                      }}
                      className="text-slate-600 font-bold text-center py-2"
                    >
                      Connexion
                    </button>
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/auth");
                      }}
                      className="bg-fintrack-primary text-white px-8 py-4 rounded-2xl font-bold text-center shadow-lg shadow-fintrack-primary/20"
                    >
                      Commencer
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="pt-32 sm:pt-36 pb-16">
        {/* Hero Section */}
        <section id="accueil" className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fintrack-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-fintrack-secondary/5 rounded-full blur-[100px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fintrack-primary/5 border border-fintrack-primary/10 text-fintrack-primary text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fintrack-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fintrack-primary"></span>
              </span>
              Plateforme de Gestion Financière 2.0
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl leading-[1.05] mb-6 text-slate-900 font-black tracking-tighter">
              L'intelligence financière <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintrack-primary to-fintrack-secondary">au service de votre croissance.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Pilotez vos ventes, vos dépôts bancaires et vos agents de terrain avec une précision chirurgicale. FinTrack transforme vos données en décisions stratégiques.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={() => navigate("/auth")}
                className="bg-fintrack-primary hover:bg-fintrack-dark text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-2xl shadow-fintrack-primary/30 hover:scale-105 active:scale-95"
              >
                Démarrer gratuitement
              </button>
              <WatchDemoButton />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-full mt-12 lg:mt-0"
          >
            {/* Connecting Lines SVG */}
            <svg className="absolute -inset-10 sm:-inset-20 w-[120%] sm:w-[140%] h-[120%] sm:h-[140%] pointer-events-none z-0 opacity-20" viewBox="0 0 800 600">
              <path d="M100,300 Q200,100 400,300 T700,300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-fintrack-accent" />
              <path d="M150,400 Q300,500 450,350 T750,450" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-fintrack-secondary" />
            </svg>

            {/* Hero Image Replacement */}
            <div className="relative z-10 bg-slate-950 p-1.5 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden group w-full h-full min-h-[350px] sm:min-h-[500px] lg:min-h-[600px]">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                  alt="FinTrack Dashboard Preview" 
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-60 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/40 to-fintrack-primary/20 pointer-events-none" />
                
                {/* Overlay Badge - Glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-4 sm:p-6 rounded-2xl flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm sm:text-lg tracking-tight">Tableau de Bord 2.0</div>
                      <div className="text-white/80 text-[9px] sm:text-xs font-bold uppercase tracking-widest">Analyse prédictive active</div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-fintrack-secondary/80 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                    Live
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Icons - Refined */}
            <FloatingIcon icon={<Wallet className="text-amber-500 w-5 h-5" />} className="top-4 -right-6 bg-white shadow-2xl border border-slate-100 p-3 rounded-2xl" delay={0} />
            <FloatingIcon icon={<Landmark className="text-fintrack-primary w-5 h-5" />} className="bottom-20 -left-10 bg-white shadow-2xl border border-slate-100 p-3 rounded-2xl" delay={1} />
            <FloatingIcon icon={<Smartphone className="text-fintrack-secondary w-5 h-5" />} className="-top-12 left-1/2 bg-white shadow-2xl border border-slate-100 p-3 rounded-2xl" delay={0.5} />
            <FloatingIcon icon={<HistoryIcon className="text-purple-500 w-5 h-5" />} className="bottom-4 right-12 bg-white shadow-2xl border border-slate-100 p-3 rounded-2xl" delay={1.5} />
            
            {/* Background Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-fintrack-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fintrack-secondary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </section>


        {/* Fonctionnalités Section */}
        <section id="fonctionnalites" className="max-w-7xl mx-auto px-6 mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl mb-3 text-slate-900 font-bold">
              Fonctionnalités Avancées
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              Une plateforme robuste conçue pour répondre aux défis complexes de la gestion financière sur le terrain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Wallet />}
              title="Gestion des Ventes"
              description="Enregistrement instantané des transactions avec catégorisation automatique et suivi des stocks en temps réel."
            />
            <FeatureCard 
              icon={<HistoryIcon />}
              title="Gestion de la Caisse"
              description="Suivi rigoureux des entrées et sorties, clôtures journalières automatisées et détection d'écarts."
            />
            <FeatureCard 
              icon={<Landmark />}
              title="Dépôts Bancaires"
              description="Validation des remontées de fonds avec preuves numériques et réconciliation bancaire simplifiée."
            />
            <FeatureCard 
              icon={<Activity />}
              title="Suivi des Agents"
              description="Géolocalisation des opérations, suivi des performances individuelles et gestion des tournées."
            />
            <FeatureCard 
              icon={<PieChart />}
              title="Rapports & Analytics"
              description="Tableaux de bord personnalisables, exportations de données et analyses prédictives de croissance."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Audit & Supervision"
              description="Journal d'audit complet, alertes en cas d'anomalies et outils de supervision hiérarchique."
            />
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="max-w-7xl mx-auto px-6 mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl mb-3 text-slate-900 font-bold">Solutions par Profil</h2>
            <p className="text-slate-500 text-sm">FinTrack s'adapte aux besoins spécifiques de chaque acteur de votre écosystème.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group hover:bg-fintrack-primary transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-fintrack-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
              <div className="w-14 h-14 bg-fintrack-primary/10 text-fintrack-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors relative z-10 mx-auto">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors tracking-tight relative z-10">Agents de Terrain</h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-white/80 transition-colors mb-6 font-medium relative z-10 text-center">Outils mobiles intuitifs pour l'encaissement, le reporting et la gestion des dépôts en toute mobilité.</p>
              <ul className="space-y-3 text-xs font-bold group-hover:text-white/90 transition-colors relative z-10">
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-secondary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-secondary group-hover:text-white" /></div> Encaissement rapide</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-secondary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-secondary group-hover:text-white" /></div> Preuves de dépôt</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-secondary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-secondary group-hover:text-white" /></div> Mode hors-ligne</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group hover:bg-fintrack-secondary transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-fintrack-secondary/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
              <div className="w-14 h-14 bg-fintrack-secondary/10 text-fintrack-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors relative z-10 mx-auto">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors tracking-tight relative z-10">Marchands</h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-white/80 transition-colors mb-6 font-medium relative z-10 text-center">Visibilité totale sur les opérations, gestion des stocks et optimisation des flux de trésorerie.</p>
              <ul className="space-y-3 text-xs font-bold group-hover:text-white/90 transition-colors relative z-10">
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-primary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-primary group-hover:text-white" /></div> Suivi des ventes</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-primary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-primary group-hover:text-white" /></div> Clôtures de caisse</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-primary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-primary group-hover:text-white" /></div> Gestion d'inventaire</li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group hover:bg-slate-900 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
              <div className="w-14 h-14 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors relative z-10 mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors tracking-tight relative z-10">Administrateurs</h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-white/80 transition-colors mb-6 font-medium relative z-10 text-center">Contrôle centralisé, gestion des accès, audits de sécurité et rapports consolidés multi-sites.</p>
              <ul className="space-y-3 text-xs font-bold group-hover:text-white/90 transition-colors relative z-10">
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-secondary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-secondary group-hover:text-white" /></div> Gestion des rôles</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-secondary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-secondary group-hover:text-white" /></div> Audit de sécurité</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-fintrack-secondary/20 flex items-center justify-center group-hover:bg-white/20"><Check className="w-3 h-3 text-fintrack-secondary group-hover:text-white" /></div> API & Intégrations</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="tarifs" className="max-w-7xl mx-auto px-6 mt-24 text-center">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl mb-3 text-slate-900 font-bold">Tarification Transparente</h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">Des offres adaptées à chaque étape de votre développement, sans frais cachés.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <PricingCard 
              title="Indépendant"
              price="0"
              description="Idéal pour les marchands individuels et petits projets."
              features={["Jusqu'à 3 agents", "Suivi de caisse basique", "Support communautaire", "1 Superviseur", "Rapports hebdomadaires"]}
            />
            <PricingCard 
              title="Business"
              price="29"
              description="Parfait pour les équipes en pleine croissance."
              features={["Agents illimités", "Analyses avancées", "Support prioritaire", "Preuves photo illimitées", "Rapports personnalisés", "Audit en temps réel"]}
              isPopular
            />
            <PricingCard 
              title="Entreprise"
              price="Sur mesure"
              description="Fonctionnalités avancées pour les grandes organisations."
              features={["Tout du plan Business", "Gestionnaire dédié", "Garantie de service (SLA)", "Multi-agences", "Intégration API", "Formation sur site"]}
            />
          </div>
        </section>

        {/* Mobility Section */}
        <section className="max-w-7xl mx-auto px-6 mt-24 bg-fintrack-primary rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col lg:items-start lg:text-left">
              <h2 className="text-3xl md:text-4xl mb-6 font-bold leading-tight">Pensé pour la Mobilité et le Terrain</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <CameraIcon className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Preuves Photo</h4>
                    <p className="text-white/60 text-sm">Capturez vos reçus de dépôt bancaire pour une traçabilité irréprochable.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Rapidité d'Exécution</h4>
                    <p className="text-white/60 text-sm">Une interface fluide optimisée pour les smartphones, même avec une connexion limitée.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <HistoryIcon className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Historique Complet</h4>
                    <p className="text-white/60 text-sm">Consultez vos transactions passées et vos rapports de clôture à tout moment.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="bg-white/5 rounded-3xl p-3 backdrop-blur-sm border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80" 
                  alt="FinTrack Mobile App in use" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[3/4]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fintrack-secondary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </section>

        {/* Grid Layout for the second part */}
        <div className="max-w-7xl mx-auto px-6 mt-40 grid lg:grid-cols-2 gap-x-12 gap-y-32 items-start">
          {/* Why Choose FinTrack? */}
          <section className="text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl mb-3 text-slate-900 font-bold">Pourquoi choisir FinTrack ?</h2>
              <p className="text-slate-500 text-sm font-medium">La rigueur et la transparence au service de votre croissance.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <WhyChooseCard 
                icon={<Rocket />}
                title="Efficacité Boostée"
                description="Automatisez vos rapports et gagnez du temps sur vos opérations quotidiennes."
              />
              <WhyChooseCard 
                icon={<BarChart3 />}
                title="Données Précises"
                description="Accédez à des analyses détaillées pour un pilotage optimal de vos performances."
              />
              <WhyChooseCard 
                icon={<ShieldCheck />}
                title="Sécurité Totale"
                description="Vos données financières sont protégées par des protocoles de sécurité de niveau bancaire."
              />
              <WhyChooseCard 
                icon={<TrendingUp />}
                title="Plateforme Scalable"
                description="Une solution qui évolue avec votre entreprise, du marchand solo à la grande agence."
              />
            </div>
          </section>

          {/* Customer Success Stories */}
          <section className="text-center">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl mb-2 text-slate-900 font-bold">Témoignages Clients</h2>
              <p className="text-slate-500 text-xs font-medium">Découvrez comment FinTrack transforme le quotidien des entreprises.</p>
            </div>
            
            <div className="relative min-h-[350px] md:min-h-[250px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div 
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row items-stretch overflow-hidden text-left h-full"
                >
                  {/* Left Profile Side */}
                  <div className="md:w-[35%] bg-[#f0f7ff] p-6 flex flex-col items-center justify-center text-center border-r border-slate-100">
                    <motion.img 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mb-3"
                      referrerPolicy="no-referrer"
                    />
                    <motion.h4 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm font-bold text-slate-900"
                    >
                      {testimonials[activeTestimonial].name}
                    </motion.h4>
                    <motion.p 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[9px] text-slate-500 font-bold uppercase tracking-wider"
                    >
                      {testimonials[activeTestimonial].role}
                    </motion.p>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-xs text-slate-700 font-medium mb-4 leading-relaxed italic">
                        "{testimonials[activeTestimonial].quote}"
                      </p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Logo className="h-10" />
                        <div className="w-1.5 h-1.5 rounded-full bg-fintrack-success" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="border-t border-slate-100 pt-4 flex items-center justify-between"
                    >
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm ${
                            i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-fintrack-dark' : i === 3 ? 'bg-red-500' : 'bg-fintrack-success'
                          }`}>
                            {i === 1 ? <Activity className="w-3 h-3" /> : i === 2 ? <Cloud className="w-3 h-3" /> : i === 3 ? <Zap className="w-3 h-3" /> : <Workflow className="w-3 h-3" />}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900">{testimonials[activeTestimonial].stats.savings}</div>
                          <div className="text-[6px] text-slate-400 uppercase font-bold tracking-widest">Gain de Temps</div>
                        </div>
                        <div className="text-center border-l border-slate-100 pl-4">
                          <div className="text-lg font-bold text-slate-900">{testimonials[activeTestimonial].stats.roi}</div>
                          <div className="text-[6px] text-slate-400 uppercase font-bold tracking-widest">ROI</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`group relative h-3 transition-all duration-500 ease-out rounded-full overflow-hidden ${
                    activeTestimonial === index 
                      ? "w-12 bg-fintrack-primary" 
                      : "w-3 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {activeTestimonial === index && (
                    <motion.div 
                      layoutId="activeDot"
                      className="absolute inset-0 bg-fintrack-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Key Features (Subdivided into 4) */}
          <section className="text-center lg:pt-10">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl mb-3 text-slate-900 font-bold">Fonctionnalités Avancées</h2>
              <p className="text-slate-500 text-sm font-medium">Des outils puissants pour une gestion sans faille.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <WhyChooseCard 
                icon={<Smartphone />}
                title="Mobile-First"
                description="Optimisé pour le terrain et les smartphones."
              />
              <WhyChooseCard 
                icon={<PieChart />}
                title="Rapports"
                description="Analyses détaillées de vos performances."
              />
              <WhyChooseCard 
                icon={<Database />}
                title="Cloud Sync"
                description="Données synchronisées en temps réel."
              />
              <WhyChooseCard 
                icon={<ShieldCheck />}
                title="Sécurité"
                description="Protection bancaire de vos transactions."
              />
            </div>
          </section>

          {/* CTA Section (Moved next to Advanced Features) */}
          <section className="h-full">
            <div className="bg-fintrack-primary/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-center relative overflow-hidden h-full flex flex-col items-center justify-center border border-fintrack-primary/10">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-slate-900 font-bold leading-tight">
                  Prêt à Propulser <span className="text-fintrack-secondary">Votre</span> <br /> Activité ?
                </h2>
                <p className="text-slate-500 text-[10px] sm:text-xs mb-6 sm:mb-8 max-w-[280px] mx-auto leading-relaxed">
                  Rejoignez des milliers de marchands qui font confiance à FinTrack pour piloter leurs ventes et leurs dépôts.
                </p>
                <button 
                  onClick={() => navigate("/auth")}
                  className="bg-fintrack-primary hover:bg-fintrack-dark text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full font-bold text-[10px] sm:text-xs transition-all shadow-lg shadow-fintrack-primary/20"
                >
                  Essayer FinTrack Gratuitement !
                </button>
              </div>
              
              {/* Large Black Arrows */}
              <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden xl:block pointer-events-none opacity-90">
                <div className="relative w-24 h-24">
                  <div className="absolute top-0 right-0">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
                      <line x1="17" y1="7" x2="7" y2="17"></line>
                      <polyline points="17 17 7 17 7 7"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section - Redesigned based on image */}
        <section id="contact" className="max-w-7xl mx-auto px-6 mt-24 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[#E8F0FE] text-[#1A73E8] px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
                Parlons de votre projet
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B1B3D] mb-6 leading-tight">
                Une question ?<br />
                Une <span className="text-fintrack-primary">démo</span> ?
              </h2>
              <p className="text-slate-500 text-base mb-8 leading-relaxed max-w-md">
                Notre équipe d'experts est disponible pour répondre à toutes vos questions et vous aider à configurer FinTrack selon vos besoins spécifiques.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center group-hover:bg-fintrack-primary group-hover:text-white transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Email Direct</div>
                    <div className="text-xl font-bold text-[#0B1B3D]">contact@fintrack.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center group-hover:bg-fintrack-primary group-hover:text-white transition-all duration-300">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Support Whatsapp</div>
                    <div className="text-xl font-bold text-[#0B1B3D]">+229 01 00 00 00 00</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden"
            >
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Votre Nom</label>
                    <input 
                      type="text" 
                      placeholder="Jean Koffi" 
                      className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-[#0B1B3D] placeholder:text-slate-300 focus:ring-2 focus:ring-fintrack-primary/20 transition-all font-bold text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Pro</label>
                    <input 
                      type="email" 
                      placeholder="jean@entreprise.com" 
                      className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-[#0B1B3D] placeholder:text-slate-300 focus:ring-2 focus:ring-fintrack-primary/20 transition-all font-bold text-sm" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    placeholder="Dites-nous tout..." 
                    rows={4} 
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-[#0B1B3D] placeholder:text-slate-300 focus:ring-2 focus:ring-fintrack-primary/20 transition-all font-bold resize-none text-sm"
                  ></textarea>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-[#0B1B3D] text-white px-10 py-4 rounded-xl font-black flex items-center justify-center gap-3 group shadow-2xl shadow-[#0B1B3D]/20"
                  >
                    <span className="text-base">Envoyer</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[200px] text-center md:text-left">
                    En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* About Section - Enhanced */}
        <section id="a-propos" className="max-w-7xl mx-auto px-6 mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-fintrack-primary/10 text-fintrack-primary px-3 py-1.5 rounded-full text-[10px] font-bold mb-4">
                NOTRE HISTOIRE
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Digitaliser le dernier kilomètre de la <span className="text-fintrack-secondary">finance terrain</span>.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                FinTrack est né d'un constat simple : la gestion des flux financiers sur le terrain est souvent opaque et risquée. Nous avons bâti une plateforme qui apporte transparence, sécurité et efficacité aux marchands et à leurs agents.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-fintrack-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6 text-fintrack-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Notre Mission</h4>
                    <p className="text-slate-500 text-sm">Démocratiser l'accès aux outils de gestion financière avancés pour tous les acteurs du terrain.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-fintrack-secondary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Notre Vision</h4>
                    <p className="text-slate-500 text-sm">Devenir le standard de confiance pour les transactions financières mobiles en Afrique et au-delà.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Nos Valeurs</h4>
                    <p className="text-slate-500 text-sm">Intégrité, Innovation, Proximité et Excellence opérationnelle.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-fintrack-success/10 text-fintrack-success rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Certifié Sécurisé</div>
                    <div className="text-xs text-slate-400">Standard Bancaire</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Partners Grid */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ils nous font confiance</h3>
            <p className="text-slate-500">Intégration native avec les plus grands réseaux.</p>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            <PartnerCard name="MTN" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/mtn.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L210bi5wbmciLCJpYXQiOjE3NzYwODg4NTAsImV4cCI6MTgwNzYyNDg1MH0.aY3pn3wP7CWUrznZrCMTXKeTzV9BnLJsQCJRNRAw8iU" />
            <PartnerCard name="Moov" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/moov.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L21vb3YuanBlZyIsImlhdCI6MTc3NjA5MDEzNCwiZXhwIjoxODA3NjI2MTM0fQ.K9jlmQUyBBp6Og2ElxiO16D9YGk-AieGmIHVG0bUuQQ" />
            <PartnerCard name="Celtiis" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/celtiis.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L2NlbHRpaXMuanBnIiwiaWF0IjoxNzc2MDg4ODEwLCJleHAiOjE4MDc2MjQ4MTB9.UKspCgfucV5z3HTlfTNrNtQmQAfWou8cv_xXdcbpDHg" />
            <PartnerCard name="Canal+" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/Canal+.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L0NhbmFsKy5qcGVnIiwiaWF0IjoxNzc2MTc5Njc0LCJleHAiOjE4MDc3MTU2NzR9.Xv9q8tdRQDysxHnBETNzG3FZof2NbycozoUNgs9dv0Y" />
            <PartnerCard name="SBEE" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/sbee.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L3NiZWUud2VicCIsImlhdCI6MTc3NjA4ODg2NywiZXhwIjoxODA3NjI0ODY3fQ.gTg-eCiYsbaCM44dNmWcPEhy2lfM7aKQ9wEOV3M0SQ0" />
            <PartnerCard name="SONEB" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/soneb.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L3NvbmViLndlYnAiLCJpYXQiOjE3NzYwODg4ODgsImV4cCI6MTgwNzYyNDg4OH0.8r-KDvZ0KAXPrVZALbJTcYvo_9EVsCmHyBzbdfIibpU" />
          </motion.div>
        </section>

        {/* PWA / App Section - Hyper Version (Moved to end) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 mb-16">
          <div className="bg-[#0B1B3D] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 relative overflow-hidden shadow-2xl">
            
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(106,188,166,0.05),transparent_70%)] pointer-events-none" />
            
            <div className="max-w-xl relative z-10 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-fintrack-secondary/10 border border-fintrack-secondary/20 text-fintrack-secondary px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-fintrack-secondary animate-pulse" />
                TECHNOLOGIE PWA
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl mb-4 text-white font-bold leading-[1.1] tracking-tight">
                L'expérience <span className="text-fintrack-secondary">native</span>,<br />
                sans les contraintes.
              </h2>
              
              <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                Installez FinTrack directement depuis votre navigateur. Accès <span className="text-fintrack-secondary">hors-ligne</span>, <span className="text-fintrack-secondary">notifications en temps réel</span> et <span className="text-fintrack-secondary">performance éclair</span> sur tous vos appareils.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12">
                {!isInstalled ? (
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstallClick}
                    className="w-full sm:w-auto bg-fintrack-secondary text-[#0B1B3D] px-8 py-4 rounded-2xl flex items-center justify-center sm:justify-start gap-4 hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(106,188,166,0.2)] group relative"
                  >
                    <div className="w-10 h-10 bg-[#0B1B3D]/10 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-bold opacity-70 tracking-widest">Installer sur</div>
                      <div className="text-lg font-bold">Mon Appareil</div>
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-fintrack-secondary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ) : (
                  <div className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl flex items-center justify-center sm:justify-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-fintrack-secondary" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase font-bold opacity-50 tracking-widest">Statut</div>
                      <div className="text-lg font-bold">Installé</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B1B3D] overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">+2.5k</div>
                    <div className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">Utilisateurs PWA</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/5">
                {[
                  { id: "01", label: "HORS-LIGNE" },
                  { id: "02", label: "ZÉRO STOCKAGE" },
                  { id: "03", label: "MISES À JOUR" }
                ].map((item) => (
                  <div key={item.id} className="text-left">
                    <div className="text-fintrack-secondary font-bold text-xs sm:text-sm mb-1">{item.id}</div>
                    <div className="text-white font-bold text-[8px] sm:text-[10px] tracking-widest opacity-80">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup Section */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] mt-12 lg:mt-0">
              {/* Large Background Logo Watermark */}
              <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] opacity-[0.05] pointer-events-none z-0 rotate-12">
                <img 
                  src="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/logo-transparent.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L2xvZ28tdHJhbnNwYXJlbnQucG5nIiwiaWF0IjoxNzc2MDY5MjIzLCJleHAiOjE4MDc2MDUyMjN9.Tza7nG0c-8-TJgvPreIsRAtmA7E8GT4fjqLPMJuZySs" 
                  alt="" 
                  className="w-full h-full object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Speed Badge - Moved Outside */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute top-1/4 -right-4 sm:-right-8 bg-white rounded-2xl p-2 sm:p-3 shadow-xl flex items-center gap-2 sm:gap-3 border border-slate-100 z-20"
              >
                <div className="w-6 h-6 sm:w-8 h-8 bg-fintrack-secondary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-3 h-3 sm:w-4 h-4 text-fintrack-secondary" />
                </div>
                <div className="text-left">
                  <div className="text-[6px] sm:text-[7px] uppercase font-bold text-slate-400 tracking-widest">Vitesse</div>
                  <div className="text-[9px] sm:text-[11px] font-bold text-[#0B1B3D]">Instantané</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10 bg-[#162B55] rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border border-white/10"
              >
                <div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/18.5] shadow-inner">
                  {/* App Image Background */}
                  <img 
                    src="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/Gemini_Generated_Image_6xgmof6xgmof6xgm.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L0dlbWluaV9HZW5lcmF0ZWRfSW1hZ2VfNnhnbW9mNnhnbW9mNnhnbS5wbmciLCJpYXQiOjE3NzYxNTUwNDMsImV4cCI6MTgwNzY5MTA0M30.rs-5GZQaBUU4SsEOIweuoN26JFptvMcmHXlOJNPzQgc" 
                    alt="App Interface" 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* UI Overlays from Image */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col items-center justify-center">
                    {/* Installation Card */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-[200px] sm:max-w-[240px] flex flex-col items-center text-center"
                    >
                      <div className="w-12 h-12 sm:w-16 h-16 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                        <Download className="w-6 h-6 sm:w-8 h-8 text-[#0B1B3D]" />
                      </div>
                      <p className="text-[#0B1B3D] font-bold text-xs sm:text-sm mb-3 sm:mb-4">Installation en cours...</p>
                      <div className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          whileInView={{ width: "65%" }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-fintrack-secondary"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements behind phone */}
              <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-fintrack-secondary/10 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 sm:w-40 h-32 sm:h-40 bg-fintrack-secondary/5 blur-3xl rounded-full" />
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}

function NavItem({ label, href = "#", hasDropdown = false, mobile = false, dropdownItems = [] }: { label: string; href?: string; hasDropdown?: boolean; mobile?: boolean; dropdownItems?: { label: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => !mobile && setIsOpen(true)}
      onMouseLeave={() => !mobile && setIsOpen(false)}
    >
      <a 
        href={href} 
        onClick={(e) => {
          if (hasDropdown && mobile) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`flex items-center gap-1 text-slate-600 hover:text-fintrack-secondary font-medium transition-colors ${mobile ? "text-lg py-2" : ""}`}
      >
        {label}
        {hasDropdown && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        )}
      </a>

      {hasDropdown && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: mobile ? 0 : 10, height: mobile ? 0 : "auto" }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: mobile ? 0 : 10, height: 0 }}
              className={`${
                mobile 
                  ? "pl-4 flex flex-col gap-3 mt-2 overflow-hidden" 
                  : "absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50"
              }`}
            >
              {dropdownItems.map((item, i) => (
                <a 
                  key={i}
                  href={item.href}
                  className="text-sm text-slate-500 hover:text-fintrack-primary py-2 px-3 rounded-xl hover:bg-slate-50 transition-all block"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:shadow-slate-200/50 text-center flex flex-col items-center group transition-all duration-300"
    >
      <div className="w-14 h-14 bg-fintrack-primary/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <div className="w-7 h-7 text-fintrack-primary flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-xl mb-3 text-slate-900 font-black tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}

function FloatingIcon({ icon, className, delay }: { icon: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div 
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      className={`absolute w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center z-20 ${className}`}
    >
      <div className="w-5 h-5 sm:w-6 h-6">
        {icon}
      </div>
    </motion.div>
  );
}

function PartnerCard({ name, url }: { name: string; url: string }) {
  const [error, setError] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        show: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 20 }
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="flex flex-col items-center gap-4 group perspective-1000"
    >
      {/* Fixed Square Container - Glassmorphism style */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:bg-white/5 group-hover:backdrop-blur-sm border border-transparent group-hover:border-slate-200/50 preserve-3d">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-fintrack-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

        {!error ? (
          <motion.div
            style={{ transform: "translateZ(50px)" }}
            className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center"
          >
            <motion.img 
              src={url} 
              alt={name} 
              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 drop-shadow-lg group-hover:drop-shadow-2xl"
              onError={() => setError(true)}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ) : (
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 group-hover:border-fintrack-primary/30 transition-all duration-500">
             <span className="text-3xl font-black text-slate-300 group-hover:text-fintrack-primary transition-colors">{name.charAt(0)}</span>
          </div>
        )}

        {/* Minimalist Corner Accents */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-fintrack-primary/30" />
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-fintrack-primary/30" />
        </div>
      </div>
      
      {/* Label */}
      <motion.span 
        style={{ transform: "translateZ(20px)" }}
        className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900 uppercase tracking-[0.3em] transition-all duration-500"
      >
        {name}
      </motion.span>
    </motion.div>
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
function WatchDemoButton() {
  return (
    <button className="border-2 border-slate-200 hover:border-fintrack-primary hover:text-fintrack-primary text-slate-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all flex items-center gap-2 group">
      <div className="w-5 h-5 sm:w-6 h-6 bg-slate-100 group-hover:bg-fintrack-primary/10 rounded-full flex items-center justify-center transition-colors">
        <Play className="w-2 h-2 sm:w-3 h-3 fill-current" />
      </div>
      Voir la Démo
    </button>
  );
}

function ContactInfoCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a 
      href={href}
      className="flex items-center gap-4 group/card p-3 rounded-xl hover:bg-white/5 transition-all"
    >
      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover/card:bg-fintrack-secondary group-hover/card:text-[#0B1B3D] transition-all duration-500">
        <div className="w-5 h-5">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-0.5">{label}</div>
        <div className="text-lg font-bold group-hover/card:text-fintrack-secondary transition-colors">{value}</div>
      </div>
    </a>
  );
}

function PricingCard({ title, price, description, features, isPopular = false }: { title: string; price: string; description: string; features: string[]; isPopular?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2.5rem] border flex flex-col h-full transition-all duration-500 hover:shadow-2xl ${
        isPopular 
          ? "bg-gradient-to-br from-fintrack-primary to-fintrack-dark text-white border-fintrack-primary shadow-[0_20px_50px_rgba(35,77,150,0.3)] hover:shadow-fintrack-primary/40 md:scale-105 z-10" 
          : "bg-white/70 backdrop-blur-md text-slate-900 border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-slate-200/50"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-fintrack-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">
          Plus Populaire
        </div>
      )}
      
      <div className="mb-8">
        <h3 className={`text-xl font-black mb-2 tracking-tight ${isPopular ? "text-white" : "text-slate-900"}`}>{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-black">{price === "Sur mesure" ? "" : "$"}</span>
          <span className="text-5xl font-black tracking-tighter">{price}</span>
          {price !== "Sur mesure" && <span className={`text-xs font-bold uppercase tracking-widest ml-2 ${isPopular ? "text-white/70" : "text-slate-400"}`}>/mois</span>}
        </div>
        <p className={`text-sm leading-relaxed font-medium ${isPopular ? "text-white/80" : "text-slate-500"}`}>
          {description}
        </p>
      </div>

      <div className={`h-px w-full mb-8 ${isPopular ? "bg-white/10" : "bg-slate-100"}`} />

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-bold">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPopular ? "bg-white/20 text-white" : "bg-fintrack-secondary/10 text-fintrack-secondary"}`}>
              <Check className="w-3 h-3" />
            </div>
            <span className={isPopular ? "text-white/90" : "text-slate-600"}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
        isPopular 
          ? "bg-white text-fintrack-primary hover:bg-fintrack-secondary hover:text-white shadow-xl" 
          : "bg-fintrack-primary text-white hover:bg-fintrack-dark shadow-lg shadow-fintrack-primary/20"
      }`}>
        {price === "Sur mesure" ? "Contacter la vente" : "Choisir ce plan"}
      </button>
    </motion.div>
  );
}

function WhyChooseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-lg shadow-slate-200/20 flex items-center gap-3 text-left transition-all duration-300 hover:scale-105 active:scale-95 group">
      <div className="w-8 h-8 bg-fintrack-primary rounded-full flex items-center justify-center shrink-0 text-white shadow-md">
        <div className="w-4 h-4 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-900 mb-0.5">{title}</h4>
        <p className="text-[9px] text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}

function MinimalFeature({ icon, label, sublabel }: { icon: React.ReactNode; label: string; sublabel: string }) {
  return (
    <div className="text-center flex-1">
      <div className="w-10 h-10 bg-fintrack-light rounded-lg flex items-center justify-center mx-auto mb-2 text-fintrack-accent shadow-sm">
        <div className="w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h5 className="font-bold text-slate-900 mb-0.5 text-xs">{label}</h5>
      <p className="text-[8px] text-slate-400 leading-tight font-medium">
        {sublabel}
      </p>
    </div>
  );
}

function FooterSection() {
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
            <li><a href="#fonctionnalites" className="hover:text-fintrack-secondary transition-colors">Gestion des Ventes</a></li>
            <li><a href="#fonctionnalites" className="hover:text-fintrack-secondary transition-colors">Dépôts Bancaires</a></li>
            <li><a href="#fonctionnalites" className="hover:text-fintrack-secondary transition-colors">Suivi de Caisse</a></li>
            <li><a href="#fonctionnalites" className="hover:text-fintrack-secondary transition-colors">Supervision Agents</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-6 text-base">Support & Légal</h5>
          <ul className="space-y-3 text-xs text-slate-500 font-medium">
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Politique de confidentialité</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Conditions d'utilisation</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-6 text-base">Société</h5>
          <ul className="space-y-3 text-xs text-slate-500 font-medium">
            <li><a href="#a-propos" className="hover:text-fintrack-secondary transition-colors">À propos</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Blog</a></li>
            <li><a href="#contact" className="hover:text-fintrack-secondary transition-colors">Contact</a></li>
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
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        <p>FinTrack - Gestion Mobile & Fintech</p>
        <p>Copyright &copy; 2026 FinTrack</p>
      </div>
    </footer>
  );
}
