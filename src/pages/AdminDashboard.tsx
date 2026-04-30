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
  TrendingUp,
  AlertCircle,
  Globe,
  Database,
  Lock,
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
  FileText
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

type AdminTab = "Overview" | "Agents" | "Merchants" | "Network" | "Config" | "Plans" | "Support";

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
        <span className="text-[13px] font-black uppercase tracking-widest">{label}</span>
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
            active={activeTab === "Agents"} 
            onClick={() => setActiveTab("Agents")} 
            icon={<Users size={20} />} 
            label="Gestion des Agents" 
          />
          <NavItem 
            active={activeTab === "Merchants"} 
            onClick={() => setActiveTab("Merchants")} 
            icon={<CheckCircle2 size={20} />} 
            label="Validation Marchands" 
            badge="4"
          />
          <NavItem 
            active={activeTab === "Network"} 
            onClick={() => setActiveTab("Network")} 
            icon={<Globe size={20} />} 
            label="État du Réseau" 
          />
          <NavItem 
            active={activeTab === "Plans"} 
            onClick={() => setActiveTab("Plans")} 
            icon={<Plus size={20} />} 
            label="Plans & Offres" 
          />
          <NavItem 
            active={activeTab === "Config"} 
            onClick={() => setActiveTab("Config")} 
            icon={<Settings2 size={20} />} 
            label="Configuration Frais" 
          />
          <NavItem 
            active={activeTab === "Support"} 
            onClick={() => setActiveTab("Support")} 
            icon={<MessageSquare size={20} />} 
            label="Support & Retours" 
          />
          
          <div className="pt-8 pb-4 px-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Système & Support</p>
            <div className="space-y-1">
              <NavItem 
                active={false} 
                onClick={() => {}} 
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
           <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] text-white relative overflow-hidden group mb-6">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Node v4.2 Stable</span>
                 </div>
                 <p className="text-xs font-medium text-slate-300 leading-relaxed">Infrastructure cloud opérationnelle à 100%.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
           </div>

           <button className="w-full flex items-center justify-center gap-3 py-4 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:text-rose-500 transition-colors">
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
            {activeTab === "Agents" && <AgentsView key="agents" />}
            {activeTab === "Merchants" && <MerchantsView key="merchants" />}
            {activeTab === "Network" && <NetworkView key="network" />}
            {activeTab === "Plans" && <PlansView key="plans" />}
            {activeTab === "Config" && <ConfigView key="config" />}
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
         <div className="grid grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-64 bg-white border border-slate-100 rounded-[2.5rem] animate-pulse" />)}
         </div>
         <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 h-96 bg-white border border-slate-100 rounded-[3rem] animate-pulse" />
            <div className="col-span-4 h-96 bg-slate-900 rounded-[3rem] animate-pulse" />
         </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-12 pb-20"
    >
      <div className="flex items-end justify-end">
        <div className="flex gap-4">
           <button className="px-8 py-5 bg-[#3A4DB7] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-indigo-900/40 hover:scale-[1.03] active:scale-95 transition-all font-sans">
              Exporter Rapport
           </button>
        </div>
      </div>

      {/* KPI BAR WITH SPARKLINES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          label="Entreprises" 
          value="842" 
          unit="Marchands"
          growth="+12.4%"
          color="#3A4DB7"
          chartData={[20, 50, 45, 90, 75, 100]}
        />
        <KpiCard 
          label="Agents Totaux" 
          value="1,452" 
          unit="Points"
          growth="+18.2%"
          color="#4ECBA8"
          chartData={[40, 60, 55, 80, 85, 110]}
        />
        <KpiCard 
          label="Revenus Plans" 
          value="45.8M" 
          unit="FCFA"
          growth="+24.5%"
          color="#6366F1"
          chartData={[30, 45, 60, 55, 90, 120]}
        />
        <KpiCard 
          label="Connexions Live" 
          value="952" 
          unit="Agents"
          growth="+5.4%"
          color="#F59E0B"
          chartData={[85, 90, 95, 88, 92, 98]}
        />
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Activity Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm overflow-hidden flex flex-col relative group">
           <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Activité du Réseau</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Comparaison Sessions vs Inscriptions</p>
              </div>
              <div className="flex gap-2">
                 <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#3A4DB7] text-white shadow-lg shadow-indigo-900/20 transition-all">6 derniers mois</button>
                 <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">Audit Annuel</button>
              </div>
           </div>

           <div className="h-80 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={ACTIVITY_DATA}>
                    <defs>
                       <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3A4DB7" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#3A4DB7" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorAgents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ECBA8" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4ECBA8" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                       dataKey="month" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 10, fontWeight: 800, fill: '#94A3B8'}} 
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 10, fontWeight: 800, fill: '#94A3B8'}}
                    />
                    <Tooltip 
                       contentStyle={{ border: 'none', borderRadius: '20px', boxShadow: '0 20px 40px rgba(58, 77, 183, 0.1)', fontWeight: 800, fontSize: '12px' }}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="sessions" 
                       stroke="#3A4DB7" 
                       strokeWidth={4} 
                       fillOpacity={1} 
                       fill="url(#colorSessions)" 
                    />
                    <Area 
                       type="monotone" 
                       dataKey="agents" 
                       stroke="#4ECBA8" 
                       strokeWidth={2} 
                       strokeDasharray="5 5" 
                       fillOpacity={1} 
                       fill="url(#colorAgents)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Plan Revenue Donut */}
        <div className="col-span-12 lg:col-span-4 bg-[#1A1C1E] rounded-[3rem] p-10 text-white relative overflow-hidden group">
           <div className="relative z-10">
              <h3 className="text-2xl font-black mb-1">Revenus par Plan</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Total : 45.8M FCFA</p>
              
              <div className="h-64 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={PLAN_REVENUE_DATA}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={8}
                          dataKey="value"
                       >
                          {PLAN_REVENUE_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black leading-none">82%</span>
                    <span className="text-[9px] font-black uppercase text-slate-500">Marge Pro</span>
                 </div>
              </div>

              <div className="space-y-4 mt-8">
                 {PLAN_REVENUE_DATA.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs font-bold text-slate-400">{entry.name}</span>
                       </div>
                       <span className="text-xs font-black">{entry.value}M</span>
                    </div>
                 ))}
              </div>
           </div>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#3A4DB7] rounded-full blur-[140px] opacity-10 pointer-events-none" />
        </div>
      </div>

      {/* OPERATIONAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Live Feed Feedbacks */}
         <div className="bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-slate-950">Flux Retours</h3>
                  <p className="text-[9px] font-black text-[#4ECBA8] uppercase tracking-widest mt-1">Live Updates</p>
               </div>
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#3A4DB7]">
                  <MessageSquare size={18} />
               </div>
            </div>

            <div className="space-y-6">
               {FEEDBACKS.map((fb) => (
                  <div key={fb.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#3A4DB7]/30 transition-all group cursor-default">
                     <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">{fb.user.charAt(0)}</div>
                           <div>
                              <p className="text-xs font-black text-slate-950 leading-none">{fb.user}</p>
                              <div className="flex items-center gap-1 mt-1 text-amber-500">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={8} fill={i < fb.rating ? "currentColor" : "none"} />
                                 ))}
                              </div>
                           </div>
                        </div>
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[8px] font-black text-slate-400 uppercase">{fb.tag}</span>
                     </div>
                     <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"{fb.comment}"</p>
                     <div className="flex items-center justify-end mt-3">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{fb.time}</span>
                     </div>
                  </div>
               ))}
            </div>

            <button className="w-full mt-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#3A4DB7] transition-colors">
               Voir tous les avis (42)
            </button>
         </div>

         {/* Smart Alerts & KYC */}
         <div className="bg-[#1A1C1E] rounded-[3rem] p-10 text-white flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black">Alertes Smart</h3>
                  <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-1">Actions Urgentes</p>
               </div>
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-rose-500 border border-white/10 animate-pulse">
                  <AlertCircle size={18} />
               </div>
            </div>

            <div className="space-y-4 flex-1">
               <AlertRow 
                  title="Upload KYC: Fashion House" 
                  desc="Nouveaux documents d'identité à vérifier." 
                  time="2m" 
                  active 
               />
               <AlertRow 
                  title="Retrait Massif Détecté" 
                  desc="Volume anormal sur Node-AG102 (Moov)." 
                  time="15m" 
                  isUrgent 
               />
               <AlertRow 
                  title="Campagne Expire" 
                  desc="Promo 'RESEAU-TOP' se termine ce soir." 
                  time="1h" 
               />
            </div>

            <div className="mt-8 p-6 bg-[#3A4DB7] rounded-[2.5rem] relative overflow-hidden group shadow-xl">
               <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black">Health Score</p>
                     <p className="text-2xl font-black tracking-tighter">98.4</p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-4 -translate-y-4" />
            </div>
         </div>

         {/* Health Data (Bar Chart) */}
         <div className="bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-slate-950">Santé du Parc</h3>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Statut des Marchands</p>
               </div>
            </div>

            <div className="h-64 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={HUB_HEALTH}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94A3B8'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 800, fill: '#94A3B8'}} />
                     <Tooltip 
                        contentStyle={{ border: 'none', borderRadius: '15px' }}
                        cursor={{ fill: 'rgba(241, 245, 249, 1)' }}
                     />
                     <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-auto">
               {HUB_HEALTH.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#3A4DB7]/20 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: h.fill }} />
                        <span className="text-xs font-bold text-slate-700">{h.name}</span>
                     </div>
                     <span className="text-xs font-black text-slate-950">{h.value}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function KpiCard({ label, value, unit, growth, color, chartData }: { label: string, value: string, unit: string, growth: string, color: string, chartData: number[] }) {
  const isPositive = growth.startsWith('+');
  const miniData = chartData.map((v, i) => ({ val: v }));

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/30 transition-all duration-500 group relative flex flex-col justify-between overflow-hidden">
       <div>
          <div className="flex items-center justify-between mb-8">
             <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:scale-110 transition-transform duration-500 group-hover:bg-indigo-50 group-hover:text-[#3A4DB7]" style={{ color: color }}>
                {label === "Revenus Globaux" && <Database size={20} />}
                {label === "Marchands Actifs" && <Users size={20} />}
                {label === "Volume Transactions" && <Zap size={20} />}
                {label === "Taux Conversion" && <TrendingUp size={20} />}
             </div>
             <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest font-sans ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {growth}
             </div>
          </div>

          <div>
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">{label}</h4>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-950 tracking-tighter leading-none font-display">{value}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">{unit}</span>
             </div>
          </div>
       </div>

       {/* MINI SPARKLINE */}
       <div className="h-16 w-full mt-6 opacity-30 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={miniData}>
                <Area 
                   type="monotone" 
                   dataKey="val" 
                   stroke={color} 
                   strokeWidth={3} 
                   fill={color} 
                   fillOpacity={0.1} 
                />
             </AreaChart>
          </ResponsiveContainer>
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
          <span className="text-[9px] font-black text-slate-500 uppercase">{time}</span>
       </div>
       <p className="text-[10px] font-medium text-slate-400 line-clamp-1">{desc}</p>
       <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex-1 py-2 bg-white text-slate-950 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#4ECBA8] hover:text-white transition-all">Consulter</button>
          {!isUrgent && <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-white/20">Ignorer</button>}
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
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{status}</p>
            </div>
         </div>
         
         <div className="flex items-center gap-12">
            <div className="w-48 text-right pr-6">
               <div className="flex justify-between mb-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Charge Système</span>
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
               <span className="text-[10px] font-bold text-slate-300 uppercase">{time}</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">{action}</p>
         </div>
      </div>
   );
}

/* ------------------- VIEW: AGENTS ------------------- */
function AgentsView() {
  const agents = [
    { id: "AG-1024", name: "Koffi Mensah", location: "Cotonou, Dantokpa", status: "Actif", sales: "2.4M", type: "Agent", avatar: "KM" },
    { id: "AG-1025", name: "Sika Shop", location: "Abidjan, Riviera", status: "Inactif", sales: "0 F", type: "Super-Agent", avatar: "SS" },
    { id: "AG-1026", name: "Global Cash", location: "Lomé, Port", status: "Actif", sales: "1.8M", type: "Agent", avatar: "GC" },
    { id: "AG-1027", name: "Awa Services", location: "Dakar, Plateau", status: "Vérification", sales: "0 F", type: "Agent", avatar: "AS" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="flex items-center justify-between">
         <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-5xl font-black tracking-tighter text-slate-950 leading-none">Réseau d'<span className="text-[#234D96]">Agents</span></h2>
            <p className="text-slate-400 font-medium text-sm mt-3">Gérez et supervisez l'ensemble des points de vente actifs.</p>
         </div>
         <div className="flex gap-4">
            <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/60 shadow-inner">
               <button className="px-6 py-2.5 bg-[#234D96] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-900/20">Tous</button>
               <button className="px-6 py-2.5 text-slate-400 hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Actifs</button>
               <button className="px-6 py-2.5 text-slate-400 hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Flagués</button>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all outline-none">
               <Plus size={18} />
               Déployer Agent
            </button>
         </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl rounded-[3.5rem] border border-white/60 shadow-2xl shadow-slate-200/40 overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-50/30 border-b border-slate-100/50">
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Identité & ID</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Localisation</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Tier</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Volume 30j</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-10 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
               {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-white transition-colors group px-4">
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg group-hover:rotate-6 transition-transform">
                              {agent.avatar}
                           </div>
                           <div className="flex flex-col">
                              <span className="font-black text-slate-950 text-base tracking-tight">{agent.name}</span>
                              <span className="text-[10px] font-black text-[#234D96] uppercase tracking-widest mt-0.5">{agent.id}</span>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8 text-sm font-bold text-slate-500">{agent.location}</td>
                     <td className="px-10 py-8">
                        <span className="px-4 py-1.5 bg-indigo-50 text-[#234D96] rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">{agent.type}</span>
                     </td>
                     <td className="px-10 py-8">
                        <div className="flex flex-col">
                           <span className="font-black text-slate-950 text-xl">{agent.sales} <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase">FCFA</span></span>
                           <div className="w-24 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                              <div className={`h-full bg-emerald-400 ${agent.sales === '0 F' ? 'w-0' : 'w-2/3'}`} />
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8">
                        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest w-fit border ${
                           agent.status === "Actif" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                           agent.status === "Inactif" ? "bg-rose-50 text-rose-600 border-rose-100" : 
                           "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>
                           <div className={`w-2 h-2 rounded-full ${agent.status === 'Actif' ? 'bg-emerald-500' : agent.status === 'Inactif' ? 'bg-rose-500' : 'bg-amber-500'} ${agent.status === 'Actif' ? 'animate-pulse' : ''}`} />
                           {agent.status}
                        </div>
                     </td>
                     <td className="px-10 py-8 text-right">
                        <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-[#234D96] hover:text-white transition-all shadow-sm">
                           <MoreHorizontal size={20} />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </motion.div>
  );
}

/* ------------------- VIEW: NETWORK ------------------- */
function NetworkView() {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.98 }}
         className="space-y-12 pb-20"
      >
         <div className="flex items-center justify-between">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.4em]">Live Infrastructure Feed</p>
               </div>
               <h2 className="text-5xl font-black tracking-tighter text-slate-950 leading-none">Diagnostic <span className="text-[#234D96]">Pulsar</span></h2>
               <p className="text-slate-400 font-medium text-sm mt-3">Surveillance temps réel des nœuds et passerelles de paiement.</p>
            </div>
            <div className="flex gap-4">
               <div className="px-8 py-5 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/20 flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Dernier Ping</span>
                     <span className="text-sm font-black text-slate-950 uppercase tracking-tight">42ms <span className="text-emerald-500 font-black ml-1 text-[10px]">Optimal</span></span>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-100" />
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                     <span className="text-sm font-black text-emerald-500 uppercase tracking-tight">Opérationnel</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-12 gap-8">
            {/* LARGE MONITOR BOARD */}
            <div className="col-span-8 bg-[#1A1C1E] rounded-[4rem] p-12 text-white relative overflow-hidden group border border-white/5">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-12">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#234D96] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
                           <Activity size={24} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight">Flux de Trafic Global</h3>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-4xl font-black text-white leading-none tracking-tighter">1,284 <span className="text-slate-500 text-lg uppercase tracking-widest font-black ml-1">TX/s</span></span>
                        <div className="flex items-center gap-2 mt-2 text-emerald-400">
                           <TrendingUp size={14} />
                           <span className="text-[10px] font-black uppercase tracking-widest">+4.2%</span>
                        </div>
                     </div>
                  </div>

                  {/* HIGH FIDELITY CHART PLACEHOLDER */}
                  <div className="h-64 flex items-end gap-1 px-4 relative">
                     <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5 border-dashed border-t border-white/10" />
                     {[65, 45, 80, 55, 90, 70, 85, 40, 60, 75, 45, 80, 55, 95, 65, 45, 80, 55, 90, 70, 85, 40, 60, 75, 45, 80, 55, 95].map((h, i) => (
                        <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           animate={{ height: `${h}%` }}
                           transition={{ delay: i * 0.03, duration: 1.5, ease: "circOut" }}
                           className={`flex-1 rounded-t-lg transition-all duration-300 ${i === 13 ? 'bg-[#234D96]' : 'bg-white group-hover:bg-[#234D96] opacity-10 group-hover:opacity-40'}`}
                        />
                     ))}
                  </div>

                  <div className="grid grid-cols-4 gap-8 mt-12 pt-12 border-t border-white/5">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Load Balancer</span>
                        <span className="text-xl font-black text-white">42.4%</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Nodes Actifs</span>
                        <span className="text-xl font-black text-white">12/12</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Error Rate</span>
                        <span className="text-xl font-black text-emerald-500">0.02%</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Queue Sync</span>
                        <span className="text-xl font-black text-white">0.4ms</span>
                     </div>
                  </div>
               </div>
               <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#234D96] rounded-full blur-[120px] opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
            </div>

            {/* SIDE MONITORING */}
            <div className="col-span-4 space-y-8">
               <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/60 shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
                  <div className="relative z-10">
                     <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Stock de Ressources</h4>
                     <div className="space-y-8">
                        <ResourceBar label="Database Cluster" used={45} />
                        <ResourceBar label="API Engine" used={28} />
                        <ResourceBar label="Edge Nodes" used={72} color="rose" />
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[40px] opacity-40 group-hover:bg-[#234D96]/10 transition-colors" />
               </div>

               <div className="bg-gradient-to-br from-[#234D96] to-[#1A1C1E] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
                  <div className="relative z-10">
                     <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-8 shadow-xl">
                        <Cpu size={28} className="group-hover:rotate-12 transition-transform duration-500" />
                     </div>
                     <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Diagnostic <span className="text-indigo-400">AI Engine</span></h4>
                     <p className="text-slate-400 text-xs font-medium leading-relaxed mb-10 opacity-70">Analyse prédictive de la charge pour les prochaines 24h. Pic attendu à 18h00.</p>
                     
                     <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Prévision Pic</span>
                           <span className="text-lg font-black text-white">+14.2%</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <button className="flex-1 py-4 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all">Lancer Scan Deep</button>
                     </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
               </div>
            </div>

            {/* SECOND ROW MONITORING */}
            <div className="col-span-12 grid grid-cols-4 gap-8">
               <div className="col-span-3 bg-white/60 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/60 shadow-2xl shadow-slate-200/40">
                  <div className="flex items-center justify-between mb-10">
                     <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Logs de Sécurité</h4>
                     <button className="text-[10px] font-black text-[#234D96] uppercase tracking-widest hover:underline">Voir l'audit total</button>
                  </div>
                  <div className="space-y-6">
                     <SecurityLog msg="Tentative de brute-force root bloquée (IP: 192.168.1.1)" time="1h" type="alert" />
                     <SecurityLog msg="Nouveau certificat SSL Wildcard installé sur Node-Primary" time="4h" type="info" />
                     <SecurityLog msg="Scan de vulnérabilités hebdomadaire complété sans erreur" time="1j" type="info" />
                     <SecurityLog msg="Détection de latence anormale sur Moov-Money Gateway" time="1j" type="alert" />
                  </div>
               </div>

               <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/60 shadow-2xl shadow-slate-200/40">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">Part de Marché Traffic</h4>
                  <div className="space-y-6">
                     <OperatorTraffic name="MTN MoMo" percentage={42} />
                     <OperatorTraffic name="Moov Money" percentage={28} />
                     <OperatorTraffic name="Wave Finance" percentage={22} />
                     <OperatorTraffic name="Autres" percentage={8} />
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
}

function ResourceBar({ label, used, color = "indigo" }: { label: string, used: number, color?: string }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-500">{label}</span>
            <span className={color === 'indigo' ? 'text-[#234D96]' : 'text-rose-500'}>{used}%</span>
         </div>
         <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${used}%` }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className={`h-full rounded-full ${color === 'indigo' ? 'bg-[#234D96]' : 'bg-rose-500'}`} 
            />
         </div>
      </div>
   );
}

function SecurityLog({ msg, time, type }: { msg: string, time: string, type: "info" | "alert" }) {
   return (
      <div className="flex items-center gap-3">
         <div className={`w-2 h-2 rounded-full shrink-0 ${type === 'alert' ? 'bg-rose-500' : 'bg-[#234D96]'}`} />
         <p className="text-[11px] font-bold text-slate-600 flex-1">{msg}</p>
         <span className="text-[10px] font-black text-slate-300 uppercase">{time}</span>
      </div>
   );
}

function OperatorTraffic({ name, percentage }: { name: string, percentage: number }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>{name}</span>
            <span>{percentage}%</span>
         </div>
         <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 rounded-full" style={{ width: `${percentage}%` }} />
         </div>
      </div>
   );
}

/* ------------------- VIEW: CONFIG ------------------- */function ConfigView() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-12 pb-20"
    >
      <div className="flex items-center justify-between">
         <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-5xl font-black tracking-tighter text-slate-950 leading-none">Global <span className="text-[#234D96]">Config</span></h2>
            <p className="text-slate-400 font-medium text-sm mt-3">Ajustez les paramètres économiques et de sécurité du système.</p>
         </div>
         <button className="px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-b-4 border-slate-800">
            <Database size={18} /> Snapshot Configuration
         </button>
      </div>

      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-12 lg:col-span-7 space-y-10">
            <div className="bg-white/60 backdrop-blur-xl p-12 rounded-[4rem] border border-white/60 shadow-2xl shadow-slate-200/40 space-y-10 relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="text-2xl font-black flex items-center gap-4 text-slate-950">
                        <Settings className="text-[#234D96]" />
                        Economie du Système
                     </h3>
                     <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        Live Sync
                     </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium mb-10">Contrôlez les marges et les incitations du réseau.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-8 bg-slate-950 rounded-[2.5rem] border border-slate-900 flex flex-col justify-between group/card hover:bg-[#234D96] transition-all duration-500 text-white shadow-2xl shadow-slate-900/20">
                        <div className="flex items-center justify-between mb-8">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                              <Zap size={20} className="text-white" />
                           </div>
                           <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                              <ChevronRight size={16} />
                           </button>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">Frais de Service (Platform)</p>
                           <span className="text-4xl font-black tracking-tighter">1.5%<span className="text-lg text-slate-500 ml-1">/ TX</span></span>
                        </div>
                     </div>

                     <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 flex flex-col justify-between group/card hover:border-[#234D96] transition-all duration-500 text-slate-950 shadow-xl shadow-slate-200/20">
                        <div className="flex items-center justify-between mb-8">
                           <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                              <Plus size={20} className="text-[#234D96]" />
                           </div>
                           <button className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                              <Plus size={16} className="text-[#234D96]" />
                           </button>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">Bonus Volume (&gt;1M)</p>
                           <span className="text-4xl font-black tracking-tighter text-emerald-600">-0.2%<span className="text-lg text-slate-400 ml-1">Cashback</span></span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] opacity-40 group-hover:bg-[#234D96]/10 transition-colors pointer-events-none" />
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-12 rounded-[4rem] border border-white/60 shadow-2xl shadow-slate-200/40 space-y-10">
               <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">Setup <span className="text-[#234D96]">Opérateurs</span></h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <OpConfigRow name="MTN MoMo" current="1.2%" />
                  <OpConfigRow name="Moov Money" current="1.5%" />
                  <OpConfigRow name="Wave Finance" current="1.0%" />
                  <OpConfigRow name="Orange Money" current="Non-Config" />
               </div>
            </div>
         </div>

         <div className="col-span-12 lg:col-span-5 space-y-10">
            <div className="bg-slate-950 p-12 rounded-[4rem] text-white space-y-10 shadow-2xl shadow-slate-950/40 border border-white/5 relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                     <h3 className="text-2xl font-black flex items-center gap-4">
                        <ShieldCheck className="text-emerald-500" />
                        Hardened Security
                     </h3>
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform">
                        <Lock size={20} />
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     {[
                        { label: "Alerte Retrait Massif", value: "2.5M F", toggle: true, desc: "Alerte auto sur Telegram" },
                        { label: "Suspension Auto-Agent", value: "5 essais", toggle: true, desc: "Blocage temporaire 1h" },
                        { label: "KYC Refresh Mandatory", value: "12 mois", toggle: false, desc: "Email de rappel auto" },
                        { label: "Force MFA Admin", value: "Toujours", toggle: true, desc: "Yubikey ou Google Auth" },
                     ].map((cfg, i) => (
                        <div key={i} className="flex flex-col gap-1 p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group/item">
                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-sm font-black tracking-tight">{cfg.label}</p>
                                 <p className="text-[10px] font-bold text-slate-500 mt-0.5">{cfg.desc}</p>
                              </div>
                              <div className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-300 ${cfg.toggle ? 'bg-[#234D96]' : 'bg-slate-800'}`}>
                                 <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-xl ${cfg.toggle ? 'translate-x-7' : ''}`} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#234D96] rounded-full blur-[120px] opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
            </div>

            <div className="bg-[#234D96] p-10 rounded-[4rem] text-white shadow-2xl shadow-indigo-900/40 group relative overflow-hidden">
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 mb-6 shadow-xl">
                     <Activity size={24} />
                  </div>
                  <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Optimization Engine</h4>
                  <p className="text-indigo-100/70 text-xs font-medium leading-relaxed mb-8">L'IA suggère d'ajuster les frais MTN à 1.1% pour capturer 12% de volume supplémentaire.</p>
                  <button className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all shadow-xl">Appliquer Tuning Auto</button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function OpConfigRow({ name, current }: { name: string, current: string }) {
   return (
      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
         <span className="font-black text-slate-900">{name}</span>
         <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
               <span className="text-[8px] font-black text-slate-400 uppercase">Actuel</span>
               <span className="text-sm font-black text-[#234D96]">{current}</span>
            </div>
            <button className="px-6 py-2 bg-white text-[10px] font-black text-slate-900 border border-slate-200 rounded-xl uppercase tracking-widest hover:border-slate-400 transition-all">Modifier</button>
         </div>
      </div>
   );
}

/* ------------------- VIEW: MERCHANTS ------------------- */
type MerchantPlan = "Starter" | "Pro" | "Business";
type KYCStatus = "Verified" | "Incomplete" | "Rejected" | "Pending";

interface Merchant {
  id: string;
  name: string;
  manager: string;
  email: string;
  phone: string;
  joinedAt: string;
  expiresAt: string;
  plan: MerchantPlan;
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

  const filteredMerchants = merchants.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setMerchants(prev => prev.map(m => {
      if (m.id === id) {
        const newStatus = !m.isActive;
        setShowToast({ 
          message: `${newStatus ? 'Accès activé' : 'Accès suspendu'} pour ${m.name}`, 
          type: newStatus ? 'success' : 'error' 
        });
        setTimeout(() => setShowToast(null), 3000);
        return { ...m, isActive: newStatus };
      }
      return m;
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-10 relative"
    >
      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 50, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-0 left-1/2 z-[100] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 border ${
              showToast.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-rose-500 text-white border-rose-400'
            }`}
          >
            {showToast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
         <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-5xl font-black tracking-tighter text-slate-950 leading-none">Hub <span className="text-[#3A4DB7]">Marchands</span></h2>
            <p className="text-slate-400 font-medium text-sm mt-3">Gestion centralisée du portefeuille d'entreprises partenaires.</p>
         </div>
         <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A4DB7] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un marchand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[1.5rem] text-sm font-bold text-slate-900 focus:outline-none focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 transition-all w-80 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-3 px-8 py-5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
               <Plus size={18} /> Invitation Marchand
            </button>
         </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden">
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                     <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Entreprise</th>
                     <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Contact Client</th>
                     <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Plan Actuel</th>
                     <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Statut KYC</th>
                     <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Accès</th>
                     <th className="px-10 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredMerchants.length > 0 ? filteredMerchants.map((merchant) => (
                     <tr key={merchant.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-5 cursor-pointer" onClick={() => setSelectedMerchant(merchant)}>
                              <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border border-slate-800 shrink-0 group-hover:rotate-6 transition-transform">
                                 {merchant.name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                 <span className="font-black text-slate-950 text-lg tracking-tight group-hover:text-[#3A4DB7] transition-colors">{merchant.name}</span>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Depuis {merchant.joinedAt}</span>
                                 <span className="text-[9px] font-bold text-[#3A4DB7] mt-1">ID: {merchant.id}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex flex-col gap-3">
                              <span className="text-sm font-bold text-slate-700">{merchant.manager}</span>
                              <div className="flex items-center gap-2">
                                 <button className="w-8 h-8 bg-indigo-50 text-[#3A4DB7] rounded-lg flex items-center justify-center hover:bg-[#3A4DB7] hover:text-white transition-all shadow-sm">
                                    <Mail size={14} />
                                 </button>
                                 <button className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                    <MessageSquare size={14} />
                                 </button>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div className="flex flex-col items-center gap-2">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                 merchant.plan === 'Starter' ? 'bg-slate-50 text-slate-500 border-slate-100' :
                                 merchant.plan === 'Pro' ? 'bg-indigo-50 text-[#3A4DB7] border-indigo-100' :
                                 'bg-purple-50 text-purple-600 border-purple-100'
                              }`}>
                                 {merchant.plan}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Expire: {merchant.expiresAt}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              merchant.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              merchant.kycStatus === 'Incomplete' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              merchant.kycStatus === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                              'bg-indigo-50 text-[#3A4DB7] border-indigo-100'
                           }`}>
                              {merchant.kycStatus === 'Verified' ? <CheckCircle2 size={12} /> : 
                               merchant.kycStatus === 'Rejected' ? <XCircle size={12} /> : <AlertCircle size={12} />}
                              {merchant.kycStatus}
                           </div>
                        </td>
                        <td className="px-10 py-8 text-center">
                           <div 
                              onClick={() => toggleStatus(merchant.id)}
                              className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 mx-auto ${
                                 merchant.isActive ? 'bg-[#3A4DB7]' : 'bg-slate-200'
                              }`}
                           >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-500 shadow-lg ${
                                 merchant.isActive ? 'translate-x-7' : 'translate-x-0'
                              }`} />
                           </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button className="w-12 h-12 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                              <MoreHorizontal size={20} />
                           </button>
                        </td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={6} className="py-24">
                           <div className="flex flex-col items-center justify-center opacity-40">
                              <Search size={64} className="text-slate-300 mb-6" />
                              <h4 className="text-xl font-black text-slate-900 tracking-tight">Aucun marchand trouvé</h4>
                              <p className="text-sm font-bold text-slate-400 mt-2">Réessayez avec d'autres mots-clés ou filtres.</p>
                              <button 
                                onClick={() => setSearchQuery("")}
                                className="mt-8 px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200"
                              >
                                Réinitialiser
                              </button>
                           </div>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
         <div className="bg-slate-50/50 p-6 flex items-center justify-between border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Affichage de 1-4 sur 4 marchands</span>
            <div className="flex gap-2">
               {[10, 25, 50].map(n => (
                  <button key={n} className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${n === 10 ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-400'}`}>
                     {n}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* MERCHANT DETAILS SLIDE-OVER */}
      <AnimatePresence>
        {selectedMerchant && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedMerchant(null)}
               className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110]"
            />
            <motion.aside 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed top-0 right-0 h-full w-[35rem] bg-white z-[120] shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
            >
               <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white relative h-48 shrink-0 overflow-hidden">
                  <div className="relative z-10">
                     <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white text-slate-950 rounded-[2.5rem] flex items-center justify-center font-black text-4xl shadow-2xl border-4 border-slate-800">
                           {selectedMerchant.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedMerchant.name}</h3>
                           <p className="text-indigo-300 font-bold text-sm mt-3 flex items-center gap-2">
                              <Globe size={14} /> Gérant: {selectedMerchant.manager}
                           </p>
                           <div className="mt-4 flex items-center gap-3">
                              <span className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10">ID: {selectedMerchant.id}</span>
                              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                 selectedMerchant.isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border-rose-500/20'
                              }`}>
                                 {selectedMerchant.isActive ? 'Opérationnel' : 'Suspendu'}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <XCircle 
                    size={32} 
                    className="absolute top-8 right-8 text-white/40 hover:text-white cursor-pointer transition-colors z-20" 
                    onClick={() => setSelectedMerchant(null)}
                  />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#3A4DB7] rounded-full blur-[80px] opacity-40 translate-x-20 -translate-y-20 pointer-events-none" />
               </div>

               <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
                  {/* STATISTICS */}
                  <section>
                     <div className="flex items-center gap-3 mb-8">
                        <Activity className="text-[#3A4DB7]" size={20} />
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Statistiques Temps Réel</h4>
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                        {[
                           { label: "Agences", val: selectedMerchant.agencies, icon: <Building2 size={16} /> },
                           { label: "Agents", val: selectedMerchant.agents, icon: <Users size={16} /> },
                           { label: "Vol. Mensuel", val: selectedMerchant.monthlyVolume, icon: <TrendingUp size={16} /> },
                        ].map((stat, i) => (
                           <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                              <div className="w-10 h-10 bg-white border border-slate-100 text-[#3A4DB7] rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                 {stat.icon}
                              </div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                              <span className="text-xl font-black text-slate-950">{stat.val}</span>
                           </div>
                        ))}
                     </div>
                  </section>

                  {/* KYC DOCUMENTS */}
                  <section>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="text-emerald-500" size={20} />
                           <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Dossier Légal (KYC)</h4>
                        </div>
                        <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                          selectedMerchant.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                           {selectedMerchant.kycStatus}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedMerchant.kycDocs.map((doc, idx) => (
                          <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 active:scale-95 transition-all">
                            <div className="aspect-[4/5] flex items-center justify-center p-8">
                               <FileText size={48} className="text-slate-300 group-hover:text-[#3A4DB7] transition-colors" />
                            </div>
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                               <Eye size={24} className="mb-4 text-white p-1 rounded-full bg-[#3A4DB7]" />
                               <p className="text-[10px] font-black uppercase tracking-widest mb-1">{doc.type}</p>
                               <span className="text-xs font-medium text-slate-400 leading-tight line-clamp-1">{doc.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <button className="py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/10 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 border-b-4 border-emerald-700">
                           <CheckCircle2 size={16} /> Approuver le dossier
                        </button>
                        <button className="py-5 bg-white border border-slate-200 text-slate-400 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex items-center justify-center gap-3">
                           <AlertCircle size={16} /> Demander Correction
                        </button>
                      </div>
                  </section>

                  {/* HISTORY LOG */}
                  <section>
                      <div className="flex items-center gap-3 mb-8">
                        <Database className="text-slate-400" size={20} />
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Journal des modifications</h4>
                      </div>
                      <div className="space-y-4">
                        {[
                           { action: "Plan passé de Starter à Pro", user: "Admin (Jerry)", date: "12/04 - 14:20" },
                           { action: "Accès suspendu (Dette point ID 104)", user: "System", date: "10/04 - 09:12" },
                           { action: "Upload documents IFU terminés", user: "Merchant", date: "08/04 - 18:45" },
                        ].map((log, i) => (
                           <div key={i} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl group hover:border-indigo-100 transition-all">
                              <div className="w-2 h-2 bg-slate-300 rounded-full mt-1.5 shrink-0 group-hover:bg-[#3A4DB7] transition-colors" />
                              <div>
                                 <p className="text-xs font-black text-slate-900 group-hover:text-[#3A4DB7] transition-colors">{log.action}</p>
                                 <div className="flex items-center gap-3 mt-1.5 opacity-60">
                                    <span className="text-[9px] font-black uppercase text-slate-400">{log.user}</span>
                                    <span className="text-slate-200">•</span>
                                    <span className="text-[9px] font-black uppercase text-slate-400">{log.date}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                      </div>
                  </section>
               </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------- VIEW: PLANS (OFFRES) ------------------- */
function PlansView() {
  const plans = [
    { 
      title: "Starter", 
      price: "0", 
      color: "slate", 
      icon: <Users size={24} />,
      features: ["Max 100 tx / jour", "Commission Support 2.0%", "Support Standard", "Dashboard Basique"],
      isPopular: false
    },
    { 
      title: "Premium Pro", 
      price: "25 000", 
      color: "indigo", 
      icon: <Zap size={24} />,
      features: ["Volume Illimité", "Commission Priority 1.2%", "Support VIP 24/7", "Accès API & Webhooks", "Rapports Avancés"],
      isPopular: true
    },
    { 
      title: "Executive", 
      price: "Custom", 
      color: "slate", 
      icon: <ShieldCheck size={24} />,
      features: ["Négociation Directe", "Commission Tailored", "Account Manager", "IA Fraud Protection", "Multi-Region Hub"],
      isPopular: false
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-12 pb-20"
    >
      <div className="flex items-center justify-between">
         <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-5xl font-black tracking-tighter text-slate-950 leading-none">Plans & <span className="text-[#234D96]">Offres</span></h2>
            <p className="text-slate-400 font-medium text-sm mt-3">Structurez les paliers de croissance pour vos partenaires marchands.</p>
         </div>
         <button className="px-8 py-5 bg-[#234D96] text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-indigo-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-b-4 border-indigo-950">
            <Plus size={20} /> Créer une Offre
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: plan.isPopular ? 1.05 : 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-12 rounded-[4rem] flex flex-col transition-all duration-500 group overflow-hidden ${
              plan.isPopular 
              ? 'bg-slate-950 text-white shadow-2xl shadow-slate-950/40 z-10' 
              : 'bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl'
            }`}
          >
            {plan.isPopular && (
               <div className="absolute top-10 -right-16 bg-[#234D96] text-white px-20 py-1.5 rotate-45 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl z-20">
                  Recommendé
               </div>
            )}
            
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 shadow-2xl ${
              plan.isPopular ? 'bg-[#234D96] text-white shadow-indigo-900/40' : 'bg-slate-950 text-white shadow-slate-900/40'
            }`}>
               {plan.icon}
            </div>

            <div className="mb-10">
               <h3 className={`text-3xl font-black tracking-tight mb-2 ${plan.isPopular ? 'text-white' : 'text-slate-950'}`}>{plan.title}</h3>
               <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black tracking-tighter ${plan.isPopular ? 'text-white' : 'text-slate-950'}`}>{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">FCFA / mo</span>}
               </div>
            </div>

            <div className="flex-1 space-y-6 mb-12">
               {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-4">
                     <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                        plan.isPopular ? 'bg-white/10 border-white/20 text-[#234D96]' : 'bg-indigo-50 border-indigo-100 text-[#234D96]'
                     }`}>
                        <Plus size={14} />
                     </div>
                     <span className={`text-sm font-bold ${plan.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>{f}</span>
                  </div>
               ))}
            </div>

            <button className={`w-full py-6 rounded-[2.2rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-xl border-b-4 ${
              plan.isPopular 
                ? 'bg-[#234D96] text-white border-indigo-950 shadow-indigo-900/40 hover:bg-white hover:text-slate-950 hover:border-slate-300' 
                : 'bg-slate-950 text-white border-slate-700 shadow-slate-900/40 hover:bg-[#234D96] hover:border-indigo-900'
            }`}>
              Activer Plan
            </button>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#234D96] rounded-full blur-[60px] opacity-10 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         className="bg-[#234D96] rounded-[4rem] p-16 text-white relative overflow-hidden group shadow-2xl shadow-indigo-900/40"
      >
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-xl text-center md:text-left">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl mb-4 group-hover:scale-110 transition-transform">
                  <Ticket size={32} />
               </div>
               <h3 className="text-4xl font-black tracking-tighter">Marketing & Coupons</h3>
               <p className="text-indigo-100/70 font-medium text-lg leading-relaxed">Générez des codes promotionnels massifs pour injecter de la liquidité et attirer de nouveaux agents sur votre réseau.</p>
            </div>
            <button className="px-12 py-7 bg-white text-slate-950 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] border-b-4 border-slate-200 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10">
               Générer une Campagne
            </button>
         </div>
         <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
