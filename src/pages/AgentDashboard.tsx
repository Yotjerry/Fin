import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  ArrowDownLeft,
  History, 
  User, 
  Bell, 
  Smartphone,
  Wallet,
  MoreHorizontal,
  LogOut,
  TrendingUp,
  Activity,
  BarChart2,
  ShoppingBag,
  Settings2,
  CheckCircle,
  Landmark,
  CreditCard,
  ChevronRight,
  AlertCircle,
  X,
  Zap,
  ArrowRight,
  Coins,
  ShieldCheck,
  Check,
  Plus,
  Eye,
  EyeOff,
  Receipt,
  SmartphoneNfc,
  Home,
  Send,
  Cpu,
  HandCoins,
  Repeat,
  ArrowLeft,
  Smartphone as PhoneIcon,
  MonitorSmartphone,
  Wifi,
  PhoneCall,
  Tv,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

// --- Types & Interfaces ---
type ModalType = "none" | "vente" | "ramassage" | "ajustement" | "cloture" | "pos_fintech" | "pos_bank";
type WorkflowStep = "CATEGORY" | "OPERATOR" | "SERVICE" | "FORM" | "RECAP" | "SUCCESS";
type ServiceCategory = "FINTECH" | "BANK" | "SALES";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: string;
}

const SidebarItem = ({ icon, label, active, onClick, badge }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
      active 
        ? "bg-fintrack-primary text-white shadow-lg shadow-blue-900/10" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
    }`}
  >
    <div className="flex items-center gap-4 min-w-0 pr-2">
      <span className={`shrink-0 transition-all duration-300 ${active ? "text-white" : "group-hover:scale-110"}`}>
        {icon}
      </span>
      <span className={`text-[13px] font-bold whitespace-nowrap truncate ${active ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>
        {label}
      </span>
    </div>
    {badge && (
      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${
        active ? "bg-white text-fintrack-primary" : "bg-red-500 text-white"
      }`}>
        {badge}
      </span>
    )}
  </button>
);

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Caisse");
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>("CATEGORY");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [momoTab, setMomoTab] = useState("DÉPÔT/RETRAIT");
  const [showBalance, setShowBalance] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [step, setStep] = useState(1);

  const activities = [
    { id: 1, amount: "1 469 727", bank: "BOA", type: "DÉPÔT", date: "12:10", status: "success", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bank_of_Africa_logo.svg/512px-Bank_of_Africa_logo.svg.png" },
    { id: 2, amount: "1 094 328", bank: "Ecobank", type: "DÉPÔT", date: "11:45", status: "success", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ecobank_logo.svg" },
    { id: 3, amount: "45 000", bank: "MTN", type: "VENTE", date: "11:20", status: "success", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg" },
    { id: 4, amount: "250 000", bank: "Wave", type: "RETRAIT", date: "10:55", status: "success", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wave_Logo.svg/1000px-Wave_Logo.svg.png" },
  ];

  const operators = [
    { id: "mtn", name: "MTN Bénin", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg" },
    { id: "moov", name: "Moov Africa", img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Logo_Moov_Africa.svg/1200px-Logo_Moov_Africa.svg.png" },
    { id: "celtis", name: "Celtis", img: "https://www.celtis.bj/assets/images/logo_celtis.png" },
    { id: "wave", name: "Wave", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wave_Logo.svg/1000px-Wave_Logo.svg.png" },
  ];

  const bankOperators = [
    { id: "ecobank", name: "Ecobank", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ecobank_logo.svg", color: "border-teal-100" },
    { id: "boa", name: "BOA Bénin", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bank_of_Africa_logo.svg/1280px-Bank_of_Africa_logo.svg.png", color: "border-red-100" },
    { id: "ubn", name: "UBA", img: "https://upload.wikimedia.org/wikipedia/fr/5/52/UBA_Group_Logo.png", color: "border-red-100" },
  ];

  const getOperators = () => {
    if (selectedCategory === "BANK") return bankOperators;
    if (selectedCategory === "SALES") return [{ id: "fintrack", name: "Fintrack Services", img: "https://fintrack.net/wp-content/uploads/2021/04/cropped-Fintrack-Logo.png", color: "border-blue-100" }];
    return fintechOperators;
  };

  const handleBack = () => {
    if (workflowStep === "RECAP") setWorkflowStep("FORM");
    else if (workflowStep === "FORM") setWorkflowStep("SERVICE");
    else if (workflowStep === "SERVICE") setWorkflowStep("OPERATOR");
    else if (workflowStep === "OPERATOR") setWorkflowStep("CATEGORY");
  };

  const categories = [
    { id: "FINTECH", title: "Réseaux & Fintech", icon: <MonitorSmartphone size={32} />, color: "bg-fintrack-secondary/10", iconColor: "text-fintrack-secondary" },
    { id: "BANK", title: "Banque & Transfert", icon: <Landmark size={32} />, color: "bg-fintrack-primary/10", iconColor: "text-fintrack-primary" },
    { id: "SALES", title: "Ventes & Divers", icon: <HandCoins size={32} />, color: "bg-fintrack-dark/10", iconColor: "text-fintrack-dark" },
  ];

  const fintechOperators = [
    { id: "mtn", name: "MTN MoMo", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.svg", color: "border-amber-100" },
    { id: "moov", name: "Moov Money", img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Logo_Moov_Africa.svg/1200px-Logo_Moov_Africa.svg.png", color: "border-blue-100" },
    { id: "wave", name: "Wave", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wave_Logo.svg/1000px-Wave_Logo.svg.png", color: "border-sky-100" },
    { id: "celtis", name: "Celtis Pay", img: "https://www.celtis.bj/assets/images/logo_celtis.png", color: "border-red-100" },
  ];

  const services = [
    { id: "DEPOT", title: "Dépôt", desc: "Espèces vers compte", icon: <ArrowUpRight />, color: "bg-fintrack-secondary/10", iconColor: "text-fintrack-secondary" },
    { id: "RETRAIT", title: "Retrait", desc: "Compte vers espèces", icon: <ArrowDownLeft />, color: "bg-fintrack-primary/10", iconColor: "text-fintrack-primary" },
    { id: "CREDIT", title: "Vente Crédit", desc: "Recharge unité", icon: <PhoneCall />, color: "bg-fintrack-primary/5", iconColor: "text-fintrack-primary" },
    { id: "INTERNET", title: "Internet", desc: "Data seulement", icon: <Wifi />, color: "bg-fintrack-secondary/5", iconColor: "text-fintrack-secondary" },
    { id: "APPEL", title: "Appel", desc: "Minutes / Voix", icon: <PhoneIcon />, color: "bg-fintrack-dark/5", iconColor: "text-fintrack-dark" },
    { id: "FACTURE", title: "Facture", desc: "Senelec, CIE, etc.", icon: <Receipt />, color: "bg-red-50", iconColor: "text-red-500" },
    { id: "ABONNEMENT", title: "Abonnement", desc: "Canal+, DSTV, etc.", icon: <Tv />, color: "bg-fintrack-primary/5", iconColor: "text-fintrack-primary" },
  ];

  const closeModal = () => {
    setActiveModal("none");
    setSelectedOperator(null);
    setAmount("");
    setPhone("");
    setBeneficiaryName("");
    setStep(1);
    setWorkflowStep("CATEGORY");
  };

  return (
    <div className="fixed inset-0 flex bg-fintrack-light font-sans selection:bg-fintrack-primary/30 overflow-hidden">
      {/* Sidebar - HIDDEN ON MOBILE */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0 relative z-50">
        <div className="p-8 flex justify-center h-28 items-center border-b border-slate-50">
          <Logo className="h-16 w-auto" />
        </div>
        
        <div className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
          <div className="mb-8">
            <nav className="space-y-1">
              <SidebarItem 
                icon={<Home size={20} />} 
                label="Accueil" 
                active={activeTab === "Caisse"} 
                onClick={() => {
                  setActiveTab("Caisse");
                  setWorkflowStep("CATEGORY");
                }} 
              />
              <SidebarItem 
                icon={<Activity size={20} />} 
                label="Transactions" 
                active={activeTab === "Transactions"} 
                onClick={() => setActiveTab("Transactions")} 
              />
              <SidebarItem 
                icon={<History size={20} />} 
                label="Historique" 
                active={activeTab === "Historique"} 
                onClick={() => setActiveTab("Historique")} 
                badge="03"
              />
              <SidebarItem 
                icon={<Settings2 size={20} />} 
                label="Paramètres" 
                active={activeTab === "Settings"} 
                onClick={() => setActiveTab("Settings")} 
              />
              <SidebarItem 
                icon={<User size={20} />} 
                label="Compte" 
                active={activeTab === "Account"} 
                onClick={() => setActiveTab("Account")} 
              />
            </nav>
          </div>
        </div>

        <div className="px-5 pb-8 flex flex-col gap-3">
          <div className="bg-fintrack-primary rounded-[2rem] p-6 flex flex-col gap-4 text-white relative overflow-hidden group shadow-xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-fintrack-secondary/40 transition-all duration-700 pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-fintrack-secondary font-black text-lg shadow-inner ring-1 ring-white/20">
                AG
              </div>
              <div className="flex flex-col">
                <p className="text-[13px] font-black italic tracking-tight italic">Agent Cotonou #01</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-fintrack-secondary rounded-full animate-pulse" />
                  <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Poste Actif</p>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between relative z-10">
                <div className="flex items-baseline">
                   <span className="text-xl font-black">Live</span>
                   <span className="text-[9px] font-bold opacity-60 ml-0.5">/Terminal</span>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase border border-white/10 group-hover:border-fintrack-secondary/30 transition-colors">Premium</div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="w-full h-14 flex items-center justify-center gap-3 rounded-[1.5rem] bg-red-500/5 border border-red-500/20 text-[#FF4B4B] hover:bg-red-500/10 transition-all font-black text-xs tracking-widest uppercase active:scale-95 transition-all group/logout shadow-sm"
          >
            <LogOut size={18} className="group-hover/logout:-translate-x-1 transition-transform" />
            <span>Quitter Session</span>
          </button>
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sleek Top Bar - High Contrast */}
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-12 shrink-0 relative z-20 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                <span className="opacity-60">Terminal</span>
                <ChevronRight size={10} className="opacity-30" />
                <span className="text-slate-900">{activeTab}</span>
              </div>
              <h1 className="text-xl font-black text-slate-950 tracking-tight">Poste de Travail <span className="text-fintrack-primary">#001</span></h1>
            </div>
            <div className="w-px h-8 bg-slate-100 mx-2" />
            <div className="flex items-center gap-3 bg-fintrack-secondary/10 px-4 py-2 rounded-full border border-fintrack-secondary/20">
              <div className="w-2 h-2 bg-fintrack-secondary rounded-full animate-pulse shadow-[0_0_8px_#6ABCA6]" />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Connecté au Réseau</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 bg-slate-950 text-white px-6 py-2.5 rounded-[1.5rem] shadow-xl shadow-slate-900/10">
               <Wallet size={16} className="text-fintrack-secondary" />
               <div className="flex flex-col">
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">Solde Caisse</span>
                 <span className="text-sm font-mono font-black text-fintrack-secondary">
                   {showBalance ? "500 000" : "••••••"} <span className="text-[10px]">CFA</span>
                 </span>
               </div>
             </div>
             <div className="relative group cursor-pointer">
               <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 hover:border-fintrack-primary hover:text-fintrack-primary transition-all duration-300">
                 <Bell size={20} />
               </div>
               <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm ring-2 ring-red-500/20" />
             </div>
          </div>
        </header>

        {/* Dynamic Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-12 no-scrollbar bg-fintrack-light pb-32 lg:pb-12"
          >
            <div className="max-w-[1400px] mx-auto space-y-8">
            
              {/* MoMo Style Balance Header - CENTRALIZED */}
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-fintrack-primary rounded-3xl p-8 text-white shadow-2xl shadow-fintrack-primary/40 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col">
                          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">ID Terminal</p>
                          <p className="text-sm font-black text-white tracking-tight">08 37 29 71 62</p>
                       </div>
                       <button 
                         onClick={() => setShowBalance(!showBalance)}
                         className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all"
                       >
                         {showBalance ? <EyeOff size={16} className="text-fintrack-secondary" /> : <Eye size={16} className="text-fintrack-secondary" />}
                         <span className="text-[10px] font-black uppercase tracking-widest">{showBalance ? "Masquer" : "Afficher"} le solde</span>
                       </button>
                    </div>

                    {showBalance && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="text-center pt-4 border-t border-white/10"
                      >
                         <p className="text-4xl md:text-5xl font-mono font-black tracking-tighter">
                           500 000.00
                           <span className="text-xl text-fintrack-secondary ml-2 font-sans">FCFA</span>
                         </p>
                      </motion.div>
                    )}
                    
                    <div className="flex items-center justify-center gap-8 py-4 border-t border-white/10">
                       <button 
                         className="flex flex-col items-center gap-2 group/action"
                         onClick={() => setWorkflowStep("CATEGORY")}
                       >
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/action:bg-fintrack-secondary group-hover/action:text-fintrack-primary transition-all">
                            <Repeat size={18} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover/action:opacity-100">Transfert</span>
                       </button>
                       <div className="w-px h-8 bg-white/10" />
                       <button className="flex flex-col items-center gap-2 group/action" onClick={() => setActiveTab("Historique")}>
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/action:bg-fintrack-secondary group-hover/action:text-fintrack-primary transition-all">
                            <History size={18} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover/action:opacity-100">Historique</span>
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* WORKFLOW NAVIGATION HEADER */}
              {workflowStep !== "CATEGORY" && (
                <div className="flex items-center justify-between mb-2">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-black text-xs uppercase tracking-widest"
                  >
                    <ArrowLeft size={16} /> Retour
                  </button>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <span>{selectedCategory}</span>
                    {selectedOperator && (
                      <>
                        <ChevronRight size={10} />
                        <span>{selectedOperator}</span>
                      </>
                    )}
                    {selectedService && (
                      <>
                        <ChevronRight size={10} />
                        <span>{selectedService.title}</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* DYNAMIC WORKFLOW CONTENT */}
              <AnimatePresence mode="wait">
                {workflowStep === "CATEGORY" && (
                  <motion.div 
                    key="category"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-black text-slate-900 tracking-tight px-4">Terminal POS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id as ServiceCategory);
                            setWorkflowStep("OPERATOR");
                          }}
                          className={`${cat.color} rounded-[2.5rem] p-10 flex flex-col items-center gap-6 hover:shadow-xl transition-all group`}
                        >
                          <div className={`w-20 h-20 rounded-[1.8rem] bg-white flex items-center justify-center ${cat.iconColor} shadow-sm group-hover:scale-110 transition-transform`}>
                            {cat.icon}
                          </div>
                          <span className="text-lg font-black text-slate-900 tracking-tight">{cat.title}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {workflowStep === "OPERATOR" && (
                  <motion.div 
                    key="operator"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-black text-slate-900 tracking-tight px-4 underline decoration-fintrack-primary/10 underline-offset-8">Choisir l'opérateur</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getOperators().map((op) => (
                        <button
                          key={op.id}
                          onClick={() => {
                            setSelectedOperator(op.name);
                            setWorkflowStep("SERVICE");
                          }}
                          className={`bg-white border-2 ${op.color} rounded-[2.5rem] p-8 flex items-center gap-6 hover:shadow-lg transition-all group`}
                        >
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 flex items-center justify-center overflow-hidden">
                             <img src={op.img} alt={op.name} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-xl font-black text-slate-900 tracking-tight group-hover:text-fintrack-primary transition-colors">{op.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {workflowStep === "SERVICE" && (
                  <motion.div 
                    key="service"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {services.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          setSelectedService(srv);
                          setWorkflowStep("FORM");
                        }}
                        className={`${srv.color} rounded-[2rem] p-10 flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl transition-all h-64 md:h-auto`}
                      >
                         <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${srv.iconColor} shadow-sm group-hover:scale-110 transition-transform`}>
                            {srv.icon}
                         </div>
                         <div className="text-left space-y-1">
                            <p className="text-2xl font-black text-slate-900 tracking-tight">{srv.title}</p>
                            <p className="text-xs font-bold text-slate-500 opacity-80 uppercase tracking-widest">{srv.desc}</p>
                         </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {workflowStep === "FORM" && (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-2xl mx-auto space-y-10"
                  >
                    <div className="text-center space-y-4">
                       <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-[0.1em]">Saisissez le montant</h2>
                       <div className="flex items-center justify-center gap-4">
                          <input 
                            type="text" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="text-6xl font-mono font-black text-fintrack-primary bg-transparent outline-none w-full max-w-[300px] text-right placeholder:text-slate-200"
                          />
                          <span className="text-3xl font-black text-slate-300">FCFA</span>
                       </div>
                    </div>

                    <div className="bg-fintrack-light rounded-[3rem] p-10 space-y-10 shadow-inner ring-1 ring-white/50">
                       <div className="flex items-center gap-3">
                          <div className="w-1.5 h-6 bg-fintrack-primary rounded-full" />
                          <span className="text-[10px] font-black text-fintrack-primary/60 uppercase tracking-[0.2em]">Données de transaction</span>
                       </div>

                       <div className="space-y-8">
                          <div className="space-y-4">
                             <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">N° de téléphone du client *</label>
                             <div className="relative">
                                <input 
                                  type="tel" 
                                  placeholder="Ex: 61000000"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full h-20 bg-white/50 border-2 border-white rounded-[1.5rem] px-8 text-xl font-bold text-slate-950 placeholder:text-slate-300 focus:bg-white focus:border-fintrack-primary/30 transition-all outline-none shadow-sm"
                                />
                             </div>
                          </div>

                          <div className="space-y-4">
                             <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Nom complet du bénéficiaire *</label>
                             <div className="relative">
                                <input 
                                  type="text" 
                                  placeholder="Ex: Jean Martin"
                                  value={beneficiaryName}
                                  onChange={(e) => setBeneficiaryName(e.target.value)}
                                  className="w-full h-20 bg-white/50 border-2 border-white rounded-[1.5rem] px-8 text-xl font-bold text-slate-950 placeholder:text-slate-300 focus:bg-white focus:border-fintrack-primary/30 transition-all outline-none shadow-sm"
                                />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                       <button 
                         onClick={() => setWorkflowStep("RECAP")}
                         className="w-full py-6 bg-fintrack-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-fintrack-primary/20 hover:bg-fintrack-dark transition-all"
                       >
                          Continuer
                       </button>
                       <p className="text-xs font-bold text-slate-400">Suivant : recapitulatif</p>
                    </div>
                  </motion.div>
                )}

                {workflowStep === "RECAP" && (
                  <motion.div 
                    key="recap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-xl mx-auto bg-white rounded-[3rem] p-12 border border-slate-200 shadow-2xl space-y-10"
                  >
                     <div className="text-center space-y-2">
                        <div className="w-20 h-20 bg-fintrack-secondary/10 rounded-full flex items-center justify-center text-fintrack-secondary mx-auto mb-4">
                           <CheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-950">Récapitulatif</h2>
                        <p className="text-sm font-bold text-slate-400">Vérifiez les informations avant validation</p>
                     </div>

                     <div className="space-y-6 bg-slate-50 rounded-3xl p-8 border border-slate-100">
                        <div className="flex justify-between items-center py-4 border-b border-slate-200/50">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Opération</span>
                           <span className="text-sm font-black text-fintrack-primary uppercase tracking-tight">{selectedService?.title} ({selectedOperator})</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-slate-200/50">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</span>
                           <span className="text-sm font-black text-slate-900">{phone}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-slate-200/50">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bénéficiaire</span>
                           <span className="text-sm font-black text-slate-900">{beneficiaryName}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant Total</span>
                           <span className="text-2xl font-mono font-black text-slate-950">{amount} CFA</span>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <button 
                          onClick={handleBack}
                          className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                           Modifier
                        </button>
                        <button 
                          onClick={() => {
                            setWorkflowStep("SUCCESS");
                          }}
                          className="flex-[2] py-5 bg-fintrack-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-fintrack-primary/20 hover:bg-fintrack-dark transition-all"
                        >
                           Confirmer le paiement
                        </button>
                     </div>
                  </motion.div>
                )}

                {workflowStep === "SUCCESS" && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-xl mx-auto bg-white rounded-[3rem] p-12 border border-slate-200 shadow-2xl text-center space-y-8"
                  >
                     <div className="w-24 h-24 bg-fintrack-secondary rounded-full flex items-center justify-center text-white mx-auto shadow-xl shadow-fintrack-secondary/20 animate-bounce">
                        <Check size={48} strokeWidth={4} />
                     </div>
                     <div className="space-y-2">
                        <h2 className="text-3xl font-black text-slate-950">Transaction Validée !</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Opération effectuée avec succès</p>
                     </div>
                     <div className="bg-fintrack-light rounded-2xl p-6 space-y-3">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                           <span>Montant</span>
                           <span className="text-slate-900">{amount} CFA</span>
                        </div>
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                           <span>Référence</span>
                           <span className="text-slate-900">TX-FIN-{Math.floor(Math.random() * 100000)}</span>
                        </div>
                     </div>
                     <button 
                       onClick={() => {
                         setWorkflowStep("CATEGORY");
                         setAmount("");
                         setPhone("");
                         setBeneficiaryName("");
                       }}
                       className="w-full py-5 bg-fintrack-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-fintrack-primary/20 hover:bg-fintrack-dark transition-all"
                     >
                        Nouvelle Opération
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTIVITY & PROMOS - ONLY ON MAIN STEP */}
              {workflowStep === "CATEGORY" && (
                <div className="space-y-8 mt-12">

              {/* PROMO BANNER AS SEEN IN MOMO */}
              <div className="bg-fintrack-secondary rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-fintrack-secondary/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                <div className="flex items-center gap-6 relative z-10 text-white">
                  <div className="w-16 h-16 bg-fintrack-primary text-white rounded-2xl flex items-center justify-center">
                    <HandCoins size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-black tracking-tight">Boostez vos commissions !</p>
                    <p className="text-sm font-bold opacity-80">Effectuez 50 opérations Wave ce mois-ci et gagnez +5% de bonus.</p>
                  </div>
                </div>
                <button className="px-10 py-4 bg-fintrack-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all relative z-10 shadow-lg">
                  Voir Objectifs
                </button>
              </div>

              {/* RECENT FEED - BOTTOM HALF */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-4 md:p-10 space-y-8 shadow-sm">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-fintrack-primary/5 rounded-xl text-fintrack-primary">
                       <Activity size={20} />
                    </div>
                    Activité Récente
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200/50">
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Filtrer</span>
                    <Plus size={14} className="text-slate-400 rotate-45" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="pb-4 px-4">Type</th>
                        <th className="pb-4 px-4">Opérateur</th>
                        <th className="pb-4 px-4">Référence</th>
                        <th className="pb-4 px-4">Heure</th>
                        <th className="pb-4 px-4 text-right">Montant</th>
                        <th className="pb-4 px-4 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {activities.map((item, idx) => (
                        <tr key={idx} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                          <td className="py-5 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl ${item.type === 'DÉPÔT' ? 'bg-fintrack-secondary/10 text-fintrack-secondary' : 'bg-fintrack-primary/10 text-fintrack-primary'}`}>
                                 {item.type === 'DÉPÔT' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{item.type}</span>
                            </div>
                          </td>
                          <td className="py-5 px-4 text-fintrack-primary">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-50 rounded-xl p-2 flex items-center justify-center ring-1 ring-slate-100">
                                <img src={item.logo} alt={item.bank} className="w-full h-full object-contain" />
                              </div>
                              <span className="text-sm font-black text-slate-900">{item.bank}</span>
                            </div>
                          </td>
                          <td className="py-5 px-4 font-mono text-[11px] text-slate-400">TX{item.id}</td>
                          <td className="py-5 px-4 text-[11px] font-medium text-slate-500">{item.date}</td>
                          <td className="py-5 px-4 text-right">
                            <span className="text-sm font-mono font-black text-slate-950">{item.amount}</span>
                            <span className="text-[9px] font-black text-slate-300 ml-1">CFA</span>
                          </td>
                          <td className="py-5 px-4 text-center">
                            <div className="inline-flex items-center gap-1.5 bg-fintrack-secondary/10 text-fintrack-secondary px-3 py-1.5 rounded-full">
                               <div className="w-1.5 h-1.5 bg-fintrack-secondary rounded-full animate-pulse" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Validée</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button className="w-full py-5 border-2 border-dashed border-slate-100 rounded-3xl text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-200 transition-all hover:text-fintrack-primary">
                  Voir tout l'historique
                </button>
              </div>
            </div>
          )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MOBILE BOTTOM NAV - MOMO STYLE */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-[100] shadow-2xl">
            <button 
              className={`flex flex-col items-center gap-1 ${activeTab === "Caisse" ? "text-fintrack-primary" : "text-slate-400"}`}
              onClick={() => {
                setActiveTab("Caisse");
                setWorkflowStep("CATEGORY");
              }}
            >
               <Home size={22} />
               <span className="text-[8px] font-black uppercase tracking-widest">Accueil</span>
            </button>
            <button 
              className={`flex flex-col items-center gap-1 ${activeTab === "Transactions" ? "text-fintrack-primary" : "text-slate-400"}`}
              onClick={() => setActiveTab("Transactions")}
            >
               <Send size={22} />
               <span className="text-[8px] font-black uppercase tracking-widest">Envoi</span>
            </button>
            <div className="relative -mt-12 group" onClick={() => {
              setActiveTab("Caisse");
              setWorkflowStep("CATEGORY");
            }}>
               <div className="w-16 h-16 bg-fintrack-secondary rounded-full flex items-center justify-center shadow-xl shadow-fintrack-secondary/30 border-4 border-white animate-pulse group-active:scale-95 transition-transform">
                  <Cpu size={30} className="text-white" />
               </div>
               <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest text-slate-600">Terminal</span>
            </div>
            <button 
              className={`flex flex-col items-center gap-1 ${activeTab === "Historique" ? "text-fintrack-primary" : "text-slate-400"}`}
              onClick={() => setActiveTab("Historique")}
            >
               <History size={22} />
               <span className="text-[8px] font-black uppercase tracking-widest">Historique</span>
            </button>
            <button 
              className={`flex flex-col items-center gap-1 ${activeTab === "Account" ? "text-fintrack-primary" : "text-slate-400"}`}
              onClick={() => setActiveTab("Account")}
            >
               <User size={22} />
               <span className="text-[8px] font-black uppercase tracking-widest">Compte</span>
            </button>
        </div>

      {/* Sticky Footer Control */}
        <footer className="bg-white border-t border-slate-200 px-10 pt-4 pb-0 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 relative z-40">
          <div className="flex items-center gap-4 text-slate-500">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sécurisé par Fintrack Global Compliance Systems</span>
          </div>
          <button 
            onClick={() => setActiveModal("cloture")}
            className="w-full md:w-auto px-10 py-4 bg-[#234D96] text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#1C3374] transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> Effectuer la Clôture Automatique
          </button>
        </footer>
      </main>

      {/* --- REFINED MODALS --- */}
      <AnimatePresence>
        {activeModal !== "none" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={closeModal}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {activeModal === "vente" && "Vente Divers"}
                    {activeModal === "ramassage" && "Nouveau Ramassage"}
                    {activeModal === "ajustement" && "Ajustement de Caisse"}
                    {activeModal === "cloture" && "Clôture de Caisse"}
                    {activeModal === "pos_fintech" && "Fintech & Mobile Money"}
                    {activeModal === "pos_bank" && "Banque & Transferts"}
                  </h2>
                  <p className="text-slate-400 text-sm font-bold">Remplissez les informations ci-dessous.</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 pt-6">
                {activeModal === "pos_fintech" && (
                  <div className="space-y-8">
                    {step === 1 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {operators.map((op) => (
                          <button 
                            key={op.id}
                            onClick={() => {
                              setSelectedOperator(op.name);
                              setStep(2);
                            }}
                            className="p-6 bg-[#F8FAFC] border-2 border-transparent hover:border-[#234D96] rounded-[2rem] flex flex-col items-center gap-4 transition-all group"
                          >
                            <div className="w-20 h-20 bg-white rounded-[1.5rem] p-4 shadow-sm group-hover:scale-110 transition-transform">
                              <img src={op.img} alt={op.name} className="w-full h-full object-contain" />
                            </div>
                            <span className="font-black text-slate-900 text-sm">{op.name}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                           <div className="w-12 h-12 bg-white rounded-xl p-2">
                             <img src={operators.find(o => o.name === selectedOperator)?.img} className="w-full h-full object-contain" />
                           </div>
                           <div className="flex-1">
                             <h4 className="font-black text-slate-900 text-sm">{selectedOperator}</h4>
                             <p className="text-[10px] font-black text-[#234D96] tracking-widest uppercase">Opération Mobile Money</p>
                           </div>
                           <button onClick={() => setStep(1)} className="text-xs font-black text-blue-500 uppercase">Changer</button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <button className="flex-1 py-4 bg-[#6ABCA6]/10 text-[#6ABCA6] border border-[#6ABCA6]/20 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                             <ArrowDownLeft size={16} /> Dépôt
                           </button>
                           <button className="flex-1 py-4 bg-blue-50 text-[#234D96] border border-blue-100 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                             <ArrowUpRight size={16} /> Retrait
                           </button>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Numéro de téléphone</label>
                            <div className="relative group">
                              <Smartphone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#234D96] transition-colors" />
                              <input 
                                type="tel" 
                                placeholder="+229 00 00 00 00"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Montant (F CFA)</label>
                            <div className="relative group">
                              <Coins size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#234D96] transition-colors" />
                              <input 
                                type="number" 
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={closeModal}
                          className="w-full py-5 bg-[#234D96] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                          Valider l'opération <Check size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeModal === "vente" && (
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {["SBEE (Factures)", "CANAL+", "SONEB", "RECHARGES"].map((item) => (
                          <button key={item} className="p-6 bg-[#F8FAFC] hover:bg-[#234D96] hover:text-white rounded-2xl border-2 border-transparent hover:shadow-lg transition-all font-black text-sm text-slate-900 group text-center uppercase tracking-widest">
                             {item}
                          </button>
                        ))}
                      </div>
                      <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-center border-dashed">
                        <ShoppingBag size={40} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-xs font-bold text-slate-400 mb-6">Sélectionnez un service pour continuer ou entrez le montant manuellement pour une vente libre.</p>
                        <button className="text-xs font-black text-[#234D96] uppercase tracking-[0.2em] hover:underline">Vente Libre</button>
                      </div>
                   </div>
                )}

                {activeModal === "cloture" && (
                   <div className="space-y-8">
                      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-white/5">
                           <ShieldCheck size={120} />
                        </div>
                        <div className="relative z-10 space-y-4">
                          <h4 className="text-xl font-black text-[#6ABCA6] font-mono tracking-tight">RAPPORT DE CLÔTURE</h4>
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Opérations</p>
                               <p className="text-3xl font-black tracking-tight">12</p>
                             </div>
                             <div>
                               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Commission</p>
                               <p className="text-3xl font-black text-[#6ABCA6] tracking-tight">+6 145 F</p>
                             </div>
                          </div>
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Caisse Finale Attendue</p>
                            <p className="text-4xl font-black tracking-tighter">920 400 F CFA</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-slate-400 text-center px-10">La clôture de caisse fige les opérations et envoie un rapport sécurisé au Marchand. Vérifiez bien les montants.</p>
                        <button 
                          onClick={() => navigate("/")}
                          className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          Confirmer & Déconnecter
                        </button>
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
