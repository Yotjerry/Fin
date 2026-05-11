import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";
import { 
  ShieldAlert,
  Info,
  CheckCircle,
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
  ChevronDown,
  X,
  Check,
  Calendar,
  Clock,
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
  Power,
  Smartphone,
  PenTool,
  Banknote,
  TrendingDown,
  Star,
  Ticket,
  Eye,
  Settings,
  Mail,
  Archive,
  Inbox,
  Building2,
  FileText,
  Trash2,
  Save,
  Key,
  Layers,
  CreditCard,
  EyeOff,
  UserCircle,
  FileCheck,
  Fingerprint,
  Phone,
  User,
  Edit3,
  Download,
  DownloadCloud,
  BookOpen,
  Pause,
  Play,
  RotateCcw,
  Headphones,
  Menu
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

type AdminTab = "Overview" | "Merchants" | "Catalogue" | "Plans" | "Support" | "Settings" | "Audit";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("Overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, title: "Sécurité", msg: "Tentative d'accès suspecte bloquée", time: "5 min", type: "alert", color: "rose", read: false },
    { id: 2, title: "Infrastructure", msg: "Base de données optimisée", time: "2h", type: "info", color: "indigo", read: false },
    { id: 3, title: "Merchant", msg: "5 nouveaux marchands inscrits", time: "5h", type: "success", color: "emerald", read: true },
    { id: 4, title: "Audit", msg: "Accès au journal d'audit", time: "8h", type: "info", color: "indigo", read: true },
    { id: 5, title: "Système", msg: "Mise à jour v4.2.1 déployée", time: "1j", type: "success", color: "emerald", read: true },
  ]);

  const markAdminNotifAsRead = (id: number) => {
    setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAdminNotifsAsRead = () => {
    setAdminNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const adminUnreadCount = adminNotifications.filter(n => !n.read).length;

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
      className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300 group ${
        active 
          ? 'bg-[#234D96] text-white shadow-xl shadow-indigo-900/20' 
          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-100 hover:shadow-sm'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-[#234D96]'} transition-colors mt-0.5`}>{icon}</span>
      <span className="text-[13px] font-black tracking-widest flex-1 text-left">{label}</span>
      {badge && (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
          active ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );

  const MobileAdminNavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-all ${active ? "text-[#234D96]" : "text-slate-400"}`}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? "bg-blue-50" : ""}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      </div>
      <span className="text-[9px] font-black uppercase tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 flex bg-[#F0F2F5] font-sans text-slate-900 overflow-hidden flex-col lg:flex-row">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#234D96] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#234D96] rounded-full blur-[120px] opacity-[0.02] pointer-events-none" />

      {/* SIDEBAR ADMIN - MODERN GLASS STYLE */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col shrink-0 
        lg:static lg:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 flex items-center justify-between border-b border-slate-50 mb-4 h-32 lg:h-40">
          <Logo className="h-24 lg:h-32 w-auto drop-shadow-sm" />
           <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto no-scrollbar py-4">
          <NavItem 
            active={activeTab === "Overview"} 
            onClick={() => { setActiveTab("Overview"); setIsMobileMenuOpen(false); }} 
            icon={<LayoutDashboard size={20} />} 
            label="Vue d'Ensemble" 
          />
          <NavItem 
            active={activeTab === "Merchants"} 
            onClick={() => { setActiveTab("Merchants"); setIsMobileMenuOpen(false); }} 
            icon={<CheckCircle2 size={20} />} 
            label="Gestion des Marchands" 
          />

          <NavItem 
            active={activeTab === "Catalogue"} 
            onClick={() => { setActiveTab("Catalogue"); setIsMobileMenuOpen(false); }} 
            icon={<BookOpen size={20} />} 
            label="Catalogue Réseaux" 
          />

          <NavItem 
            active={activeTab === "Plans"} 
            onClick={() => { setActiveTab("Plans"); setIsMobileMenuOpen(false); }} 
            icon={<Plus size={20} />} 
            label="Plans & Offres" 
          />
          <NavItem 
            active={activeTab === "Support"} 
            onClick={() => { setActiveTab("Support"); setIsMobileMenuOpen(false); }} 
            icon={<MessageSquare size={20} />} 
            label="Support Client" 
          />

          <NavItem 
            active={activeTab === "Settings"} 
            onClick={() => { setActiveTab("Settings"); setIsMobileMenuOpen(false); }} 
            icon={<Settings2 size={20} />} 
            label="Paramètres" 
          />
          <NavItem 
            active={activeTab === "Audit"} 
            onClick={() => { setActiveTab("Audit"); setIsMobileMenuOpen(false); }} 
            icon={<ShieldCheck size={20} />} 
            label="Journal & Notifications" 
          />
        </nav>

        <div className="p-8">
           <button 
             onClick={() => {
               logout();
               navigate("/");
             }}
             className="w-full flex items-center justify-center gap-3 py-4 text-slate-400 font-black text-[11px] tracking-widest hover:text-rose-500 transition-colors"
           >
              <LogOut size={18} />
              Déconnexion
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden pb-20 lg:pb-0">
        {/* TOP BAR - SLEEK */}
        <header className="h-20 sm:h-24 bg-white/40 backdrop-blur-md border-b border-white/20 px-6 sm:px-12 flex items-center justify-between lg:justify-end shrink-0 z-40">
           <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-white text-slate-900 rounded-xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
            >
              <Menu size={20} />
            </button>

          <div className="flex items-center gap-4 sm:gap-8">
            {/* Admin Profile Label - Only on bigger screens */}
            <div className="hidden sm:flex flex-col items-end">
               <span className="text-[10px] font-black text-[#234D96] uppercase tracking-widest">Super Admin</span>
               <span className="text-xs font-bold text-slate-500">v4.2.1-stable</span>
            </div>
            {/* Notification Bell */}
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
                {adminUnreadCount > 0 && (
                  <span className="absolute top-3 right-3 w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white">
                    {adminUnreadCount}
                  </span>
                )}
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
                          <h3 className="text-xl font-black text-slate-900 tracking-tight">System Alerts</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{adminUnreadCount} non lues</p>
                        </div>
                        <button 
                          onClick={markAllAdminNotifsAsRead}
                          className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all uppercase tracking-widest"
                        >
                          Tout lire
                        </button>
                      </div>

                      <div className="max-h-[450px] overflow-y-auto no-scrollbar">
                        {adminNotifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            onClick={() => markAdminNotifAsRead(notif.id)}
                            className={`p-6 border-b border-slate-50 hover:bg-slate-50/50 transition-all group cursor-pointer relative ${!notif.read ? 'bg-slate-50/30' : ''}`}
                          >
                            {!notif.read && (
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            )}
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
                                <p className={`text-sm font-bold transition-colors leading-tight ${!notif.read ? 'text-slate-900 group-hover:text-indigo-600' : 'text-slate-400'}`}>
                                  {notif.msg}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setActiveTab("Audit");
                            setIsNotificationsOpen(false);
                          }}
                          className="w-full py-4 bg-white text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] rounded-2xl border border-slate-200 hover:border-slate-900 transition-all shadow-sm"
                        >
                          Voir journal complet
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-11 w-11 bg-[#234D96] rounded-2xl p-[2px] shadow-lg shadow-indigo-900/20">
                 <div className="w-full h-full bg-slate-900 rounded-[0.9rem] flex items-center justify-center text-white font-black text-xs">
                    JY
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation - Only visible on small screens */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 z-50 px-6 flex items-center justify-between pb-safe">
          <MobileAdminNavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === "Overview"} onClick={() => setActiveTab("Overview")} />
          <MobileAdminNavItem icon={<Users size={20} />} label="Marchands" active={activeTab === "Merchants"} onClick={() => setActiveTab("Merchants")} />
          <MobileAdminNavItem icon={<Cpu size={20} />} label="Catalogue" active={activeTab === "Catalogue"} onClick={() => setActiveTab("Catalogue")} />
          <MobileAdminNavItem icon={<Settings2 size={20} />} label="Admin" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
        </div>

        {/* PAGE DYNAMICS */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10 lg:p-12 relative">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && <OverviewView key="overview" />}
            {activeTab === "Merchants" && <MerchantsView key="merchants" />}
            {activeTab === "Catalogue" && <CatalogueView key="catalogue" />}

            {activeTab === "Plans" && <PlansView key="plans" />}
            {activeTab === "Support" && <SupportView key="support" />}

            {activeTab === "Audit" && <AuditView key="audit" />}
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
          <div className="w-1.5 h-8 sm:h-12 bg-[#234D96] rounded-full" />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-950 leading-none">Global <span className="text-[#234D96]">Vision</span></h2>
            <p className="text-[8px] sm:text-[10px] font-black text-slate-400 tracking-[0.2em] sm:tracking-[0.3em] font-sans">SYSTÈME CENTRALISÉ</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </div>

      {/* TOP KPI ROW - IMAGE STYLE */}
      <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-6">
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
      <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3">
        {/* Working Format -> Transactions Format */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm flex flex-col justify-between shrink-0 w-[320px] md:w-auto">
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
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm shrink-0 w-[320px] md:w-auto">
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
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm flex flex-col shrink-0 w-[320px] md:w-auto">
           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Demandes & Actions</h3>
           <div className="space-y-6 flex-1">
              {[
                { label: "Vérification KYC", count: 9, icon: <UserCircle size={18} />, bg: "bg-indigo-50", text: "text-[#234D96]" },
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
                 { name: "Sika Express", role: "Nouveau Marchand", status: "En attente KYC", color: "bg-amber-500" },
                 { name: "Momo Market", role: "Marchand Premium", status: "Plan Actif", color: "bg-[#6200EA]" },
                 { name: "Agent Littoral", role: "Terminal #882", status: "Actif / 12 TXN", color: "bg-emerald-500" },
                 { name: "Wave Support", role: "Alerte Système", status: "API Connectée", color: "bg-[#234D96]" }
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
    <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group flex items-center justify-between shrink-0 w-[280px] sm:w-auto">
       <div className="flex flex-col gap-1">
          <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 tracking-widest uppercase">{label}</h4>
          <div className="flex items-baseline gap-2">
             <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tighter leading-none">{value}</span>
             {isCurrency && <span className="text-[9px] sm:text-[10px] font-black text-slate-400">FCFA</span>}
          </div>
       </div>
       <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isPositive ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
          {growth}
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
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-1.5 h-10 bg-[#3A4DB7] rounded-full" />
            <div className="flex items-baseline gap-4">
               <h2 className="text-4xl font-black tracking-tighter text-slate-950">Gestion des marchands</h2>
               <p className="text-slate-400 font-medium text-xs">Activez les comptes marchands et renouvelez leurs abonnements.</p>
            </div>
         </div>
      </div>

      {/* SUMMARY STATS BAR */}
      <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
         {[
           { label: "MARCHANDS", val: "842", sub: "Base totale suivie", color: "indigo" },
           { label: "ACTIFS", val: "798", sub: "Comptes opérationnels", color: "emerald" },
           { label: "EN ATTENTE", val: "12", sub: "A vérifier ou activer", color: "amber" },
           { label: "SUSPENDUS", val: "32", sub: "Accès temporaires bloqués", color: "rose" },
           { label: "AGENTS", val: "2,410", sub: "Points de vente", color: "slate" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200/60 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow group shrink-0 w-[220px] sm:w-auto">
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

         <div className="overflow-x-auto no-scrollbar">
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
                           <div className="flex items-center justify-end gap-4">
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
                                className="px-5 py-2.5 bg-white border border-slate-200 text-[#3A4DB7] rounded-xl text-[10px] font-black tracking-widest hover:bg-slate-50 transition-all"
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
            <div className="flex items-center gap-4">
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:bg-slate-50 transition-all">Précédent</button>
               <button className="px-4 py-2 bg-slate-950 text-white rounded-xl text-[10px] font-black transition-all">1</button>
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
            className="fixed inset-0 z-[400] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col relative overflow-hidden border border-slate-200"
              onClick={e => e.stopPropagation()}
            >
              {/* HEADER: IDENTITY & STATUS */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
                       {showDetailsModal.name.charAt(0)}
                    </div>
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{showDetailsModal.name}</h3>
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                            showDetailsModal.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                            {showDetailsModal.isActive ? 'Opérationnel' : 'Compte Suspendu'}
                          </span>
                       </div>
                       <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><Fingerprint size={12} /> ID: {showDetailsModal.id}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> Inscrit le {showDetailsModal.joinedAt}</span>
                       </div>
                    </div>
                 </div>
                 <button 
                   onClick={() => setShowDetailsModal(null)} 
                   className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm"
                 >
                   <X size={20} />
                 </button>
              </div>

              {/* BODY: ALL INFO IN ONE VIEW */}
              <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-12 gap-0">
                 
                 {/* COLUMN 1: MERCHANT INFOS */}
                 <div className="col-span-4 p-8 border-r border-slate-100 space-y-8">
                    <section>
                       <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Détails Structure</h5>
                       <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Gérant / Responsable</p>
                             <p className="text-sm font-black text-slate-900">{showDetailsModal.manager}</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Email Professionnel</p>
                             <p className="text-sm font-black text-slate-900">{showDetailsModal.email}</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Téléphone de Support</p>
                             <p className="text-sm font-black text-slate-900">{showDetailsModal.phone}</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Offre de Service</p>
                             <p className="text-sm font-black text-[#3A4DB7] uppercase">{showDetailsModal.plan}</p>
                          </div>
                       </div>
                    </section>

                    <section className="pt-4">
                       <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Données d'Exploitation</h5>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 border border-slate-100 rounded-2xl bg-white">
                             <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Agences</p>
                             <p className="text-lg font-black text-slate-900">{showDetailsModal.agencies}</p>
                          </div>
                          <div className="text-center p-4 border border-slate-100 rounded-2xl bg-white">
                             <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Agents</p>
                             <p className="text-lg font-black text-slate-900">{showDetailsModal.agents}</p>
                          </div>
                       </div>
                    </section>
                 </div>

                 {/* COLUMN 2: KYC DOCUMENTS & COMPLIANCE */}
                 <div className="col-span-8 p-8 bg-slate-50/30 overflow-y-auto no-scrollbar space-y-8">
                    <div className="flex items-center justify-between mb-2">
                       <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dossier de Conformité (KYC)</h5>
                       <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          showDetailsModal.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                       }`}>
                          {showDetailsModal.kycStatus === 'Verified' ? 'Dossier Validé' : 'En attente de revue'}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       {showDetailsModal.kycDocs.map((doc, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#3A4DB7] transition-all cursor-pointer">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#3A4DB7] transition-all">
                                   <FileText size={20} />
                                </div>
                                <div className="overflow-hidden">
                                   <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">{doc.type}</p>
                                   <p className="text-[11px] font-black text-slate-950 truncate max-w-[120px]">{doc.name}</p>
                                </div>
                             </div>
                             <button className="p-2.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-[#3A4DB7] border border-slate-100 hover:bg-white transition-all">
                                <Eye size={16} />
                             </button>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 p-6 bg-white border border-slate-200 rounded-3xl space-y-6">
                       <h5 className="text-[10px] font-black text-slate-950 uppercase tracking-widest pb-3 border-b border-slate-50">Analyse de l'auditeur</h5>
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Identité Vérifiée</span>
                                <CheckCircle2 size={14} className="text-emerald-500" />
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">RCCM / Registre</span>
                                <CheckCircle2 size={14} className="text-emerald-500" />
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Localisation Siège</span>
                                <CheckCircle2 size={14} className="text-emerald-500" />
                             </div>
                          </div>
                          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                             <p className="text-[9px] font-bold text-indigo-600 uppercase mb-2">Note de sécurité</p>
                             <div className="flex items-center gap-1 mb-2">
                                {[1,2,3,4,5].map(s => <div key={s} className={`w-3 h-1.5 rounded-full ${s <= 4 ? 'bg-[#3A4DB7]' : 'bg-slate-200'}`} />)}
                             </div>
                             <p className="text-[10px] font-bold text-slate-500 italic">Profil fiable, aucune alerte de fraude détectée sur les réseaux Wave & Orange.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* FOOTER: FINAL ACTIONS */}
              <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
                 <div className="flex gap-3">
                    <button 
                      onClick={() => toggleStatus(showDetailsModal.id)}
                      className={`h-12 px-6 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                        showDetailsModal.isActive 
                          ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white' 
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {showDetailsModal.isActive ? <Lock size={14} /> : <Unlock size={14} />}
                      {showDetailsModal.isActive ? 'Suspendre Compte' : 'Réactiver Compte'}
                    </button>
                    <button className="h-12 px-6 bg-slate-100 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
                       <MessageSquare size={14} /> Contacter Support
                    </button>
                 </div>

                 <div className="flex gap-3">
                    {showDetailsModal.kycStatus !== 'Verified' && (
                       <>
                          <button 
                             onClick={() => handleKycAction(showDetailsModal.id, 'reject')}
                             className="h-12 px-6 bg-rose-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
                          >
                             Rejeter le dossier
                          </button>
                          <button 
                             onClick={() => handleKycAction(showDetailsModal.id, 'approve')}
                             className="h-12 px-8 bg-[#3A4DB7] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                          >
                             <ShieldCheck size={14} /> Valider & Activer
                          </button>
                       </>
                    )}
                 </div>
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

function InfoBlock({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
   return (
      <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
         <div className="w-10 h-10 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#3A4DB7] rounded-xl flex items-center justify-center transition-all shrink-0">
            {icon}
         </div>
         <div className="overflow-hidden">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-black text-slate-950 tracking-tight truncate">{value}</p>
         </div>
      </div>
   );
}

function ActionCard({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
   const colors: Record<string, string> = {
      indigo: 'bg-indigo-50 text-[#3A4DB7] hover:bg-[#3A4DB7] hover:text-white',
      slate: 'bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white',
      amber: 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white',
      rose: 'bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white',
   };
   
   return (
      <button className={`p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-all duration-300 font-black text-[10px] uppercase tracking-widest border border-transparent hover:shadow-xl hover:shadow-indigo-500/10 ${colors[color]}`}>
         {icon}
         {label}
      </button>
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
         <div className="flex items-center gap-6">
            <div className="w-1.5 h-10 bg-[#3A4DB7] rounded-full" />
            <div className="flex items-baseline gap-4">
               <h2 className="text-4xl font-black tracking-tighter text-slate-950">Plans d'abonnement</h2>
               <p className="text-slate-400 font-medium text-xs">Pilotez le catalogue commercial de FinTrack.</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button 
              onClick={openAddModal}
              className="flex items-center gap-3 px-8 py-5 bg-[#3A4DB7] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all"
            >
               <Plus size={18} /> Nouveau Plan
            </button>
         </div>
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
      <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
         {[
           { label: "PLANS", val: plans.length, sub: "Catalogue total", icon: <Layers className="text-[#234D96]" size={20} />, bg: "bg-indigo-50" },
           { label: "ACTIFS", val: plans.filter(p => p.isActive).length, sub: "Commercialisables", icon: <CheckCircle2 className="text-emerald-500" size={20} />, bg: "bg-emerald-50" },
           { label: "INACTIFS", val: plans.filter(p => !p.isActive).length, sub: "Masqués ou suspendus", icon: <XCircle className="text-rose-500" size={20} />, bg: "bg-rose-50" },
           { label: "LIMITE MOYENNE", val: Math.round(plans.reduce((acc, curr) => acc + curr.agencyLimit, 0) / (plans.length || 1)), sub: "Agences autorisées", icon: <CreditCard className="text-amber-500" size={20} />, bg: "bg-amber-50" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm flex items-start justify-between group hover:shadow-md transition-all shrink-0 w-[260px] sm:w-auto">
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

         <div className="overflow-x-auto no-scrollbar">
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
                           <div className="flex items-center justify-end gap-4 transition-opacity">
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
import { feedbackService, Feedback, FeedbackStatus } from '../services/feedbackService';

function SupportView() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState('Tous');
  const [adminNote, setAdminNote] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    const data = await feedbackService.getAllFeedbacks();
    setFeedbacks(data);
  };

  const handleUpdateStatus = async (id: string, newStatus: FeedbackStatus) => {
    const note = adminNote[id] || '';
    await feedbackService.updateFeedbackStatus(id, newStatus, note);
    loadFeedbacks();
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    if (filter === 'Tous') return true;
    if (filter === 'Corrections') return f.type === 'Correction';
    if (filter === 'Bugs') return f.type === 'Bug Technique';
    if (filter === 'Suggestions') return f.type === 'Suggestion';
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
            Support & Incidents
            <span className="text-xs bg-indigo-50 text-[#3A4DB7] px-3 py-1 rounded-full border border-indigo-100 font-black uppercase tracking-widest">{filteredFeedbacks.length} Signalements</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Gestion centralisée des retours techniques et suggestions du réseau.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Filtrer :</span>
        {['Tous', 'Corrections', 'Bugs', 'Suggestions'].map((t) => (
          <button 
            key={t} 
            onClick={() => setFilter(t)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === t 
              ? 'bg-slate-900 text-white shadow-lg' 
              : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {filteredFeedbacks.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {filteredFeedbacks.map((f) => (
              <div key={f.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                    f.type === 'Bug Technique' ? 'bg-rose-50 text-rose-500' : 
                    f.type === 'Correction' ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-indigo-500'
                  }`}>
                    {f.type === 'Bug Technique' ? <Zap size={24} /> : <FileText size={24} />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">#{f.id}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        f.status === 'Résolu' ? 'bg-emerald-50 text-emerald-600' :
                        f.status === 'En cours' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {f.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 ml-auto">
                        {new Date(f.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-950 uppercase tracking-tight mb-2">
                      {f.userName} • <span className="text-slate-400 font-bold">{f.type}</span>
                    </h4>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100 italic">
                      "{f.message}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-end gap-4 bg-white border border-slate-100 p-4 rounded-2xl">
                   <div className="w-full flex-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Réponse / Note administrative</label>
                      <input 
                        type="text"
                        value={adminNote[f.id] || f.adminNote || ''}
                        onChange={(e) => setAdminNote({...adminNote, [f.id]: e.target.value})}
                        placeholder="Rédiger une réponse visible par l'utilisateur..."
                        className="w-full bg-slate-50 border-none outline-none p-3 rounded-xl text-xs font-bold"
                      />
                   </div>
                   <div className="flex gap-2">
                     {f.status !== 'Résolu' && (
                       <button 
                        onClick={() => handleUpdateStatus(f.id, 'Résolu')}
                        className="px-6 py-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2"
                       >
                         <CheckCircle2 size={14} /> Marquer Résolu
                       </button>
                     )}
                     {f.status !== 'En cours' && f.status !== 'Résolu' && (
                       <button 
                        onClick={() => handleUpdateStatus(f.id, 'En cours')}
                        className="px-6 py-3 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-950 transition-all flex items-center gap-2"
                       >
                         <Clock size={14} /> Traiter
                       </button>
                     )}
                     {(f.status === 'En cours' || f.status === 'Résolu') && (
                       <button 
                        onClick={() => handleUpdateStatus(f.id, f.status)}
                        className="px-6 py-3 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
                       >
                         <Save size={14} /> Enregistrer Note
                       </button>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200">
               <ShieldCheck size={40} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Aucun feedback à traiter.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------- VIEW: AUDIT LOGS ------------------- */
function AuditView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'LOGS' | 'NOTIFS'>('NOTIFS');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // Default Apr 2026
  const [yearInput, setYearInput] = useState('2026');
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [selectedHour, setSelectedHour] = useState('Tous');

  // Notifications state moved inside view for local management or could stay global
  // For consistency with user request, let's use some dummy data here specifically for the "Journal"
  const [notificationsJournal, setNotificationsJournal] = useState([
    { id: 1, title: "Sécurité", msg: "Tentative d'accès suspecte bloquée", time: "5 min", type: "alert", color: "rose", read: false, date: "07/05/2026 12:15" },
    { id: 2, title: "Infrastructure", msg: "Base de données optimisée", time: "2h", type: "info", color: "indigo", read: false, date: "07/05/2026 10:30" },
    { id: 3, title: "Merchant", msg: "5 nouveaux marchands inscrits", time: "5h", type: "success", color: "emerald", read: true, date: "07/05/2026 07:12" },
    { id: 4, title: "Audit", msg: "Accès au journal d'audit par Admin", time: "8h", type: "info", color: "indigo", read: true, date: "06/05/2026 23:45" },
    { id: 5, title: "Système", msg: "Mise à jour v4.2.1 déployée", time: "1j", type: "success", color: "emerald", read: true, date: "06/05/2026 14:20" },
    { id: 6, title: "Alerte Payement", msg: "Échec de connexion API Orange", time: "2j", type: "alert", color: "rose", read: true, date: "05/05/2026 09:10" },
  ]);

  const markNotifRead = (id: number) => {
    setNotificationsJournal(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: number) => {
    setNotificationsJournal(prev => prev.filter(n => n.id !== id));
  };

  // Sync year input when viewDate changes (e.g. via month arrows)
  useEffect(() => {
    setYearInput(viewDate.getFullYear().toString());
  }, [viewDate]);

  // Sync text inputs when dates change
  useEffect(() => {
    setStartInput(startDate ? startDate.toLocaleDateString('fr-FR') : '');
    setEndInput(endDate ? endDate.toLocaleDateString('fr-FR') : '');
  }, [startDate, endDate]);

  const parseManualDate = (str: string) => {
    const parts = str.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 1000) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  const auditLogs = [
    { id: 1, date: '28/04/2026', time: '14:36:59', timestamp: new Date(2026, 3, 28, 14, 36), actor: 'Agent Cotonou', action: 'agent.transaction.reversal_requested', target: 'transaction #53', description: 'Demande d\'annulation soumise par un agent.' },
    { id: 2, date: '28/04/2026', time: '14:36:28', timestamp: new Date(2026, 3, 28, 14, 36), actor: 'Agent Cotonou', action: 'agent.transaction.reversal_requested', target: 'transaction #50', description: 'Demande d\'annulation soumise par un agent.' },
    { id: 3, date: '25/04/2026', time: '00:47:31', timestamp: new Date(2026, 3, 25, 0, 47), actor: 'Agent Cotonou', action: 'agent.transaction.proof_uploaded', target: 'transaction #14', description: 'Preuve de transaction ajoutée et transaction confirmée.' },
    { id: 4, date: '24/04/2026', time: '23:56:57', timestamp: new Date(2026, 3, 24, 23, 56), actor: 'Agent Cotonou', action: 'agent.transaction.created', target: 'transaction #46', description: 'Transaction enregistrée par un agent.' },
    { id: 5, date: '15/03/2026', time: '18:12:45', timestamp: new Date(2026, 2, 15, 18, 12), actor: 'Admin Koffi', action: 'admin.user.access_granted', target: 'marchand #202', description: 'Accès plateforme validé suite au KYC.' },
    { id: 6, date: '02/03/2026', time: '09:05:11', timestamp: new Date(2026, 2, 2, 9, 5), actor: 'Système', action: 'system.autobackup.success', target: 'DB_Production', description: 'Sauvegarde journalière effectuée avec succès.' },
  ];

  const hourOptions = ['Tous', ...Array.from({ length: 24 }, (_, i) => i.toString())];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());

    const logTime = log.timestamp.getTime();
    const startAt = startDate ? new Date(startDate).setHours(0,0,0,0) : 0;
    const endAt = endDate ? new Date(endDate).setHours(23,59,59,999) : Infinity;
    
    const matchesDate = logTime >= startAt && logTime <= endAt;
    const matchesHour = selectedHour === 'Tous' || log.timestamp.getHours().toString() === selectedHour;

    return matchesSearch && matchesDate && matchesHour;
  });

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedHour('Tous');
    setSearchQuery('');
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const isSelected = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (startDate && d.getTime() === startDate.getTime()) return true;
    if (endDate && d.getTime() === endDate.getTime()) return true;
    return false;
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return d > startDate && d < endDate;
  };

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(viewDate);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8 pb-20 px-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase shrink-0">Audit & Events</h2>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveSubTab('NOTIFS')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'NOTIFS' ? 'bg-white shadow-sm text-[#234D96]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Centre de Notifications
            </button>
            <button 
              onClick={() => setActiveSubTab('LOGS')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'LOGS' ? 'bg-white shadow-sm text-[#234D96]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Logs Techniques
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={resetFilters}
             className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-slate-400 hover:text-slate-900 transition-all"
           >
              <RotateCcw size={14} /> Réinitialiser
           </button>
        </div>
      </div>

      {activeSubTab === 'LOGS' ? (
        <>
          {/* CONTEXTUAL SMART FILTER */}
          <div className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/10 flex flex-col lg:flex-row gap-2 relative z-50">
        <div className="flex-1 relative group rounded-2xl bg-slate-50/50 border border-transparent focus-within:border-indigo-100 focus-within:bg-white transition-all duration-500">
           <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors duration-500" />
           <input 
              type="text"
              placeholder="Rechercher une empreinte..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-transparent border-none text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300"
           />
        </div>

        <div className="flex items-center gap-2">
           {/* DATE RANGE TRIGGER */}
           <div className="relative">
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className={`flex flex-col items-start px-6 py-2.5 rounded-2xl border transition-all duration-300 min-w-[200px] ${showCalendar ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-50 shadow-sm hover:border-slate-200'}`}
              >
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Période d'Analyse</span>
                 <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                    <Calendar size={12} className="text-indigo-500" />
                    <span>
                       {startDate ? startDate.toLocaleDateString('fr-FR') : 'Choisir date'} 
                       {endDate ? ` - ${endDate.toLocaleDateString('fr-FR')}` : ' ...'}
                    </span>
                 </div>
              </button>

              <AnimatePresence>
                {showCalendar && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-4 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-8 w-[350px] z-[100]"
                  >
                      {/* CALENDAR HEADER - PROFESSIONAL PICKER STYLE */}
                      <div className="flex flex-col gap-4 mb-6">
                         <div className="flex items-center justify-between bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100">
                            <button 
                              onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} 
                              className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all font-sans"
                            >
                               <ChevronLeft size={18} />
                            </button>
                            
                            <div className="flex items-center gap-1 group/header">
                               <div className="relative">
                                  <select 
                                     value={viewDate.getMonth()} 
                                     onChange={(e) => setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value), 1))}
                                     className="appearance-none bg-transparent pl-3 pr-6 py-1 text-xs font-black text-slate-900 uppercase tracking-widest cursor-pointer outline-none hover:text-indigo-600 transition-colors z-10 relative no-scrollbar"
                                  >
                                     {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((m, i) => (
                                        <option key={m} value={i}>{m}</option>
                                     ))}
                                  </select>
                                  <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                               </div>
                               <div className="w-[1px] h-3 bg-slate-200" />
                               <div className="relative">
                                  <input 
                                     type="text"
                                     value={yearInput} 
                                     onChange={(e) => {
                                        const val = e.target.value;
                                        setYearInput(val);
                                        const parsed = parseInt(val);
                                        if (parsed >= 1000 && parsed <= 9999) {
                                           setViewDate(new Date(parsed, viewDate.getMonth(), 1));
                                        }
                                     }}
                                     className="w-14 bg-transparent border-none text-xs font-black text-slate-900 uppercase tracking-widest outline-none hover:text-indigo-600 transition-colors text-center"
                                  />
                               </div>
                            </div>

                            <button 
                              onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} 
                              className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all"
                            >
                               <ChevronRight size={18} />
                            </button>
                         </div>

                         {/* MANUAL TEXT ENTRY */}
                         <div className="flex items-center gap-3">
                            <div className="flex-1 flex flex-col gap-1.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100 focus-within:border-indigo-200 transition-all">
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Du (JJ/MM/AAAA)</span>
                               <input 
                                 type="text" 
                                 placeholder="JJ/MM/AAAA"
                                 value={startInput}
                                 onChange={(e) => {
                                    setStartInput(e.target.value);
                                    const d = parseManualDate(e.target.value);
                                    if (d) setStartDate(d);
                                 }}
                                 className="bg-transparent border-none p-0 text-xs font-black text-slate-900 outline-none placeholder:text-slate-200"
                               />
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100 focus-within:border-indigo-200 transition-all">
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Au (JJ/MM/AAAA)</span>
                               <input 
                                 type="text" 
                                 placeholder="JJ/MM/AAAA"
                                 value={endInput}
                                 onChange={(e) => {
                                    setEndInput(e.target.value);
                                    const d = parseManualDate(e.target.value);
                                    if (d) setEndDate(d);
                                 }}
                                 className="bg-transparent border-none p-0 text-xs font-black text-slate-900 outline-none placeholder:text-slate-200"
                               />
                            </div>
                         </div>
                      </div>

                      {/* WEEKDAYS - CLEARER HEADERS */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                         {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d, i) => (
                            <div key={i} className="text-[10px] font-black text-slate-300 text-center uppercase py-2 tracking-tighter">{d}</div>
                         ))}
                      </div>

                      {/* DAYS GRID - FLUID FEEDBACK */}
                      <div className="grid grid-cols-7 gap-1">
                         {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-10" />
                         ))}
                         {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                            const selected = isSelected(day);
                            const range = isInRange(day);
                            const isStart = startDate && d.getTime() === startDate.getTime();
                            const isEnd = endDate && d.getTime() === endDate.getTime();
                            
                            return (
                               <button 
                                  key={day}
                                  onClick={() => handleDateClick(day)}
                                  className={`
                                     h-10 rounded-xl text-xs font-bold transition-all relative group/day
                                     ${selected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 z-10 font-black' : ''}
                                     ${range ? 'bg-indigo-50 text-indigo-700 rounded-none' : ''}
                                     ${isStart && endDate ? 'rounded-l-xl' : ''}
                                     ${isEnd ? 'rounded-r-xl' : ''}
                                     ${!selected && !range ? 'text-slate-600 hover:bg-slate-50' : ''}
                                     ${d.toDateString() === new Date().toDateString() ? 'ring-1 ring-inset ring-indigo-200' : ''}
                                  `}
                               >
                                  <span className="relative z-10">{day}</span>
                                  {!selected && !range && (
                                     <div className="absolute inset-1 rounded-lg bg-indigo-50 scale-0 group-hover/day:scale-100 transition-transform duration-300" />
                                  )}
                               </button>
                            );
                         })}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-50">
                         <button 
                            onClick={() => { setStartDate(null); setEndDate(null); setViewDate(new Date(2026, 3, 1)); }}
                            className="py-3.5 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 hover:text-slate-600 transition-all border border-slate-100/50"
                         >
                            Réinitialiser
                         </button>
                         <button 
                            onClick={() => setShowCalendar(false)}
                            className="py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
                         >
                            Confirmer
                         </button>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           <div className="w-[1px] h-10 bg-slate-100 mx-2" />

           <div className="relative">
              <button 
                 onClick={() => setShowHourPicker(!showHourPicker)}
                 className={`flex flex-col items-start px-5 py-2 rounded-2xl border transition-all duration-300 min-w-[120px] ${showHourPicker ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-50 shadow-sm hover:border-slate-200'}`}
              >
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">Heure</span>
                 <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                    <Clock size={12} className="text-indigo-500" />
                    <span>{selectedHour === 'Tous' ? 'Toutes' : `${selectedHour}h00`}</span>
                 </div>
              </button>

              <AnimatePresence>
                 {showHourPicker && (
                    <>
                       <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowHourPicker(false)} 
                       />
                       <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-full mt-4 w-72 bg-white/90 backdrop-blur-xl border border-white p-5 rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 z-50 overflow-hidden"
                       >
                          <div className="flex items-center justify-between mb-4 px-2">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sélecteur d'Heure</h4>
                             <button 
                                onClick={() => { setSelectedHour('Tous'); setShowHourPicker(false); }}
                                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700"
                             >
                                Réinitialiser
                             </button>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-2">
                             {hourOptions.map(h => (
                                <button
                                   key={h}
                                   onClick={() => {
                                      setSelectedHour(h);
                                      setShowHourPicker(false);
                                   }}
                                   className={`
                                      h-10 rounded-xl text-[10px] font-black transition-all
                                      ${selectedHour === h 
                                         ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                                         : 'bg-slate-50 text-slate-400 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-indigo-50'
                                      }
                                   `}
                                >
                                   {h === 'Tous' ? 'ALL' : `${h}h`}
                                </button>
                             ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-50 text-center">
                             <p className="text-[9px] font-bold text-slate-300 italic">
                                Filtre les logs par créneau horaire spécifique
                             </p>
                          </div>
                       </motion.div>
                    </>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        {filteredLogs.length > 0 ? (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Horodatage</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Acteur</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Action Système</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Cible</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Détails de l'événement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLogs.map((log, idx) => (
                  <motion.tr 
                    key={log.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-indigo-50/20 transition-all group cursor-pointer"
                  >
                    <td className="px-10 py-8 whitespace-nowrap">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:border-indigo-100 transition-all shadow-sm group-hover:shadow-indigo-500/10">
                             <Clock size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">{log.date}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">{log.time}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-black border-2 border-white shadow-sm italic group-hover:scale-110 transition-transform">
                             {log.actor === 'Système' ? 'SY' : log.actor.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{log.actor}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap font-mono text-xs">
                       <span className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm transition-all border border-slate-100/50 group-hover:border-indigo-100">
                          {log.action}
                       </span>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                       <span className="text-xs font-black text-[#234D96] uppercase tracking-widest bg-indigo-50/50 px-3 py-1 rounded-md group-hover:bg-indigo-50 group-hover:text-[#1a3a70] transition-colors">
                          {log.target}
                       </span>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-xs font-bold text-slate-400 italic max-w-sm font-serif leading-relaxed line-clamp-2 group-hover:text-slate-600 transition-colors">
                          "{log.description}"
                       </p>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-40 text-center space-y-6">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mx-auto border-2 border-dashed border-slate-200 relative">
                <Search size={40} />
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white">!</div>
             </div>
             <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Aucune Empreinte Trouvée</h4>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mt-3 italic">Ajustez vos filtres ou élargissez la période.</p>
             </div>
          </div>
        )}
      </div>
     </>
    ) : (
      /* NOTIFICATIONS JOURNAL VIEW */
      <div className="space-y-6">
        <div className="flex bg-white p-4 rounded-[2.5rem] border border-slate-100 items-center justify-between">
           <div className="flex items-center gap-4 px-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                 <Bell size={20} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-slate-900 tracking-tight">Historique des Alertes</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gérer les notifications système</p>
              </div>
           </div>
           <button 
             onClick={() => setNotificationsJournal(prev => prev.map(n => ({...n, read: true})))}
             className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100"
           >
              Tout marquer comme lu
           </button>
        </div>

        <div className="grid gap-4">
          {notificationsJournal.map((notif) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={notif.id}
              className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-xl hover:shadow-slate-200/20 relative overflow-hidden ${!notif.read ? 'border-l-4 border-l-indigo-500' : ''}`}
            >
              <div className="flex items-center gap-8">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 border-2 ${
                  notif.color === 'rose' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                  notif.color === 'indigo' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' :
                  'bg-emerald-50 text-emerald-500 border-emerald-100'
                }`}>
                  {notif.type === 'alert' ? <ShieldAlert size={28} /> : notif.type === 'info' ? <Info size={28} /> : <CheckCircle size={28} />}
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.title}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-black text-[#234D96] uppercase tracking-widest">{notif.date}</span>
                    {!notif.read && (
                      <span className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest rounded-md">New</span>
                    )}
                  </div>
                  <h4 className={`text-lg font-black tracking-tight ${!notif.read ? 'text-slate-900' : 'text-slate-400'}`}>{notif.msg}</h4>
                  <p className="text-xs font-medium text-slate-400">Événement système enregistré automatiquement.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!notif.read && (
                  <button 
                    onClick={() => markNotifRead(notif.id)}
                    className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100"
                    title="Marquer comme lu"
                  >
                    <Check size={20} />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotif(notif.id)}
                  className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100"
                  title="Supprimer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}

          {notificationsJournal.length === 0 && (
            <div className="py-32 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mx-auto">
                 <Bell size={40} />
               </div>
               <p className="text-slate-400 font-bold tracking-tight">Votre journal de notifications est vide.</p>
            </div>
          )}
        </div>
      </div>
    )}
    </motion.div>
  );
}

// Cleanup unused components

/* ------------------- VIEW: SETTINGS ------------------- */
function SettingsView() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // --- System Settings State ---
  const [activeSubTab, setActiveSubTab] = useState<'security' | 'team'>('security');
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  
  // Admin Team Management State
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Koffi G. Jean-Marc', role: 'Super Admin', status: 'En ligne', email: 'koffi@fintrack.ci' },
    { id: 2, name: 'Sarah Koné-Yao', role: 'Support Manager', status: 'Inactif', email: 'sarah.kone@fintrack.ci' },
  ]);
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);

  const handleDeleteAdmin = (id: number) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEditAdmin = (admin: any) => {
    setCurrentAdmin(admin);
    setIsEditingAdmin(true);
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const adminData = {
      id: currentAdmin ? currentAdmin.id : Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      status: currentAdmin ? currentAdmin.status : 'En ligne'
    };

    if (currentAdmin) {
      setAdmins(prev => prev.map(a => a.id === currentAdmin.id ? adminData : a));
    } else {
      setAdmins(prev => [...prev, adminData]);
    }

    setIsEditingAdmin(false);
    setCurrentAdmin(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const tabs = [
    { id: 'security', label: 'Sécurité & Système', icon: <ShieldCheck />, desc: 'Protection et accès' },
    { id: 'team', label: 'Collaborateurs', icon: <Users />, desc: 'Gestion de l\'équipe' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto pb-32">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 40, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[200] px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-2xl"
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Check size={14} strokeWidth={4} />
            </div>
            Configuration mise à jour avec succès
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-10">
        <header className="space-y-4 px-4 sm:px-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
            <Settings size={12} />
            <span className="text-[10px] font-black uppercase tracking-widest">Configuration Master</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">Paramètres Généraux</h2>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start px-4 sm:px-0">
          {/* Navigation Sidebar */}
          <div className="w-full lg:col-span-3 space-y-4">
            <div className="bg-white p-2 sm:p-3 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-sm flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex-none lg:w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-[1.2rem] sm:rounded-[1.5rem] transition-all duration-300 min-w-[160px] lg:min-w-0 ${
                    activeSubTab === tab.id 
                      ? 'bg-slate-950 text-white shadow-xl' 
                      : 'hover:bg-slate-50 text-slate-500'
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${
                    activeSubTab === tab.id ? 'bg-white/10' : 'bg-slate-100 text-slate-400 font-sans'
                  }`}>
                    {React.cloneElement(tab.icon as React.ReactElement<any>, { size: 16 })}
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest">{tab.label}</p>
                    <p className={`hidden sm:block text-[9px] font-bold opacity-40 ${activeSubTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="hidden lg:block p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
               <div className="flex items-center gap-2 text-slate-900 mb-3">
                  <Info size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Aide Rapide</span>
               </div>
               <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                 Les changements appliqués ici sont immédiats et affectent l'ensemble de l'infrastructure FinTrack.
               </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:col-span-9">
            <motion.div
              key={activeSubTab}
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {activeSubTab === 'security' && (
                <>
                  <motion.div variants={item} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 sm:space-y-10">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                       <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                          <Lock size={20} className="text-indigo-600" /> Sécurité des Accès
                       </h3>
                    </div>

                    <div className="space-y-6">
                       <div className="grid grid-cols-1 gap-4 sm:gap-6">
                          <div className="space-y-2">
                             <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mot de passe mestre actuel</label>
                             <input 
                               type="password" placeholder="••••••••••••" 
                               className="w-full px-5 sm:px-8 py-4 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none transition-all"
                             />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                               <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nouveau code</label>
                               <input 
                                 type="password" placeholder="••••••••" 
                                 className="w-full px-5 sm:px-8 py-4 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none transition-all"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Confirmation</label>
                               <input 
                                 type="password" placeholder="••••••••" 
                                 className="w-full px-5 sm:px-8 py-4 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none transition-all"
                               />
                            </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 sm:space-y-8">
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                       <Activity size={20} className="text-indigo-600" /> Disponibilité Plateforme
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                       <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div>
                             <h4 className="text-sm font-black text-slate-950">Mode Maintenance</h4>
                             <p className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Coupure des accès publics</p>
                          </div>
                          <button 
                            onClick={() => setIsMaintenance(!isMaintenance)}
                            className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full p-1 transition-all ${isMaintenance ? 'bg-rose-500' : 'bg-slate-300'}`}
                          >
                             <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-all ${isMaintenance ? 'translate-x-5 sm:translate-x-6' : ''}`} />
                          </button>
                       </div>

                       <div className="p-4 sm:p-6 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div>
                             <h4 className="text-sm font-black text-slate-950">Inscriptions Libres</h4>
                             <p className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Autoriser nouveaux marchands</p>
                          </div>
                          <button 
                            onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                            className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full p-1 transition-all ${isRegistrationOpen ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          >
                             <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-all ${isRegistrationOpen ? 'translate-x-5 sm:translate-x-6' : ''}`} />
                          </button>
                       </div>
                    </div>

                    <div className="p-6 sm:p-8 bg-slate-950 rounded-[1.2rem] sm:rounded-[1.5rem] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                       <div className="flex items-center gap-4 sm:gap-6">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-rose-500 shrink-0">
                             <Trash2 size={20} className="sm:w-6 sm:h-6" />
                          </div>
                          <div>
                             <h4 className="text-base sm:text-lg font-black tracking-tight">Purge du Système</h4>
                             <p className="text-[10px] sm:text-xs text-slate-400 font-medium font-sans">Supprimer les données historiques (+24 mois)</p>
                          </div>
                       </div>
                       <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-all">
                          Actioner la purge
                       </button>
                    </div>
                  </motion.div>
                </>
              )}

              {activeSubTab === 'team' && (
                <motion.div variants={item} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative">
                  {/* Editing Modal Overlay */}
                  <AnimatePresence>
                    {isEditingAdmin && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md p-4 sm:p-10 flex items-center justify-center"
                      >
                         <motion.div 
                           initial={{ scale: 0.9, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className="w-full max-w-md bg-white border border-slate-200 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl space-y-6"
                         >
                            <div className="flex items-center justify-between">
                               <h4 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">
                                 {currentAdmin ? 'Éditer l\'accès' : 'Nouvel administrateur'}
                               </h4>
                               <button onClick={() => setIsEditingAdmin(false)} className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all">
                                  <X size={16} />
                               </button>
                            </div>

                            <form onSubmit={handleSaveAdmin} className="space-y-4 sm:space-y-5">
                               <div className="space-y-1">
                                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nom complet</label>
                                  <input 
                                     name="name" required defaultValue={currentAdmin?.name}
                                     className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none"
                                     placeholder="ex: Paul Biya"
                                  />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Adresse E-mail pro</label>
                                  <input 
                                     name="email" type="email" required defaultValue={currentAdmin?.email}
                                     className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none"
                                     placeholder="admin@fintrack.ci"
                                  />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Rôle Système</label>
                                  <select 
                                     name="role" defaultValue={currentAdmin?.role || 'Support Manager'}
                                     className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none appearance-none cursor-pointer"
                                  >
                                     <option>Super Admin</option>
                                     <option>Support Manager</option>
                                     <option>Auditeur Financier</option>
                                  </select>
                               </div>

                               <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                  <button type="submit" className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-slate-950 text-white rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
                                     {currentAdmin ? 'Mettre à jour' : 'Créer l\'accès'}
                                  </button>
                                  <button type="button" onClick={() => setIsEditingAdmin(false)} className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-100 text-slate-500 rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                                     Annuler
                                  </button>
                               </div>
                            </form>
                         </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 bg-slate-50/30 gap-4">
                     <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">Direction Administrative</h3>
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Droits d'accès • {admins.length} membres</p>
                     </div>
                     <button 
                        onClick={() => { setCurrentAdmin(null); setIsEditingAdmin(true); }}
                        className="flex items-center justify-center sm:justify-start gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-slate-950 text-white rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                     >
                        <Plus size={14} className="sm:w-4 sm:h-4" /> Ajouter un administrateur
                     </button>
                  </div>

                  <div className="p-2 overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-[600px]">
                       <thead className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-6 sm:px-8 py-4 sm:py-5">Collaborateur</th>
                             <th className="px-6 sm:px-8 py-4 sm:py-5">Rôle</th>
                             <th className="px-6 sm:px-8 py-4 sm:py-5">Disponibilité</th>
                             <th className="px-6 sm:px-8 py-4 sm:py-5 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {admins.map((member) => (
                            <tr key={member.id} className="group hover:bg-slate-50 transition-colors">
                               <td className="px-6 sm:px-8 py-5 sm:py-6">
                                  <div className="flex items-center gap-3 sm:gap-4">
                                     <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-slate-400 text-[10px] sm:text-xs font-mono">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                     </div>
                                     <div>
                                        <p className="text-xs sm:text-sm font-black text-slate-950">{member.name}</p>
                                        <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 mt-0.5">{member.email}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 sm:px-8 py-5 sm:py-6">
                                  <span className={`px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${
                                    member.role === 'Super Admin' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-100 text-slate-500'
                                  }`}>
                                     {member.role}
                                  </span>
                               </td>
                               <td className="px-6 sm:px-8 py-5 sm:py-6">
                                  <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${member.status === 'En ligne' ? 'text-emerald-500' : 'text-slate-300'}`}>
                                     <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'En ligne' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                     {member.status}
                                  </span>
                               </td>
                               <td className="px-6 sm:px-8 py-5 sm:py-6 text-right">
                                  <div className="flex items-center justify-end gap-2 text-slate-300 font-sans">
                                     <button 
                                        onClick={() => handleEditAdmin(member)}
                                        className="p-2 sm:p-2.5 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                                     >
                                        <Settings2 size={14} />
                                     </button>
                                     <button 
                                        onClick={() => handleDeleteAdmin(member.id)}
                                        className="p-2 sm:p-2.5 hover:text-rose-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                                     >
                                        <Trash2 size={14} />
                                     </button>
                                  </div>
                               </td>
                               
                            </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>

                  <div className="p-10 pt-14 text-center">
                     <button className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] hover:text-indigo-600 transition-colors">
                        Journal d'audit de sécurité complet →
                     </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="mt-8 sm:mt-12 flex justify-center sm:justify-end">
               <button 
                  onClick={handleSave}
                  className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-slate-950 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20"
               >
                  Sauvegarder les modifications
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const handleUpdateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;
    
    // In a real app, this would be a DB call
    setEntries(entries.map(ent => ent.id === editingEntry.id ? editingEntry : ent));
    setEditingEntry(null);
  };

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
            <h2 className="text-4xl font-black tracking-tighter text-slate-950">Catalogue global des réseaux et banques</h2>
            <p className="text-slate-400 font-medium italic">Publiez, filtrez et entretenez les entrées catalogue disponibles pour les marchands.</p>
         </div>
         <button 
           onClick={() => setShowAddModal(true)}
           className="px-10 py-5 bg-[#234D96] text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-900/30 flex items-center gap-3 border-4 border-white"
         >
            <Plus size={20} strokeWidth={3} /> Créer une Nouvelle Entrée
         </button>
      </div>

      {/* KPI CARDS */}
      <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-6">
         {[
           { label: "CATALOGUES", val: stats.total, sub: "Entrées référencées", icon: <Layers size={20} />, color: "text-[#3A4DB7]", bg: "bg-indigo-50" },
           { label: "BANQUES", val: stats.banks, sub: "Entités bancaires", icon: <Building2 size={20} />, color: "text-amber-500", bg: "bg-amber-50" },
           { label: "RÉSEAUX", val: stats.networks, sub: "Mobile Money & Telco", icon: <Zap size={20} />, color: "text-indigo-400", bg: "bg-indigo-50" },
           { label: "ACTIFS", val: stats.active, sub: "Disponibles au catalogue", icon: <CheckCircle2 size={20} />, color: "text-emerald-500", bg: "bg-emerald-50" },
           { label: "RÉSEAUX RELIÉS", val: 16, sub: "Instances connectées", icon: <Globe size={20} />, color: "text-amber-600", bg: "bg-amber-50" }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm flex items-start justify-between group hover:shadow-md transition-all shrink-0 w-[240px] sm:w-auto">
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
               className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="relative w-full max-w-2xl bg-[#F8FAFC] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white"
            >
               <div className="flex flex-col h-full">
                  {/* MODAL HEADER */}
                  <div className="bg-white px-12 py-10 border-b border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-[#3A4DB7] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-900/20">
                           <Plus size={24} />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center gap-3">
                              <h3 className="text-2xl font-black tracking-tight text-slate-950">Nouveau Catalogue</h3>
                              <span className="px-2.5 py-1 bg-indigo-50 text-[#3A4DB7] text-[9px] font-black uppercase tracking-widest rounded-md border border-indigo-100">Draft Mode</span>
                           </div>
                           <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Enregistrement d'une nouvelle entité</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => setShowAddModal(false)}
                       className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all"
                     >
                        <Plus size={24} className="rotate-45" />
                     </button>
                  </div>

                  {/* MODAL BODY */}
                  <div className="p-12 space-y-10">
                     <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 space-y-3">
                           <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-1">Nom Officiel de la Structure</label>
                           <input 
                              type="text" 
                              placeholder="ex: Banque Nationale Africaine..."
                              className="w-full h-16 px-8 bg-white border border-slate-200 rounded-2xl text-base font-bold text-slate-900 focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
                           />
                        </div>

                        <div className="col-span-6 space-y-3">
                           <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-1">Type de Canal</label>
                           <select className="w-full h-16 px-8 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer shadow-sm">
                              <option>BANQUE</option>
                              <option>RESEAU</option>
                           </select>
                        </div>

                        <div className="col-span-6 space-y-3">
                           <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-1">Statut de Publication</label>
                           <select className="w-full h-16 px-8 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer shadow-sm">
                              <option>Actif</option>
                              <option>Inactif</option>
                           </select>
                        </div>
                     </div>

                     <div className="p-10 bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group hover:border-[#3A4DB7] transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm text-slate-300 group-hover:bg-[#3A4DB7] group-hover:text-white transition-all">
                           <Layers size={24} />
                        </div>
                        <div className="text-center space-y-2">
                           <h4 className="text-sm font-black text-slate-900 tracking-tight">Télécharger le Logo</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SVG, PNG OU WebP • Max 2Mo</p>
                        </div>
                     </div>
                  </div>

                  {/* MODAL FOOTER */}
                  <div className="px-12 py-10 bg-white border-t border-slate-100 flex gap-4">
                    <button 
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 h-16 bg-slate-50 text-slate-500 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                       Annuler
                    </button>
                    <button 
                      onClick={() => setShowAddModal(false)}
                      className="flex-[2] h-16 bg-[#3A4DB7] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-950 transition-all shadow-xl shadow-indigo-200"
                    >
                       Publier au catalogue
                    </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}

        {editingEntry && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setEditingEntry(null)}
               className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="relative w-full max-w-2xl bg-[#F8FAFC] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white"
            >
               <form onSubmit={handleUpdateEntry} className="flex flex-col h-full">
                  {/* MODAL HEADER */}
                  <div className="bg-white px-12 py-10 border-b border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                           <Edit3 size={24} />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center gap-3">
                              <h3 className="text-2xl font-black tracking-tight text-slate-950">Modifier l'Entrée</h3>
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-emerald-100 flex items-center gap-1.5">
                                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                 Live System
                              </span>
                           </div>
                           <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                              Catalogue ID <span className="text-slate-900">#ENT-{editingEntry.id.toString().padStart(3, '0')}</span>
                           </p>
                        </div>
                     </div>
                     <button 
                       type="button"
                       onClick={() => setEditingEntry(null)}
                       className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all"
                     >
                        <Plus size={24} className="rotate-45" />
                     </button>
                  </div>

                  {/* MODAL BODY */}
                  <div className="p-12 space-y-10">
                     <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 space-y-3">
                           <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-1">Nom de l'entité catalogue</label>
                           <div className="relative group">
                              <input 
                                 type="text" 
                                 value={editingEntry.name}
                                 onChange={(e) => setEditingEntry({...editingEntry, name: e.target.value})}
                                 className="w-full h-16 px-8 bg-white border border-slate-200 rounded-2xl text-base font-bold text-slate-900 focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
                                 required
                              />
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                 <CheckCircle2 size={18} className="text-emerald-500" />
                              </div>
                           </div>
                        </div>

                        <div className="col-span-6 space-y-3">
                           <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-1">Canal Opérationnel</label>
                           <div className="relative">
                              <select 
                                 value={editingEntry.type}
                                 onChange={(e) => setEditingEntry({...editingEntry, type: e.target.value})}
                                 className="w-full h-16 px-8 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer shadow-sm"
                              >
                                 <option value="BANQUE">Banque / Institution</option>
                                 <option value="RESEAU">Réseau / Telco</option>
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                 <Zap size={16} />
                              </div>
                           </div>
                        </div>

                        <div className="col-span-6 space-y-3">
                           <label className="text-[10px] font-black text-slate-500 tracking-widest uppercase px-1">Disponibilité Marchand</label>
                           <div className="relative">
                              <select 
                                 value={editingEntry.status}
                                 onChange={(e) => setEditingEntry({...editingEntry, status: e.target.value})}
                                 className="w-full h-16 px-8 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:border-[#3A4DB7] focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none cursor-pointer shadow-sm"
                              >
                                 <option value="Actif">Actif (Visible)</option>
                                 <option value="Inactif">Inactif (Masqué)</option>
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                 {editingEntry.status === 'Actif' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <ShieldCheck size={16} className="text-rose-500" />}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="p-8 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-between group cursor-pointer hover:border-[#3A4DB7] transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs border border-slate-100 group-hover:bg-indigo-50 group-hover:text-[#3A4DB7] transition-all">
                              {editingEntry.logo}
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-sm font-black text-slate-900 tracking-tight">Identité Visuelle</h4>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SVG, PNG OU WebP • Max 2Mo</p>
                           </div>
                        </div>
                        <button type="button" className="px-6 py-3 bg-slate-50 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all">
                           Remplacer
                        </button>
                     </div>
                  </div>

                  {/* MODAL FOOTER */}
                  <div className="px-12 py-10 bg-white border-t border-slate-100 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setEditingEntry(null)}
                      className="flex-1 h-16 bg-slate-50 text-slate-500 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                       Annuler
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] h-16 bg-[#3A4DB7] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-950 transition-all shadow-xl shadow-indigo-200"
                    >
                       Appliquer les changements
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden min-h-[600px]">
         <div className="p-10 border-b border-slate-100 flex items-center justify-between">
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Entrées catalogue</h3>
               <p className="text-xs font-bold text-slate-400 mt-1">{filteredEntries.length} entrée(s) visible(s)</p>
            </div>
            <div className="flex gap-4">
               <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" placeholder="Rechercher une entrée..." 
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
                  <option>Réseau</option>
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

         <div className="overflow-x-auto px-6 py-6 no-scrollbar">
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
                           <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                              <span className="text-[12px] font-black text-slate-400">{entry.logo}</span>
                           </div>
                       </td>
                       <td className="px-6 py-8">
                          <p className="text-sm font-black text-slate-900 tracking-tight">{entry.type}</p>
                       </td>
                       <td className="px-6 py-8">
                          <p className="text-sm font-black text-slate-900 tracking-tight">{entry.name}</p>
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
                               onClick={() => setEditingEntry(entry)}
                               className="p-3 bg-indigo-50 text-[#3A4DB7] rounded-xl hover:bg-[#3A4DB7] hover:text-white transition-all shadow-sm"
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
