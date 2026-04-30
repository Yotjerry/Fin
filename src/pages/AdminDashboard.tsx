import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { 
  Users, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Settings2, 
  MessageSquare, 
  LayoutDashboard, 
  Bell, 
  Search, 
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
  TrendingUp,
  AlertCircle,
  Globe,
  Database,
  Lock,
  Unlock,
  LogOut,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  TrendingDown,
  Star,
  Ticket,
  Eye,
  Settings,
  Mail,
  Building2,
  FileText,
  Trash2,
  Save,
  Layers,
  CreditCard,
  EyeOff,
  UserCircle,
  FileCheck,
  Fingerprint,
  User,
  Edit3,
  DownloadCloud,
  BookOpen,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  BarChart, 
  Bar,
  Legend
} from 'recharts';

type AdminTab = "Overview" | "Merchants" | "Catalogue" | "Plans" | "Support" | "Settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("Overview");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [pulse, setPulse] = useState(false);

  // Simulate live data updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  // Nav Item helper with uniform colors
  const NavItem = ({ active, onClick, icon, label, badge }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, badge?: string }) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
        active 
          ? 'bg-[#234D96] text-white shadow-xl shadow-indigo-900/20' 
          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-100 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-[#234D96]'} transition-colors mt-0.5`}>{icon}</span>
        <span className="text-[13px] font-black tracking-widest">{label}</span>
      </div>
      {badge && (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
          active ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="fixed inset-0 flex bg-[#F0F2F5] font-sans text-slate-900 overflow-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#234D96] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#234D96] rounded-full blur-[120px] opacity-[0.02] pointer-events-none" />

      {/* SIDEBAR ADMIN - MODERN GLASS STYLE */}
      <aside className="w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col shrink-0 z-50 relative">
        <div className="p-8 flex justify-center border-b border-slate-50 mb-4 h-40 items-center">
          <Logo className="h-32 w-auto drop-shadow-sm" />
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto no-scrollbar py-4">
          <NavItem 
            active={activeTab === "Overview"} 
            onClick={() => setActiveTab("Overview")} 
            icon={<LayoutDashboard size={20} />} 
            label="Vue d'Ensemble" 
          />
          <NavItem 
            active={activeTab === "Merchants"} 
            onClick={() => setActiveTab("Merchants")} 
            icon={<CheckCircle2 size={20} />} 
            label="Gestion des Marchands" 
          />

          <NavItem 
            active={activeTab === "Catalogue"} 
            onClick={() => setActiveTab("Catalogue")} 
            icon={<BookOpen size={20} />} 
            label="Catalogue Réseaux" 
          />

          <NavItem 
            active={activeTab === "Plans"} 
            onClick={() => setActiveTab("Plans")} 
            icon={<Plus size={20} />} 
            label="Plans & Offres" 
          />
          <NavItem 
            active={activeTab === "Support"} 
            onClick={() => setActiveTab("Support")} 
            icon={<MessageSquare size={20} />} 
            label="Support & Retours" 
          />
          
          <div className="pt-8 pb-4 px-4">
            <div className="space-y-1">
              <NavItem 
                active={activeTab === "Settings"} 
                onClick={() => setActiveTab("Settings")} 
                icon={<Settings2 size={18} />} 
                label="Paramètres" 
              />
              <NavItem 
                active={false} 
                onClick={() => {}} 
                icon={<ShieldCheck size={18} />} 
                label="Journal d'Audit" 
              />
            </div>
          </div>
        </nav>

        <div className="p-8">
           <button className="w-full flex items-center justify-center gap-3 py-4 text-slate-400 font-black text-[11px] tracking-widest hover:text-rose-500 transition-colors">
              <LogOut size={18} />
              Déconnexion
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* TOP BAR - SLEEK */}
        <header className="h-24 bg-white/40 backdrop-blur-md border-b border-white/20 px-12 flex items-center justify-end shrink-0 z-40">
          <div className="flex items-center gap-8">
            <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-white/50">
               <button className="px-6 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">Staging</button>
            </div>

            <div className="flex items-center gap-4">
              <button className="w-11 h-11 bg-white border border-slate-200/50 rounded-2xl flex items-center justify-center text-slate-400 relative hover:text-[#234D96] hover:border-[#234D96]/30 transition-all">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="h-11 w-11 bg-[#234D96] rounded-2xl p-[2px] shadow-lg shadow-indigo-900/20">
                 <div className="w-full h-full bg-slate-900 rounded-[0.9rem] flex items-center justify-center text-white font-black text-xs">
                    JY
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE DYNAMICS */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-12 relative">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && <OverviewView key="overview" />}
            {activeTab === "Merchants" && <MerchantsView key="merchants" />}
            {activeTab === "Catalogue" && <CatalogueView key="catalogue" />}

            {activeTab === "Plans" && <PlansView key="plans" />}
            {activeTab === "Support" && <SupportView key="support" />}
            {activeTab === "Settings" && <SettingsView key="settings" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ------------------- DATA FOR ANALYTICS ------------------- */
const ACTIVITY_DATA = [
  { month: 'Jan', sessions: 450, agents: 320 },
  { month: 'Fev', sessions: 680, agents: 410 },
  { month: 'Mar', sessions: 920, agents: 580 },
  { month: 'Avr', sessions: 850, agents: 620 },
  { month: 'Mai', sessions: 1200, agents: 890 },
  { month: 'Juin', sessions: 1450, agents: 1120 },
];

const PLAN_REVENUE_DATA = [
  { name: 'Starter', value: 12.5, color: '#94A3B8' },
  { name: 'Pro', value: 25.8, color: '#3A4DB7' },
  { name: 'Business', value: 8.5, color: '#4ECBA8' },
];

const HUB_HEALTH = [
  { name: 'Actifs', value: 1240, fill: '#4ECBA8' },
  { name: 'Vérification', value: 185, fill: '#F59E0B' },
  { name: 'Suspendus', value: 27, fill: '#EF4444' },
];

const FEEDBACKS = [
  { id: 1, user: "Koffi M.", rating: 5, tag: "Avis", comment: "Application fluide, transactions instantanées. Top !", time: "12m" },
  { id: 2, user: "Marie L.", rating: 4, tag: "Suggestion", comment: "Une option export PDF serait utile pour les marchands.", time: "1h" },
  { id: 3, user: "Sika Shop", rating: 3, tag: "Bug", comment: "Lenteur constatée sur Moov Money ivoire.", time: "3h" },
];

/* ------------------- VIEW: OVERVIEW ------------------- */
function OverviewView() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="space-y-12 pb-20">
         <div className="flex items-end justify-between">
            <div className="space-y-4">
               <div className="w-32 h-2 bg-slate-200 rounded animate-pulse" />
               <div className="w-96 h-16 bg-slate-200 rounded-3xl animate-pulse" />
            </div>
            <div className="flex gap-4">
               <div className="w-40 h-16 bg-slate-200 rounded-2xl animate-pulse" />
               <div className="w-40 h-16 bg-slate-200 rounded-2xl animate-pulse" />
            </div>
         </div>
         <div className="grid grid-cols-5 gap-6">
            {[1,2,3,4,5].map(i => <div key={i} className="h-40 bg-white border border-slate-100 rounded-[2.5rem] animate-pulse" />)}
         </div>
         <div className="grid grid-cols-3 gap-8">
            <div className="h-96 bg-white border border-slate-100 rounded-[3rem] animate-pulse" />
            <div className="h-96 bg-white border border-slate-100 rounded-[3rem] animate-pulse" />
            <div className="h-96 bg-white border border-slate-100 rounded-[3rem] animate-pulse" />
         </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-8 pb-20"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-[#234D96] tracking-[0.3em] font-sans">Système Centralisé</p>
          <h2 className="text-6xl font-black tracking-tighter text-slate-950 leading-none">Global <span className="text-[#234D96]">Vision</span></h2>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleRefresh}
             className={`w-16 h-16 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#234D96] hover:border-[#234D96]/30 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
           >
              <Activity size={24} />
           </button>
           <button className="px-10 py-5 bg-[#234D96] text-white rounded-[2rem] font-bold text-xs shadow-2xl shadow-indigo-900/40 hover:scale-[1.03] active:scale-95 transition-all border-4 border-white">
              Générer Rapport PDF
           </button>
        </div>
      </div>

      {/* TOP KPI ROW - IMAGE STYLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard 
          label="Points de Vente" 
          value="1,248" 
          growth="+15%"
          color="#3A4DB7"
        />
        <KpiCard 
          label="Marchands" 
          value="352" 
          growth="+12%"
          color="#4ECBA8"
        />
        <KpiCard 
          label="Agents Hub" 
          value="2,840" 
          growth="+24%"
          color="#6366F1"
        />
        <KpiCard 
          label="Utilisateurs" 
          value="15.4K" 
          growth="+5.4%"
          color="#F59E0B"
        />
        <KpiCard 
          label="Revenus Générés" 
          value="45.8M" 
          growth="+18%"
          color="#EF4444"
          isCurrency
        />
      </div>

      {/* MIDDLE SECTION - IMAGE STYLE (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Working Format -> Transactions Format */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Format des Flux</h3>
              <select className="bg-slate-50 text-[10px] font-black p-2 rounded-lg border-none outline-none cursor-pointer uppercase tracking-widest">
                 <option>Cette Semaine</option>
              </select>
           </div>
           
           <div className="h-64 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={[
                         { name: 'Mobile Money', value: 450, color: '#234D96' },
                         { name: 'Virement', value: 300, color: '#4ECBA8' },
                         { name: 'Espèces', value: 250, color: '#F1F5F9' }
                       ]}
                       innerRadius={70}
                       outerRadius={95}
                       paddingAngle={10}
                       cornerRadius={10}
                       dataKey="value"
                    >
                       <Cell fill="#234D96" />
                       <Cell fill="#4ECBA8" />
                       <Cell fill="#F1F5F9" />
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-black text-slate-400 tracking-widest">Total</span>
                 <span className="text-3xl font-black text-slate-950">1,000</span>
              </div>
           </div>

           <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#234D96]" />
                 <span className="text-[10px] font-bold text-slate-400 tracking-widest">Digital</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#4ECBA8]" />
                 <span className="text-[10px] font-bold text-slate-400 tracking-widest">Cash</span>
              </div>
           </div>
        </div>

        {/* Project Employment -> Business Metrics */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Performances Hubs</h3>
              <select className="bg-slate-50 text-[10px] font-black p-2 rounded-lg border-none outline-none cursor-pointer uppercase tracking-widest">
                 <option>Last week</option>
              </select>
           </div>
           
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[
                   { name: 'Lun', proj: 180, bench: 120 },
                   { name: 'Mar', proj: 230, bench: 150 },
                   { name: 'Mer', proj: 160, bench: 90 },
                   { name: 'Jeu', proj: 210, bench: 180 },
                   { name: 'Ven', proj: 280, bench: 130 },
                   { name: 'Sam', proj: 140, bench: 160 },
                   { name: 'Dim', proj: 190, bench: 110 },
                 ]} barGap={8}>
                    <Bar dataKey="proj" fill="#FF8A65" radius={[6, 6, 0, 0]} barSize={12} />
                    <Bar dataKey="bench" fill="#FFCCBC" radius={[6, 6, 0, 0]} barSize={12} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#FF8A65]" />
                 <span className="text-[10px] font-bold text-slate-400 tracking-widest">Activité</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#FFCCBC]" />
                 <span className="text-[10px] font-bold text-slate-400 tracking-widest">Support</span>
              </div>
           </div>
        </div>

        {/* Requests -> Flux Retours (Simplified from image) */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm flex flex-col">
           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Demandes & Actions</h3>
           <div className="space-y-6 flex-1">
              {[
                { label: "Vérification KYC", count: 9, icon: <UserCircle size={18} />, bg: "bg-indigo-50", text: "text-[#234D96]" },
                { label: "Demandes de Retrait", count: 2, icon: <CreditCard size={18} />, bg: "bg-rose-50", text: "text-rose-500" },
                { label: "Nouveaux Marchands", count: 16, icon: <Building2 size={18} />, bg: "bg-emerald-50", text: "text-emerald-500" },
                { label: "Bugs Signalés", count: 5, icon: <AlertCircle size={18} />, bg: "bg-amber-50", text: "text-amber-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-transform">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${item.bg} ${item.text} rounded-2xl flex items-center justify-center shadow-sm`}>
                         {item.icon}
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-950 transition-colors">{item.label}</span>
                   </div>
                   <span className="text-lg font-black text-slate-950">{item.count}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Staff Turnover -> Réseau Activity (Big Chart) */}
         <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Taux de Rétention Réseau</h3>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest mt-1">Mars - Nov 2024</p>
               </div>
               <select className="bg-slate-50 text-[10px] font-bold p-2 rounded-lg border-none outline-none cursor-pointer tracking-widest">
                  <option>Détails Mensuels</option>
               </select>
            </div>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Mar', val: 8 },
                    { name: 'Avr', val: 12 },
                    { name: 'Mai', val: 15 },
                    { name: 'Juin', val: 10 },
                    { name: 'Juil', val: 7 },
                    { name: 'Aout', val: 4 },
                    { name: 'Sep', val: 9 },
                    { name: 'Oct', val: 11 },
                    { name: 'Nov', val: 14 },
                  ]}>
                     <Bar dataKey="val" fill="#6200EA" radius={[10, 10, 0, 0]} barSize={25} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Recruitment Progress -> Collaborateurs Live */}
         <div className="lg:col-span-4 bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Mouvements Récents</h3>
               <button className="text-[10px] font-bold text-[#234D96] tracking-[0.1em] flex items-center gap-2 hover:gap-3 transition-all">
                  Voir Tout <ArrowRight size={14} />
               </button>
            </div>
            
            <div className="space-y-8 flex-1">
               {[
                 { name: "Leo Myers", role: "Devops", status: "Tech interview", color: "bg-amber-500" },
                 { name: "Ann Fields", role: "UX/UI Designer", status: "Resume review", color: "bg-[#6200EA]" },
                 { name: "Eric Olson", role: ".Net developer", status: "Final interview", color: "bg-emerald-500" },
                  { name: "Koffi Mark", role: "Agent Support", status: "Onboarding", color: "bg-[#234D96]" }
               ].map((person, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-black text-sm">
                          {person.name.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-950 leading-none">{person.name}</p>
                          <p className="text-xs font-bold text-slate-400 mt-1">{person.role}</p>
                       </div>
                    </div>
                       <div className="flex items-center gap-2 min-w-[120px] justify-end">
                       <div className={`w-2 h-2 rounded-full ${person.color}`} />
                       <span className="text-[10px] font-bold text-slate-500 tracking-widest">{person.status}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function KpiCard({ label, value, growth, color, isCurrency }: { label: string, value: string, growth: string, color: string, isCurrency?: boolean }) {
  const isPositive = growth.startsWith('+');

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group">
       <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 tracking-widest">{label}</h4>
          <div className="flex items-baseline justify-between">
             <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-950 tracking-tighter leading-none">{value}</span>
                {isCurrency && <span className="text-[10px] font-black text-slate-400">FCFA</span>}
             </div>
             <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {isPositive ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
                {growth}
             </div>
          </div>
       </div>
    </div>
  );
}

function AlertRow({ title, desc, time, active, isUrgent }: { title: string, desc: string, time: string, active?: boolean, isUrgent?: boolean }) {
  return (
    <div className={`p-5 rounded-[2rem] border transition-all cursor-pointer group ${
      isUrgent ? 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'
    }`}>
       <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
             {active && <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />}
             <h4 className={`text-xs font-black tracking-tight ${isUrgent ? 'text-rose-400' : 'text-white'}`}>{title}</h4>
          </div>
          <span className="text-[9px] font-black text-slate-500">{time}</span>
       </div>
       <p className="text-[10px] font-medium text-slate-400 line-clamp-1">{desc}</p>
       <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          <button className="flex-1 py-3 bg-white text-slate-950 rounded-xl text-[10px] font-black tracking-widest hover:bg-[#234D96] hover:text-white transition-all shadow-xl">Consulter</button>
          {!isUrgent && <button className="px-6 py-3 bg-white/10 text-white rounded-xl text-[10px] font-black tracking-widest hover:bg-white/20">Ignorer</button>}
       </div>
    </div>
  );
}

function GatewayRow({ name, load, status, trend }: { name: string, load: number, status: string, trend: "up" | "down" | "neutral" }) {
   return (
      <div className="flex items-center justify-between group/row p-4 rounded-[1.5rem] hover:bg-slate-50 transition-colors">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover/row:border-[#234D96]/30 transition-colors shadow-sm">
               <div className={`w-3 h-3 rounded-full ${status === 'Maintenance' ? 'bg-rose-500' : status === 'Charge Haute' ? 'bg-amber-500' : 'bg-emerald-500'} ${status === 'Maintenance' ? 'animate-pulse' : ''}`} />
            </div>
            <div>
               <p className="text-sm font-black text-slate-900 tracking-tight">{name}</p>
               <p className="text-[9px] font-black text-slate-400 tracking-[0.2em]">{status}</p>
            </div>
         </div>
         
         <div className="flex items-center gap-12">
            <div className="w-48 text-right pr-6">
               <div className="flex justify-between mb-2">
                  <span className="text-[9px] font-black text-slate-400 tracking-widest">Charge Système</span>
                  <span className="text-[10px] font-black text-slate-900">{load}%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full relative">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${load}%` }}
                     className={`h-full rounded-full ${load > 90 ? 'bg-rose-500' : load > 70 ? 'bg-amber-500' : 'bg-[#234D96]'}`} 
                  />
               </div>
            </div>
            <div className="w-8 flex justify-center">
               {trend === 'up' && <TrendingUp className="text-emerald-500" size={18} />}
               {trend === 'down' && <TrendingDown className="text-rose-500" size={18} />}
               {trend === 'neutral' && <MoreHorizontal className="text-slate-300" size={18} />}
            </div>
         </div>
      </div>
   );
}

function SecurityEvent({ user, action, time, type }: { user: string, action: string, time: string, type: 'info' | 'alert' }) {
   return (
      <div className="flex items-center gap-4 py-1 group/event">
         <div className={`w-3 h-3 rounded-full shrink-0 border-4 border-white shadow-sm ${type === 'alert' ? 'bg-rose-500' : 'bg-[#234D96]'}`} />
         <div className="flex-1">
            <div className="flex items-center justify-between w-full">
               <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none group-hover/event:text-[#234D96] transition-colors">{user}</span>
               <span className="text-[10px] font-bold text-slate-300">{time}</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">{action}</p>
         </div>
      </div>
   );
}

/* ------------------- VIEW: AGENTS ------------------- */
/* ------------------- VIEW: MERCHANTS ------------------- */
type MerchantPlan = "Starter" | "Pro" | "Business" | "Enterprise";
type KYCStatus = "Verified" | "Incomplete" | "Rejected" | "Pending";
type PaymentStatus = "Paid" | "Pending" | "Overdue";

interface Merchant {
  id: string;
  name: string;
  manager: string;
  email: string;
  phone: string;
  joinedAt: string;
  expiresAt: string;
  plan: MerchantPlan;
  paymentStatus: PaymentStatus;
  kycStatus: KYCStatus;
  isActive: boolean;
  agencies: number;
  agents: number;
  monthlyVolume: string;
  kycDocs: { name: string, type: string, url: string }[];
}

const MERCHANTS_DATA: Merchant[] = [
  {
    id: "M-101",
    name: "Fashion House",
    manager: "Moussa Diakité",
    email: "moussa@fashionhouse.ci",
    phone: "+225 07070707",
    joinedAt: "12/04/2026",
    expiresAt: "12/04/2027",
    plan: "Pro",
    paymentStatus: "Paid",
    kycStatus: "Verified",
    isActive: true,
    agencies: 12,
    agents: 24,
    monthlyVolume: "4.2M",
    kycDocs: [
      { name: "RCCM_Fashion.pdf", type: "RCCM", url: "#" },
      { name: "IFU_2026.pdf", type: "IFU", url: "#" },
      { name: "ID_Moussa.jpg", type: "ID", url: "#" }
    ]
  },
  {
    id: "M-102",
    name: "Tech Solutions",
    manager: "Sarah Koné",
    email: "contact@techsol.sn",
    phone: "+221 77000000",
    joinedAt: "15/04/2026",
    expiresAt: "15/10/2026",
    plan: "Business",
    paymentStatus: "Pending",
    kycStatus: "Pending",
    isActive: true,
    agencies: 5,
    agents: 10,
    monthlyVolume: "1.8M",
    kycDocs: [
      { name: "RCCM_Tech.pdf", type: "RCCM", url: "#" },
      { name: "ID_Sarah.jpg", type: "ID", url: "#" }
    ]
  },
  {
    id: "M-103",
    name: "Boulangerie Moderne",
    manager: "Koffi Yao",
    email: "kyao@moderne.bj",
    phone: "+229 21314151",
    joinedAt: "20/04/2026",
    expiresAt: "20/04/2027",
    plan: "Starter",
    paymentStatus: "Overdue",
    kycStatus: "Incomplete",
    isActive: false,
    agencies: 2,
    agents: 4,
    monthlyVolume: "850k",
    kycDocs: [
      { name: "IFU_Bake.pdf", type: "IFU", url: "#" }
    ]
  },
  {
    id: "M-104",
    name: "E-Shop Africa",
    manager: "Aissatou Diallo",
    email: "aissa@eshop.gn",
    phone: "+224 62000000",
    joinedAt: "22/04/2026",
    expiresAt: "22/10/2026",
    plan: "Pro",
    paymentStatus: "Paid",
    kycStatus: "Verified",
    isActive: true,
    agencies: 8,
    agents: 16,
    monthlyVolume: "3.1M",
    kycDocs: [
      { name: "RCCM_Eshop.pdf", type: "RCCM", url: "#" },
      { name: "IFU_Diallo.pdf", type: "IFU", url: "#" },
      { name: "Passport_AD.jpg", type: "Passport", url: "#" }
    ]
  }
];

function MerchantsView() {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [merchants, setMerchants] = useState(MERCHANTS_DATA);
  const [showToast, setShowToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [activeKycDoc, setActiveKycDoc] = useState<string | null>(null);
  const [showPlanModal, setShowPlanModal] = useState<Merchant | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<Merchant | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'stats' | 'kyc' | 'billing'>('stats');

  const filteredMerchants = merchants.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMerchants(prev => prev.map(m => {
      if (m.id === id) {
        const newStatus = !m.isActive;
        setShowToast({ 
          message: `${newStatus ? 'Compte Activé' : 'Accès Suspendu'} : ${m.name}`, 
          type: newStatus ? 'success' : 'error' 
        });
        setTimeout(() => setShowToast(null), 3000);
        return { ...m, isActive: newStatus };
      }
      return m;
    }));
  };

  const handleKycAction = (id: string, action: 'approve' | 'reject') => {
    setMerchants(prev => prev.map(m => m.id === id ? { ...m, kycStatus: action === 'approve' ? 'Verified' : 'Rejected' as const } : m));
    setShowToast({
      message: action === 'approve' ? "Compte marchand validé" : "KYC rejeté",
      type: action === 'approve' ? 'success' : 'error'
    });
    setTimeout(() => setShowToast(null), 3000);
    if (showDetailsModal?.id === id) {
      setShowDetailsModal(prev => prev ? { ...prev, kycStatus: action === 'approve' ? 'Verified' : 'Rejected' as const } : null);
    }
  };

  const navigateMerchant = (direction: 'prev' | 'next') => {
    if (!showDetailsModal) return;
    const currentIndex = filteredMerchants.findIndex(m => m.id === showDetailsModal.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= 0 && nextIndex < filteredMerchants.length) {
      setShowDetailsModal(filteredMerchants[nextIndex]);
      setActiveDetailTab('stats');
    }
  };

  const handlePlanChange = (id: string, newPlan: MerchantPlan) => {
    setMerchants(prev => prev.map(m => {
      if (m.id === id) {
        // Simulation: Activation immédiate pour 1 an
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        const expiresAt = date.toLocaleDateString('fr-FR');
        
        return { 
          ...m, 
          plan: newPlan, 
          paymentStatus: 'Paid' as const, 
          isActive: true,
          expiresAt
        };
      }
      return m;
    }));
    setShowToast({ message: `Plan ${newPlan} activé jusqu'au prochain renouvellement`, type: 'success' });
    setTimeout(() => setShowToast(null), 3000);
    setShowPlanModal(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 relative pb-20"
    >
      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 40, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className={`fixed top-0 left-1/2 z-[200] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-4 border backdrop-blur-md ${
              showToast.type === 'success' ? 'bg-emerald-500/90 text-white border-emerald-400' : 'bg-rose-500/90 text-white border-rose-400'
            }`}
          >
            {showToast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2">
         <h2 className="text-4xl font-black tracking-tighter text-slate-950">Gestion des marchands</h2>
         <p className="text-slate-400 font-medium">Activez les comptes marchands et renouvelez leurs abonnements depuis un seul écran.</p>
      </div>

      {/* SUMMARY STATS BAR */}
      <div className="grid grid-cols-5 gap-6">
         {[
           { label: "MARCHANDS", val: "842", sub: "Base totale suivie", color: "indigo" },
           { label: "ACTIFS", val: "798", sub: "Comptes opérationnels", color: "emerald" },
           { label: "EN ATTENTE", val: "12", sub: "A vérifier ou activer", color: "amber" },
           { label: "SUSPENDUS", val: "32", sub: "Accès temporaires bloqués", color: "rose" },
           { label: "AGENTS", val: "2,410", sub: "Points de vente", color: "slate" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200/60 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow group">
              <p className="text-[10px] font-black text-slate-400 tracking-widest mb-2 group-hover:text-[#3A4DB7] transition-colors">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-black text-slate-950 tracking-tighter">{stat.val}</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 mt-1">{stat.sub}</p>
           </div>
         ))}
      </div>

      {/* MAIN TABLE SECTION */}
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl overflow-hidden">
         <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
               <h3 className="text-xl font-black text-slate-950 tracking-tight">Vue structure marchands</h3>
               <p className="text-xs font-bold text-slate-400 mt-1">{filteredMerchants.length} marchand(s) visible(s)</p>
            </div>
            <div className="relative">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Rechercher un marchand, email, IFU..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-50 w-80 transition-all shadow-inner"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-white border-b border-slate-100">
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-left">Marchand</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-left">Entreprise</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-center">Statut KYC</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-center">Abonnement</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-center">Réseau</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-center">Accès</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredMerchants.map((merchant) => (
                     <tr key={merchant.id} className="hover:bg-indigo-50/10 transition-all group">
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                                 {merchant.name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                 <span className="font-black text-slate-950 leading-none">{merchant.name}</span>
                                 <span className="text-[10px] font-bold text-[#3A4DB7] mt-1.5 tracking-widest">{merchant.id}</span>
                                 <span className="text-[10px] font-bold text-slate-400 mt-0.5">{merchant.email}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex flex-col">
                              <span className="font-bold text-slate-800">{merchant.manager}</span>
                              <span className="text-[10px] font-black text-[#3A4DB7] mt-1">IFU: {merchant.id.replace('M-', 'IFU-2024-')}</span>
                              <span className="text-[9px] font-bold text-slate-400 italic font-mono uppercase tracking-tighter">Depuis le {merchant.joinedAt}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div className="flex flex-col items-center gap-2">
                              <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest border ${
                                 merchant.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                 merchant.kycStatus === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                 'bg-rose-50 text-rose-600 border-rose-100'
                              }`}>
                                 {merchant.kycStatus}
                              </span>
                              {merchant.kycStatus === 'Pending' && (
                                <button 
                                  onClick={() => {
                                    setShowDetailsModal(merchant);
                                    setActiveDetailTab('kyc');
                                  }}
                                  className="text-[9px] font-black text-[#3A4DB7] hover:underline tracking-tighter animate-pulse"
                                >
                                   Vérifier Dossier →
                                </button>
                              )}
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div className="flex flex-col items-center gap-1">
                              <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-tight ${
                                merchant.plan === 'Starter' ? 'bg-slate-100 text-slate-500' : 
                                merchant.plan === 'Pro' ? 'bg-indigo-50 text-[#3A4DB7]' : 
                                merchant.plan === 'Business' ? 'bg-emerald-50 text-emerald-600' : 
                                'bg-purple-50 text-purple-600'
                              }`}>
                                {merchant.plan.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                Expire le {merchant.expiresAt}
                              </span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div className="flex flex-col items-center gap-1">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black tracking-widest ${
                                merchant.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-500' : 
                                merchant.paymentStatus === 'Pending' ? 'bg-amber-50 text-amber-500' : 
                                'bg-rose-50 text-rose-500'
                              }`}>
                                {merchant.paymentStatus === 'Paid' ? 'PAYÉ' : merchant.paymentStatus === 'Pending' ? 'ATTENTE' : 'IMPAYÉ'}
                              </span>
                              <span className="text-[10px] font-black text-slate-900">
                                {merchant.plan === 'Starter' ? '9 900 F' : merchant.plan === 'Pro' ? '29 900 F' : merchant.plan === 'Business' ? '99 000 F' : 'Sur devis'}
                              </span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-900">{merchant.agents}</span>
                              <span className="text-[10px] font-bold text-slate-400">agent(s)</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div 
                              onClick={(e) => toggleStatus(merchant.id, e)}
                              className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 mx-auto ${
                                 merchant.isActive ? 'bg-emerald-500' : 'bg-slate-200'
                              }`}
                           >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-500 shadow-lg ${
                                 merchant.isActive ? 'translate-x-7' : 'translate-x-0'
                              }`} />
                           </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowPlanModal(merchant);
                                }}
                                className="px-5 py-2.5 bg-[#3A4DB7] text-white rounded-xl text-[10px] font-black tracking-widest hover:bg-[#234D96] transition-all shadow-lg shadow-indigo-500/20"
                              >
                                Gérer Abonnement
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDetailsModal(merchant);
                                }}
                                className="px-5 py-2.5 bg-white border border-indigo-100 text-[#3A4DB7] rounded-xl text-[10px] font-black tracking-widest hover:bg-indigo-50 transition-all"
                              >
                                Détails
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* PAGINATION */}
         <div className="p-8 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 tracking-widest">Affichage 1 - {filteredMerchants.length} sur {merchants.length} marchands</p>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:bg-slate-50 transition-all">Précédent</button>
               <button className="px-4 py-2 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase transition-all">1</button>
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:bg-slate-50 transition-all">Suivant</button>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {showDetailsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-slate-950/40 backdrop-blur-md flex items-center justify-end"
            onClick={() => setShowDetailsModal(null)}
          >
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 35, stiffness: 250 }}
              className="bg-white w-full max-w-4xl h-full shadow-[-40px_0_100px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header Context Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#3A4DB7] to-transparent opacity-20" />

              {/* Dynamic Header */}
              <div className="p-12 pb-0 shrink-0 relative overflow-hidden">
                {/* Navigation & Actions */}
                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigateMerchant('prev')}
                      className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#3A4DB7] hover:text-white transition-all disabled:opacity-20 shadow-sm"
                      disabled={filteredMerchants.findIndex(m => m.id === showDetailsModal.id) === 0}
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button 
                      onClick={() => navigateMerchant('next')}
                      className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#3A4DB7] hover:text-white transition-all disabled:opacity-20 shadow-sm"
                      disabled={filteredMerchants.findIndex(m => m.id === showDetailsModal.id) === filteredMerchants.length - 1}
                    >
                      <ChevronRight size={22} />
                    </button>
                    <div className="h-8 w-px bg-slate-100 mx-2" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                      Marchand {filteredMerchants.findIndex(m => m.id === showDetailsModal.id) + 1} / {filteredMerchants.length}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => setShowDetailsModal(null)} 
                    className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 border border-slate-100 hover:border-rose-500 shadow-sm transition-all"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Profile Identity */}
                <div className="flex items-start gap-10 relative z-10">
                   <motion.div 
                     initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                     animate={{ scale: 1, opacity: 1, rotate: 0 }}
                     transition={{ type: 'spring', damping: 20 }}
                     className="w-40 h-40 bg-slate-950 text-white rounded-[3.5rem] flex items-center justify-center font-black text-6xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white group relative"
                   >
                    {showDetailsModal.name.charAt(0)}
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                   </motion.div>
                   
                   <div className="flex-1 pt-4">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-wrap items-center gap-3 mb-6"
                    >
                      <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${showDetailsModal.isActive ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-rose-500'} animate-pulse`} />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.15em]">
                          {showDetailsModal.isActive ? 'En Ligne' : 'Hors Ligne'}
                        </span>
                      </div>
                      <div className={`px-4 py-2 rounded-2xl flex items-center gap-2.5 ${
                        showDetailsModal.kycStatus === 'Verified' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">{showDetailsModal.kycStatus === 'Verified' ? 'Identité Validée' : 'Vérification en cours'}</span>
                      </div>
                      <div className="px-4 py-2 bg-indigo-50 text-[#3A4DB7] border border-indigo-100 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">Réseau {showDetailsModal.plan}</span>
                      </div>
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-7xl font-black text-slate-950 tracking-tighter leading-[0.85] mb-6"
                    >
                      {showDetailsModal.name}
                    </motion.h3>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-8"
                    >
                       <div className="flex items-center gap-3 text-slate-400">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#3A4DB7]">
                            <User size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">{showDetailsModal.manager}</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-400">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#3A4DB7]">
                            <Globe size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">Abidjan, CIV</span>
                       </div>
                    </motion.div>
                   </div>
                </div>

                {/* Tabs Bar */}
                <div className="flex gap-12 mt-16 border-b border-slate-100 px-2 lg:px-4">
                  {[
                    { id: 'stats', label: 'Profil & Stats', icon: <UserCircle size={20} /> },
                    { id: 'kyc', label: 'Documents', icon: <FileCheck size={20} />, badge: showDetailsModal.kycStatus === 'Verified' ? null : '!' },
                    { id: 'billing', label: 'Finances', icon: <CreditCard size={20} /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDetailTab(tab.id as any)}
                      className={`flex items-center gap-3 py-6 text-[11px] font-black uppercase tracking-[0.25em] transition-all relative group ${
                        activeDetailTab === tab.id ? 'text-[#3A4DB7]' : 'text-slate-400 hover:text-slate-950'
                      }`}
                    >
                      <span className={`transition-transform duration-300 ${activeDetailTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {tab.icon}
                      </span>
                      {tab.label}
                      {tab.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-lg shadow-rose-500/30">
                          {tab.badge}
                        </span>
                      )}
                      {activeDetailTab === tab.id && (
                        <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 inset-x-0 h-[3px] bg-[#3A4DB7] rounded-full shadow-[0_-2px_10px_rgba(58,77,183,0.3)]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Ambient Background Decoration */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-50 -z-10" />
              </div>

              {/* Scrollable Viewport */}
              <div className="flex-1 overflow-y-auto p-12 no-scrollbar bg-[#F8FAFC]">
                <AnimatePresence mode="wait">
                  {activeDetailTab === 'stats' && (
                    <motion.div
                      key="stats"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="space-y-10"
                    >
                      {/* STATS HERO GRID */}
                      <div className="grid grid-cols-12 gap-6">
                        {/* MAIN VOLUME CARD */}
                        <div className="col-span-8 p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                           <div className="relative z-10">
                              <div className="flex items-center gap-4 mb-10">
                                 <div className="w-14 h-14 bg-indigo-50 text-[#3A4DB7] rounded-2xl flex items-center justify-center">
                                    <TrendingUp size={28} />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] mb-1">Activité Réseau (30j)</p>
                                    <h5 className="text-5xl font-black text-slate-950 tracking-tighter">{showDetailsModal.monthlyVolume} F</h5>
                                 </div>
                              </div>
                              
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-slate-400">
                                    <span>Taux de conversion</span>
                                    <span>94.2%</span>
                                 </div>
                                 <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: '94.2%' }}
                                      transition={{ duration: 1.5, ease: "circOut" }}
                                      className="h-full bg-gradient-to-r from-[#3A4DB7] to-indigo-400 rounded-full" 
                                    />
                                 </div>
                              </div>

                              <div className="mt-10 flex gap-8">
                                 <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-[11px] font-bold text-slate-600">Succès: 2.1k</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                    <span className="text-[11px] font-bold text-slate-600">Échecs: 12</span>
                                 </div>
                              </div>
                           </div>
                           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        {/* BALANCE PILL */}
                        <div className="col-span-4 p-10 bg-slate-950 rounded-[3.5rem] shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
                           <div className="relative z-10">
                              <p className="text-[10px] font-black text-indigo-300 tracking-[0.2em] mb-4">Solde de Service</p>
                              <h5 className="text-4xl font-black tracking-tighter mb-2">428 500 F</h5>
                              <p className="text-[10px] font-bold text-slate-400 italic">Dernière mise à jour: 14:02</p>
                           </div>
                           <div className="relative z-10 mt-12">
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                                 <div className="h-full w-2/3 bg-white rounded-full" />
                              </div>
                              <p className="text-[10px] font-black uppercase text-white/40 italic">75% du plafond utilisé</p>
                           </div>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-[60px] opacity-20 -mr-16 -mt-16" />
                        </div>
                      </div>

                      {/* NETWORK DISTRIBUTION */}
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 p-8 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
                           <div className="flex items-center gap-12 pl-4">
                              <div className="flex flex-col">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Points de Vente</span>
                                 <span className="text-3xl font-black text-slate-950 tracking-tighter">{showDetailsModal.agencies}</span>
                              </div>
                              <div className="w-px h-10 bg-slate-100" />
                              <div className="flex flex-col">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Agents Terrain Actifs</span>
                                 <span className="text-3xl font-black text-[#3A4DB7] tracking-tighter">{showDetailsModal.agents}</span>
                              </div>
                              <div className="w-px h-10 bg-slate-100" />
                              <div className="flex flex-col">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Capacité Transactionnelle</span>
                                 <span className="text-3xl font-black text-emerald-500 tracking-tighter uppercase">Illimité</span>
                              </div>
                           </div>
                           <button className="px-8 py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all shadow-sm group flex items-center gap-3">
                              Fiche Réseau <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                      </div>

                      {/* ADMINISTRATIVE RECORD */}
                      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm p-14 relative group">
                        <div className="flex items-center justify-between mb-12">
                           <div className="flex items-center gap-4">
                              <div className="w-3 h-8 bg-[#3A4DB7] rounded-full" />
                              <h4 className="text-3xl font-black text-slate-950 tracking-tight">Registre d'identité</h4>
                           </div>
                           <button className="flex items-center gap-3 px-8 py-4 bg-[#3A4DB7] text-white rounded-2xl text-[10px] font-black tracking-[0.1em] hover:shadow-2xl hover:bg-slate-900 transition-all">
                              <Edit3 size={16} /> Édition Administrative
                           </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-20 gap-y-12">
                           <DetailItem label="Directeur de Structure" value={showDetailsModal.manager} />
                           <DetailItem label="Canal de communication" value={showDetailsModal.email} />
                           <DetailItem label="Ligne Téléphonique" value={showDetailsModal.phone} />
                           <DetailItem label="Immatriculation (RCCM)" value={showDetailsModal.id.replace('M-', 'RCCM-CIV-ABJ-')} />
                           <DetailItem label="Localisation Siège" value="Cocody, Cité des Arts, Abidjan" />
                           <DetailItem label="Dernière Maintenance" value="Aujourd'hui à 09:44" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDetailTab === 'kyc' && (
                    <motion.div
                      key="kyc"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      {/* AUDIT TIMELINE */}
                      <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 flex items-center justify-between shadow-sm">
                        {[
                          { step: 'Dépôt', desc: 'Dossier Reçu', status: 'done' },
                          { step: 'Analyse', desc: 'Vérification IA', status: 'done' },
                          { step: 'Conformité', desc: 'Validation Humaine', status: showDetailsModal.kycStatus === 'Verified' ? 'done' : 'active' },
                          { step: 'Activation', desc: 'Accès Réseau', status: showDetailsModal.kycStatus === 'Verified' ? 'done' : 'pending' }
                        ].map((s, i, arr) => (
                          <React.Fragment key={i}>
                            <div className="flex flex-col items-center text-center px-4 relative z-10">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                                s.status === 'done' ? 'bg-[#3A4DB7] text-white shadow-lg shadow-indigo-500/20' : 
                                s.status === 'active' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 scale-110' : 
                                'bg-slate-100 text-slate-400'
                              }`}>
                                {s.status === 'done' ? <CheckCircle2 size={20} /> : <div className="text-[10px] font-black">{i + 1}</div>}
                              </div>
                              <p className="text-[10px] font-black text-slate-900 tracking-widest">{s.step}</p>
                              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">{s.desc}</p>
                            </div>
                            {i < arr.length - 1 && (
                              <div className="flex-1 h-px bg-slate-100 relative top-[-10px]">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: s.status === 'done' ? '100%' : '0%' }}
                                  className="h-full bg-[#3A4DB7]" 
                                />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* DOCUMENT INTERFACE */}
                      <div className="bg-white rounded-[3.5rem] border border-slate-100 p-12 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-12">
                           <div>
                              <h4 className="text-2xl font-black text-slate-950 tracking-tight">Audit Documentaire</h4>
                              <p className="text-sm font-bold text-slate-400 mt-1">Cliquez sur un document pour l'inspecter en plein écran</p>
                           </div>
                           <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl">
                              <FileText size={16} className="text-[#3A4DB7]" />
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                 {showDetailsModal.kycDocs.length} Pièces à conviction
                              </span>
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8">
                           {showDetailsModal.kycDocs.map((doc, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setActiveKycDoc(doc.name)}
                                className="group relative p-8 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:border-[#3A4DB7] hover:bg-white transition-all cursor-pointer overflow-hidden"
                              >
                                 <div className="flex items-start justify-between relative z-10">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#3A4DB7] group-hover:scale-110 transition-all border border-slate-50 shadow-sm">
                                       <FileText size={28} />
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                                      showDetailsModal.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                       {showDetailsModal.kycStatus === 'Verified' ? 'Validé' : 'En attente'}
                                    </div>
                                 </div>
                                 
                                 <div className="mt-8 relative z-10">
                                    <span className="text-[9px] font-black text-[#3A4DB7] tracking-[0.2em] mb-2 block">{doc.type}</span>
                                    <p className="font-black text-xl text-slate-950 tracking-tight group-hover:text-[#3A4DB7] transition-colors">{doc.name}</p>
                                 </div>

                                 <div className="mt-6 flex items-center gap-3 relative z-10 pt-6 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                       <Eye size={14} /> Aperçu rapide
                                    </span>
                                 </div>
                                 
                                 {/* Hover visual */}
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-50 -mr-16 -mt-16 transition-opacity" />
                              </motion.div>
                           ))}
                        </div>
                      </div>

                      {/* FLOATING ACTION GATEWAY (Only if not verified) */}
                      {showDetailsModal.kycStatus !== 'Verified' && (
                        <motion.div 
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="bg-slate-950 rounded-[3rem] p-10 flex items-center justify-between shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-white/10 sticky bottom-4 z-[50]"
                        >
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center animate-pulse">
                                 <ShieldCheck size={28} />
                              </div>
                              <div>
                                 <h5 className="text-xl font-black text-white tracking-tight">Décision Administrative</h5>
                                 <p className="text-sm font-bold text-slate-400 mt-0.5 tracking-tight">Le compte sera activé instantanément après l'approbation.</p>
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <button 
                                onClick={() => handleKycAction(showDetailsModal.id, 'reject')}
                                className="px-10 py-5 bg-white/5 border border-white/10 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-500 transition-all"
                              >
                                 Notifications Rejet
                              </button>
                              <button 
                                onClick={() => handleKycAction(showDetailsModal.id, 'approve')}
                                className="px-12 py-5 bg-[#3A4DB7] text-white rounded-3xl font-black text-[11px] tracking-widest hover:bg-white hover:text-[#3A4DB7] transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3"
                              >
                                 <CheckCircle2 size={18} /> Approuver l'inscription
                              </button>
                           </div>
                         </motion.div>
                      )}
                    </motion.div>
                  )}

                  {activeDetailTab === 'billing' && (
                    <motion.div
                      key="billing"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-12"
                    >
                      {/* SUBSCRIPTION CENTER */}
                      <div className="p-14 bg-slate-950 rounded-[4.5rem] text-white relative overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.3)] border border-white/5 group">
                         <div className="relative z-10">
                            <div className="flex items-center justify-between mb-16 px-2">
                               <div className="flex items-center gap-6">
                                  <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center backdrop-blur-2xl border border-white/10 shadow-2xl">
                                     <Zap size={36} className="text-indigo-400" />
                                  </div>
                                  <div>
                                     <h4 className="text-5xl font-black tracking-tighter leading-none mb-2">Abonnement {showDetailsModal.plan}</h4>
                                     <p className="text-slate-400 font-bold text-base tracking-tight italic opacity-60">Status de facturation : Actif & Conforme</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <div className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 mb-3 inline-block">Prochain Débit</div>
                                  <p className="text-3xl font-black tracking-tight">{showDetailsModal.expiresAt}</p>
                               </div>
                            </div>

                            <div className="grid grid-cols-3 gap-12 py-12 border-y border-white/5 mb-14 bg-white/[0.02] rounded-[3rem] px-10">
                               <div className="space-y-2">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-40">Passerelle Dominante</p>
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <CreditCard size={14} className="text-indigo-300" />
                                     </div>
                                     <p className="font-black text-indigo-100 text-lg">Wave Money</p>
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-40">Cumul de commissionnement</p>
                                  <p className="font-black text-indigo-100 text-lg uppercase tracking-tight">Standard (1.5%)</p>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-40">Engagement</p>
                                  <p className="font-black text-emerald-400 text-lg uppercase tracking-tight">Post-payé mensuel</p>
                               </div>
                            </div>

                            <div className="flex gap-6">
                               <button 
                                 onClick={() => {
                                   setShowPlanModal(showDetailsModal);
                                   setShowDetailsModal(null);
                                 }}
                                 className="px-12 py-6 bg-white text-slate-950 rounded-[2.5rem] font-black text-[13px] uppercase tracking-widest hover:bg-indigo-100 transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-95"
                               >
                                  Optimiser le Forfait
                               </button>
                               <button className="px-10 py-6 bg-white/5 border border-white/10 rounded-[2.5rem] font-black text-[13px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                                  <DownloadCloud size={18} className="opacity-40" /> Historique Factures
                               </button>
                            </div>
                         </div>
                         
                         {/* Elite Accents */}
                         <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-600 rounded-full blur-[180px] opacity-20 -mr-60 -mt-60 group-hover:opacity-40 transition-opacity duration-1000" />
                         <div className="absolute bottom-[-10%] w-full h-1/2 bg-gradient-to-t from-indigo-950/60 to-transparent pointer-events-none" />
                      </div>

                      {/* STATEMENT LEDGER */}
                      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden p-12">
                         <div className="flex items-center justify-between mb-12 pl-4">
                            <div className="flex items-center gap-4">
                               <div className="w-2.5 h-10 bg-[#3A4DB7] rounded-full" />
                               <h4 className="text-3xl font-black text-slate-950 tracking-tight">Registre des Règlements</h4>
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                               Total : 24 Écritures
                            </div>
                         </div>
                         <div className="space-y-4">
                            <BillingItem date="24 Avril 2026" amount="29 900 F" refId="TX-REC-88219" mode="Master Gateway" />
                            <BillingItem date="24 Mars 2026" amount="29 900 F" refId="TX-REC-77402" mode="Secondary Pipe" />
                            <BillingItem date="24 Février 2026" amount="09 900 F" refId="TX-REC-66190" mode="Master Gateway" />
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* STICKY FOOTER ACTIONS */}
              <div className="p-12 pt-8 border-t border-slate-100 bg-white flex gap-6 mt-auto z-20">
                <button 
                  onClick={() => toggleStatus(showDetailsModal.id)}
                  className={`flex-[1.5] py-6 px-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] shadow-2xl transition-all hover:scale-[1.03] flex items-center justify-center gap-4 ${
                    showDetailsModal.isActive 
                      ? 'bg-white text-rose-500 border-2 border-rose-100 shadow-rose-500/5' 
                      : 'bg-emerald-500 text-white shadow-emerald-500/20'
                  }`}
                >
                  {showDetailsModal.isActive ? <Lock size={20} /> : <Unlock size={20} />}
                  {showDetailsModal.isActive ? 'Suspendre' : 'Réactiver l\'accès'}
                </button>
                
                <button 
                  className="flex-1 py-6 px-8 bg-slate-950 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <MessageSquare size={18} className="text-white/40" />
                  Envoyer Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAN MANAGEMENT MODAL */}
      <AnimatePresence>
        {showPlanModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowPlanModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                   <h3 className="text-2xl font-black text-slate-950 tracking-tight">Configuration de l'Offre</h3>
                   <p className="text-sm font-medium text-slate-400 mt-1">Gérer les privilèges de <span className="text-[#3A4DB7] font-bold">{showPlanModal.name}</span></p>
                </div>
                <button onClick={() => setShowPlanModal(null)} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all">
                   <X size={20} />
                </button>
              </div>

              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { type: 'Starter' as MerchantPlan, price: '9 900 F', desc: '5 agences, 10 agents' },
                      { type: 'Pro' as MerchantPlan, price: '29 900 F', desc: 'Unlimited agencies, 50 agents' },
                      { type: 'Business' as MerchantPlan, price: '99 000 F', desc: 'Full access, Priority support' },
                      { type: 'Enterprise' as MerchantPlan, price: 'Contact', desc: 'Custom infrastructure & limits' }
                    ].map((plan) => (
                      <div 
                        key={plan.type}
                        onClick={() => handlePlanChange(showPlanModal.id, plan.type)}
                        className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col gap-3 group relative overflow-hidden ${
                          showPlanModal.plan === plan.type 
                            ? 'border-[#3A4DB7] bg-indigo-50/30' 
                            : 'border-slate-100 hover:border-indigo-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${showPlanModal.plan === plan.type ? 'text-[#3A4DB7]' : 'text-slate-400'}`}>
                            {plan.type}
                          </span>
                          {showPlanModal.plan === plan.type && (
                            <CheckCircle2 size={16} className="text-[#3A4DB7]" />
                          )}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-950 tracking-tighter">{plan.price}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 leading-relaxed">{plan.desc}</p>
                        </div>
                        
                        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-[#3A4DB7]/5 rounded-full group-hover:scale-150 transition-transform" />
                      </div>
                    ))}
                 </div>

                 <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 border border-slate-100 shadow-sm">
                          <CreditCard size={18} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-950 uppercase tracking-tight">Règles d'activation automatique</p>
                          <p className="text-[10px] font-medium text-slate-400">En confirmant ce plan, l'accès est immédiatement prolongé de 12 mois.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                       <ShieldCheck className="text-emerald-500" size={14} />
                       <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Pérennité du compte garantie</span>
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-slate-950 flex gap-4">
                 <button 
                  onClick={() => setShowPlanModal(null)}
                  className="flex-1 py-5 bg-white/10 hover:bg-white/20 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all"
                 >
                   Annuler l'ajustement
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX FOR DOCUMENTS */}
      <AnimatePresence>
        {activeKycDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-20"
          >
            <button 
              onClick={() => setActiveKycDoc(null)}
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
            >
              <XCircle size={48} strokeWidth={1} />
            </button>
            
            <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center gap-8">
               <div className="w-full bg-slate-900 rounded-[3rem] border border-white/10 aspect-[4/3] flex items-center justify-center relative shadow-2xl overflow-hidden">
                  <FileText size={120} className="text-[#3A4DB7] opacity-40" />
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-950 to-transparent text-center">
                     <p className="text-white text-2xl font-black">{activeKycDoc}</p>
                     <p className="text-slate-400 font-medium mt-2">Visualisation sécurisée du document original</p>
                  </div>
               </div>
               
               <div className="flex gap-6">
                  <button className="px-12 py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all">
                     Approuver Document
                  </button>
                  <button className="px-12 py-5 bg-white/10 border border-white/20 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                     Signaler Anomalie
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1.5 p-6 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
       <p className="text-sm font-black text-slate-900 tracking-tight leading-none">{value}</p>
    </div>
  );
}

function BillingItem({ date, amount, refId, mode }: { date: string, amount: string, refId: string, mode: string }) {
  return (
    <div className="flex items-center justify-between p-8 hover:bg-slate-50 transition-all group">
       <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#3A4DB7] group-hover:text-white group-hover:border-[#3A4DB7] transition-all shadow-sm">
             <Calendar size={18} />
          </div>
          <div>
             <p className="text-sm font-black text-slate-950 mb-1">{date}</p>
             <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{refId}</span>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{mode}</span>
             </div>
          </div>
       </div>
       <div className="text-right">
          <p className="text-lg font-black text-slate-950 tracking-tighter mb-0.5">+{amount}</p>
          <div className="flex items-center justify-end gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Succès</span>
          </div>
       </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-bold text-slate-900 tracking-tight">{value}</span>
    </div>
  );
}

function BillingRow({ date, amount, status }: { date: string, amount: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-6">
       <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
             <Calendar size={14} />
          </div>
          <div>
             <p className="text-xs font-black text-slate-950">{date}</p>
             <p className="text-[9px] font-bold text-slate-400 uppercase">Paiement Récurrent</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-sm font-black text-emerald-600">{amount}</p>
          <span className="text-[8px] font-black text-emerald-500 uppercase">{status}</span>
       </div>
    </div>
  );
}

/* ------------------- VIEW: PLANS (OFFRES) ------------------- */
interface Plan {
  id: string;
  code: string;
  label: string;
  price: number;
  agencyLimit: number;
  description: string;
  isActive: boolean;
}

const INITIAL_PLANS: Plan[] = [
  { id: "1", code: "STARTER", label: "Starter", price: 9900, agencyLimit: 1, description: "Pour les petites structures", isActive: true },
  { id: "2", code: "PRO", label: "Pro", price: 29900, agencyLimit: 5, description: "Pour les marchands en croissance", isActive: true },
  { id: "3", code: "ENTERPRISE", label: "Enterprise", price: 79900, agencyLimit: 20, description: "Pour les réseaux et grands comptes", isActive: true },
];

function PlansView() {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showToast, setShowToast] = useState<{message: string, type: 'success' | 'alert'} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Form State for Create/Edit
  const [planForm, setPlanForm] = useState({
    code: "",
    label: "",
    price: "",
    agencyLimit: "",
    description: "",
    isActive: true
  });

  const openAddModal = () => {
    setEditingPlan(null);
    setPlanForm({ code: "", label: "", price: "", agencyLimit: "", description: "", isActive: true });
    setIsModalOpen(true);
  };

  const openEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setPlanForm({
      code: plan.code,
      label: plan.label,
      price: plan.price.toString(),
      agencyLimit: plan.agencyLimit.toString(),
      description: plan.description,
      isActive: plan.isActive
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlans(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    const plan = plans.find(p => p.id === id);
    setShowToast({ 
      message: `Plan ${!plan?.isActive ? 'activé' : 'désactivé'} avec succès`, 
      type: 'success' 
    });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleSavePlan = () => {
    if(!planForm.code || !planForm.label) {
       setShowToast({ message: "Veuillez remplir au moins le code et le libellé", type: 'alert' });
       setTimeout(() => setShowToast(null), 3000);
       return;
    }
    
    if (editingPlan) {
      // Update
      setPlans(prev => prev.map(p => p.id === editingPlan.id ? {
        ...p,
        code: planForm.code.toUpperCase(),
        label: planForm.label,
        price: Number(planForm.price) || 0,
        agencyLimit: Number(planForm.agencyLimit) || 0,
        description: planForm.description,
        isActive: planForm.isActive
      } : p));
      setShowToast({ message: "Plan mis à jour avec succès", type: 'success' });
    } else {
      // Create
      const planToAdd: Plan = {
        id: Math.random().toString(36).substr(2, 9),
        code: planForm.code.toUpperCase(),
        label: planForm.label,
        price: Number(planForm.price) || 0,
        agencyLimit: Number(planForm.agencyLimit) || 0,
        description: planForm.description,
        isActive: planForm.isActive
      };
      setPlans([planToAdd, ...plans]);
      setShowToast({ message: "Nouveau plan créé avec succès", type: 'success' });
    }

    setIsModalOpen(false);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleDeletePlan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlans(prev => prev.filter(p => p.id !== id));
    setShowToast({ message: "Plan supprimé du catalogue", type: 'alert' });
    setTimeout(() => setShowToast(null), 3000);
  };

  const filteredPlans = plans.filter(p => 
    p.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-20"
    >
      {/* TOAST NOTIFICATION SYSTEM */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 40, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className={`fixed top-0 left-1/2 z-[200] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-4 border backdrop-blur-md ${
              showToast.type === 'success' ? 'bg-indigo-600/90 text-white border-indigo-400' : 'bg-rose-500/90 text-white border-rose-400'
            }`}
          >
            {showToast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-950">Plans d'abonnement</h2>
            <p className="text-slate-400 font-medium">Pilotez le catalogue commercial de FinTrack sans changer la logique déjà en place.</p>
         </div>
         <button 
           onClick={openAddModal}
           className="flex items-center gap-3 px-8 py-5 bg-[#3A4DB7] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all"
         >
            <Plus size={18} /> Nouveau Plan
         </button>
      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
         {isModalOpen && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[250]"
                  onClick={() => setIsModalOpen(false)}
               />
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[3rem] z-[260] shadow-2xl overflow-hidden"
               >
                  <div className="p-12 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                     <div>
                        <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                           {editingPlan ? "Modifier l'Offre" : "Configuration Offre"}
                        </h3>
                        <p className="text-slate-400 font-medium text-sm mt-1">Définissez les paramètres du plan.</p>
                     </div>
                     <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors">
                        <XCircle size={32} strokeWidth={1.5} />
                     </button>
                  </div>
                  <div className="p-12 space-y-8">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Code du Plan</label>
                           <input 
                              type="text" placeholder="ex: STARTER_PLUS" 
                              value={planForm.code} onChange={e => setPlanForm({...planForm, code: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-[#3A4DB7] focus:bg-white outline-none transition-all" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Libellé Affiché</label>
                           <input 
                              type="text" placeholder="ex: Pack Starter Plus" 
                              value={planForm.label} onChange={e => setPlanForm({...planForm, label: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-[#3A4DB7] focus:bg-white outline-none transition-all" 
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Prix Mensuel (FCFA)</label>
                           <input 
                              type="number" placeholder="9900" 
                              value={planForm.price} onChange={e => setPlanForm({...planForm, price: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-[#3A4DB7] focus:bg-white outline-none transition-all" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Limite Agences</label>
                           <input 
                              type="number" placeholder="1" 
                              value={planForm.agencyLimit} onChange={e => setPlanForm({...planForm, agencyLimit: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-[#3A4DB7] focus:bg-white outline-none transition-all" 
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Description Commerciale</label>
                        <textarea 
                           placeholder="Quels sont les avantages de ce plan ?" 
                           value={planForm.description} onChange={e => setPlanForm({...planForm, description: e.target.value})}
                           className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold focus:border-[#3A4DB7] focus:bg-white outline-none transition-all min-h-[120px] resize-none"
                        ></textarea>
                     </div>

                     <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-slate-900 uppercase tracking-tight">Statut du plan</span>
                           <span className="text-[10px] font-medium text-slate-400">Le plan sera immédiatement visible dans le catalogue.</span>
                        </div>
                        <div 
                           onClick={() => setPlanForm({...planForm, isActive: !planForm.isActive})}
                           className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-300 ${planForm.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
                        >
                           <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${planForm.isActive ? 'translate-x-7' : 'translate-x-0'}`} />
                        </div>
                     </div>

                     <div className="pt-4 flex gap-4">
                        <button 
                           onClick={handleSavePlan}
                           className="flex-1 py-5 bg-[#234D96] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all border-4 border-white"
                        >
                           {editingPlan ? "Actualiser le Plan" : "Lancer l'Offre"}
                        </button>
                        <button 
                           onClick={() => setIsModalOpen(false)}
                           className="px-10 py-5 bg-slate-50 border-2 border-slate-100 text-slate-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                        >
                           Annuler
                        </button>
                     </div>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: "PLANS", val: plans.length, sub: "Catalogue total", icon: <Layers className="text-[#234D96]" size={20} />, bg: "bg-indigo-50" },
           { label: "ACTIFS", val: plans.filter(p => p.isActive).length, sub: "Commercialisables", icon: <CheckCircle2 className="text-emerald-500" size={20} />, bg: "bg-emerald-50" },
           { label: "INACTIFS", val: plans.filter(p => !p.isActive).length, sub: "Masqués ou suspendus", icon: <XCircle className="text-rose-500" size={20} />, bg: "bg-rose-50" },
           { label: "LIMITE MOYENNE", val: Math.round(plans.reduce((acc, curr) => acc + curr.agencyLimit, 0) / (plans.length || 1)), sub: "Agences autorisées", icon: <CreditCard className="text-amber-500" size={20} />, bg: "bg-amber-50" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm flex items-start justify-between group hover:shadow-md transition-all">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
                 <span className="text-4xl font-black text-slate-950 tracking-tighter">{stat.val}</span>
                 <p className="text-[11px] font-medium text-slate-400 mt-2">{stat.sub}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                 {stat.icon}
              </div>
           </div>
         ))}
      </div>

      {/* CATALOG TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden">
         <div className="p-10 border-b border-slate-100 flex items-center justify-between">
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Catalogue actuel</h3>
               <p className="text-xs font-bold text-slate-400 mt-1">{filteredPlans.length} plan(s) visible(s)</p>
            </div>
            <div className="flex gap-4">
               <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" placeholder="Rechercher un plan..." 
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-50 w-72 shadow-inner" 
                  />
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50">
                  <tr className="border-b border-slate-100">
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-left">Identifiant</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-left">Nom du Plan</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-left">Tarif (FCFA)</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-center">Max Agences</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-left">Résumé Commercial</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-center">Visibilité</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredPlans.map((plan) => (
                     <tr key={plan.id} className="hover:bg-indigo-50/20 transition-colors group">
                        <td className="px-10 py-8">
                           <span className="font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg text-xs tracking-wider border border-slate-200">{plan.code}</span>
                        </td>
                        <td className="px-10 py-8">
                           <span className="font-black text-slate-800 text-sm">{plan.label}</span>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900">{plan.price.toLocaleString()}</span>
                              <span className="text-[10px] font-black text-slate-400 lowercase">fcfa</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <span className="font-black text-slate-900 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 text-xs">{plan.agencyLimit}</span>
                        </td>
                        <td className="px-10 py-8">
                           <p className="text-xs font-bold text-slate-400 max-w-[200px] line-clamp-1">{plan.description}</p>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex justify-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border inline-flex items-center gap-2 ${
                                 plan.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                              }`}>
                                 <div className={`w-1 h-1 rounded-full ${plan.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                 {plan.isActive ? 'Actif' : 'Inactif'}
                              </span>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center justify-end gap-3 transition-opacity">
                              <button 
                                onClick={(e) => handleToggleStatus(plan.id, e)}
                                className={`p-3 border rounded-xl transition-all shadow-sm ${
                                  plan.isActive 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white' 
                                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-900 hover:text-white'
                                }`}
                                title={plan.isActive ? "Désactiver le plan" : "Activer le plan"}
                              >
                                 {plan.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                              <button 
                                onClick={() => openEditModal(plan)}
                                className="p-3 bg-white border border-slate-200 text-[#234D96] rounded-xl hover:bg-[#234D96] hover:text-white transition-all shadow-sm"
                                title="Modifier le plan"
                              >
                                 <Settings size={18} />
                              </button>
                              <button 
                                onClick={(e) => handleDeletePlan(plan.id, e)}
                                className="p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                title="Supprimer le plan"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}

/* ------------------- VIEW: SUPPORT ------------------- */
function SupportView() {
  const [activeTicketTab, setActiveTicketTab] = useState<'open' | 'closed'>('open');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="flex items-center justify-between">
         <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter text-slate-950 leading-none">Support & <span className="text-[#234D96]">Retours</span></h2>
            <p className="text-slate-400 font-medium italic">Gérez les demandes d'assistance des marchands et les retours utilisateurs.</p>
         </div>
         <div className="flex bg-white/60 p-2 rounded-3xl border border-slate-200/60 shadow-sm">
            <button 
               onClick={() => setActiveTicketTab('open')}
               className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTicketTab === 'open' ? 'bg-[#234D96] text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
            >
               Ouverts (12)
            </button>
            <button 
               onClick={() => setActiveTicketTab('closed')}
               className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTicketTab === 'closed' ? 'bg-[#234D96] text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
            >
               Résolus
            </button>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-8 space-y-6">
            {[1, 2, 3].map((ticket) => (
               <div key={ticket} className="bg-white p-8 rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-8">
                     <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-[1.5rem] flex items-center justify-center border border-slate-100 group-hover:bg-[#234D96] group-hover:text-white transition-all">
                           <MessageSquare size={24} />
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-xl font-black text-slate-900 tracking-tight">Problème d'impression sur terminal Sunmi V2</h4>
                           <p className="text-xs font-bold text-slate-400 tracking-widest text-[#234D96]">Pharmacie du Pont <span className="text-slate-300 mx-2">•</span> Il y a 2h</p>
                        </div>
                     </div>
                     <span className="px-5 py-2 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black tracking-widest border border-rose-100">Haute Priorité</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed font-sans px-2">
                     Le ticket de clôture journalière ne s'imprime pas correctement. Le texte est coupé à droite. J'ai essayé de redémarrer l'application mais le problème persiste...
                  </p>
                  <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                     <div className="flex -space-x-3">
                        <div className="w-10 h-10 bg-slate-950 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white">JY</div>
                        <div className="w-10 h-10 bg-[#234D96] rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white font-sans">+1</div>
                     </div>
                     <button className="flex items-center gap-3 text-[10px] font-black text-slate-900 tracking-widest hover:text-[#234D96] transition-colors">
                        Voir la conversation <ArrowRight size={14} />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <div className="col-span-4 space-y-10">
             <div className="bg-[#234D96] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                   <div className="flex items-center gap-4">
                      <Star size={20} className="text-amber-400" />
                      <h3 className="text-xl font-black tracking-tight">Analyse de Satisfaction</h3>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-indigo-200">
                         <span>Score CSAT</span>
                         <span className="text-white">4.8/5</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl">
                         <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.3)]" />
                      </div>
                   </div>
                   <p className="text-indigo-100 text-[11px] font-medium opacity-60 leading-relaxed font-sans italic">
                      "La réactivité de l'équipe technique est exceptionnelle. Les retours sur les bugs sont traités en moins de 24h."
                   </p>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                   <AlertCircle size={20} className="text-rose-500" />
                   <h3 className="text-xl font-black text-slate-950 tracking-tight">Stats Support</h3>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temps Moyen de Réponse</span>
                      <span className="text-sm font-black text-slate-900">1h 12m</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taux de Résolution</span>
                      <span className="text-sm font-black text-emerald-500">92%</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tickets d'Urgence</span>
                      <span className="text-sm font-black text-rose-500">2</span>
                   </div>
                </div>
             </div>
         </div>
      </div>
    </motion.div>
  );
}

/* ------------------- VIEW: SETTINGS ------------------- */
function SettingsView() {
  const [activeSubTab, setActiveSubTab] = useState<'platform' | 'gateways' | 'security' | 'team'>('platform');
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-10 pb-20"
    >
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -40, x: '-50%' }}
            animate={{ opacity: 1, y: 40, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[200] px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-4 border border-emerald-400"
          >
            <CheckCircle2 size={20} /> Configuration enregistrée avec succès
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-950">Paramètres Système</h2>
            <p className="text-slate-400 font-medium italic">Configuration globale des moteurs de FinTrack.</p>
         </div>
      </div>

      <div className="flex gap-4 p-2 bg-white/60 backdrop-blur-md rounded-[2rem] border border-slate-200/60 w-fit self-start">
         {[
           { id: 'platform', label: 'Plateforme', icon: <Cpu size={16} /> },
           { id: 'gateways', label: 'Passerelles', icon: <Globe size={16} /> },
           { id: 'security', label: 'Sécurité', icon: <ShieldCheck size={16} /> },
           { id: 'team', label: 'Équipe Admin', icon: <Users size={16} /> }
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveSubTab(tab.id as any)}
             className={`px-6 py-3.5 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${
               activeSubTab === tab.id 
                 ? 'bg-[#234D96] text-white shadow-xl shadow-indigo-900/20' 
                 : 'text-slate-400 hover:bg-white hover:text-slate-900'
             }`}
           >
             {tab.icon} {tab.label}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-10 mt-6">
         {/* LEFT SETTINGS PANEL */}
         <div className="col-span-8 space-y-8">
            {activeSubTab === 'platform' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-8">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-1.5 h-10 bg-[#3A4DB7] rounded-full" />
                      <h3 className="text-xl font-black text-slate-900">Identité Visuelle</h3>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Nom de l'application</label>
                         <input 
                           type="text" defaultValue="FinTrack Hub" 
                           className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:border-[#3A4DB7] outline-none transition-all"
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Slogan principal</label>
                         <input 
                           type="text" defaultValue="Le moteur de facturation IA" 
                           className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:border-[#3A4DB7] outline-none transition-all"
                         />
                      </div>
                   </div>

                   <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                      <div className="w-24 h-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 gap-2 cursor-pointer hover:border-[#3A4DB7] hover:text-[#3A4DB7] transition-all">
                         <Plus size={24} />
                         <span className="text-[8px] font-black">Logo</span>
                      </div>
                      <div className="flex-1 space-y-2">
                         <h4 className="text-sm font-black text-slate-900">Logo de la Plateforme</h4>
                         <p className="text-xs text-slate-400 font-medium">Format SVG ou PNG transparent recommandé. Taille max 2Mo.</p>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-8">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-1.5 h-10 bg-[#3A4DB7] rounded-full" />
                      <h3 className="text-xl font-black text-slate-900">Localisation & Devise</h3>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Fuseau Horaire</label>
                         <select className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:border-[#3A4DB7] outline-none appearance-none">
                            <option>(GMT+00:00) Abidjan / Dakar</option>
                            <option>(GMT+01:00) Paris / Bruxelles</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Devise par défaut</label>
                         <select className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:border-[#3A4DB7] outline-none appearance-none">
                            <option>FCFA (Afrique de l'Ouest)</option>
                            <option>EUR (Euro)</option>
                            <option>USD (Dollar US)</option>
                         </select>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSubTab === 'gateways' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-10">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-1.5 h-10 bg-[#3A4DB7] rounded-full" />
                         <h3 className="text-xl font-black text-slate-900">Passerelles Mobile Money</h3>
                      </div>
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-500 rounded-xl text-[10px] font-black tracking-widest border border-emerald-100">3 Actives</span>
                   </div>

                   <div className="space-y-4">
                      {[
                        { name: 'Wave Money', code: 'wave', status: true, color: 'bg-indigo-400' },
                        { name: 'Orange Money', code: 'orange', status: true, color: 'bg-orange-500' },
                        { name: 'Moov Money', code: 'moov', status: false, color: 'bg-blue-600' }
                      ].map(gateway => (
                        <div key={gateway.code} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                           <div className="flex items-center gap-5">
                              <div className={`w-12 h-12 rounded-2xl ${gateway.color} flex items-center justify-center text-white font-black text-xs shadow-lg`}>
                                 {gateway.name[0]}
                              </div>
                              <div>
                                 <h4 className="font-black text-slate-900">{gateway.name}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 tracking-widest">Connecteur API v3.2</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#3A4DB7] hover:bg-[#3A4DB7] hover:text-white transition-all shadow-sm">Configurer</button>
                              <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${gateway.status ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                 <div className={`w-4 h-4 bg-white rounded-full transition-all ${gateway.status ? 'translate-x-6' : ''}`} />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="pt-4">
                      <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-3 text-slate-400 hover:text-[#3A4DB7] hover:border-[#3A4DB7] transition-all font-black text-xs tracking-widest group">
                         <Plus size={18} className="group-hover:scale-125 transition-transform" /> Ajouter une nouvelle passerelle
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {activeSubTab === 'security' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-10">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-1.5 h-10 bg-rose-500 rounded-full" />
                      <h3 className="text-xl font-black text-slate-900">Contrôles Systèmes Critiques</h3>
                   </div>

                   <div className="space-y-10">
                      <div className="flex items-center justify-between">
                         <div className="max-w-[70%] space-y-1">
                            <h4 className="text-base font-black text-slate-900">Mode Maintenance</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">Suspendre l'accès public à l'application. Seuls les administrateurs pourront se connecter pour effectuer des mises à jour.</p>
                         </div>
                         <div 
                           onClick={() => setIsMaintenance(!isMaintenance)}
                           className={`w-16 h-8 rounded-full p-1 cursor-pointer transition-all ${isMaintenance ? 'bg-rose-500' : 'bg-slate-200'}`}
                         >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all ${isMaintenance ? 'translate-x-8' : ''}`} />
                         </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-50 pt-10">
                         <div className="max-w-[70%] space-y-1">
                            <h4 className="text-base font-black text-slate-900">Inscriptions Publiques</h4>
                            <p className="text-xs text-slate-400 font-medium font-sans">Autoriser de nouveaux marchands à s'inscrire sur la plateforme en libre-service.</p>
                         </div>
                         <div 
                           onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                           className={`w-16 h-8 rounded-full p-1 cursor-pointer transition-all ${isRegistrationOpen ? 'bg-emerald-500' : 'bg-slate-200'}`}
                         >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all ${isRegistrationOpen ? 'translate-x-8' : ''}`} />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                   <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-4">
                         <Lock size={20} className="text-rose-400" />
                         <h3 className="text-xl font-black tracking-tight">Réinitialisation des Données</h3>
                      </div>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed font-sans italic opacity-60">Cette opération supprimera définitivement tous les logs de transactions de plus de 2 ans pour libérer de l'espace sur les serveurs FinTrack.</p>
                      <button className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-[10px] tracking-widest transition-all shadow-xl shadow-rose-900/40">Exécuter le Nettoyage</button>
                   </div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full blur-[100px] opacity-10 -mr-20 -mt-20 group-hover:opacity-20 transition-opacity" />
                </div>
              </motion.div>
            )}

            {activeSubTab === 'team' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-10">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-1.5 h-10 bg-[#234D96] rounded-full" />
                             <h3 className="text-xl font-black text-slate-900">Équipe Administrative</h3>
                          </div>
                          <button className="flex items-center gap-2 px-5 py-3 bg-[#234D96]/10 text-[#234D96] rounded-xl font-black text-[10px] tracking-widest hover:bg-[#234D96] hover:text-white transition-all">
                             <Plus size={16} /> Ajouter Collaborateur
                          </button>
                       </div>

                   <div className="space-y-4">
                      {[
                        { name: 'Koffi G. Jean', role: 'Super Admin', email: 'koffi@fintrack.ci', avatar: 'KG' },
                        { name: 'Sika Yao', role: 'Audit Manager', email: 'sika@fintrack.ci', avatar: 'SY' }
                      ].map((member, i) => (
                        <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-indigo-50 text-[#3A4DB7] rounded-2xl flex items-center justify-center font-black text-base border border-indigo-100 shadow-sm">
                                 {member.avatar}
                              </div>
                              <div className="space-y-1">
                                 <h4 className="font-black text-slate-950 text-sm tracking-tight">{member.name}</h4>
                                 <p className="text-xs text-slate-400 font-bold">{member.email}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-8 text-right">
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Permissions</p>
                                 <span className="text-[10px] font-black text-indigo-100 bg-[#3A4DB7] px-3 py-1 rounded-lg">{member.role}</span>
                              </div>
                              <button className="p-3 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18} /></button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}
         </div>

         {/* RIGHT SIDEBAR STATS/HELPER */}
         <div className="col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-8 relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="text-lg font-black text-slate-950 tracking-tight leading-tight">État de la<br/>Infrastructure</h4>
                  <div className="mt-8 space-y-6">
                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base de Données</span>
                           <span className="text-[10px] font-black text-emerald-500">99.9% Up</span>
                        </div>
                        <div className="h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: '99%' }} className="h-full bg-emerald-500 rounded-full" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stockage (S3)</span>
                           <span className="text-[10px] font-black text-emerald-500">42% Utilisé</span>
                        </div>
                        <div className="h-2 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="h-full bg-[#3A4DB7] rounded-full" />
                        </div>
                     </div>
                  </div>

                  <div className="mt-10 p-6 bg-slate-950 rounded-3xl text-white">
                     <div className="flex items-center gap-3 mb-4">
                        <Zap size={18} className="text-indigo-400" />
                        <h5 className="text-xs font-black uppercase tracking-widest">Temps de Réponse API</h5>
                     </div>
                     <p className="text-3xl font-black tracking-tight">124<span className="text-sm font-bold text-indigo-400 lowercase ml-1">ms</span></p>
                  </div>
               </div>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[40px] opacity-40 -mr-16 -mb-16" />
            </div>

            <div className="bg-[#234D96] p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-900/30 relative overflow-hidden">
                <div className="relative z-10 flex flex-col gap-8">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                      <Save size={24} className="text-white" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black tracking-tight">Enregistrer les Modifications</h4>
                      <p className="text-indigo-100 text-[11px] font-medium opacity-60 font-sans">N'oubliez pas de valider vos changements pour qu'ils soient appliqués globalement sur tout FinTrack.</p>
                   </div>
                   <button 
                     onClick={handleSave}
                     className="w-full py-5 bg-white text-[#234D96] rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-xl"
                   >
                      Mettre à Jour le Système
                   </button>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
            </div>
         </div>
      </div>
    </motion.div>
  );
}

/* ------------------- VIEW: CATALOGUE ------------------- */
function CatalogueView() {
  const [entries, setEntries] = useState([
    { id: 1, type: 'BANQUE', name: 'BOA', logo: 'BOA', usage: 1, status: 'Actif' },
    { id: 2, type: 'BANQUE', name: 'Ecobank', logo: 'ECO', usage: 2, status: 'Actif' },
    { id: 3, type: 'BANQUE', name: 'NSIA Banque', logo: 'NSIA', usage: 1, status: 'Actif' },
    { id: 4, type: 'BANQUE', name: 'UBA', logo: 'UBA', usage: 1, status: 'Actif' },
    { id: 5, type: 'RESEAU', name: 'Wave', logo: 'WAVE', usage: 12, status: 'Actif' },
    { id: 6, type: 'RESEAU', name: 'Orange Money', logo: 'OM', usage: 15, status: 'Actif' },
    { id: 7, type: 'RESEAU', name: 'MTN MoMo', logo: 'MTN', usage: 8, status: 'Actif' },
    { id: 8, type: 'RESEAU', name: 'Moov Money', logo: 'MOOV', usage: 5, status: 'Actif' },
  ]);

  const [filterType, setFilterType] = useState('Tous les types');
  const [filterStatus, setFilterStatus] = useState('Tous les statuts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleStatus = (id: number) => {
    setEntries(entries.map(e => {
      if (e.id === id) {
        return { ...e, status: e.status === 'Actif' ? 'Suspendu' : 'Actif' };
      }
      return e;
    }));
  };

  const deleteEntry = (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette entrée du catalogue ?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const filteredEntries = entries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'Tous les types' || e.type === filterType.toUpperCase();
    const matchesStatus = filterStatus === 'Tous les statuts' || e.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: entries.length,
    active: entries.filter(e => e.status === 'Actif').length,
    inactive: entries.filter(e => e.status !== 'Actif').length,
    networks: entries.filter(e => e.type === 'RESEAU').length,
    banks: entries.filter(e => e.type === 'BANQUE').length
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-12 pb-24"
    >
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black tracking-tighter text-slate-950">Catalogue global des reseaux et banques</h2>
            <p className="text-slate-400 font-medium italic">Publiez, filtrez et entretenez les entrees catalogue disponibles pour les marchands.</p>
         </div>
         <button 
           onClick={() => setShowAddModal(true)}
           className="px-10 py-5 bg-[#234D96] text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-900/30 flex items-center gap-3 border-4 border-white"
         >
            <Plus size={20} strokeWidth={3} /> Créer une Nouvelle Entrée
         </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-5 gap-6">
         {[
           { label: "CATALOGUES", val: stats.total, sub: "Entrees referencees", icon: <Layers size={20} />, color: "text-[#3A4DB7]", bg: "bg-indigo-50" },
           { label: "BANQUES", val: stats.banks, sub: "Entites bancaires", icon: <Building2 size={20} />, color: "text-amber-500", bg: "bg-amber-50" },
           { label: "RESEAUX", val: stats.networks, sub: "Mobile Money & Telco", icon: <Zap size={20} />, color: "text-indigo-400", bg: "bg-indigo-50" },
           { label: "ACTIFS", val: stats.active, sub: "Disponibles au catalogue", icon: <CheckCircle2 size={20} />, color: "text-emerald-500", bg: "bg-emerald-50" },
           { label: "RESEAUX RELIES", val: 16, sub: "Instances connectees", icon: <Globe size={20} />, color: "text-amber-600", bg: "bg-amber-50" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm flex items-start justify-between group hover:shadow-md transition-all">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
                 <span className="text-4xl font-black text-slate-950 tracking-tighter">{stat.val}</span>
                 <p className="text-[11px] font-medium text-slate-400 mt-2">{stat.sub}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                 {stat.icon}
              </div>
           </div>
         ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAddModal(false)}
               className="fixed inset-0 bg-slate-950/40 backdrop-blur-3xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] overflow-hidden border border-white"
            >
               <div className="p-16 space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="space-y-3">
                        <h3 className="text-4xl font-black tracking-tighter text-slate-950 leading-none">Ajouter au Catalogue</h3>
                        <p className="text-slate-400 font-medium italic">Configurez une nouvelle entité financière.</p>
                     </div>
                     <button 
                       onClick={() => setShowAddModal(false)}
                       className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-100"
                     >
                        <Plus size={30} className="rotate-45" />
                     </button>
                  </div>

                  <div className="space-y-8">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Type de l'Entrée</label>
                           <select className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:border-[#3A4DB7] outline-none transition-all appearance-none">
                              <option>BANQUE</option>
                              <option>RESEAU</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Statut Initial</label>
                           <select className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:border-[#3A4DB7] outline-none transition-all appearance-none">
                              <option>Actif</option>
                              <option>Inactif</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-4">Nom de la Banque ou du Réseau</label>
                        <input 
                          type="text" placeholder="ex: Banque Atlantique..." 
                          className="w-full px-10 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] text-lg font-black focus:border-[#3A4DB7] outline-none transition-all placeholder:text-slate-300"
                        />
                     </div>

                     <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-6 group hover:border-[#3A4DB7] transition-all cursor-pointer">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl text-slate-400 group-hover:bg-[#3A4DB7] group-hover:text-white transition-all">
                           <Layers size={32} />
                        </div>
                        <div className="text-center space-y-2">
                           <h4 className="text-base font-black text-slate-900 tracking-tight">Télécharger le Logo</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">SVG, PNG OU JPG • MAX 5MB</p>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="w-full py-7 bg-[#234D96] text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_30px_60px_-12px_rgba(35,77,150,0.4)]"
                  >
                     Confirmer et Publier l'Entrée
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden min-h-[600px]">
         <div className="p-10 border-b border-slate-100 flex items-center justify-between">
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Entrees catalogue</h3>
               <p className="text-xs font-bold text-slate-400 mt-1">{filteredEntries.length} entree(s) visible(s)</p>
            </div>
            <div className="flex gap-4">
               <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" placeholder="Rechercher une entree..." 
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-50 w-72" 
                  />
               </div>
               <select 
                 value={filterType} onChange={e => setFilterType(e.target.value)}
                 className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-50 outline-none"
               >
                  <option>Tous les types</option>
                  <option>Banque</option>
                  <option>Reseau</option>
               </select>
               <select 
                 value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                 className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-50 outline-none"
               >
                  <option>Tous les statuts</option>
                  <option>Actif</option>
                  <option>Inactif</option>
               </select>
            </div>
         </div>

         <div className="overflow-x-auto px-6 py-6">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                     <th className="px-6 py-6">LOGO</th>
                     <th className="px-6 py-6">TYPE</th>
                     <th className="px-6 py-6">NOM</th>
                     <th className="px-6 py-6">UTILISATION MARCHANDS</th>
                     <th className="px-6 py-6">STATUT</th>
                     <th className="px-6 py-6 text-right">ACTION</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-6 py-8">
                          <div className="w-16 h-16 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-1">
                             <span className="text-[10px] font-black text-slate-300">{entry.logo}</span>
                             <span className="text-[8px] font-bold text-slate-300 uppercase">Logo</span>
                             <button className="text-[8px] font-black text-[#3A4DB7] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Modifier</button>
                          </div>
                       </td>
                       <td className="px-6 py-8">
                          <div className="space-y-2">
                             <span className="text-sm font-black text-slate-900">{entry.type}</span>
                             <select className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:border-[#3A4DB7] outline-none">
                                <option>BANQUE</option>
                                <option>RESEAU</option>
                             </select>
                          </div>
                       </td>
                       <td className="px-6 py-8">
                          <input 
                            type="text" defaultValue={entry.name}
                            className="w-full px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:border-[#3A4DB7] outline-none"
                          />
                       </td>
                       <td className="px-6 py-8">
                          <div className="flex items-center gap-2">
                             <span className="text-lg font-black text-slate-950">{entry.usage}</span>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">liaison(s) marchands</span>
                          </div>
                       </td>
                       <td className="px-6 py-8">
                          <div className="space-y-4">
                             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-2 ${
                               entry.status === 'Actif' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                             }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${entry.status === 'Actif' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                {entry.status.toUpperCase()}
                             </span>
                          </div>
                       </td>
                       <td className="px-6 py-8">
                          <div className="flex items-center justify-end gap-3">
                             <button 
                               className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                               title="Modifier"
                             >
                               <Edit3 size={16} />
                             </button>

                             {entry.status === 'Actif' ? (
                               <button 
                                 onClick={() => toggleStatus(entry.id)}
                                 className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                                 title="Suspendre"
                               >
                                 <Pause size={16} />
                               </button>
                             ) : (
                               <button 
                                 onClick={() => toggleStatus(entry.id)}
                                 className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                 title="Réactiver"
                               >
                                 <Play size={16} />
                               </button>
                             )}
                             
                             <button 
                               onClick={() => deleteEntry(entry.id)}
                               className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                               title="Supprimer"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}
