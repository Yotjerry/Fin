import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  ArrowDownLeft,
  History, 
  Calendar,
  User, 
  Bell, 
  BellOff,
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
  ChevronDown,
  Search,
  AlertCircle,
  AlertTriangle,
  Camera,
  FileText,
  X,
  Zap,
  MessageCircle,
  ArrowRight,
  Coins,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Briefcase,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Users,
  Info,
  Lock,
  Check,
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
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

// --- Types & Interfaces ---
type ModalType = "none" | "vente" | "ramassage" | "ajustement" | "cloture" | "recharge" | "dette" | "terminal";
type WorkflowStep = "CATEGORY" | "OPERATOR" | "SERVICE" | "FORM" | "RECAP" | "SUCCESS";
type ServiceCategory = "Réseaux" | "Banques" | "Facturiers";

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
  const [agentProfile, setAgentProfile] = useState({ 
    name: "Agent Cotonou", 
    email: "agent1@fintrack.bj", 
    phone: "+22900000003" 
  });
  const [passwords, setPasswords] = useState({ current: "********", new: "", confirm: "" });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [feedback, setFeedback] = useState({ nature: "Avis général", stars: 5, message: "" });
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>("CATEGORY");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  // --- TYPES & DATA FOR SERVICES & COMMISSIONS ---
  type OperationType = "Dépôt" | "Retrait" | "Transfert" | "Paiement Facture";
  
  interface CommissionTier {
    id: string;
    min: number;
    max: number | "infinity";
    fee: number;
    type: "fixed" | "percentage";
  }

  interface ServiceConfig {
    id: string;
    name: string;
    logo: string;
    category: ServiceCategory;
    isActive: boolean; // Merchant level activation
    isGlobalMaintenance: boolean; // Admin level stop
    commissions: Record<OperationType, CommissionTier[]>;
  }

  const [globalCatalogue, setGlobalCatalogue] = useState<ServiceConfig[]>([
    {
      id: "mtn-momo",
      name: "MTN Mobile Money",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1024px-MTN_Logo.svg.png",
      category: "Réseaux",
      isActive: true,
      isGlobalMaintenance: false,
      commissions: {
        "Dépôt": [{ id: "1", min: 0, max: 5000, fee: 100, type: "fixed" }, { id: "2", min: 5001, max: "infinity", fee: 1, type: "percentage" }],
        "Retrait": [{ id: "3", min: 0, max: 5000, fee: 200, type: "fixed" }, { id: "4", min: 5001, max: "infinity", fee: 1.5, type: "percentage" }],
        "Transfert": [],
        "Paiement Facture": []
      }
    },
    {
      id: "moov-money",
      name: "Moov Money",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07fJ00Z11aV86GZ_Qk0w4_f56y6a6E_2G-Q&s",
      category: "Réseaux",
      isActive: true,
      isGlobalMaintenance: false,
      commissions: {
        "Dépôt": [], "Retrait": [], "Transfert": [], "Paiement Facture": []
      }
    },
    {
      id: "sbee",
      name: "SBEE",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vY8Xv3U8_Y9W9I6o_7yYQ0Q0G8o7z9Y6aQ&s",
      category: "Facturiers",
      isActive: true,
      isGlobalMaintenance: false,
      commissions: {
        "Dépôt": [], "Retrait": [], "Transfert": [], "Paiement Facture": []
      }
    }
  ]);

  const [selectedMerchantService, setSelectedMerchantService] = useState<ServiceConfig | null>(null);
  const [activeCommissionTab, setActiveCommissionTab] = useState<OperationType>("Dépôt");
  const [showBalance, setShowBalance] = useState(false);
  const [closingStep, setClosingStep] = useState(1);
  const [virtualBalances, setVirtualBalances] = useState<Record<string, string>>({});
  const [cashPhysique, setCashPhysique] = useState("");
  const [mismatchNetwork, setMismatchNetwork] = useState<string | null>(null);
  const [virtualJustification, setVirtualJustification] = useState("");
  const [cashJustification, setCashJustification] = useState("");
  const [isClosingFinished, setIsClosingFinished] = useState(false);

  // Mock theoretical data for validation
  const theoreticalBalances: Record<string, number> = {
    "mtn": 450000,
    "moov": 125000,
    "wave": 500000,
    "ecobank": 800000,
    "celtis": 50000,
    "boa": 300000,
  };

  const cashTheorique = 350000;

  const commissions = [
    { name: "MTN MoMo", amount: 1550, active: true },
    { name: "Moov Money", amount: 850, active: true },
    { name: "Wave", amount: 2100, active: true },
    { name: "Ecobank", amount: 450, active: true },
    { name: "Celtis Pay", amount: 0, active: false },
    { name: "BOA Bénin", amount: 120, active: true },
  ];

  const handleVirtualValidation = () => {
    let firstMismatch = null;
    for (const [id, val] of Object.entries(virtualBalances)) {
      if (parseInt(val.replace(/\s/g, "")) !== theoreticalBalances[id]) {
        firstMismatch = id;
        break;
      }
    }

    if (firstMismatch) {
      const operatorName = fintechOperators.find(o => o.id === firstMismatch)?.name || 
                          bankOperators.find(o => o.id === firstMismatch)?.name || firstMismatch;
      setMismatchNetwork(operatorName);
    } else {
      setMismatchNetwork(null);
      setClosingStep(2);
    }
  };

  const handleForcedVerification = () => {
    if (virtualJustification.trim().length >= 5) {
      setClosingStep(2);
    }
  };

  const handleFinalSubmit = () => {
    const enteredCash = parseInt(cashPhysique.replace(/\s/g, ""));
    if (enteredCash !== cashTheorique && !cashJustification.trim()) {
      // Error handled in UI
      return;
    }
    setIsClosingFinished(true);
    // In a real app, we would send data to backend here
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  function DailyClosingWorkflow() {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                <Power size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Processus de Clôture</h3>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Étape {closingStep} sur 2</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveModal("none")}
              className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 no-scrollbar">
            <AnimatePresence mode="wait">
              {isClosingFinished ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                    <CheckCircle size={48} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Caisse Clôturée !</h2>
                    <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                      Votre bilan a été généré avec succès. Le système va maintenant vous déconnecter pour la journée.
                    </p>
                  </div>
                  <div className="pt-8">
                     <div className="animate-spin h-8 w-8 border-4 border-fintrack-primary border-t-transparent rounded-full mx-auto" />
                  </div>
                </motion.div>
              ) : closingStep === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-blue-50/50 rounded-[2rem] p-6 border border-blue-100/50 mb-8">
                     <p className="text-blue-900 font-medium text-sm leading-relaxed">
                       <span className="font-black text-blue-900">Note Importante :</span> Veuillez consulter vos téléphones et terminaux pour saisir le solde disponible exact pour chaque réseau.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...fintechOperators, ...bankOperators.slice(0, 2)].map((op) => (
                      <div key={op.id} className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">{op.name}</label>
                        <div className="relative group">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg overflow-hidden border border-slate-100 bg-white">
                            <img src={op.img} alt={op.name} className="w-full h-full object-contain p-1" />
                          </div>
                          <input 
                            type="text"
                            placeholder="0"
                            className="w-full pl-16 pr-12 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-lg tracking-tight"
                            value={virtualBalances[op.id] || ""}
                            onChange={(e) => setVirtualBalances({...virtualBalances, [op.id]: e.target.value})}
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xs">CFA</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {mismatchNetwork && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-rose-50 border border-rose-100 rounded-3xl p-6 space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
                          <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-rose-900 font-black tracking-tight leading-tight">Écart détecté sur : {mismatchNetwork}</p>
                          <p className="text-rose-700/70 text-xs font-medium leading-relaxed">
                            Le solde saisi ne correspond pas aux prévisions du système. Revérifiez vos comptes ou justifiez cet écart ci-dessous.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <textarea 
                          placeholder="Expliquez brièvement cet écart avant de forcer la validation..."
                          className="w-full p-4 bg-white border border-rose-100 rounded-2xl text-rose-900 text-sm outline-none focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-rose-300/50 font-medium min-h-[100px] resize-none"
                          value={virtualJustification}
                          onChange={(e) => setVirtualJustification(e.target.value)}
                        />
                        <button 
                          onClick={handleForcedVerification}
                          disabled={virtualJustification.trim().length < 5}
                          className="w-full py-4 bg-rose-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-rose-500/20 hover:bg-rose-600 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 active:scale-95"
                        >
                          Forcer la Validation
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {!mismatchNetwork && (
                    <button 
                      onClick={handleVirtualValidation}
                      className="w-full py-5 bg-[#3B4CB8] text-white font-black text-sm uppercase tracking-widest rounded-3xl shadow-xl shadow-blue-900/10 hover:bg-[#2D3A8C] transition-all hover:scale-[1.02] active:scale-95 mt-4"
                    >
                      Valider et Suivant
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Commissions Summary */}
                  <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-center justify-between">
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">RESUMÉ DES COMMISSIONS</p>
                       <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">
                          <TrendingUp size={12} strokeWidth={3} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Succès</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                       {commissions.map((comm) => (
                         <div key={comm.name} className={`flex justify-between items-center ${comm.active ? "opacity-100" : "opacity-30 grayscale"}`}>
                            <span className="text-xs font-bold text-slate-600">{comm.name}</span>
                            <span className={`text-[13px] font-black ${comm.amount > 0 ? "text-emerald-500" : "text-slate-400"}`}>
                              +{comm.amount.toLocaleString()} F
                            </span>
                         </div>
                       ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                       <p className="text-[11px] font-black text-slate-400 uppercase">TOTAL JOURNÉE</p>
                       <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900 tracking-tighter">
                            {commissions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                          </span>
                          <span className="text-xs font-black text-slate-400">CFA</span>
                       </div>
                    </div>
                  </div>

                  {/* Cash Declaration */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">Cash total en agence</label>
                       <div className="relative group">
                         <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500">
                           <Coins size={28} />
                         </div>
                         <input 
                           type="text"
                           placeholder="Ex: 500 000"
                           className="w-full pl-16 pr-12 py-6 bg-white border border-slate-200 rounded-3xl font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-8 focus:ring-blue-500/5 transition-all text-3xl tracking-tighter"
                           value={cashPhysique}
                           onChange={(e) => setCashPhysique(e.target.value)}
                         />
                         <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-lg">CFA</span>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">
                        Justification {parseInt(cashPhysique.replace(/\s/g, "")) !== cashTheorique && cashPhysique ? "(Obligatoire)" : "(Optionnel)"}
                       </label>
                       <textarea 
                         placeholder="Éventuel écart de caisse physique..."
                         className={`w-full p-6 bg-slate-50 border rounded-3xl text-sm font-medium outline-none transition-all min-h-[120px] resize-none ${
                           parseInt(cashPhysique.replace(/\s/g, "")) !== cashTheorique && cashPhysique && !cashJustification
                             ? "border-rose-200 bg-rose-50/10"
                             : "border-slate-100 focus:bg-white focus:border-blue-500/30"
                         }`}
                         value={cashJustification}
                         onChange={(e) => setCashJustification(e.target.value)}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setClosingStep(1)}
                      className="py-5 bg-slate-50 text-slate-500 font-black text-sm uppercase tracking-widest rounded-3xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Retour
                    </button>
                    <button 
                      onClick={handleFinalSubmit}
                      disabled={!cashPhysique || (parseInt(cashPhysique.replace(/\s/g, "")) !== cashTheorique && !cashJustification.trim())}
                      className="py-5 bg-rose-600 text-white font-black text-sm uppercase tracking-widest rounded-3xl shadow-xl shadow-rose-900/10 hover:bg-rose-700 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Power size={18} />
                      Fermer la Caisse
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

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
      type: "Dépôt", 
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
      type: "Retrait", 
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
      type: "Dépôt", 
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
      type: "Dépôt", 
      date: "25/04/2026", 
      time: "18:42", 
      status: "CONFIRME", 
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xN8F6tXG5S1O5A4Y7_qg7Z5y5o9G0Z3w-Q&s",
      proofPhoto: true,
      receiptPhoto: true,
    },
    { 
      id: "TXN-C7196957", 
      clientRef: "0719695722",
      amount: "5 000", 
      commission: "500", 
      operator: "Celtis Cash", 
      type: "Retrait", 
      date: "25/04/2026", 
      time: "15:20", 
      status: "CONFIRME", 
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xN8F6tXG5S1O5A4Y7_qg7Z5y5o9G0Z3w-Q&s", // Placeholder for Celtis
      proofPhoto: true,
      receiptPhoto: true,
    },
  ]);

  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<any>(null);
  const [selectedTxForReport, setSelectedTxForReport] = useState<any>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReportError = (id: string, reason: string) => {
    console.log(`Reporting error for ${id} with reason: ${reason}`);
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
            <button 
              onClick={() => {
                setSuccessMessage(`Recherche effectuée pour "${searchQuery}"`);
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 3000);
              }}
              className="px-10 py-5 bg-[#3B4CB8] text-white font-black text-sm uppercase tracking-widest rounded-3xl shadow-xl shadow-[#3B4CB8]/20 hover:bg-[#2D3A8C] hover:scale-[1.02] transition-all active:scale-95"
            >
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
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedTxForReceipt(txn);
                            setShowReceiptModal(true);
                          }}
                          className="px-4 py-2.5 bg-[#3B4CB8] text-white rounded-xl font-black text-[11px] hover:bg-[#2D3A8C] transition-all shadow-lg shadow-blue-900/10 active:scale-95 whitespace-nowrap"
                        >
                          Voir Reçu
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTxForReceipt(txn);
                            setShowReportModal(true);
                          }}
                          className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                          title="Signaler un problème"
                        >
                          <AlertTriangle size={18} />
                        </button>
                      </div>
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

  const [ajustementType, setAjustementType] = useState<"ENTREE" | "SORTIE">("ENTREE");
  const [ajustementAmount, setAjustementAmount] = useState("");
  const [ajustementReason, setAjustementReason] = useState("");

  const handleAjustement = () => {
    setSuccessMessage(`Ajustement de ${ajustementAmount} F (${ajustementType}) enregistré avec succès.`);
    setShowSuccessToast(true);
    closeModal();
    setAjustementAmount("");
    setAjustementReason("");
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const [ramassageAmount, setRamassageAmount] = useState("");
  const handleRamassage = () => {
    setSuccessMessage(`Ramassage de ${ramassageAmount} F effectué avec succès.`);
    setShowSuccessToast(true);
    closeModal();
    setRamassageAmount("");
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleVenteLibre = () => {
    setSuccessMessage(`Vente diverse enregistrée avec succès.`);
    setShowSuccessToast(true);
    closeModal();
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const [detteSearch, setDetteSearch] = useState("");
  const [selectedDette, setSelectedDette] = useState<any>(null);
  const handlePayDette = () => {
    setSuccessMessage(`Dette de ${selectedDette.amount} F payée avec succès.`);
    setShowSuccessToast(true);
    closeModal();
    setSelectedDette(null);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleUpdateProfile = () => {
    setSuccessMessage("Profil mis à jour avec succès.");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleChangePassword = () => {
    setSuccessMessage("Mot de passe modifié avec succès.");
    setShowSuccessToast(true);
    setPasswords({ current: "********", new: "", confirm: "" });
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const handleSendFeedback = () => {
    setSuccessMessage("Merci pour votre retour !");
    setShowSuccessToast(true);
    setFeedback({ nature: "Avis général", stars: 5, message: "" });
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  function AccountView() {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-3">
          <h2 className="text-6xl font-black text-[#0F172A] tracking-tighter">Paramètres de Sécurité</h2>
          <p className="text-slate-500 font-medium text-[17px] tracking-tight">Gérez vos informations personnelles et votre mot de passe pour la caisse.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Section 1: Profil Agent */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                <User size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">Profil Agent</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">NOM COMPLET</label>
                <input 
                  type="text"
                  value={agentProfile.name}
                  onChange={(e) => setAgentProfile({ ...agentProfile, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">ADRESSE EMAIL</label>
                  <input 
                    type="email"
                    value={agentProfile.email}
                    onChange={(e) => setAgentProfile({ ...agentProfile, email: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">TÉLÉPHONE</label>
                  <input 
                    type="tel"
                    value={agentProfile.phone}
                    onChange={(e) => setAgentProfile({ ...agentProfile, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={handleUpdateProfile}
                className="px-10 py-5 bg-[#3B4CB8] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-[#2D3A8C] transition-all flex items-center justify-center gap-3"
              >
                <FileText size={18} />
                Mettre à jour le profil
              </button>
            </div>
          </div>

          {/* Section 2: Sécurité du Terminal */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">Sécurité du Terminal</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">MOT DE PASSE ACTUEL</label>
                <div className="relative">
                  <input 
                    type={showCurrentPass ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                  />
                  <button 
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showCurrentPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">NOUVEAU MOT DE PASSE</label>
                  <input 
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">CONFIRMEZ</label>
                  <input 
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={handleChangePassword}
                className="w-full py-5 bg-white border border-blue-600 text-blue-600 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
              >
                <Cpu size={18} />
                Changer le mot de passe
              </button>
            </div>
          </div>

          {/* Section 3: Avis & Feedback */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500 lg:col-span-2 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">Avis & Feedback</h3>
            </div>

            <p className="text-[#64748B] font-medium leading-relaxed">
              Une suggestion ou un problème ? Votre retour nous aide à améliorer votre outil de travail au quotidien.
            </p>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">NATURE DU RETOUR</label>
                <select 
                  value={feedback.nature}
                  onChange={(e) => setFeedback({ ...feedback, nature: e.target.value })}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all appearance-none"
                >
                  <option>Avis général</option>
                  <option>Bug technique</option>
                  <option>Demande de fonctionnalité</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">NOTE DE SATISFACTION</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                       <button 
                         key={star}
                         onClick={() => setFeedback({ ...feedback, stars: star })}
                         className={`transition-all ${feedback.stars >= star ? "text-amber-500 scale-110" : "text-slate-200 hover:text-slate-300"}`}
                       >
                          <svg className={`w-11 h-11 ${feedback.stars >= star ? "fill-amber-500" : "fill-slate-200"}`} viewBox="0 0 24 24">
                             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                       </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-2">MESSAGE</label>
                <textarea 
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  placeholder="Décrivez votre retour ici..."
                  className="w-full px-6 py-6 bg-white border border-slate-200 rounded-[2rem] font-medium text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all min-h-[160px] resize-none"
                />
              </div>

              <button 
                onClick={handleSendFeedback}
                className="w-full py-6 bg-[#55C59C] text-white font-black text-sm uppercase tracking-widest rounded-[1.5rem] shadow-xl shadow-emerald-500/10 hover:bg-[#45B08B] transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle size={20} />
                Envoyer mon retour
              </button>
            </div>
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
    // Filter from global catalogue based on category and merchant activation
    const activeFromCatalogue = globalCatalogue.filter(s => s.isActive && !s.isGlobalMaintenance);
    
    if (selectedCategory === "Banques") {
      return activeFromCatalogue
        .filter(s => s.category === "Banques")
        .map(s => ({ id: s.id, name: s.name, img: s.logo, color: "border-blue-500" }));
    }
    if (selectedCategory === "Facturiers") {
      return activeFromCatalogue
        .filter(s => s.category === "Facturiers")
        .map(s => ({ id: s.id, name: s.name, img: s.logo, color: "border-amber-500" }));
    }
    return activeFromCatalogue
      .filter(s => s.category === "Réseaux")
      .map(s => ({ id: s.id, name: s.name, img: s.logo, color: "border-emerald-500" }));
  };

  const handleBack = () => {
    if (workflowStep === "RECAP") setWorkflowStep("FORM");
    else if (workflowStep === "FORM") setWorkflowStep("SERVICE");
    else if (workflowStep === "SERVICE") setWorkflowStep("OPERATOR");
    else if (workflowStep === "OPERATOR") setWorkflowStep("CATEGORY");
  };

  const categories = [
    { id: "Réseaux", title: "Réseaux & Fintech", icon: <MonitorSmartphone size={32} />, color: "bg-fintrack-secondary/10", iconColor: "text-fintrack-secondary" },
    { id: "Banques", title: "Banque & Transfert", icon: <Landmark size={32} />, color: "bg-fintrack-primary/10", iconColor: "text-fintrack-primary" },
    { id: "Facturiers", title: "Ventes & Divers", icon: <HandCoins size={32} />, color: "bg-fintrack-dark/10", iconColor: "text-fintrack-dark" },
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

  const [rechargeStep, setRechargeStep] = useState(1);
  const [rechargeOperator, setRechargeOperator] = useState<any>(null);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [rechargeReceipt, setRechargeReceipt] = useState<File | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRechargeSuccess = () => {
    setSuccessMessage(`Votre compte ${rechargeOperator.name} a bien été rechargé de ${rechargeAmount} F.`);
    setShowSuccessToast(true);
    closeModal();
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

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
    setRechargeStep(1);
    setRechargeOperator(null);
    setRechargeAmount("");
    setRechargeReceipt(null);
  };

  return (
    <div className="fixed inset-0 flex bg-fintrack-light font-sans selection:bg-fintrack-primary/30 overflow-hidden">
      {/* Sidebar - HIDDEN ON MOBILE */}
      <aside className="hidden lg:flex w-72 bg-[#FCFDFF] border-r border-slate-200/60 flex-col shrink-0 relative z-50">
        <div className="p-10 flex justify-center h-56 items-center border-b border-slate-100/50">
          <Logo className="h-44 w-auto" />
        </div>
        
        <div className="flex-1 px-5 py-6 overflow-y-auto no-scrollbar">
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
            <SidebarItem 
              icon={<Settings2 size={20} />} 
              label="Paramètres" 
              active={activeTab === "Account"} 
              onClick={() => setActiveTab("Account")} 
            />
          </nav>
        </div>

        <div className="px-6 pb-10">
          <button 
            onClick={() => navigate("/")}
            className="w-full h-14 flex items-center justify-center gap-3 rounded-[1.5rem] bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-950 hover:text-white transition-all font-black text-[10px] tracking-widest uppercase active:scale-95 group/logout"
          >
            <LogOut size={16} className="group-hover/logout:-translate-x-1 transition-all" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FBFBFE]">
        {/* Simplified & More Breathing Header */}
        <header className="h-28 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 flex items-center justify-between px-12 shrink-0 relative z-40 sticky top-0">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-slate-950 tracking-tighter leading-none">
                {activeTab === "Caisse" ? "Poste de Travail" : activeTab === "Transactions" ? "Gestion Flux" : activeTab === "Account" ? "Paramètres" : activeTab} 
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Active • Agent #001</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Performance Preview */}
            <div className="hidden lg:flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Performance Jour</span>
                <span className="text-lg font-mono font-black text-[#234D96] leading-none">2 485 000 <span className="text-[10px] ml-0.5 opacity-40">F</span></span>
              </div>
              <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[#234D96] shadow-sm">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Quick Actions */}
              <div className="lg:hidden flex items-center gap-2">
                <button 
                  onClick={() => setActiveModal("cloture")}
                  className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center border border-rose-100 shadow-sm active:scale-95 transition-all"
                  title="Clôture"
                >
                  <Power size={18} />
                </button>
                <button 
                  onClick={() => navigate("/")}
                  className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm active:scale-95 transition-all"
                  title="Déconnexion"
                >
                  <LogOut size={18} />
                </button>
              </div>

              {/* Notification & Communications */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative ${
                    isNotificationsOpen 
                      ? "bg-slate-950 text-white shadow-xl shadow-slate-950/20" 
                      : "bg-white border border-slate-100 text-slate-400 hover:text-slate-950 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <Bell size={22} />
                  <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-[90]" 
                        onClick={() => setIsNotificationsOpen(false)} 
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute top-full right-0 mt-6 w-[400px] bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(15,23,42,0.15)] border border-slate-100 overflow-hidden z-[100]"
                        onClick={(e) => e.stopPropagation()}
                      >
                      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight">Journal d'Activité</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernières notifications</p>
                        </div>
                        <button className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all uppercase tracking-widest">
                          Tout lire
                        </button>
                      </div>

                      <div className="max-h-[450px] overflow-y-auto no-scrollbar">
                        {[
                          { title: "Sécurité", msg: "Nouveau terminal connecté", time: "2 min", type: "alert", color: "rose" },
                          { title: "Système", msg: "Validation Wave optimisée", time: "1h", type: "info", color: "indigo" },
                          { title: "Commission", msg: "Bonus quotidien +2,500F", time: "3h", type: "success", color: "emerald" },
                        ].map((notif, idx) => (
                          <div key={idx} className="p-6 border-b border-slate-50 hover:bg-slate-50/50 transition-all group cursor-pointer">
                            <div className="flex gap-5">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                                notif.color === 'rose' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                                notif.color === 'indigo' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
                                'bg-emerald-50 text-emerald-500 border-emerald-100'
                              }`}>
                                {notif.type === 'alert' ? <ShieldAlert size={20} /> : notif.type === 'info' ? <Info size={20} /> : <CheckCircle size={20} />}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.title}</span>
                                  <span className="text-[10px] font-bold text-slate-300">•</span>
                                  <span className="text-[10px] font-bold text-slate-300">{notif.time}</span>
                                </div>
                                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{notif.msg}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                        <button className="w-full py-4 bg-white text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] rounded-2xl border border-slate-200 hover:border-slate-900 transition-all shadow-sm">
                          Voir tout l'historique
                        </button>
                      </div>
                    </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-10 w-[1px] bg-slate-100 mx-2" />

              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-4 bg-white border border-slate-100 p-1.5 pr-6 rounded-[1.5rem] hover:border-slate-300 transition-all shadow-sm group"
                >
                  <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-slate-950/20">
                    <User size={20} />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-black text-slate-900">Jerry Yotto</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Agent Certifié</span>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-[90]" 
                        onClick={() => setIsProfileMenuOpen(false)} 
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-slate-100 overflow-hidden z-[100] p-2"
                      >
                      <div className="p-4 border-b border-slate-50 mb-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Session Active</p>
                        <p className="text-xs font-bold text-slate-900">Agent ID: #001</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveTab("Account");
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-950 transition-all text-xs font-bold"
                      >
                         <User size={16} /> Mon Compte
                      </button>

                      <button 
                        onClick={() => {
                          setActiveModal("cloture");
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-rose-50 text-rose-500 transition-all text-xs font-bold"
                      >
                         <Power size={16} /> Clôture de Caisse
                      </button>

                      <div className="h-px bg-slate-50 my-2" />

                      <button 
                        onClick={() => navigate("/")}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-950 hover:text-white text-slate-500 transition-all text-xs font-bold"
                      >
                         <LogOut size={16} /> Déconnexion
                      </button>
                    </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Success Toast for Fleet Funding */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div 
              initial={{ opacity: 0, y: -50, x: "-50%" }}
              animate={{ opacity: 1, y: 100, x: "-50%" }}
              exit={{ opacity: 0, y: -50, x: "-50%" }}
              className="fixed top-0 left-1/2 z-[300] w-full max-w-md"
            >
              <div className="bg-emerald-500 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border-2 border-emerald-400">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none mb-1">Approvisionnement réussi</p>
                  <p className="text-sm font-bold leading-tight">{successMessage}</p>
                </div>
                <button onClick={() => setShowSuccessToast(false)} className="w-8 h-8 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              ) : activeTab === "Account" ? (
                <AccountView />
              ) : activeTab === "Caisse" ? (
                <div className="space-y-10">
                  {/* Refined Stats - More White Space */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { label: "Cumul Entrant (Jour)", value: "845 000", delta: "+12.5%", icon: <ArrowUpRight />, color: "text-emerald-500", bg: "bg-emerald-500", trend: "up" },
                      { label: "Cumul Sortant (Jour)", value: "320 500", delta: "+4.2%", icon: <ArrowDownLeft />, color: "text-rose-500", bg: "bg-rose-500", trend: "down" },
                      { label: "Transactions Shift", value: "24", delta: "Normal", icon: <Activity />, color: "text-blue-500", bg: "bg-blue-500", trend: "neutral" },
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

                  {/* Terminal POS - New Trigger Section */}
                  <div className="bg-white border border-slate-100/60 rounded-[3rem] p-4 shadow-sm overflow-hidden group">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                       <div className="w-full md:w-80 h-64 bg-slate-50 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-8">
                          <div className="absolute inset-0 bg-gradient-to-br from-fintrack-primary/10 to-transparent opacity-50" />
                          <div className="relative z-10 w-full h-full border-4 border-white rounded-[2rem] shadow-2xl bg-white/40 backdrop-blur-md flex flex-col items-center justify-center gap-4 group-hover:scale-105 transition-transform duration-500">
                             <div className="w-20 h-20 bg-fintrack-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40">
                                <MonitorSmartphone size={48} strokeWidth={2.5} />
                             </div>
                             <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-1.5">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                   <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Connecté</span>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex-1 space-y-6 text-center md:text-left py-4 px-4 md:px-0">
                          <div className="space-y-2">
                             <h3 className="text-4xl font-black text-slate-950 tracking-tighter">Terminal Mobile Money</h3>
                             <p className="text-slate-500 font-medium max-w-lg leading-relaxed text-sm">
                                Accédez à tous les services de réseaux, transferts bancaires et règlements de factures depuis votre interface centralisée.
                             </p>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                             {categories.map((cat) => (
                               <div key={cat.id} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                                  <span className={cat.iconColor}>{React.cloneElement(cat.icon as React.ReactElement<any>, { size: 14 })}</span>
                                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{cat.title.split(" ")[0]}</span>
                               </div>
                             ))}
                          </div>

                          <button 
                            onClick={() => {
                              setWorkflowStep("CATEGORY");
                              setActiveModal("terminal");
                            }}
                            className="w-full md:w-auto px-10 py-5 bg-fintrack-primary text-white rounded-[2rem] font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/30 hover:bg-fintrack-dark hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
                          >
                             Ouvrir le Terminal POS <ArrowRight size={18} strokeWidth={3} />
                          </button>
                       </div>
                    </div>
                  </div>

                  {/* Quick Actions - Lighter Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[
                      { id: "ramassage", label: "Ramassage", icon: <ArrowUpRight />, color: "text-blue-600", bgColor: "bg-blue-600/5" },
                      { id: "ajustement", label: "Ajustement", icon: <Settings2 />, color: "text-violet-600", bgColor: "bg-violet-600/5" },
                      { id: "recharge", label: "Approvisionnement", icon: <RefreshCw />, color: "text-emerald-600", bgColor: "bg-emerald-600/5" },
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

                  {/* SECTION: ACTIVITES RECENTES (CLEAN PROFESSIONAL TABLE) */}
                  <div className="mt-12 space-y-6">
                    <div className="flex items-center justify-between px-2">
                       <div>
                         <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Activités Récentes</h3>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historique de vos dernières opérations</p>
                       </div>
                       <div className="bg-[#DCE1F2]/50 text-[#234D96] px-4 py-1.5 rounded-xl text-[11px] font-black border border-[#DCE1F2]">
                          {activities.length} Opérations
                       </div>
                    </div>

                    <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50">
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Heure</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Opération</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Référence</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Montant</th>
                              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {activities.map((tx) => (
                              <motion.tr 
                                key={tx.id}
                                className={`group transition-colors ${tx.status === "EN_ANNULATION" ? "bg-amber-50/30" : "hover:bg-slate-50/50"}`}
                              >
                                <td className="px-6 py-4">
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-slate-900">{tx.date}</span>
                                    <span className="text-[10px] font-bold text-slate-400">{tx.time}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                      tx.type === "Dépôt" ? "bg-emerald-50 border-emerald-100/50 text-emerald-500" : "bg-blue-50 border-blue-100/50 text-blue-500"
                                    }`}>
                                      {tx.type === "Dépôt" ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-sm overflow-hidden flex items-center justify-center bg-white shadow-xs p-[1px]">
                                          <img src={tx.logo} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs font-black text-slate-700">{tx.operator}</span>
                                      </div>
                                      <span className={`text-[9px] font-black uppercase tracking-tighter ${
                                        tx.type === "Dépôt" ? "text-emerald-500" : "text-blue-500"
                                      }`}>
                                        {tx.type}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-[11px] font-black font-mono text-slate-400">{tx.clientRef}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex flex-col items-end">
                                    <span className="text-sm font-black text-slate-950">{tx.amount} F</span>
                                    {tx.status === "EN_ANNULATION" && (
                                      <span className="text-[8px] font-black text-amber-500 uppercase tracking-tighter bg-amber-100/50 px-1.5 py-0.5 rounded">Annulation</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-center gap-2">
                                    <button 
                                      onClick={() => {
                                        setSelectedTxForReceipt(tx);
                                        setShowReceiptModal(true);
                                      }}
                                      className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
                                      title="Facture"
                                    >
                                      <Receipt size={14} />
                                    </button>
                                    {tx.status !== "EN_ANNULATION" && (
                                      <button 
                                        onClick={() => {
                                          setSelectedTxForReport(tx);
                                          setShowReportModal(true);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-400 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                                        title="Signaler"
                                      >
                                        <AlertTriangle size={14} />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              ) : null}
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

      <AnimatePresence>
        {activeModal === "cloture" && <DailyClosingWorkflow />}
      </AnimatePresence>

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
        {activeModal !== "none" && activeModal !== "cloture" && (
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
                    {activeModal === "recharge" && "Approvisionnement Flotte"}
                    {activeModal === "dette" && "Rembourser Dette"}
                    {activeModal === "terminal" && "Terminal POS Multi-Services"}
                  </h2>
                  <p className="text-slate-400 text-sm font-bold">
                    {activeModal === "terminal" ? workflowStep : "Remplissez les informations ci-dessous."}
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 pt-6">
                {activeModal === "terminal" && (
                   <div className="space-y-8">
                      {/* Terminal Workflow relocated into the modal */}
                      <AnimatePresence mode="wait">
                        {workflowStep === "CATEGORY" && (
                          <motion.div 
                            key="category"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onClick={() => {
                                    setSelectedCategory(cat.id as ServiceCategory);
                                    setWorkflowStep("OPERATOR");
                                  }}
                                  className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex items-center gap-4 hover:shadow-lg hover:bg-white transition-all group"
                                >
                                  <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center ${cat.iconColor} shadow-sm group-hover:scale-110 transition-transform`}>
                                    {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 24 })}
                                  </div>
                                  <div className="text-left">
                                    <span className="block text-sm font-black text-slate-900 tracking-tight">{cat.title}</span>
                                    <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest">Choisir réseau</span>
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
                            <div className="flex items-center justify-between mb-4">
                               <button onClick={() => setWorkflowStep("CATEGORY")} className="text-[10px] font-black text-fintrack-primary uppercase tracking-widest flex items-center gap-1"><ArrowLeft size={12}/> Retour</button>
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{selectedCategory}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {getOperators().map((op) => (
                                <button
                                  key={op.id}
                                  onClick={() => {
                                    setSelectedOperator(op.name);
                                    setWorkflowStep("SERVICE");
                                  }}
                                  className="bg-white border-2 border-slate-50 hover:border-fintrack-primary/20 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all group"
                                >
                                  <div className="w-16 h-16 bg-slate-50 rounded-xl p-3">
                                     <img src={op.img} alt={op.name} className="w-full h-full object-contain" />
                                  </div>
                                  <span className="text-xs font-black text-slate-900 tracking-tight text-center">{op.name}</span>
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
                            className="space-y-6"
                          >
                            <div className="flex items-center justify-between mb-4">
                               <button onClick={() => setWorkflowStep("OPERATOR")} className="text-[10px] font-black text-fintrack-primary uppercase tracking-widest flex items-center gap-1"><ArrowLeft size={12}/> Retour</button>
                               <div className="flex items-center gap-2">
                                  <img src={getOperators().find(o => o.name === selectedOperator)?.img} className="w-4 h-4 object-contain" />
                                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{selectedOperator}</span>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {services.map((srv) => (
                                <button
                                  key={srv.id}
                                  onClick={() => {
                                    setSelectedService(srv);
                                    setWorkflowStep("FORM");
                                  }}
                                  className={`${srv.color} rounded-2xl p-6 flex flex-col gap-4 text-left group hover:shadow-md transition-all`}
                                >
                                   <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${srv.iconColor} shadow-sm`}>
                                      {React.cloneElement(srv.icon as React.ReactElement<any>, { size: 18 })}
                                   </div>
                                   <div>
                                      <p className="text-xs font-black text-slate-900">{srv.title}</p>
                                      <p className="text-[9px] font-bold text-slate-500 opacity-70 uppercase tracking-tighter">{srv.desc}</p>
                                   </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {workflowStep === "FORM" && (
                          <motion.div 
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                          >
                             <div className="flex items-center justify-between mb-4">
                               <button onClick={() => setWorkflowStep("SERVICE")} className="text-[10px] font-black text-fintrack-primary uppercase tracking-widest flex items-center gap-1"><ArrowLeft size={12}/> Retour</button>
                               <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-fintrack-primary uppercase tracking-widest">{selectedService?.title}</span>
                                  <span className="text-[10px] font-black text-slate-300 uppercase">/</span>
                                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{selectedOperator}</span>
                               </div>
                            </div>

                            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 flex flex-col items-center gap-4">
                               <div className="flex items-baseline gap-2">
                                  <input 
                                    type="text" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="text-5xl font-mono font-black text-slate-950 bg-transparent outline-none w-full max-w-[200px] text-center placeholder:text-slate-200"
                                  />
                                  <span className="text-xl font-black text-slate-400 uppercase">CFA</span>
                               </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                               {selectedCategory === "Réseaux" && (
                                 <>
                                   {["DEPOT", "RETRAIT", "CREDIT", "INTERNET", "APPEL"].includes(selectedService?.id || "") && (
                                     <div className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                                       <div className="relative">
                                         <PhoneIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                         <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="00 00 00 00" className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all text-lg" />
                                       </div>
                                     </div>
                                   )}
                                   {selectedService?.id === "DEPOT" && (
                                     <div className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Bénéficiaire</label>
                                       <div className="relative">
                                         <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                         <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} placeholder="Nom complet" className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-900 focus:ring-2 focus:ring-fintrack-primary/20 transition-all" />
                                       </div>
                                     </div>
                                   )}
                                 </>
                               )}

                               {selectedCategory === "Banques" && (
                                 <div className="space-y-4">
                                   <div className="space-y-2">
                                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RIB</label>
                                     <input type="text" value={rib} onChange={(e) => setRib(e.target.value)} placeholder="RIB..." className="w-full px-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-900" />
                                   </div>
                                   <div className="space-y-2">
                                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bénéficiaire</label>
                                     <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} placeholder="Nom complet" className="w-full px-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-slate-900" />
                                   </div>
                                 </div>
                               )}
                            </div>

                            <button 
                              onClick={() => setWorkflowStep("RECAP")}
                              disabled={!amount}
                              className="w-full py-6 bg-fintrack-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
                            >
                               Valider pour Confirmation
                            </button>
                          </motion.div>
                        )}

                        {workflowStep === "RECAP" && (
                          <motion.div 
                            key="recap"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                             <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center space-y-4">
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Confirmez les détails</p>
                                <div className="space-y-1">
                                   <p className="text-xs font-black text-fintrack-primary uppercase">{selectedService?.title} / {selectedOperator}</p>
                                   <h2 className="text-4xl font-black text-white">{amount} F</h2>
                                </div>
                                <div className="text-white/70 text-sm font-medium">{phone}</div>
                             </div>

                             <div className="flex flex-col gap-3">
                                <button 
                                  onClick={() => setWorkflowStep("SUCCESS")}
                                  className="w-full py-6 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                                >
                                   Confirmer l'opération
                                </button>
                                <button onClick={() => setWorkflowStep("FORM")} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">Corriger</button>
                             </div>
                          </motion.div>
                        )}

                        {workflowStep === "SUCCESS" && (
                          <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8 py-4"
                          >
                             <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40">
                                <Check size={48} strokeWidth={4} />
                             </div>
                             <div className="space-y-2">
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Succès !</h3>
                                <p className="text-sm font-medium text-slate-500">La transaction a été exécutée et enregistrée.</p>
                             </div>
                             <button 
                               onClick={() => {
                                 setAmount("");
                                 setPhone("");
                                 setWorkflowStep("CATEGORY");
                               }}
                               className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest"
                             >
                               Nouvelle opération
                             </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                )}

                {activeModal === "vente" && (
                   <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: "sbee", name: "SBEE", icon: <Zap size={18} />, color: "bg-amber-500" },
                          { id: "canal", name: "CANAL+", icon: <Tv size={18} />, color: "bg-blue-600" },
                          { id: "soneb", name: "SONEB", icon: <Activity size={18} />, color: "bg-sky-500" },
                          { id: "visa", name: "VISA/MC", icon: <CreditCard size={18} />, color: "bg-fintrack-primary" },
                        ].map((item) => (
                          <button 
                            key={item.id} 
                            onClick={() => {
                              setSelectedCategory("Facturiers");
                              setSelectedOperator(item.name);
                              setWorkflowStep("FORM");
                              setActiveModal("terminal");
                            }}
                            className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 rounded-2xl transition-all group"
                          >
                             <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center`}>
                               {item.icon}
                             </div>
                             <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{item.name}</span>
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={handleVenteLibre}
                        className="w-full py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-fintrack-primary transition-all flex items-center justify-center gap-3"
                      >
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
                           value={ramassageAmount}
                           onChange={(e) => setRamassageAmount(e.target.value)}
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-blue-600 rounded-2xl font-bold text-slate-900 outline-none transition-all text-2xl"
                         />
                         <button 
                           onClick={handleRamassage}
                           disabled={!ramassageAmount}
                           className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                         >
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
                            <button 
                              onClick={() => setAjustementType("ENTREE")}
                              className={`py-4 rounded-xl font-black text-[10px] uppercase transition-all ${ajustementType === "ENTREE" ? "bg-violet-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}
                            >
                              Entrée (Ajout)
                            </button>
                            <button 
                              onClick={() => setAjustementType("SORTIE")}
                              className={`py-4 rounded-xl font-black text-[10px] uppercase transition-all ${ajustementType === "SORTIE" ? "bg-violet-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}
                            >
                              Sortie (Retrait)
                            </button>
                         </div>
                         <input 
                           type="number" 
                           placeholder="Montant"
                           value={ajustementAmount}
                           onChange={(e) => setAjustementAmount(e.target.value)}
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-violet-600 rounded-2xl font-bold text-slate-900 outline-none transition-all"
                         />
                         <textarea 
                           placeholder="Raison de l'ajustement..."
                           value={ajustementReason}
                           onChange={(e) => setAjustementReason(e.target.value)}
                           className="w-full px-6 py-4 bg-[#F8FAFC] border-2 border-transparent focus:border-violet-600 rounded-2xl font-medium text-slate-900 outline-none transition-all min-h-[100px]"
                         />
                         <button 
                           onClick={handleAjustement}
                           disabled={!ajustementAmount || !ajustementReason}
                           className="w-full py-5 bg-violet-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-violet-500/20 active:scale-95 transition-all disabled:opacity-50"
                         >
                           Enregistrer l'ajustement
                         </button>
                      </div>
                   </div>
                )}

                {activeModal === "recharge" && (
                   <div className="space-y-8">
                      {/* Sub-steps of Recharge */}
                      {rechargeStep === 1 ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                              <RefreshCw size={32} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Approvisionnement Flotte</h3>
                              <p className="text-[13px] font-medium text-slate-500">Choisissez le compte virtuel ou bancaire à recharger.</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto no-scrollbar pb-4">
                            {[...fintechOperators, ...bankOperators].map((op) => (
                              <button 
                                key={op.id}
                                onClick={() => {
                                  setRechargeOperator(op);
                                  setRechargeStep(2);
                                }}
                                className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] border-2 transition-all group ${
                                  rechargeOperator?.id === op.id 
                                    ? "bg-white border-emerald-500 shadow-xl shadow-emerald-500/10 scale-95" 
                                    : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-100 hover:shadow-lg"
                                }`}
                              >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                                  <img src={op.img} alt={op.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="text-center">
                                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{op.name}</p>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    {fintechOperators.find(f => f.id === op.id) ? "Mobile Money" : "Banque"}
                                  </p>
                                </div>
                                {rechargeOperator?.id === op.id && (
                                  <div className="absolute top-3 right-3 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                                    <Check size={14} strokeWidth={3} />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-8"
                        >
                          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                             <button 
                               onClick={() => setRechargeStep(1)}
                               className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all"
                             >
                               <ArrowLeft size={18} />
                             </button>
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl p-1.5 flex items-center justify-center">
                                  <img src={rechargeOperator?.img} alt="" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex flex-col">
                                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{rechargeOperator?.name}</h4>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration du montant</p>
                                </div>
                             </div>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Montant de la recharge</label>
                              <div className="relative group">
                                <input 
                                  type="text" 
                                  placeholder="0"
                                  value={rechargeAmount}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setRechargeAmount(val.replace(/\B(?=(\d{3})+(?!\d))/g, " "));
                                  }}
                                  className="w-full px-8 py-6 bg-[#F8FAFC] border-2 border-transparent focus:border-emerald-500 rounded-[2rem] font-black text-slate-900 outline-none transition-all text-4xl placeholder:text-slate-200 shadow-inner"
                                />
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xl font-black text-slate-300">FCFA</span>
                              </div>
                            </div>

                            <div className="space-y-3">
                               <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Reçu de dépôt (Justificatif)</label>
                               <div className="relative group">
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={(e) => setRechargeReceipt(e.target.files?.[0] || null)}
                                  />
                                  <div className={`w-full py-10 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all ${
                                    rechargeReceipt 
                                      ? "bg-emerald-50/50 border-emerald-200" 
                                      : "bg-slate-50 border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100/50"
                                  }`}>
                                     {rechargeReceipt ? (
                                       <>
                                         <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                            <Check size={24} strokeWidth={3} />
                                         </div>
                                         <p className="text-sm font-black text-emerald-600">{rechargeReceipt.name}</p>
                                         <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Justificatif ajouté avec succès</p>
                                       </>
                                     ) : (
                                       <>
                                         <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center">
                                            <Camera size={24} />
                                         </div>
                                         <p className="text-sm font-bold text-slate-400">Cliquez ou glissez le reçu ici</p>
                                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Capture photo sur mobile</p>
                                       </>
                                     )}
                                  </div>
                               </div>
                            </div>
                          </div>

                          <div className="pt-4 flex flex-col gap-4">
                            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                               <div className="flex justify-between items-center">
                                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">IMPACT SUR LA CAISSE</p>
                                 <p className="text-sm font-black text-rose-500 tabular-nums">-{rechargeAmount || "0"} F</p>
                               </div>
                            </div>
                            <button 
                              onClick={handleRechargeSuccess}
                              disabled={!rechargeAmount || !rechargeOperator}
                              className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                              Valider l'Approvisionnement
                            </button>
                          </div>
                        </motion.div>
                      )}
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
                           value={detteSearch}
                           onChange={(e) => setDetteSearch(e.target.value)}
                           className="w-full px-6 py-5 bg-[#F8FAFC] border-2 border-transparent focus:border-emerald-600 rounded-2xl font-bold text-slate-900 outline-none transition-all"
                         />
                         <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar">
                           {[
                             { id: "d1", client: "Aya Konan", amount: 5000, date: "24/04/2026" },
                             { id: "d2", client: "Koffi Jerry", amount: 12500, date: "26/04/2026" }
                           ].filter(d => d.client.toLowerCase().includes(detteSearch.toLowerCase())).map((d) => (
                             <button 
                               key={d.id}
                               onClick={() => setSelectedDette(d)}
                               className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${selectedDette?.id === d.id ? "bg-emerald-500 text-white border-emerald-500" : "bg-white border-slate-100 hover:bg-slate-50"}`}
                             >
                                <div className="flex flex-col text-left">
                                   <span className="text-xs font-black uppercase tracking-tight">{d.client}</span>
                                   <span className={`text-[10px] font-bold ${selectedDette?.id === d.id ? "text-white/70" : "text-slate-400"}`}>Le {d.date}</span>
                                </div>
                                <span className="text-sm font-black">{d.amount} F</span>
                             </button>
                           ))}
                         </div>
                         <button 
                           onClick={handlePayDette}
                           disabled={!selectedDette}
                           className={`w-full py-5 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${selectedDette ? "bg-emerald-600 shadow-xl shadow-emerald-600/20 active:scale-95" : "bg-slate-300 cursor-not-allowed"}`}
                         >
                           Payer la dette
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
const ReportModal = ({ isOpen, onClose, transaction, onConfirm }: { isOpen: boolean; onClose: () => void; transaction: any; onConfirm: (id: string, reason: string) => void }) => {
  const [reason, setReason] = useState("");
  
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
          className="relative w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Signaler une erreur</h3>
                <p className="text-[10px] font-black text-rose-500/60 uppercase tracking-widest">Transaction {transaction.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white p-1">
                   <img src={transaction.logo} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{transaction.operator}</span>
                   <span className="text-xs font-bold text-slate-900">{transaction.clientRef}</span>
                </div>
             </div>
             <span className="text-sm font-black text-slate-900">{transaction.amount} F</span>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Raison du signalement</label>
             <textarea 
               value={reason}
               onChange={(e) => setReason(e.target.value)}
               placeholder="Expliquez pourquoi vous signalez cette transaction..."
               className="w-full h-32 p-4 bg-slate-50 border-2 border-transparent focus:border-rose-500 rounded-2xl font-medium text-slate-900 outline-none transition-all resize-none placeholder:text-slate-300"
             />
          </div>

          <div className="flex flex-col gap-3">
             <button 
               onClick={() => {
                 onConfirm(transaction.id, reason);
                 setReason("");
               }}
               disabled={!reason.trim()}
               className="w-full py-5 bg-rose-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none"
             >
               Confirmer le signalement
             </button>
             <button 
               onClick={onClose}
               className="w-full py-5 bg-slate-50 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all"
             >
               Retour
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Admin Super Tower Component ---
const AdminView = ({ 
  subTab, 
  setSubTab, 
  merchants, 
  setMerchants, 
  catalogue, 
  updateCatalogue,
  plans,
  feedbacks
}: any) => {
  
  const toggleMerchantStatus = (id: string, newStatus: string) => {
    setMerchants((prev: any[]) => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIF': return 'bg-emerald-100 text-emerald-600';
      case 'ATTENTE': return 'bg-amber-100 text-amber-600';
      case 'SUSPENDU': return 'bg-rose-100 text-rose-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-8 pb-20 overflow-visible">
      {/* Admin Sub-Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Shield className="text-[#234D96]" size={32} />
             Tour de Contrôle Admin
          </h2>
          <p className="text-sm font-bold text-slate-400">Pilotage global de l'écosystème Fintrack</p>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-slate-100/80 rounded-2xl md:self-end">
          {[
            { id: "DASHBOARD", label: "Dashboard", icon: <LayoutDashboard size={16}/> },
            { id: "MERCHANTS", label: "Marchands", icon: <Users size={16}/> },
            { id: "NETWORKS", label: "Catalogue", icon: <Zap size={16}/> },
            { id: "PLANS", label: "Offres", icon: <CreditCard size={16}/> },
            { id: "SUPPORT", label: "Support", icon: <MessageSquare size={16}/> },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setSubTab(item.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subTab === item.id ? 'bg-[#234D96] text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'}`}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {subTab === "DASHBOARD" && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Utilisateurs", value: "2 485", delta: "+120", color: "text-emerald-500", icon: <Users /> },
                { label: "Marchands", value: "142", delta: "+4", color: "text-[#234D96]", icon: <Briefcase /> },
                { label: "Agents Actifs", value: "856", delta: "Normal", color: "text-indigo-500", icon: <Activity /> },
                { label: "Transactions 24h", value: "12k", delta: "+15%", color: "text-rose-500", icon: <Zap /> },
              ].map((kpi, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6">{kpi.icon}</div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-black text-slate-900 leading-none">{kpi.value}</span>
                    <span className={`text-[10px] font-black ${kpi.color}`}>{kpi.delta}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Critical Alerts */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-950 tracking-tight">Alertes Prioritaires</h3>
                  <span className="px-3 py-1 bg-rose-100 text-rose-500 text-[9px] font-black rounded-lg">3 ACTIONS REQUISES</span>
                </div>
                <div className="space-y-3">
                   <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm"><Users size={20}/></div>
                      <div className="flex-1">
                         <p className="text-xs font-black text-slate-900">3 Marchands en attente</p>
                         <p className="text-[10px] font-bold text-slate-500">Dernier inscrit : Benin Express</p>
                      </div>
                      <button className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">Gérer</button>
                   </div>
                   <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm"><CreditCard size={20}/></div>
                      <div className="flex-1">
                         <p className="text-xs font-black text-slate-900">5 Abonnements expirés</p>
                         <p className="text-[10px] font-bold text-slate-500">Action : Suspension automatique</p>
                      </div>
                      <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Vérifier</button>
                   </div>
                </div>
              </div>

              {/* Feedback Loop */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-950 tracking-tight">Derniers Retours</h3>
                  <button onClick={() => setSubTab("SUPPORT")} className="text-[10px] font-black text-[#234D96] uppercase tracking-widest">Voir tout</button>
                </div>
                <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                   {feedbacks.map((f: any) => (
                      <div key={f.id} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-[#234D96] uppercase tracking-widest">{f.category}</span>
                            <span className="text-[9px] font-bold text-slate-400">{f.date}</span>
                         </div>
                         <p className="text-xs font-medium text-slate-600 leading-relaxed mb-3">"{f.message}"</p>
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-900">{f.user} • {f.role}</span>
                            <div className={`w-2 h-2 rounded-full ${f.status === 'NON_LU' ? 'bg-rose-400' : 'bg-emerald-400'}`} title={f.status} />
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === "MERCHANTS" && (
          <motion.div 
            key="merchants"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-4 flex-1 max-w-md shadow-sm">
                   <Search size={20} className="text-slate-400" />
                   <input type="text" placeholder="Rechercher par nom ou IFU..." className="bg-transparent border-none outline-none text-sm font-bold w-full" />
                </div>
                <div className="flex gap-4">
                   <button className="px-6 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10">+ Ajouter Marchand</button>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <table className="w-full">
                   <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Entreprise / IFU</th>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Statut</th>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Plan</th>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Réseau</th>
                         <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {merchants.map((m: any) => (
                         <tr key={m.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="px-8 py-6">
                               <div className="flex flex-col">
                                  <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{m.name}</span>
                                  <span className="text-[10px] font-bold text-slate-400">IFU : {m.ifu}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(m.status)}`}>
                                  {m.status}
                               </span>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-slate-900 uppercase">{m.plan}</span>
                                  <span className="text-[10px] font-bold text-slate-400">• Exp 30 jours</span>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-slate-900 uppercase">{m.agencies} Agences</span>
                                  <span className="text-[10px] font-bold text-slate-400">{m.agents} Agents total</span>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center justify-center gap-2">
                                  {m.status !== 'ACTIF' && (
                                     <button onClick={() => toggleMerchantStatus(m.id, 'ACTIF')} className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Check size={18}/></button>
                                  )}
                                  {m.status !== 'SUSPENDU' && (
                                     <button onClick={() => toggleMerchantStatus(m.id, 'SUSPENDU')} className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Lock size={18}/></button>
                                  )}
                                  <button className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-950 hover:text-white transition-all"><Settings2 size={18}/></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </motion.div>
        )}

        {subTab === "NETWORKS" && (
           <motion.div 
             key="networks"
             initial={{ opacity: 0, scale: 0.95 }} 
             animate={{ opacity: 1, scale: 1 }} 
             exit={{ opacity: 0, scale: 0.95 }}
           >
              <AdminCatalogue catalogue={catalogue} updateCatalogue={updateCatalogue} />
           </motion.div>
        )}

        {subTab === "PLANS" && (
           <motion.div 
             key="plans"
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             exit={{ opacity: 0, y: -20 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-8"
           >
              {plans.map((p: any) => (
                 <div key={p.id} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform duration-500 mb-8">
                       <CreditCard size={32}/>
                    </div>
                    <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">{p.status}</span>
                    <h3 className="text-2xl font-black text-slate-950 mb-2 truncate px-4 w-full">{p.name}</h3>
                    <p className="text-sm font-bold text-slate-400 mb-8">Jusqu'à {p.limit}</p>
                    
                    <div className="text-4xl font-black text-slate-900 mb-10">
                       {p.price} <span className="text-sm font-bold text-slate-400">F / mo</span>
                    </div>

                    <button 
                      onClick={() => alert("Fonctionnalité de modification d'offre indisponible en démo.")}
                      className="w-full py-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-all duration-300"
                    >
                      Modifier l'Offre
                    </button>
                 </div>
              ))}
           </motion.div>
        )}

        {subTab === "SUPPORT" && (
           <motion.div 
             key="support"
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             className="space-y-8"
           >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                 <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-xl font-black text-slate-900 tracking-tight">Gestion des Feedbacks</h3>
                       <button className="text-[10px] font-black text-[#234D96] uppercase tracking-widest">Marquer tout comme traité</button>
                    </div>
                    <div className="space-y-4">
                       {feedbacks.map((f: any) => (
                          <div key={f.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#234D96]"><User size={24}/></div>
                                   <div>
                                      <h4 className="text-sm font-black text-slate-900">{f.user}</h4>
                                      <p className="text-[10px] font-bold text-slate-400">{f.role} • {f.date}</p>
                                   </div>
                                </div>
                                <span className="px-4 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest">{f.category}</span>
                             </div>
                             <p className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50/50 p-5 rounded-2xl">"{f.message}"</p>
                             <div className="flex gap-4">
                                <button 
                                  onClick={() => alert(`Répondre à ${f.user}`)}
                                  className="flex-1 py-4 bg-[#234D96] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-900/10"
                                >
                                  Répondre
                                </button>
                                <button className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Muter</button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                       <Shield className="absolute -bottom-10 -right-10 text-white/5" size={160} />
                       <div className="relative z-10">
                          <h3 className="text-xl font-black mb-1">Logs d'Auteur</h3>
                          <p className="text-xs font-bold text-white/40 mb-8">Dernières actions système</p>
                          <div className="space-y-6">
                             {[
                               { action: "Catalogue mis à jour", time: "14:20", by: "Admin S." },
                               { action: "Nouveau marchand créé", time: "11:05", by: "System" },
                               { action: "Frais MTN modifiés", time: "09:12", by: "Admin J." },
                             ].map((log, i) => (
                                <div key={i} className="flex gap-4 border-l-2 border-white/10 pl-6 relative">
                                   <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#234D96]" />
                                   <div>
                                      <p className="text-xs font-bold">{log.action}</p>
                                      <p className="text-[10px] text-white/40">{log.time} • par {log.by}</p>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Merchant Hub Component ---
const MerchantHub = ({ catalogue, updateCatalogue }: { catalogue: any[]; updateCatalogue: any }) => {
  const [editingService, setEditingService] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("Dépôt");

  const toggleService = (id: string) => {
    updateCatalogue((prev: any[]) => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hub des Services</h2>
        <p className="text-sm font-bold text-slate-400">Activez et configurez vos services pour vos agences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {catalogue.map((service) => (
          <div key={service.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
                <img src={service.logo} alt="" className="w-full h-full object-contain" />
              </div>
              <button 
                onClick={() => toggleService(service.id)}
                className={`w-12 h-6 rounded-full relative transition-all duration-300 ${service.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${service.isActive ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{service.name}</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{service.category}</span>
            </div>

            <button 
              onClick={() => setEditingService(service)}
              className="w-full py-3 bg-[#234D96] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-900 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            >
              Configurer Commissions
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingService(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 p-2 border border-slate-100">
                    <img src={editingService.logo} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{editingService.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration des paliers</p>
                  </div>
                </div>
                <button onClick={() => setEditingService(null)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                  {["Dépôt", "Retrait", "Transfert"].map((t) => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-[#234D96] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-widest">Paliers de commission</h4>
                    <button 
                      onClick={() => {
                        const newTier = { id: Date.now().toString(), min: 0, max: "infinity", fee: 0, type: "fixed" };
                        updateCatalogue((prev: any[]) => prev.map(s => s.id === editingService.id ? { 
                          ...s, 
                          commissions: { 
                            ...s.commissions, 
                            [activeTab]: [...(s.commissions[activeTab] || []), newTier] 
                          } 
                        } : s));
                        // Update local editingService to trigger re-render
                        setEditingService((prev: any) => ({
                          ...prev,
                          commissions: {
                            ...prev.commissions,
                            [activeTab]: [...(prev.commissions[activeTab] || []), newTier]
                          }
                        }));
                      }}
                      className="text-[10px] font-black text-[#234D96] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-all"
                    >
                      + Ajouter une tranche
                    </button>
                  </div>

                  {editingService.commissions[activeTab]?.length > 0 ? (
                    <div className="space-y-3">
                      {editingService.commissions[activeTab].map((tier: any, i: number) => (
                        <div key={tier.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase">Min (F)</label>
                              <input type="text" value={tier.min} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase">Max (F)</label>
                              <input type="text" value={tier.max === "infinity" ? "∞" : tier.max} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 w-24">
                            <label className="text-[9px] font-black text-slate-400 uppercase">Frais ({tier.type === "fixed" ? "F" : "%"})</label>
                            <input type="text" value={tier.fee} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-black text-indigo-600" />
                          </div>
                          <button 
                            onClick={() => {
                               updateCatalogue((prev: any[]) => prev.map(s => s.id === editingService.id ? { 
                                 ...s, 
                                 commissions: { 
                                   ...s.commissions, 
                                   [activeTab]: s.commissions[activeTab].filter((t: any) => t.id !== tier.id) 
                                 } 
                               } : s));
                               setEditingService((prev: any) => ({
                                 ...prev,
                                 commissions: {
                                   ...prev.commissions,
                                   [activeTab]: prev.commissions[activeTab].filter((t: any) => t.id !== tier.id)
                                 }
                               }));
                            }}
                            className="w-8 h-8 flex items-center justify-center text-rose-400 hover:text-rose-600 transition-colors"
                          >
                            <X size={16}/>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-300 mb-4 shadow-sm"><Activity size={24}/></div>
                      <p className="text-xs font-bold text-slate-400">Aucun palier configuré pour ce type</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                <button onClick={() => setEditingService(null)} className="flex-1 py-5 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">Annuler</button>
                <button className="flex-1 py-5 bg-[#234D96] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-900/10">Enregistrer les Tarifs</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Admin Catalogue Component ---
const AdminCatalogue = ({ catalogue, updateCatalogue }: { catalogue: any[]; updateCatalogue: any }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Catalogue Global</h2>
          <p className="text-sm font-bold text-slate-400">Bibliothèque centrale des services du pays</p>
        </div>
        <button className="px-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-3">
          <Plus size={18}/> Nouveau Produit
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Produit</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Catégorie</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Maintenance</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {catalogue.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-5">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl p-2 shrink-0">
                         <img src={product.logo} alt="" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-sm font-black text-slate-900">{product.name}</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                   <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-tight">{product.category}</span>
                </td>
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                      <button className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${product.isGlobalMaintenance ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-300'}`}>
                         <Zap size={18} />
                      </button>
                      <span className="text-[10px] font-bold text-slate-400">{product.isGlobalMaintenance ? 'En maintenance' : 'Opérationnel'}</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                   <div className="flex items-center justify-center gap-2">
                      <button className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-950 hover:text-white transition-all"><Settings2 size={18}/></button>
                      <button className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><X size={18}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
