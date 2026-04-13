/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
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
  Lock,
  Check,
  Wallet,
  Landmark,
  Smartphone,
  History,
  Camera,
  Users,
  ShieldCheck, 
  CheckCircle2,
  ArrowRight, 
  Twitter, 
  Linkedin, 
  Github,
  Download
} from "lucide-react";

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-4 flex items-center justify-between shadow-2xl shadow-slate-900/5 ring-1 ring-slate-900/5">
            <div className="flex items-center w-48 h-12 md:h-14 relative">
              <Logo className="h-20 md:h-28 absolute left-0 top-1/2 -translate-y-1/2 z-10" />
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <NavItem label="Produit" hasDropdown />
              <NavItem label="Fonctionnalités" />
              <NavItem label="Tarifs" />
              <NavItem label="Solutions" hasDropdown />
            </div>

            <div className="flex items-center gap-6">
              <button className="hidden sm:block text-slate-600 hover:text-fintrack-primary font-bold text-sm transition-colors">
                Connexion
              </button>
              <button className="bg-fintrack-primary hover:bg-fintrack-dark text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-fintrack-primary/20 hover:scale-105 active:scale-95">
                Essai Gratuit
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-slate-900">
              Pilotez vos ventes et vos dépôts bancaires en toute simplicité.
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              La solution tout-en-un pour la gestion des encaissements, le suivi de caisse et la supervision de vos agents de terrain.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-fintrack-primary hover:bg-fintrack-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-fintrack-primary/20">
                Démarrer gratuitement
              </button>
              <WatchDemoButton />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-full"
          >
            {/* Connecting Lines SVG */}
            <svg className="absolute -inset-20 w-[140%] h-[140%] pointer-events-none z-0 opacity-20" viewBox="0 0 800 600">
              <path d="M100,300 Q200,100 400,300 T700,300" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-fintrack-accent" />
              <path d="M150,400 Q300,500 450,350 T750,450" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-fintrack-secondary" />
              <circle cx="100" cy="300" r="4" className="fill-fintrack-accent" />
              <circle cx="700" cy="300" r="4" className="fill-fintrack-accent" />
              <circle cx="150" cy="400" r="4" className="fill-fintrack-secondary" />
              <circle cx="750" cy="450" r="4" className="fill-fintrack-secondary" />
            </svg>

            {/* Hero Image Replacement */}
            <div className="relative z-10 bg-slate-100 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden group w-full h-full min-h-[500px] lg:min-h-[600px]">
              <img 
                src="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/Gemini_Generated_Image_9mw2eg9mw2eg9mw2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L0dlbWluaV9HZW5lcmF0ZWRfSW1hZ2VfOW13MmVnOW13MmVnOW13Mi5wbmciLCJpYXQiOjE3NzYwNjY0ODksImV4cCI6MTgwNzYwMjQ4OX0.pbJhIp5QFnqq2eoarPj6V_hiCreYyH1UX7MWWilIh80" 
                alt="FinTrack Dashboard Preview" 
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fintrack-primary/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-lg">Tableau de Bord Temps Réel</div>
                  <div className="text-white/60 text-sm">Suivi instantané des opérations terrain</div>
                </div>
                <div className="w-12 h-12 bg-fintrack-secondary rounded-full flex items-center justify-center text-white shadow-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Floating Icons */}
            <FloatingIcon icon={<Wallet className="text-amber-500" />} className="top-0 -right-4" delay={0} />
            <FloatingIcon icon={<Landmark className="text-fintrack-accent" />} className="bottom-10 -left-8" delay={1} />
            <FloatingIcon icon={<Smartphone className="text-purple-500" />} className="-top-10 left-1/2" delay={0.5} />
            <FloatingIcon icon={<History className="text-fintrack-secondary" />} className="bottom-0 right-10" delay={1.5} />
            
            {/* Background Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-fintrack-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fintrack-secondary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </section>

        {/* Partners & Networks - Premium Square Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 mt-40 relative overflow-hidden py-20">
          {/* Background Abstract Shapes */}
          <div className="absolute top-0 left-0 w-full h-full -z-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fintrack-primary/[0.02] rounded-full blur-[120px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-fintrack-secondary/[0.03] rounded-full blur-[100px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-32 relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-fintrack-primary/10 rounded-full blur-[100px] -z-10"
            />
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              L'Élite du <span className="bg-clip-text text-transparent bg-gradient-to-r from-fintrack-primary to-fintrack-secondary">Digital</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-xl font-medium leading-relaxed tracking-tight">
              FinTrack s'entoure des géants technologiques pour bâtir le futur de la gestion financière. Une synergie <span className="text-slate-900 font-bold underline decoration-fintrack-secondary decoration-4 underline-offset-8">sans compromis</span>.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 relative"
          >
            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none">
              <div className="w-full h-full border-[0.5px] border-slate-900/20 grid grid-cols-6 grid-rows-1">
                {[...Array(6)].map((_, i) => <div key={i} className="border-r border-slate-900/20" />)}
              </div>
            </div>
            <PartnerCard name="MTN" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/mtn.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L210bi5wbmciLCJpYXQiOjE3NzYwODg4NTAsImV4cCI6MTgwNzYyNDg1MH0.aY3pn3wP7CWUrznZrCMTXKeTzV9BnLJsQCJRNRAw8iU" />
            <PartnerCard name="Moov" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/moov.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L21vb3YuanBlZyIsImlhdCI6MTc3NjA5MDEzNCwiZXhwIjoxODA3NjI2MTM0fQ.K9jlmQUyBBp6Og2ElxiO16D9YGk-AieGmIHVG0bUuQQ" />
            <PartnerCard name="Celtiis" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/celtiis.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L2NlbHRpaXMuanBnIiwiaWF0IjoxNzc2MDg4ODEwLCJleHAiOjE4MDc2MjQ4MTB9.UKspCgfucV5z3HTlfTNrNtQmQAfWou8cv_xXdcbpDHg" />
            <PartnerCard name="Canal+" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/Canal+.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L0NhbmFsKy5qcGVnIiwiaWF0IjoxNzc2MDg4NzkzLCJleHAiOjE4MDc2MjQ3OTN9.GStzXtayl8VqcB9uJopkfmTy97b5_9vfCaiExB5G65s" />
            <PartnerCard name="SBEE" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/sbee.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L3NiZWUud2VicCIsImlhdCI6MTc3NjA4ODg2NywiZXhwIjoxODA3NjI0ODY3fQ.gTg-eCiYsbaCM44dNmWcPEhy2lfM7aKQ9wEOV3M0SQ0" />
            <PartnerCard name="SONEB" url="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/soneb.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L3NvbmViLndlYnAiLCJpYXQiOjE3NzYwODg4ODgsImV4cCI6MTgwNzYyNDg4OH0.8r-KDvZ0KAXPrVZALbJTcYvo_9EVsCmHyBzbdfIibpU" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 mt-40 text-center">
          <h2 className="text-4xl md:text-5xl mb-4 text-slate-900">
            Fonctionnalités Clés
          </h2>
          <p className="text-slate-500 mb-16 text-lg">
            Une suite complète d'outils pensés pour le terrain et la supervision.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Wallet />}
              title="Gestion des Ventes"
              description="Enregistrez chaque transaction instantanément, même en déplacement, avec une traçabilité totale."
            />
            <FeatureCard 
              icon={<Landmark />}
              title="Dépôts Bancaires"
              description="Suivez les remontées de fonds et validez les dépôts bancaires en temps réel avec preuves photo."
            />
            <FeatureCard 
              icon={<History />}
              title="Suivi de Caisse"
              description="Contrôlez les flux de trésorerie, gérez les clôtures journalières et identifiez les écarts immédiatement."
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto px-6 mt-40 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold">Tarifs Simples et Transparents</h2>
            <p className="text-slate-500 text-lg">Choisissez le plan adapté à la croissance de votre activité.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <PricingCard 
              title="Indépendant"
              price="0"
              description="Idéal pour les marchands individuels et petits projets."
              features={["Jusqu'à 3 agents", "Suivi de caisse basique", "Support communautaire", "1 Superviseur"]}
            />
            <PricingCard 
              title="Business"
              price="29"
              description="Parfait pour les équipes en pleine croissance."
              features={["Agents illimités", "Analyses avancées", "Support prioritaire", "Preuves photo illimitées", "Rapports personnalisés"]}
              isPopular
            />
            <PricingCard 
              title="Entreprise"
              price="Sur mesure"
              description="Fonctionnalités avancées pour les grandes organisations."
              features={["Tout du plan Business", "Gestionnaire dédié", "Garantie de service (SLA)", "Multi-agences", "Intégration API"]}
            />
          </div>
        </section>

        {/* Profiles Section */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold">Une Solution pour Chaque Profil</h2>
            <p className="text-slate-500 text-lg">FinTrack s'adapte aux besoins spécifiques de votre équipe.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-fintrack-light p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-fintrack-primary text-white rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Agent Mobile</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Encaissez, enregistrez les ventes et effectuez vos dépôts bancaires en quelques clics depuis votre smartphone.</p>
            </div>
            <div className="bg-fintrack-light p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-fintrack-secondary text-white rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Marchand / Superviseur</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Pilotez vos équipes, contrôlez les clôtures de caisse et validez les remontées de fonds en temps réel.</p>
            </div>
            <div className="bg-fintrack-light p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 bg-fintrack-accent text-white rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Administrateur</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Gérez les accès, configurez les agences et accédez à des rapports consolidés pour une vision globale.</p>
            </div>
          </div>
        </section>

        {/* Mobility Section */}
        <section className="max-w-7xl mx-auto px-6 mt-40 bg-fintrack-primary rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl mb-8 font-bold leading-tight">Pensé pour la Mobilité et le Terrain</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Preuves Photo</h4>
                    <p className="text-white/60 text-sm">Capturez vos reçus de dépôt bancaire pour une traçabilité irréprochable.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Rapidité d'Exécution</h4>
                    <p className="text-white/60 text-sm">Une interface fluide optimisée pour les smartphones, même avec une connexion limitée.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <History className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Historique Complet</h4>
                    <p className="text-white/60 text-sm">Consultez vos transactions passées et vos rapports de clôture à tout moment.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/5 rounded-3xl p-4 backdrop-blur-sm border border-white/10">
                <img 
                  src="https://picsum.photos/seed/mobile/800/1200" 
                  alt="FinTrack Mobile App" 
                  className="rounded-2xl shadow-2xl"
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
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl mb-3 text-slate-900 font-bold">Témoignages Clients</h2>
              <p className="text-slate-500 text-sm font-medium">Découvrez comment FinTrack transforme le quotidien des entreprises.</p>
            </div>
            
            <div className="relative min-h-[400px] md:min-h-[300px] overflow-hidden">
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
                  <div className="md:w-[35%] bg-[#f0f7ff] p-8 flex flex-col items-center justify-center text-center border-r border-slate-100">
                    <motion.img 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                      referrerPolicy="no-referrer"
                    />
                    <motion.h4 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-base font-bold text-slate-900"
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
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-slate-700 font-medium mb-6 leading-relaxed italic">
                        "{testimonials[activeTestimonial].quote}"
                      </p>
                      
                      <div className="flex items-center gap-2 mb-6">
                        <Logo className="h-12" />
                        <div className="w-2 h-2 rounded-full bg-fintrack-success" />
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="border-t border-slate-100 pt-6 flex items-center justify-between"
                    >
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm ${
                            i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-fintrack-dark' : i === 3 ? 'bg-red-500' : 'bg-fintrack-success'
                          }`}>
                            {i === 1 ? <Activity className="w-3.5 h-3.5" /> : i === 2 ? <Cloud className="w-3.5 h-3.5" /> : i === 3 ? <Zap className="w-3.5 h-3.5" /> : <Workflow className="w-3.5 h-3.5" />}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-slate-900">{testimonials[activeTestimonial].stats.savings}</div>
                          <div className="text-[7px] text-slate-400 uppercase font-bold tracking-widest">Gain de Temps</div>
                        </div>
                        <div className="text-center border-l border-slate-100 pl-6">
                          <div className="text-xl font-bold text-slate-900">{testimonials[activeTestimonial].stats.roi}</div>
                          <div className="text-[7px] text-slate-400 uppercase font-bold tracking-widest">ROI</div>
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
            <div className="bg-fintrack-primary/5 rounded-[2.5rem] p-10 text-center relative overflow-hidden h-full flex flex-col justify-center border border-fintrack-primary/10">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl mb-4 text-slate-900 font-bold leading-tight">
                  Prêt à Propulser <span className="text-fintrack-secondary">Votre</span> <br /> Activité ?
                </h2>
                <p className="text-slate-500 text-xs mb-8 max-w-[280px] mx-auto leading-relaxed">
                  Rejoignez des milliers de marchands qui font confiance à FinTrack pour piloter leurs ventes et leurs dépôts.
                </p>
                <button className="bg-fintrack-primary hover:bg-fintrack-dark text-white px-8 py-3 rounded-full font-bold text-xs transition-all shadow-lg shadow-fintrack-primary/20">
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

        {/* PWA / App Section - Hyper Version */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="bg-fintrack-primary rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-20 relative overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(106,188,166,0.1)]">
            
            {/* Immersive Background Effects */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(106,188,166,0.15),transparent_70%)] pointer-events-none" />
            <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-fintrack-secondary/5 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Animated Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-2xl relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-fintrack-secondary px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-10"
              >
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fintrack-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fintrack-secondary"></span>
                </div>
                Technologie Cloud PWA 2.0
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl mb-10 text-white font-black leading-[1] tracking-tighter">
                Libérez votre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintrack-secondary to-fintrack-accent">potentiel mobile.</span>
              </h2>
              
              <p className="text-slate-400 text-xl md:text-2xl mb-14 leading-relaxed font-medium max-w-lg">
                Plus qu'une application, un écosystème complet dans votre poche. Installez FinTrack instantanément et gérez vos flux sans aucune limite.
              </p>

              <div className="flex flex-col sm:flex-row gap-8">
                {!isInstalled ? (
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstallClick}
                    className="bg-fintrack-secondary text-fintrack-primary px-12 py-6 rounded-3xl flex items-center justify-center gap-5 hover:bg-white transition-all shadow-[0_20px_50px_rgba(106,188,166,0.3)] group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Download className="w-8 h-8 group-hover:animate-bounce relative z-10" />
                    <div className="text-left relative z-10">
                      <div className="text-[11px] uppercase font-black opacity-70 tracking-widest">Installer maintenant</div>
                      <div className="text-xl font-black">Expérience PWA</div>
                    </div>
                  </motion.button>
                ) : (
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-6 rounded-3xl flex items-center gap-5 shadow-2xl">
                    <div className="w-12 h-12 bg-fintrack-secondary/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-fintrack-secondary" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] uppercase font-black opacity-50 tracking-widest">Statut Système</div>
                      <div className="text-xl font-black">Prêt à l'emploi</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-5 px-8 py-5 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-fintrack-primary bg-fintrack-dark flex items-center justify-center overflow-hidden ring-1 ring-white/10">
                        <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-black text-lg">+5,000</div>
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Utilisateurs Actifs</div>
                  </div>
                </div>
              </div>

              <div className="mt-20 grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
                {[
                  { label: "Offline", value: "100%", sub: "Disponibilité" },
                  { label: "Vitesse", value: "0.2s", sub: "Lancement" },
                  { label: "Stockage", value: "0MB", sub: "Empreinte" }
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-fintrack-secondary font-black text-3xl mb-1">{stat.value}</div>
                    <div className="text-white font-bold text-[10px] uppercase tracking-[0.2em] opacity-60">{stat.label}</div>
                    <div className="text-slate-600 text-[9px] font-bold uppercase tracking-widest mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hyper UI Mockup Container */}
            <div className="relative w-full max-w-md lg:max-w-lg group perspective-2000">
              {/* Main Phone Mockup */}
              <motion.div 
                initial={{ rotateY: 20, rotateX: 10 }}
                whileHover={{ rotateY: 10, rotateX: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                className="relative bg-slate-800 rounded-[4.5rem] p-5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 transform-gpu preserve-3d"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-fintrack-primary rounded-b-3xl z-20" />
                <div className="relative bg-fintrack-primary rounded-[3.5rem] overflow-hidden aspect-[9/19] border-4 border-fintrack-dark shadow-inner">
                  <img 
                    src="https://picsum.photos/seed/fintrack-ui-dark/1000/2000" 
                    alt="App Interface" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Simulated App UI Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fintrack-primary via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-0 w-full px-8">
                    <div className="h-1.5 w-12 bg-white/20 rounded-full mx-auto mb-8" />
                    <div className="space-y-4">
                      <div className="h-12 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10" />
                      <div className="h-12 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10" />
                    </div>
                  </div>
                </div>

                {/* Floating Hyper Cards */}
                <motion.div 
                  animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-12 top-20 bg-white/10 backdrop-blur-2xl p-5 rounded-[2rem] shadow-2xl border border-white/20 z-30 w-48"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-fintrack-secondary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(106,188,166,0.5)]">
                      <TrendingUp className="w-6 h-6 text-fintrack-primary" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-white/50 uppercase tracking-widest">Croissance</div>
                      <div className="text-sm font-black text-white">+24.5%</div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      className="h-full bg-fintrack-secondary"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -left-16 bottom-32 bg-fintrack-primary/80 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/10 z-30 w-56"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sécurité</div>
                    <ShieldCheck className="w-5 h-5 text-fintrack-secondary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-fintrack-secondary animate-pulse" />
                      <div className="text-xs font-bold text-white">Chiffrement AES-256</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-fintrack-secondary animate-pulse" />
                      <div className="text-xs font-bold text-white">Biométrie Active</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Zap Icon */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-fintrack-secondary to-fintrack-accent rounded-3xl flex items-center justify-center shadow-2xl z-40"
                >
                  <Zap className="w-10 h-10 text-fintrack-primary fill-fintrack-primary" />
                </motion.div>
              </motion.div>

              {/* Background Glow Behind Phone */}
              <div className="absolute inset-0 bg-fintrack-secondary/20 blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </div>
        </section>

      </main>

      <FooterSection />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center ${className}`}
    >
      <img 
        src="https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/logo-transparent.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L2xvZ28tdHJhbnNwYXJlbnQucG5nIiwiaWF0IjoxNzc2MDY5MjIzLCJleHAiOjE4MDc2MDUyMjN9.Tza7nG0c-8-TJgvPreIsRAtmA7E8GT4fjqLPMJuZySs" 
        alt="FinTrack Logo" 
        className="h-full w-auto object-contain max-h-full drop-shadow-sm"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

