import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  ArrowDownLeft,
  History, 
  Calendar,
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
  Search,
  AlertCircle,
  AlertTriangle,
  Camera,
  FileText,
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
        {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
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
  const [depositorName, setDepositorName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [rib, setRib] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [activities, setActivities] = useState([
    { 
      id: "TXN-IMRH6NP3", 
      clientRef: "0718957019",
      amount: "10 000", 
      commission: "100", 
      operator: "Ecobank", 
      type: "DEPOT", 
      date: "28/04/2026", 
      time: "14:25", 
      status: "EN_ANNULATION", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ecobank_logo.svg",
      proofPhoto: true,
      receiptPhoto: false,
      extra: "Bénéficiaire: Koffi Jerry"
    },
    { 
      id: "TXN-DSAGPFUJ", 
      clientRef: "0749499122",
      amount: "50 000", 
      commission: "500", 
      operator: "Wave", 
      type: "PAIEMENT FACTURE", 
      date: "28/04/2026", 
      time: "13:42", 
      status: "EN_ANNULATION", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wave_Logo.svg/1000px-Wave_Logo.svg.png",
      proofPhoto: true,
      receiptPhoto: false,
      extra: "SENELEC | Titulaire : Aya"
    },
    { 
      id: "TXN-B110432B", 
      clientRef: "0711338192",
      amount: "2 500", 
      commission: "25", 
      operator: "Ecobank", 
      type: "DEPOT", 
      date: "25/04/2026", 
      time: "18:42", 
      status: "CONFIRME", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Ecobank_logo.svg",
      proofPhoto: true,
      receiptPhoto: true,
    },
    { 
      id: "TXN-B10F0B3D", 
      clientRef: "0755083250",
      amount: "50 000", 
      commission: "750", 
      operator: "NSIA Banque", 
      type: "DEPOT", 
      date: "25/04/2026", 
      time: "18:42", 
      status: "CONFIRME", 
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xN8F6tXG5S1O5A4Y7_qg7Z5y5o9G0Z3w-Q&s",
      proofPhoto: true,
      receiptPhoto: true,
    },
  ]);

  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<any>(null);
  const [selectedTxForReport, setSelectedTxForReport] = useState<any>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReportError = (id: string) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, status: "EN_ANNULATION" } : a));
    setShowReportModal(false);
  };

  function CloturesView() {
    const cloturesData = [
      {
        id: 1,
        date: "2026-04-19",
        status: "EN_ATTENTE",
        bilanState: "NORMAL",
        bilanAmount: 0,
        physique: 971773,
        theorique: 971773
      },
      {
        id: 2,
        date: "2026-04-19",
        status: "EN_ATTENTE",
        bilanState: "NORMAL",
        bilanAmount: 0,
        physique: 974196,
        theorique: 974196
      },
      {
        id: 3,
        date: "2026-04-19",
        status: "VERIFIE",
        bilanState: "NORMAL",
        bilanAmount: 0,
        physique: 380624,
        theorique: 380624
      },
      {
        id: 4,
        date: "2026-04-17",
        status: "EN_ATTENTE",
        bilanState: "EXCEDENT",
        bilanAmount: 5000,
        physique: 880100,
        theorique: 875100,
        justification: "Oubli d'enregistrement d'un frais d'envoi d'un client sur le système local."
      },
      {
        id: 5,
        date: "2026-04-17",
        status: "VERIFIE",
        bilanState: "EXCEDENT",
        bilanAmount: 5000,
        physique: 930723,
        theorique: 925723,
        justification: "Oubli d'enregistrement d'un frais d'envoi d'un client sur le système local."
      },
      {
        id: 6,
        date: "2026-04-17",
        status: "VERIFIE",
        bilanState: "EXCEDENT",
        bilanAmount: 5000,
        physique: 789852,
        theorique: 784852,
        justification: "Oubli d'enregistrement d'un frais d'envoi d'un client sur le système local."
      },
      {
        id: 7,
        date: "2026-04-15",
        status: "VERIFIE",
        bilanState: "DEFICIT",
        bilanAmount: 25000,
        physique: 475000,
        theorique: 500000,
        justification: "Perte de 25.000 during transport."
      }
    ];

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-6xl font-black text-[#0F172A] tracking-tighter">Clôtures & Bilans</h2>
            <p className="text-slate-500 font-medium text-[17px] tracking-tight">Suivi des clôtures journalières et des états de bilan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cloturesData.map((cloture) => (
            <div key={cloture.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col gap-8 group hover:shadow-xl transition-all duration-500">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                  <span className="text-fintrack-primary"><Calendar size={16} /></span>
                  <span className="text-[13px] font-black text-slate-900">{cloture.date}</span>
                </div>
                {cloture.status === "VERIFIE" ? (
                  <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                    Vérifié par la direction
                  </div>
                ) : (
                  <div className="bg-slate-50 text-slate-500 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider border border-slate-100">
                    En attente de contrôle
                  </div>
                )}
              </div>

              {/* State */}
              <div className="flex items-center gap-6">
                 <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${
                   cloture.bilanState === "NORMAL" ? "bg-emerald-50 text-emerald-500" : 
                   cloture.bilanState === "EXCEDENT" ? "bg-amber-50 text-amber-500" :
                   "bg-red-50 text-red-500"
                 }`}>
                   {cloture.bilanState === "NORMAL" ? <CheckCircle size={32} /> : 
                    cloture.bilanState === "EXCEDENT" ? <AlertTriangle size={32} /> : 
                    <AlertCircle size={32} />}
                 </div>
                 <div className="flex flex-col">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ÉTAT DU BILAN</p>
                    <p className={`text-2xl font-black tracking-tight ${
                      cloture.bilanState === "NORMAL" ? "text-emerald-500" : 
                      cloture.bilanState === "EXCEDENT" ? "text-amber-500" :
                      "text-red-500 shadow-red-500/10"
                    }`}>
                      {cloture.bilanState} ({cloture.bilanAmount.toLocaleString()} F)
                    </p>
                 </div>
              </div>

              {/* Grid Values */}
              <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PHYSIQUE COMPTÉ</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{cloture.physique.toLocaleString()} F</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">THÉORIQUE SYSTÈME</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{cloture.theorique.toLocaleString()} F</p>
                 </div>
              </div>

              {/* Justification */}
              {cloture.justification && (
                <div className="pt-4 border-t border-slate-100">
                   <div className="pl-4 border-l-2 border-slate-100">
                      <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                        <span className="font-black text-slate-900">Justification:</span> {cloture.justification}
                      </p>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function TransactionsView() {
    const filteredActivities = activities.filter(txn => 
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      txn.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (txn.clientRef && txn.clientRef.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-6xl font-black text-[#0F172A] tracking-tighter">Mes Transactions</h2>
            <p className="text-slate-500 font-medium text-[17px] tracking-tight">Historique et suivi en temps réel de votre activité.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="relative flex-1 xl:w-[480px]">
              <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Chercher une référence, un numéro..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] font-medium text-[#0F172A] placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-fintrack-primary/5 focus:border-fintrack-primary/20 transition-all shadow-sm"
              />
            </div>
            <button className="px-10 py-5 bg-[#3B4CB8] text-white font-black text-sm uppercase tracking-widest rounded-3xl shadow-xl shadow-[#3B4CB8]/20 hover:bg-[#2D3A8C] hover:scale-[1.02] transition-all active:scale-95">
              Rechercher
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
          {[
            { label: "VOLUME TOTAL", value: "7 302 363", icon: <Activity />, bg: "bg-blue-50/50", iconColor: "text-blue-600" },
            { label: "OPÉRATIONS", value: "15", icon: <Repeat />, bg: "bg-violet-50/50", iconColor: "text-violet-600" },
            { label: "COMMISSIONS", value: "18 837", icon: <TrendingUp />, bg: "bg-emerald-50/50", iconColor: "text-emerald-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 flex items-center gap-8 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-500 group">
              <div className={`w-20 h-20 rounded-3xl ${stat.bg} ${stat.iconColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 })}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#0F172A] tracking-tighter tabular-nums">{stat.value}</span>
                  <span className="text-lg font-black text-[#0F172A]">F</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table Container */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="py-8 px-10 text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] border-b border-slate-50">Référence / Client</th>
                  <th className="py-8 px-10 text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] border-b border-slate-50">Opération & Réseau</th>
                  <th className="py-8 px-10 text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] border-b border-slate-50">Montant</th>
                  <th className="py-8 px-10 text-center text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] border-b border-slate-50">Statut</th>
                  <th className="py-8 px-10 text-right text-[11px] font-black text-slate-500 uppercase tracking-[0.1em] border-b border-slate-50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredActivities.map((txn, i) => (
                  <tr 
                    key={i} 
                    className={`group transition-all duration-500 ${
                      txn.status === "EN_ANNULATION" 
                        ? "bg-amber-50/40" 
                        : "hover:bg-slate-50/50"
                    }`}
                  >
                    <td className="py-8 px-10">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[17px] font-black text-[#0F172A] tracking-tight">{txn.id}</span>
                        <div className="bg-slate-100/80 px-3 py-1 rounded-lg self-start">
                          <span className="text-[13px] font-black text-slate-500">{txn.clientRef}</span>
                        </div>

                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 bg-white shadow-sm`}>
                          {txn.type.includes('DEPOT') ? 
                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                               <ArrowDownLeft size={20} strokeWidth={3} />
                            </div> : 
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                               <ArrowUpRight size={20} strokeWidth={3} />
                            </div>
                          }
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-black text-[#0F172A] uppercase tracking-tight">{txn.type}</span>
                          <span className="text-[14px] font-medium text-slate-500">{txn.operator}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[22px] font-black text-[#0F172A] tracking-tighter leading-none">{txn.amount}</span>
                          <span className="text-[14px] font-black text-[#0F172A]">F</span>
                        </div>
                        <span className="text-[12px] font-black text-emerald-500 tracking-tight">Comm: +{txn.commission} F</span>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-center">
                      {txn.status === "EN_ANNULATION" ? (
                        <div className="inline-flex bg-amber-100/50 text-amber-600 px-4 py-1.5 rounded-full border border-amber-200/50">
                           <span className="text-[11px] font-black uppercase tracking-wider">{txn.status}</span>
                        </div>
                      ) : (
                        <div className="inline-flex bg-emerald-100/50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-200/50">
                           <span className="text-[11px] font-black uppercase tracking-wider">{txn.status}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-8 px-10 text-right">
                      <button 
                        onClick={() => {
                          setSelectedTxForReceipt(txn);
                          setShowReceiptModal(true);
                        }}
                        className="px-6 py-2.5 bg-[#3B4CB8] text-white rounded-xl font-black text-[11px] hover:bg-[#2D3A8C] transition-all shadow-lg shadow-blue-900/10 active:scale-95 whitespace-nowrap"
                      >
                        Voir Reçu
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

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
    setDepositorName("");
    setIdNumber("");
    setRib("");
    setSubscriberId("");
    setQuantity("1");
    setSelectedArticle("");
    setStep(1);
    setWorkflowStep("CATEGORY");
  };

  return (
    <div className="fixed inset-0 flex bg-fintrack-light font-sans selection:bg-fintrack-primary/30 overflow-hidden">
      {/* Sidebar - HIDDEN ON MOBILE */}
      <aside className="hidden lg:flex w-72 bg-[#FCFDFF] border-r border-slate-200/60 flex-col shrink-0 relative z-50">
        <div className="p-10 flex justify-center h-56 items-center border-b border-slate-100/50">
          <Logo className="h-44 w-auto" />
        </div>
        
        <div className="flex-1 px-5 py-6 overflow-y-auto no-scrollbar">
          <div className="mb-8">
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
                label="Clôtures & Bilans" 
                active={activeTab === "Historique"} 
                onClick={() => setActiveTab("Historique")} 
              />
            </nav>
          </div>

          <div className="mb-8">
            <nav className="space-y-1.5">
              <SidebarItem 
                icon={<Settings2 size={20} />} 
                label="Paramètres" 
                active={activeTab === "Settings"} 
                onClick={() => setActiveTab("Settings")} 
              />
            </nav>
          </div>
        </div>

        <div className="px-6 pb-10 flex flex-col gap-4">
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
            <h1 className="text-xl font-black text-slate-950 tracking-tight">
              {activeTab === "Caisse" ? "Poste de Travail" : activeTab === "Transactions" ? "Gestion Transactions" : activeTab} 
              <span className="text-fintrack-primary ml-2 uppercase text-sm opacity-50 font-bold">#001</span>
            </h1>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-12 no-scrollbar bg-fintrack-light"
          >
            <div className="max-w-[1400px] mx-auto">
              {activeTab === "Transactions" ? (
                <TransactionsView />
              ) : activeTab === "Historique" ? (
                <CloturesView />
              ) : activeTab === "Caisse" ? (
                <div className="space-y-10">
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
                                {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 20, strokeWidth: 2.5 })}
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
                          {React.cloneElement(action.icon as React.ReactElement<any>, { size: 24, strokeWidth: 2.5 })}
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
                                {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 32 })}
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
                              <span className="text-4xl font-black text-slate-300">CFA</span>
                           </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {/* FINTECH CATEGORY */}
                             {selectedCategory === "FINTECH" && (
                               <>
                                 {["DEPOT", "RETRAIT", "CREDIT", "INTERNET", "APPEL"].includes(selectedService?.id || "") && (
                                   <div className="space-y-3">
                                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Numéro de Téléphone</label>
                                     <div className="relative">
                                       <PhoneIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                       <input 
                                         type="tel" 
                                         value={phone}
                                         onChange={(e) => setPhone(e.target.value)}
                                         placeholder="Ex: 97 00 00 00" 
                                         className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                       />
                                     </div>
                                   </div>
                                 )}

                                 {selectedService?.id === "DEPOT" && (
                                   <div className="space-y-3">
                                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Nom COMPLET du Bénéficiaire</label>
                                     <div className="relative">
                                       <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                       <input 
                                         type="text" 
                                         value={beneficiaryName}
                                         onChange={(e) => setBeneficiaryName(e.target.value)}
                                         placeholder="Nom complet" 
                                         className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                       />
                                     </div>
                                   </div>
                                 )}

                                 {["FACTURE", "ABONNEMENT"].includes(selectedService?.id || "") && (
                                   <>
                                     <div className="space-y-3">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">
                                         {selectedService?.id === "FACTURE" ? "N° Police / Identifiant Compteur" : "N° Carte / Abonné"}
                                       </label>
                                       <div className="relative">
                                         <Cpu className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                         <input 
                                           type="text" 
                                           value={subscriberId}
                                           onChange={(e) => setSubscriberId(e.target.value)}
                                           placeholder="Référence..." 
                                           className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                         />
                                       </div>
                                     </div>
                                     <div className="space-y-3">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Nom de l'Abonné / Titulaire</label>
                                       <div className="relative">
                                         <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                         <input 
                                           type="text" 
                                           value={beneficiaryName}
                                           onChange={(e) => setBeneficiaryName(e.target.value)}
                                           placeholder="Nom complet" 
                                           className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                         />
                                       </div>
                                     </div>
                                   </>
                                 )}
                               </>
                             )}

                             {/* BANK CATEGORY */}
                             {selectedCategory === "BANK" && (
                               <>
                                 <div className="space-y-3">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">N° de compte bancaire (RIB)</label>
                                   <div className="relative">
                                     <Landmark className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                     <input 
                                       type="text" 
                                       value={rib}
                                       onChange={(e) => setRib(e.target.value)}
                                       placeholder="RIB..." 
                                       className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                     />
                                   </div>
                                 </div>
                                 <div className="space-y-3">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Nom du Bénéficiaire / Client</label>
                                   <div className="relative">
                                     <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                     <input 
                                       type="text" 
                                       value={beneficiaryName}
                                       onChange={(e) => setBeneficiaryName(e.target.value)}
                                       placeholder="Nom complet" 
                                       className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                     />
                                   </div>
                                 </div>
                                 <div className="space-y-3">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Nom du Déposant / Retirant</label>
                                   <div className="relative">
                                     <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                     <input 
                                       type="text" 
                                       value={depositorName}
                                       onChange={(e) => setDepositorName(e.target.value)}
                                       placeholder="Nom complet" 
                                       className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                     />
                                   </div>
                                 </div>
                                 <div className="space-y-3">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">N° Pièce Identité (KYC)</label>
                                   <div className="relative">
                                     <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                     <input 
                                       type="text" 
                                       value={idNumber}
                                       onChange={(e) => setIdNumber(e.target.value)}
                                       placeholder="CIP / NPI / Passeport" 
                                       className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all"
                                     />
                                   </div>
                                 </div>
                               </>
                             )}

                             {/* SALES CATEGORY */}
                             {selectedCategory === "SALES" && (
                               <>
                                 <div className="space-y-3">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Article Sélectionné</label>
                                   <div className="relative">
                                     <ShoppingBag className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                     <select 
                                       value={selectedArticle} 
                                       onChange={(e) => setSelectedArticle(e.target.value)}
                                       className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all appearance-none"
                                     >
                                       <option value="">Choisir un article</option>
                                       <option value="SIM MTN">SIM MTN</option>
                                       <option value="SIM MOOV">SIM Moov</option>
                                       <option value="SIM CELTIS">SIM Celtis</option>
                                       <option value="RECHARGE">Carte recharge</option>
                                     </select>
                                   </div>
                                 </div>
                                 <div className="space-y-3">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Quantité</label>
                                   <div className="flex items-center gap-4">
                                      <button onClick={() => setQuantity(Math.max(1, parseInt(quantity) - 1).toString())} className="w-16 h-16 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center font-black">-</button>
                                      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="flex-1 h-16 bg-slate-50 border-transparent text-center font-black text-xl rounded-2xl outline-none" />
                                      <button onClick={() => setQuantity((parseInt(quantity) + 1).toString())} className="w-16 h-16 bg-fintrack-primary text-white rounded-2xl flex items-center justify-center font-black">+</button>
                                   </div>
                                 </div>
                               </>
                             )}
                           </div>

                           <div className="pt-4 border-t border-slate-50">
                              <button 
                                onClick={() => setWorkflowStep("RECAP")}
                                disabled={!amount || (!phone && selectedService?.id !== "ABONNEMENT")}
                                className="w-full py-6 bg-fintrack-primary text-white rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/30 hover:bg-fintrack-dark disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
                              >
                                Suivant <ArrowRight size={18} />
                              </button>
                           </div>
                        </div>
                      </motion.div>
                    )}

                    {workflowStep === "RECAP" && (
                       <motion.div 
                         key="recap"
                         initial={{ opacity: 0, y: 50 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9 }}
                         className="w-full max-xl mx-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden"
                       >
                         <div className="bg-fintrack-primary p-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto backdrop-blur-md mb-2">
                               <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight italic">Confirmation Finale</h2>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Vérifiez les informations</p>
                         </div>

                         <div className="p-10 space-y-8">
                            <div className="space-y-6">
                               <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                                  <span className="text-[13px] font-black text-slate-900 uppercase">{selectedService?.title} ({selectedOperator || "Réseau Interne"})</span>
                               </div>
                               <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant</span>
                                  <span className="text-xl font-black text-slate-900">{amount} F</span>
                               </div>
                               
                               {phone && (
                                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">N° Client</span>
                                   <span className="text-[13px] font-black text-slate-900">{phone}</span>
                                 </div>
                               )}
                               
                               {subscriberId && (
                                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Police</span>
                                   <span className="text-[13px] font-black text-slate-900">{subscriberId}</span>
                                 </div>
                               )}

                               {beneficiaryName && (
                                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bénéficiaire</span>
                                   <span className="text-[13px] font-black text-slate-900 uppercase">{beneficiaryName}</span>
                                 </div>
                               )}

                               {rib && (
                                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RIB</span>
                                   <span className="text-[13px] font-black text-slate-900 uppercase">{rib}</span>
                                 </div>
                               )}

                               {selectedArticle && (
                                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Article ({quantity})</span>
                                   <span className="text-[13px] font-black text-slate-900 uppercase">{selectedArticle}</span>
                                 </div>
                               )}
                            </div>

                            <div className="flex flex-col gap-4">
                               <button 
                                 onClick={() => setWorkflowStep("SUCCESS")}
                                 className="w-full py-6 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 transition-all active:scale-95"
                               >
                                 Confirmer & Exécuter
                               </button>
                               <button 
                                 onClick={() => setWorkflowStep("FORM")}
                                 className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors"
                               >
                                 Modifier les informations
                               </button>
                            </div>
                         </div>
                       </motion.div>
                    )}

                    {workflowStep === "SUCCESS" && (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-xl mx-auto bg-white rounded-[4rem] p-12 border border-slate-100 shadow-2xl text-center space-y-10 focus:outline-none"
                      >
                         <div className="w-28 h-28 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                            <Check size={56} strokeWidth={4} />
                         </div>

                         <div className="space-y-3">
                            <h2 className="text-4xl font-black text-slate-950 tracking-tighter leading-none">Opération Terminée</h2>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Transaction Authentifiée</p>
                         </div>

                         <div className="bg-[#FCFDFF] border border-slate-50 rounded-[2.5rem] p-8 space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100/50">
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Montant</span>
                               <span className="text-xl font-mono font-black text-slate-950">{amount} F</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID Unique</span>
                               <span className="text-xs font-mono font-black text-fintrack-primary uppercase">TX-{Math.floor(Math.random() * 1000000)}</span>
                            </div>
                         </div>

                         <div className="flex flex-col gap-4">
                            <button 
                              onClick={closeModal}
                              className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-fintrack-primary transition-all duration-300"
                            >
                               Nouvelle Opération
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ACTIVITY FEED - ONLY ON CATEGORY STEP */}
                  {workflowStep === "CATEGORY" && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                      <div className="flex items-center justify-between px-6 bg-white/50 backdrop-blur-sm py-4 rounded-3xl border border-white/50">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Activités récentes</h3>
                        </div>
                        <div className="bg-fintrack-primary/10 px-4 py-1.5 rounded-full border border-fintrack-primary/10">
                           <span className="text-[11px] font-black text-fintrack-primary tracking-tight">{activities.length} Flux</span>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100/60 rounded-[3rem] shadow-sm">
                        <div className="overflow-x-auto no-scrollbar">
                          <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                              <tr className="bg-slate-50/50">
                                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Flux & Type</th>
                                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Opérateur</th>
                                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Montant</th>
                                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Commission</th>
                                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date & Heure</th>
                                <th className="py-6 px-8 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {activities.map((txn, i) => (
                                <tr 
                                  key={i} 
                                  className={`group transition-all duration-500 ${
                                    txn.status === "EN_ANNULATION" 
                                      ? "bg-amber-50 animate-pulse border-y-2 border-dashed border-amber-400/50" 
                                      : "hover:bg-slate-50/30"
                                  }`}
                                >
                                  <td className="py-6 px-8">
                                    <div className="flex items-center gap-4">
                                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-50 ${
                                        txn.type.includes('DEPOT') ? 'bg-emerald-50 text-emerald-500' : 'bg-fintrack-primary/5 text-fintrack-primary'
                                      }`}>
                                        {txn.type.includes('DEPOT') ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{txn.type}</span>
                                        <span className="text-[10px] font-bold text-slate-400">Ref: {txn.id}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-6 px-8">
                                    <div className="flex items-center gap-3">
                                      <div className="w-6 h-6 bg-slate-50 p-1 rounded-md border border-slate-100 flex items-center justify-center">
                                        <img src={txn.logo} className="w-full h-full object-contain" alt="" />
                                      </div>
                                      <span className="text-[13px] font-bold text-slate-700">{txn.operator}</span>
                                    </div>
                                  </td>
                                  <td className="py-6 px-8">
                                    <div className="flex flex-col">
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-[18px] font-black text-slate-900 tracking-tighter">{txn.amount}</span>
                                        <span className="text-[10px] font-black text-slate-900">F</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-6 px-8">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                      <span className="text-[15px] font-black text-emerald-600 tracking-tight">+{txn.commission} F</span>
                                    </div>
                                  </td>
                                  <td className="py-6 px-8">
                                    <div className="flex flex-col">
                                      <span className="text-[13px] font-bold text-slate-600">{txn.date}</span>
                                      <span className="text-[11px] font-bold text-slate-400">{txn.time}</span>
                                    </div>
                                  </td>
                                  <td className="py-6 px-8 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => {
                                          setSelectedTxForReceipt(txn);
                                          setShowReceiptModal(true);
                                        }}
                                        className="px-4 py-2 bg-white border border-[#234D96] text-[#234D96] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-fintrack-primary hover:text-white transition-all shadow-sm active:scale-95"
                                      >
                                        Facture
                                      </button>
                                      {txn.status === "EN_ANNULATION" ? (
                                        <div className="px-4 py-2 bg-amber-100 text-amber-600 rounded-xl font-black text-[9px] uppercase tracking-widest border border-amber-200">
                                          EN_ANNULATION
                                        </div>
                                      ) : (
                                        <button 
                                          onClick={() => {
                                            setSelectedTxForReport(txn);
                                            setShowReportModal(true);
                                          }}
                                          className="px-4 py-2 bg-[#F84F4F] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#E03E3E] transition-all shadow-sm active:scale-95"
                                        >
                                          Signaler
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[60vh]">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <Settings2 size={32} />
                    </div>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Page en cours de développement</p>
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
               <span className="text-[8px] font-black uppercase tracking-widest">Bilans</span>
            </button>
            <button 
              className={`flex flex-col items-center gap-1 ${activeTab === "Account" ? "text-fintrack-primary" : "text-slate-400"}`}
              onClick={() => setActiveTab("Account")}
            >
               <User size={22} />
               <span className="text-[8px] font-black uppercase tracking-widest">Compte</span>
            </button>
        </div>

        {/* Terminate main main content area */}
      </main>

      {/* --- REFINED MODALS --- */}
      <ReceiptModal 
        isOpen={showReceiptModal} 
        onClose={() => setShowReceiptModal(false)} 
        transaction={selectedTxForReceipt} 
      />

      <ReportModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
        transaction={selectedTxForReport}
        onConfirm={handleReportError}
      />

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

// Receipt Modal Component
const ReceiptModal = ({ isOpen, onClose, transaction }: { isOpen: boolean; onClose: () => void; transaction: any }) => {
  if (!isOpen || !transaction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[480px] bg-[#F0F4F8] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-auto max-h-[90vh]"
        >
          <div className="p-8 pb-4 flex items-center justify-between bg-[#F0F4F8] shrink-0">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Aperçu du reçu</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/50 text-slate-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* The actual ticket look */}
            <div className="bg-white p-10 shadow-xl border border-slate-100 flex flex-col items-center gap-4 w-full mx-auto relative rounded-sm mb-4 font-mono text-slate-900">
              {/* Status Stamp Overlay */}
              {transaction.status === "EN_ANNULATION" && (
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] border-[10px] border-amber-500/20 text-amber-500/30 text-4xl font-black px-10 py-6 rounded-[2rem] pointer-events-none z-[1] select-none uppercase tracking-[0.1em] text-center leading-tight">
                  ATTENTE<br/>ANNULATION
                </div>
              )}

              {/* Header */}
              <div className="text-center space-y-2 w-full relative z-[2]">
                <h2 className="text-2xl font-bold tracking-wider">FINTRACK KIOSQUE</h2>
                <div className="space-y-1 text-[13px] font-medium text-slate-700">
                  <p>POS terminal v1.0</p>
                  <p>{transaction.date} {transaction.time}:34</p>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full text-center text-slate-900 tracking-tighter overflow-hidden whitespace-nowrap">
                ------------------------------------------
              </div>

              {/* Title */}
              <div className="text-center py-2">
                <h3 className="text-xl font-bold tracking-widest uppercase">REÇU CLIENT</h3>
              </div>

              {/* Separator */}
              <div className="w-full text-center text-slate-900 tracking-tighter overflow-hidden whitespace-nowrap">
                ------------------------------------------
              </div>

              {/* Main Content */}
              <div className="w-full space-y-3 text-[14px]">
                <div className="flex justify-between items-center">
                   <span className="font-medium whitespace-nowrap">Opération:</span>
                   <span className="font-bold uppercase text-right">{transaction.type}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="font-medium whitespace-nowrap">Opérateur:</span>
                   <span className="font-bold text-right">{transaction.operator}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="font-medium whitespace-nowrap">Réf / N°:</span>
                   <span className="font-bold text-right">{transaction.clientRef || transaction.id}</span>
                </div>
              </div>

              {/* Additional Info Section */}
              {transaction.extra && (
                <div className="w-full pt-4 space-y-1 text-[13px] relative z-[2]">
                   <p className="font-medium text-slate-400">Infos additionnelles :</p>
                   <p className="font-bold leading-relaxed">{transaction.extra}</p>
                </div>
              )}

              {/* Separator */}
              <div className="w-full text-center text-slate-900 tracking-tighter overflow-hidden whitespace-nowrap pt-2">
                ------------------------------------------
              </div>

              {/* Total Amount */}
              <div className="w-full flex justify-between items-center py-4 px-2">
                 <span className="text-xl font-bold tracking-widest">MONTANT:</span>
                 <span className="text-2xl font-bold tabular-nums">{transaction.amount} F</span>
              </div>

              {/* Separator */}
              <div className="w-full text-center text-slate-900 tracking-tighter overflow-hidden whitespace-nowrap">
                ------------------------------------------
              </div>

              {/* Footer Part */}
              <div className="w-full space-y-8 pt-4 text-center">
                 <div className="flex flex-col gap-1 items-start">
                    <p className="text-[12px] font-bold">ID TXN: {transaction.id}</p>
                 </div>
                 
                 <div className="space-y-1 text-[14px] font-bold">
                    <p>Merci de votre confiance !</p>
                    <p>À très bientôt.</p>
                 </div>

                 <div className="pt-10 flex justify-center gap-2 opacity-20">
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                 </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border-t border-slate-100 flex gap-4 shrink-0 px-10">
             <button 
               onClick={onClose}
               className="flex-1 py-5 border border-slate-200 rounded-3xl font-black text-[15px] text-slate-900 hover:bg-slate-50 transition-all"
             >
               Fermer
             </button>
             <button className="flex-1 py-5 bg-[#0F172A] text-white rounded-3xl font-black text-[15px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
               <Receipt size={20} /> Imprimer
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Report Error Modal
const ReportModal = ({ isOpen, onClose, transaction, onConfirm }: { isOpen: boolean; onClose: () => void; transaction: any; onConfirm: (id: string) => void }) => {
  if (!isOpen || !transaction) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 flex flex-col items-center text-center gap-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={20} />
          </button>

          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mt-4">
            <AlertTriangle size={40} />
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">Signaler une erreur</h3>
            <p className="text-[15px] font-medium text-slate-500 leading-relaxed max-w-[300px] mx-auto">
              Voulez-vous vraiment signaler cette transaction ? Elle sera soumise à l'annulation auprès du marchand.
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
             <button 
               onClick={() => {
                 onConfirm(transaction.id);
               }}
               className="w-full py-5 bg-[#F84F4F] text-white rounded-3xl font-black text-[15px] hover:bg-[#E03E3E] transition-all shadow-xl shadow-red-500/20 active:scale-95"
             >
               Signaler l'erreur
             </button>
             <button 
               onClick={onClose}
               className="w-full py-5 bg-slate-50 text-slate-500 rounded-3xl font-black text-[15px] hover:bg-slate-100 transition-all active:scale-95"
             >
               Annuler
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
