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
  RefreshCw,
  Power,
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
type ModalType = "none" | "vente" | "ramassage" | "ajustement" | "cloture" | "recharge" | "dette" | "pos_fintech" | "pos_bank";
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
    <div className="flex items-center gap-4 min-w-0 pr-2 overflow-hidden">
      <span className={`shrink-0 transition-all duration-300 p-2 rounded-xl ${active ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-fintrack-primary/5 group-hover:text-fintrack-primary"}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </span>
      <span className={`text-[13px] font-bold whitespace-nowrap truncate tracking-tight ${active ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
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
      <aside className="hidden lg:flex w-72 bg-[#FCFDFF] border-r border-slate-200/60 flex-col shrink-0 relative z-50">
        <div className="p-8 flex justify-center h-28 items-center border-b border-slate-100/50">
          <Logo className="h-16 w-auto" />
        </div>
        
        <div className="flex-1 px-5 py-6 overflow-y-auto no-scrollbar">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Menu Principal</h3>
            <nav className="space-y-1.5">
              <SidebarItem 
                icon={<Home size={20} />} 
                label="Poste de Travail" 
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
            </nav>
          </div>

          <div className="mb-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Services & Support</h3>
            <nav className="space-y-1.5">
              <SidebarItem 
                icon={<Settings2 size={20} />} 
                label="Paramètres" 
                active={activeTab === "Settings"} 
                onClick={() => setActiveTab("Settings")} 
              />
              <SidebarItem 
                icon={<ShieldCheck size={20} />} 
                label="Sécurité" 
                active={activeTab === "Security"} 
                onClick={() => setActiveTab("Security")} 
              />
              <SidebarItem 
                icon={<User size={20} />} 
                label="Profil Agent" 
                active={activeTab === "Account"} 
                onClick={() => setActiveTab("Account")} 
              />
            </nav>
          </div>
        </div>

        <div className="px-6 pb-10 flex flex-col gap-4">
          <div className="bg-[#1C3374] rounded-[2.5rem] p-6 flex flex-col gap-5 text-white relative overflow-hidden group shadow-2xl shadow-blue-900/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-fintrack-secondary/20 transition-all duration-700 pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-fintrack-secondary font-black text-lg shadow-inner ring-1 ring-white/20">
                AG
              </div>
              <div className="flex flex-col">
                <p className="text-[13px] font-black tracking-tight leading-none mb-1 text-white">Agent Cotonou #01</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest leading-none">Session Active</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10">
                <div className="flex flex-col">
                   <p className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">ID Terminal</p>
                   <p className="text-[10px] font-mono font-black text-fintrack-secondary">#001-CORE</p>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase border border-white/5">Premium</div>
            </div>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="w-full h-14 flex items-center justify-center gap-3 rounded-[1.5rem] bg-rose-500/5 border border-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-black text-[10px] tracking-widest uppercase active:scale-95 group/logout shadow-sm"
          >
            <LogOut size={16} className="group-hover/logout:-translate-x-1 transition-all" />
            <span>Fermer la Caisse</span>
          </button>
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FBFBFE]">
        {/* Simplified & More Breathing Header */}
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 relative z-20">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">
                <span>Terminal</span>
                <ChevronRight size={10} className="opacity-30" />
                <span className="text-slate-900 border-b-2 border-fintrack-primary pb-0.5">{activeTab}</span>
              </div>
              <h1 className="text-xl font-black text-slate-950 tracking-tight">Poste de Travail <span className="text-fintrack-primary">#001</span></h1>
            </div>
            
            <div className="hidden xl:flex items-center gap-6">
              <div className="h-10 w-px bg-slate-100" />
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Disponible</span>
                 <span className="text-sm font-black text-slate-900 tracking-tight">524 500 F</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Commissions</span>
                 <span className="text-sm font-black text-amber-600 tracking-tight">+12 400 F</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 px-5 py-3 bg-fintrack-primary/5 border border-fintrack-primary/10 rounded-2xl group cursor-pointer hover:bg-fintrack-primary/10 transition-all">
               <div className="w-8 h-8 bg-fintrack-primary rounded-xl flex items-center justify-center text-white">
                  <Zap size={16} strokeWidth={3} />
               </div>
               <div className="flex flex-col">
                 <span className="text-[8px] font-black text-fintrack-primary uppercase tracking-[0.2em] leading-none mb-0.5">Session Live</span>
                 <span className="text-sm font-mono font-black text-slate-900 leading-none">
                   24 <span className="text-[9px] text-slate-400">OPS</span>
                 </span>
               </div>
             </div>
             
             <div className="flex items-center gap-2">
               <button className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-950 hover:border-slate-300 transition-all relative">
                 <Bell size={20} />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
               </button>
               <button className="w-11 h-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-950 transition-all">
                 <User size={20} />
               </button>
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
            <div className="max-w-[1300px] mx-auto space-y-10">
            
              {/* Refined Stats - More White Space */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Flux Entrant", value: "845 000", delta: "+12.5%", icon: <ArrowUpRight />, color: "text-emerald-500", bg: "bg-emerald-500", trend: "up" },
                  { label: "Flux Sortant", value: "320 500", delta: "+4.2%", icon: <ArrowDownLeft />, color: "text-rose-500", bg: "bg-rose-500", trend: "down" },
                  { label: "Volume OPS", value: "24", delta: "Normal", icon: <Activity />, color: "text-blue-500", bg: "bg-blue-500", trend: "neutral" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100/60 shadow-sm group hover:shadow-md transition-all duration-300">
                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                         <div className={`w-10 h-10 rounded-xl ${stat.bg}/10 flex items-center justify-center ${stat.color}`}>
                            {React.cloneElement(stat.icon as React.ReactElement, { size: 20, strokeWidth: 2.5 })}
                         </div>
                         <div className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                           stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                           stat.trend === 'down' ? 'bg-rose-50 text-rose-600' : 
                           'bg-slate-50 text-slate-400'
                         }`}>
                           {stat.delta}
                         </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-black text-slate-950 tracking-tight tabular-nums">{stat.value}</p>
                          <span className="text-[10px] font-black text-slate-300">CFA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions - Lighter Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { id: "ramassage", label: "Ramassage", icon: <ArrowUpRight />, color: "text-blue-600", bgColor: "bg-blue-600/5" },
                  { id: "ajustement", label: "Ajustement", icon: <Settings2 />, color: "text-violet-600", bgColor: "bg-violet-600/5" },
                  { id: "recharge", label: "Réappro.", icon: <RefreshCw />, color: "text-emerald-600", bgColor: "bg-emerald-600/5" },
                  { id: "dette", label: "Dettes", icon: <HandCoins />, color: "text-slate-600", bgColor: "bg-slate-600/5" },
                  { id: "cloture", label: "Clôture", icon: <Power />, color: "text-rose-600", bgColor: "bg-rose-600/5" },
                ].map((action) => (
                  <button 
                    key={action.id}
                    onClick={() => setActiveModal(action.id as ModalType)}
                    className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[2.5rem] gap-4 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${action.bgColor} ${action.color} flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300`}>
                      {React.cloneElement(action.icon as React.ReactElement, { size: 24, strokeWidth: 2.5 })}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-950 transition-colors">{action.label}</span>
                  </button>
                ))}
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
                          className="bg-white border border-slate-100/60 rounded-[2.5rem] p-8 flex flex-col items-center gap-6 hover:shadow-xl hover:border-transparent transition-all duration-500 group relative overflow-hidden"
                        >
                          <div className={`w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-all duration-500`}>
                            {React.cloneElement(cat.icon as React.ReactElement, { size: 32 })}
                          </div>
                          <div className="text-center space-y-1">
                            <span className="block text-lg font-black text-slate-900 tracking-tight">{cat.title}</span>
                            <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest">Choisir service</span>
                          </div>
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
                    className="w-full max-w-2xl mx-auto space-y-12"
                  >
                    <div className="text-center space-y-6">
                       <div className="inline-flex items-center gap-3 bg-fintrack-primary/5 px-4 py-2 rounded-full border border-fintrack-primary/10">
                          <span className="text-[10px] font-black text-fintrack-primary uppercase tracking-[0.3em]">Configuration Opération</span>
                       </div>
                       <div className="flex items-center justify-center gap-4">
                          <input 
                            type="text" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="text-7xl font-mono font-black text-slate-950 bg-transparent outline-none w-full max-w-[400px] text-right placeholder:text-slate-100 selection:bg-fintrack-primary/20"
                          />
                          <span className="text-4xl font-black text-slate-300">F</span>
                       </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[3.5rem] p-12 space-y-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                       
                       <div className="space-y-10 relative z-10">
                          <div className="space-y-4">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Contact Client</label>
                                <span className="text-[9px] font-bold text-slate-400">Requis *</span>
                             </div>
                             <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-hover:text-fintrack-primary transition-colors">
                                   <PhoneIcon size={20} />
                                </div>
                                <input 
                                  type="tel" 
                                  placeholder="00 229 00 00 00 00"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full h-22 bg-[#FCFDFF] border-2 border-slate-50 rounded-3xl pl-16 pr-8 text-2xl font-black text-slate-950 placeholder:text-slate-200 focus:bg-white focus:border-fintrack-primary/30 transition-all outline-none shadow-sm"
                                />
                             </div>
                          </div>

                          <div className="space-y-4">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Identité du Bénéficiaire</label>
                                <span className="text-[9px] font-bold text-slate-400">Requis *</span>
                             </div>
                             <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-hover:text-fintrack-primary transition-colors">
                                   <User size={20} />
                                </div>
                                <input 
                                  type="text" 
                                  placeholder="Nom & Prénoms"
                                  value={beneficiaryName}
                                  onChange={(e) => setBeneficiaryName(e.target.value)}
                                  className="w-full h-22 bg-[#FCFDFF] border-2 border-slate-50 rounded-3xl pl-16 pr-8 text-2xl font-black text-slate-950 placeholder:text-slate-200 focus:bg-white focus:border-fintrack-primary/30 transition-all outline-none shadow-sm"
                                />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                       <button 
                         onClick={() => setWorkflowStep("RECAP")}
                         className="w-full max-w-sm py-6 bg-slate-950 text-white rounded-[2.2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(30,41,59,0.3)] hover:scale-[1.02] active:scale-95 hover:bg-fintrack-primary transition-all duration-300 flex items-center justify-center gap-4 group"
                       >
                          Valider la saisie <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                       </button>
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
                    className="w-full max-w-xl mx-auto bg-white rounded-[4rem] p-12 lg:p-16 border border-slate-100 shadow-2xl text-center space-y-10 relative overflow-hidden"
                  >
                     <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-fintrack-primary via-fintrack-secondary to-blue-600" />
                     
                     <div className="relative">
                       <div className="w-28 h-28 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 relative z-10">
                          <Check size={56} strokeWidth={4} />
                       </div>
                       <motion.div 
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1.5, opacity: 0.1 }}
                         className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl"
                       />
                     </div>

                     <div className="space-y-3">
                        <h2 className="text-4xl font-black text-slate-950 tracking-tighter">Transaction Authentifiée</h2>
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none">Diffusion réseau en cours</p>
                     </div>

                     <div className="bg-[#FCFDFF] border border-slate-50 rounded-[2.5rem] p-8 space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100/50">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Valeur Transactionnelle</span>
                           <span className="text-xl font-mono font-black text-slate-950">{amount} CFA</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Identifiant Unique</span>
                           <span className="text-xs font-mono font-black text-fintrack-primary bg-fintrack-primary/5 px-3 py-1 rounded-lg">TX-F-{Math.floor(Math.random() * 9999999)}</span>
                        </div>
                     </div>

                     <div className="flex flex-col gap-4">
                        <button 
                          onClick={() => {
                            setWorkflowStep("CATEGORY");
                            setAmount("");
                            setPhone("");
                            setBeneficiaryName("");
                          }}
                          className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/20 hover:bg-fintrack-primary transition-all duration-300"
                        >
                           Nouvelle Opération
                        </button>
                        <button className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                           <Receipt size={14} /> Imprimer le ticket
                        </button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTIVITY - ONLY ON MAIN STEP */}
              {workflowStep === "CATEGORY" && (
                <div className="space-y-8 mt-12">

              {/* Final Performance Section - More Minimal */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Live Service Status */}
                 <div className="bg-slate-900 rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                       <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-1 relative z-10">
                       <p className="text-sm font-black text-white uppercase tracking-widest">Système Opérationnel</p>
                       <p className="text-[10px] font-bold text-white/40">Latence moyenne : <span className="text-emerald-400">1.2s</span> • Toutes les passerelles sont actives.</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[9px] font-black text-white uppercase tracking-widest">LIVE</span>
                    </div>
                 </div>

                 {/* Minimal Net Metrics */}
                 <div className="bg-white border border-slate-100 rounded-[2rem] p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-fintrack-primary/5 rounded-xl text-fintrack-primary">
                          <Activity size={20} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Qualité Réseau</p>
                          <p className="text-sm font-black text-slate-900">Excellent (98%)</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       {[3, 5, 4, 6, 5, 8, 4].map((h, i) => (
                         <div key={i} className="w-1 bg-fintrack-primary/20 rounded-full flex items-end overflow-hidden h-6">
                            <div className="w-full bg-fintrack-primary rounded-full transition-all duration-700" style={{ height: `${h * 10}%` }} />
                         </div>
                       ))}
                    </div>
                 </div>
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
                  <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        <th className="pb-4 px-6">Nature</th>
                        <th className="pb-4 px-6 text-center">Partenaire</th>
                        <th className="pb-4 px-6">Identification</th>
                        <th className="pb-4 px-6">Horodatage</th>
                        <th className="pb-4 px-6 text-right">Volume (CFA)</th>
                        <th className="pb-4 px-6 text-center">État</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((item, idx) => (
                        <tr key={idx} className="group hover:bg-white transition-all duration-300">
                          <td className="py-5 px-6 border-b border-slate-50">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                item.type === 'DÉPÔT' ? 'bg-emerald-50 text-emerald-600' : 
                                item.type === 'VENTE' ? 'bg-amber-50 text-amber-600' :
                                'bg-rose-50 text-rose-600'
                              }`}>
                                 {item.type === 'DÉPÔT' ? <ArrowUpRight size={18} /> : 
                                  item.type === 'VENTE' ? <ShoppingBag size={18} /> : 
                                  <ArrowDownLeft size={18} />}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.type}</span>
                                <span className="text-[13px] font-bold text-slate-900 tracking-tight">{item.type === 'VENTE' ? 'Service Externe' : 'Transfert Cash'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6 border-b border-slate-50">
                            <div className="flex justify-center">
                              <img src={item.logo} alt={item.bank} className="h-6 w-auto object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </td>
                          <td className="py-5 px-6 border-b border-slate-50">
                             <div className="flex flex-col">
                               <span className="text-[11px] font-mono font-bold text-slate-600">#TX-{item.id}</span>
                               <span className="text-[8px] font-black text-slate-300 uppercase">POS-001</span>
                             </div>
                          </td>
                          <td className="py-5 px-6 border-b border-slate-50">
                            <div className="flex flex-col">
                               <span className="text-[13px] font-bold text-slate-900">{item.date}</span>
                               <span className="text-[8px] font-black text-slate-300 uppercase">24 Avr.</span>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-right border-b border-slate-50">
                            <div className="flex flex-col items-end">
                               <div className="flex items-baseline gap-1">
                                  <span className="text-sm font-mono font-black text-slate-950 tabular-nums">{item.amount}</span>
                                  <span className="text-[9px] font-black text-slate-400">F</span>
                               </div>
                               <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">+150 Com</span>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-center border-b border-slate-50">
                            <div className="inline-flex items-center gap-1.5 text-emerald-600">
                               <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                               <span className="text-[9px] font-black uppercase tracking-widest">OK</span>
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
                    {activeModal === "recharge" && "Recharge de Compte"}
                    {activeModal === "dette" && "Rembourser Dette"}
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
                   <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: "SBEE", icon: <Zap size={18} />, color: "bg-amber-500" },
                          { name: "CANAL+", icon: <Tv size={18} />, color: "bg-blue-600" },
                          { name: "SONEB", icon: <Activity size={18} />, color: "bg-sky-500" },
                          { name: "VISA/MC", icon: <CreditCard size={18} />, color: "bg-fintrack-primary" },
                        ].map((item) => (
                          <button key={item.name} className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 rounded-2xl transition-all group">
                             <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center`}>
                               {item.icon}
                             </div>
                             <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{item.name}</span>
                          </button>
                        ))}
                      </div>
                      <button className="w-full py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-fintrack-primary transition-all flex items-center justify-center gap-3">
                         Vente Libre <ShoppingBag size={16} />
                      </button>
                   </div>
                )}

                {activeModal === "ramassage" && (
                   <div className="space-y-8">
                      <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                          <ArrowUpRight size={32} />
                        </div>
                        <p className="text-sm font-bold text-slate-600">Le ramassage permet de transférer l'excédent de caisse vers le compte principal du marchand.</p>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Montant à ramasser</label>
                         <input 
                           type="number" 
                           placeholder="0"
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-blue-600 rounded-2xl font-bold text-slate-900 outline-none transition-all text-2xl"
                         />
                         <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                           Confirmer le ramassage
                         </button>
                      </div>
                   </div>
                )}

                {activeModal === "ajustement" && (
                   <div className="space-y-8">
                      <div className="p-8 bg-violet-50 border border-violet-100 rounded-3xl flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center">
                          <Settings2 size={32} />
                        </div>
                        <p className="text-sm font-bold text-slate-600">Utilisez l'ajustement pour corriger les erreurs de solde de caisse (ajouts ou retraits manuels).</p>
                      </div>
                      <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                            <button className="py-4 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase text-slate-600">Entrée (Ajout)</button>
                            <button className="py-4 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase text-slate-600">Sortie (Retrait)</button>
                         </div>
                         <input 
                           type="number" 
                           placeholder="Montant"
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-violet-600 rounded-2xl font-bold text-slate-900 outline-none transition-all"
                         />
                         <textarea 
                           placeholder="Raison de l'ajustement..."
                           className="w-full px-6 py-4 bg-[#F8FAFC] border-2 border-transparent focus:border-violet-600 rounded-2xl font-medium text-slate-900 outline-none transition-all min-h-[100px]"
                         />
                         <button className="w-full py-5 bg-violet-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-violet-500/20 active:scale-95 transition-all">
                           Enregistrer l'ajustement
                         </button>
                      </div>
                   </div>
                )}

                {activeModal === "recharge" && (
                   <div className="space-y-8">
                      <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                          <RefreshCw size={32} />
                        </div>
                        <p className="text-sm font-bold text-slate-600">Recharger le compte agent via un dépôt bancaire ou un transfert externe.</p>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Montant de la recharge</label>
                         <input 
                           type="number" 
                           placeholder="0"
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-emerald-400 rounded-2xl font-bold text-slate-900 outline-none transition-all text-2xl"
                         />
                         <button className="w-full py-5 bg-emerald-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-400/20 active:scale-95 transition-all">
                           Confirmer la recharge
                         </button>
                      </div>
                   </div>
                )}

                {activeModal === "dette" && (
                   <div className="space-y-8">
                      <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                          <HandCoins size={32} />
                        </div>
                        <p className="text-sm font-bold text-slate-600">Remboursement des dettes clients ou partenaires enregistrées dans le système.</p>
                      </div>
                      <div className="space-y-4">
                         <input 
                           type="text" 
                           placeholder="Rechercher un client ou une dette..."
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-emerald-600 rounded-2xl font-bold text-slate-900 outline-none transition-all"
                         />
                         <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
                            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Aucune dette sélectionnée</span>
                         </div>
                         <button disabled className="w-full py-5 bg-slate-300 text-white rounded-2xl font-black text-sm uppercase tracking-widest cursor-not-allowed">
                           Payer la dette
                         </button>
                      </div>
                   </div>
                )}

                {activeModal === "cloture" && (
                   <div className="space-y-8">
                      <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-fintrack-primary/20 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                        <div className="relative z-10 space-y-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-500">
                                  <AlertCircle size={20} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Rapport de Session</p>
                                  <p className="text-xl font-black tracking-tight">Clôture Terminal #001</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Date</p>
                               <p className="text-sm font-bold">24/04/2026</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-1">
                                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Flux Entrant</p>
                                <p className="text-2xl font-black">845 000 <span className="text-xs font-bold text-white/40">F</span></p>
                             </div>
                             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-1">
                                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Flux Sortant</p>
                                <p className="text-2xl font-black">320 500 <span className="text-xs font-bold text-white/40">F</span></p>
                             </div>
                          </div>

                          <div className="p-8 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20 flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Bénéfice Net (Commissions)</p>
                                <p className="text-4xl font-black text-emerald-400 tracking-tighter">+12 400 F</p>
                             </div>
                             <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <TrendingUp size={24} />
                             </div>
                          </div>

                          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none">Caisse de Clôture</p>
                                <p className="text-4xl font-black text-fintrack-secondary tracking-tighter">536 900 F</p>
                             </div>
                             <div className="text-right">
                                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30">
                                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                   <span className="text-[9px] font-black uppercase tracking-widest">Équilibré</span>
                                </div>
                             </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 px-2">
                        <p className="text-xs font-bold text-slate-400 text-center leading-relaxed">Cette action est irréversible. Toutes les données de session seront archivées et transmises au gestionnaire du point de vente.</p>
                        <div className="flex gap-4">
                           <button 
                             onClick={closeModal}
                             className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                           >
                             Annuler
                           </button>
                           <button 
                             onClick={() => navigate("/")}
                             className="flex-[2] py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                           >
                             Signer & Déconnecter <ShieldCheck size={18} />
                           </button>
                        </div>
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