function NavItem({ label, hasDropdown = false }: { label: string; hasDropdown?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-1 text-slate-600 hover:text-fintrack-secondary font-medium transition-colors">
      {label}
      {hasDropdown && <ChevronDown className="w-4 h-4" />}
    </a>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 text-center flex flex-col items-center"
    >
      <div className="w-16 h-16 bg-fintrack-primary/5 rounded-2xl flex items-center justify-center mb-6">
        {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-fintrack-primary" })}
      </div>
      <h3 className="text-2xl mb-4 text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">
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
      className={`absolute w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center z-20 ${className}`}
    >
      {icon}
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
      <div className="relative w-32 h-32 md:w-44 md:h-44 flex items-center justify-center rounded-3xl transition-all duration-500 group-hover:bg-white/5 group-hover:backdrop-blur-sm border border-transparent group-hover:border-slate-200/50 preserve-3d">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-fintrack-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

        {!error ? (
          <motion.div
            style={{ transform: "translateZ(50px)" }}
            className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
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
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
    </a>
  );
}
function WatchDemoButton() {
  return (
    <button className="border-2 border-slate-200 hover:border-fintrack-primary hover:text-fintrack-primary text-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 group">
      <div className="w-6 h-6 bg-slate-100 group-hover:bg-fintrack-primary/10 rounded-full flex items-center justify-center transition-colors">
        <Play className="w-3 h-3 fill-current" />
      </div>
      Voir la Démo
    </button>
  );
}

function PricingCard({ title, price, description, features, isPopular = false }: { title: string; price: string; description: string; features: string[]; isPopular?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2.5rem] border flex flex-col h-full transition-all ${
        isPopular 
          ? "bg-fintrack-primary text-white border-fintrack-primary shadow-2xl shadow-fintrack-primary/30 scale-105 z-10" 
          : "bg-white text-slate-900 border-slate-100 shadow-xl shadow-slate-100/50"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-fintrack-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          Plus Populaire
        </div>
      )}
      
      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-2 ${isPopular ? "text-white" : "text-slate-900"}`}>{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-black">{price === "Sur mesure" ? "" : "$"}</span>
          <span className="text-5xl font-black">{price}</span>
          {price !== "Sur mesure" && <span className={`text-sm font-medium ${isPopular ? "text-white/70" : "text-slate-400"}`}>/mois</span>}
        </div>
        <p className={`text-sm leading-relaxed ${isPopular ? "text-white/80" : "text-slate-500"}`}>
          {description}
        </p>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-medium">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPopular ? "bg-white/20 text-white" : "bg-fintrack-success/10 text-fintrack-success"}`}>
              <Check className="w-3 h-3" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
        isPopular 
          ? "bg-white text-fintrack-primary hover:bg-slate-50 shadow-lg" 
          : "bg-fintrack-primary text-white hover:bg-fintrack-dark shadow-lg shadow-fintrack-primary/10"
      }`}>
        {price === "Sur mesure" ? "Contacter la vente" : "Choisir ce plan"}
      </button>
    </motion.div>
  );
}

function WhyChooseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/20 flex items-start gap-4 text-left">
      <div className="w-10 h-10 bg-fintrack-primary rounded-full flex items-center justify-center shrink-0 text-white shadow-md">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-[10px] text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function MinimalFeature({ icon, label, sublabel }: { icon: React.ReactNode; label: string; sublabel: string }) {
  return (
    <div className="text-center flex-1">
      <div className="w-12 h-12 bg-fintrack-light rounded-xl flex items-center justify-center mx-auto mb-3 text-fintrack-accent shadow-sm">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      <h5 className="font-bold text-slate-900 mb-1 text-sm">{label}</h5>
      <p className="text-[9px] text-slate-400 leading-tight font-medium">
        {sublabel}
      </p>
    </div>
  );
}

function FooterSection() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1">
          <div className="flex items-center w-48 h-12 md:h-14 relative mb-12">
            <Logo className="h-20 md:h-28 absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
            FinTrack - La plateforme de confiance pour la gestion des opérations financières sur le terrain.
          </p>
        </div>
        
        <div>
          <h5 className="font-bold text-slate-900 mb-8 text-lg">Produit</h5>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Fonctionnalités</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Solutions Terrain</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Sécurité</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Tarifs</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-8 text-lg">Société</h5>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">À propos</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-fintrack-secondary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-900 mb-8 text-lg">Social</h5>
          <div className="flex flex-wrap gap-3">
            <SocialIcon icon={<Twitter />} />
            <SocialIcon icon={<Linkedin />} />
            <SocialIcon icon={<Github />} />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        <p>FinTrack - Gestion Mobile & Fintech</p>
        <p>Copyright &copy; 2026 FinTrack</p>
      </div>
    </footer>
  );
}
