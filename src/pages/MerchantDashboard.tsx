import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  Package, 
  Calendar, 
  BarChart2, 
  Settings, 
  Search, 
  ChevronDown, 
  MoreHorizontal,
  Bell, 
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  FileText,
  AlertCircle,
  TrendingUp,
  Filter,
  Plus,
  LogOut,
  Download,
  Database,
  Lock as LockIcon,
  X,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Building,
  Edit2,
  ShieldCheck,
  Power,
  Clock,
  CheckCircle,
  RotateCcw,
  History,
  Wallet,
  Banknote,
  Landmark,
  Activity,
  Key,
  Shield,
  CreditCard,
  HelpCircle,
  BellRing,
  User,
  Info,
  ShieldAlert,
  Star,
  MessageCircle,
  Globe,
  AlertTriangle,
  Zap,
  Check,
  LayoutGrid,
  Trash2,
  Smartphone,
  ExternalLink,
  PenTool,
  Stamp
} from "lucide-react";
import { 
  LineChart, 
  Line, 
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
  Bar
} from "recharts";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

// --- Data Model Interfaces ---

interface MerchantDashboardProps {
  stats: {
    totalTransactions: number;
    totalVolume: number;
    totalCommissions: number;
    nbAgences: number;
    volumeTrend: string;
    commissionTrend: string;
    transactionTrend: string;
  };
  chartData: Array<{ name: string; d: number; r: number }>;
  recentTransactions: Array<{
    nature: "DEPOT" | "RETRAIT" | "VENTE";
    reference: string;
    agence: string;
    montant: number;
    statut: "CONFIRME" | "ECHEC" | "EN_ATTENTE";
    date: string;
    photo_preuve_url: string | null;
    reference_externe: string | null;
  }>;
  pendingBilans: Array<{
    id_bilan: number;
    agence_id: number;
    agence: string;
    date: string;
    ecart: number;
    total_commissions: number;
    solde_physique_saisi: number;
    solde_physique_systeme: number;
    est_cloture_validee: boolean;
  }>;
  alertesStock: Array<{
    id: number;
    nom: string;
    agence: string;
    stock: number;
    prix: number;
  }>;
  topAgences: Array<{ name: string; volume: number }>;
  liveSupervision: {
    summary: {
      active_agencies: number;
      watch_agencies: number;
      pending_remontees: number;
      pending_closures: number;
    };
    agencies: Array<{
      id: number;
      nom: string;
      is_active: boolean;
      status: "OK" | "A_SURVEILLER" | "INACTIVE";
      solde_caisse: number;
      plafond_cash: number;
      cash_usage_percent: number;
      transactions_today: number;
      volume_today: number;
      commissions_today: number;
      active_agents: number;
      pending_remontees: number;
      pending_remontees_amount: number;
      pending_closures: number;
      latest_activity_at: string | null;
    }>;
    generated_at: string;
  };
  user: {
    id: number;
    nom: string;
    email: string;
    role: string;
    entreprise: {
      id: number;
      nom: string;
      telephone: string;
    };
  };
}

// --- Default Data (Contract Alignment) ---

const DEFAULT_PROPS: MerchantDashboardProps = {
  stats: {
    totalTransactions: 42,
    totalVolume: 1540000.0,
    totalCommissions: 23500.0,
    nbAgences: 3,
    volumeTrend: "+15%",
    commissionTrend: "+8%",
    transactionTrend: "+12%"
  },
  chartData: [
    { name: "12/04", d: 350000, r: 120000 },
    { name: "13/04", d: 480000, r: 200000 },
    { name: "14/04", d: 290000, r: 95000 },
    { name: "15/04", d: 520000, r: 180000 },
    { name: "16/04", d: 610000, r: 250000 },
    { name: "17/04", d: 420000, r: 150000 },
    { name: "18/04", d: 750000, r: 310000 },
  ],
  recentTransactions: [
    {
      nature: "DEPOT",
      reference: "TXN-8492",
      agence: "Agence Cotonou",
      montant: 50000.0,
      statut: "CONFIRME",
      date: "14:32",
      photo_preuve_url: null,
      reference_externe: "MOO-12345"
    }
  ],
  pendingBilans: [
    {
      id_bilan: 12,
      agence_id: 3,
      agence: "Agence Calavi",
      date: "18/04/2026",
      ecart: -5000.0,
      total_commissions: 8500.0,
      solde_physique_saisi: 95000.0,
      solde_physique_systeme: 100000.0,
      est_cloture_validee: false
    },
    {
      id_bilan: 13,
      agence_id: 1,
      agence: "Agence Cotonou",
      date: "18/04/2026",
      ecart: 2500.0,
      total_commissions: 12500.0,
      solde_physique_saisi: 152500.0,
      solde_physique_systeme: 150000.0,
      est_cloture_validee: false
    }
  ],
  alertesStock: [
    { id: 4, nom: "Recharge Gaz 12kg", agence: "Agence Porto-Novo", stock: 2, prix: 7000.0 },
    { id: 5, nom: "Bouteille Gaz 6kg", agence: "Agence Calavi", stock: 8, prix: 4500.0 },
    { id: 6, nom: "Kit Solaire XL", agence: "Agence Cotonou", stock: 12, prix: 150000.0 }
  ],
  topAgences: [
    { name: "Agence Cotonou", volume: 850000.0 },
    { name: "Agence Calavi",  volume: 620000.0 },
    { name: "Agence Porto",   volume: 310000.0 }
  ],
  liveSupervision: {
    summary: {
      active_agencies: 3,
      watch_agencies: 1,
      pending_remontees: 2,
      pending_closures: 1
    },
    agencies: [
      {
        id: 1,
        nom: "Agence Cotonou",
        is_active: true,
        status: "OK",
        solde_caisse: 320000.0,
        plafond_cash: 500000.0,
        cash_usage_percent: 64.0,
        transactions_today: 18,
        volume_today: 850000.0,
        commissions_today: 12750.0,
        active_agents: 2,
        pending_remontees: 0,
        pending_remontees_amount: 0.0,
        pending_closures: 0,
        latest_activity_at: "16:42"
      }
    ],
    generated_at: "2026-04-19T00:24:00Z"
  },
  user: {
    id: 2,
    nom: "Jean Marchand",
    email: "marchand@fintrack.bj",
    role: "MARCHAND",
    entreprise: {
      id: 1,
      nom: "GazPlus Bénin",
      telephone: "+229 01234567"
    }
  }
};

// --- Sub-components ---

function Dropdown({ 
  trigger, 
  options, 
  onSelect, 
  align = "right" 
}: { 
  trigger: React.ReactNode; 
  options: { label: string; value: string; icon?: React.ReactNode }[]; 
  onSelect: (value: string) => void;
  align?: "left" | "right";
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`absolute z-50 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 ${align === "right" ? "right-0" : "left-0"}`}
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSelect(opt.value);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-900 rounded-xl transition-all"
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick, badge }: { icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; badge?: number }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
        active 
          ? "bg-[#234D96] text-white shadow-lg shadow-blue-900/20" 
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className="flex items-center gap-4 min-w-0 pr-2">
        <span className={`shrink-0 ${active ? "text-white" : "group-hover:scale-110 transition-all duration-300"}`}>
          {icon}
        </span>
        <span className="text-[13px] font-bold whitespace-nowrap truncate">{label}</span>
      </div>
      {badge && (
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${
          active ? "bg-white text-blue-900" : "bg-red-500 text-white"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function DashboardCard({ children, title, stat, subText, annotation, annotationTrend, icon, className = "", headerAction }: { children: React.ReactNode; title: string; stat?: string; subText?: string; annotation?: string; annotationTrend?: 'up'|'down'; icon?: React.ReactNode; className?: string; headerAction?: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative group overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-black text-slate-900 tracking-tight uppercase opacity-50">{title}</h3>
        {headerAction ? headerAction : <MoreHorizontal size={18} className="text-slate-300 hover:text-slate-900 cursor-pointer transition-colors" />}
      </div>
      
      {stat && (
        <div className="space-y-0.5 relative">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900 tracking-tight">{stat}</span>
            {icon && <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>}
          </div>
          <div className="flex items-center justify-between pt-1">
            {subText && <p className="text-[10px] font-bold text-slate-400">{subText}</p>}
            {annotation && (
              <div className="px-2 py-0.5 bg-slate-900 rounded-full text-[9px] font-black text-white flex items-center gap-1">
                {annotation}
                {annotationTrend === 'up' && <ArrowUpRight size={10} className="text-emerald-400" />}
                {annotationTrend === 'down' && <ArrowDownRight size={10} className="text-red-400" />}
              </div>
            )}
          </div>
        </div>
      )}
      
      {children}
    </motion.div>
  );
}

// --- Main Pages ---

function DashboardView({ 
  searchQuery, 
  dateRange, 
  setDateRange, 
  timeframe, 
  setTimeframe,
  data 
}: { 
  searchQuery: string;
  dateRange: string;
  setDateRange: (v: string) => void;
  timeframe: string;
  setTimeframe: (v: string) => void;
  data: MerchantDashboardProps;
}) {
  const filteredStocks = data.alertesStock.filter(stock => 
    stock.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.agence.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Formatting helper
  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + " FCFA";
  };

  const liquidityPieData = [
    { name: "Agences OK", value: data.liveSupervision.summary.active_agencies, color: "#234D96" },
    { name: "A Surveiller", value: data.liveSupervision.summary.watch_agencies, color: "#6ABCA6" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Vue d'ensemble Fintrack</h2>
          <p className="text-xs font-medium text-slate-400">Performances globales de vos agences aujourd'hui.</p>
        </div>
      </div>

      {/* Row 1: Top KPIs */}
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard 
          className="col-span-12 lg:col-span-4" 
          title="Volume de Transactions" 
          stat={formatFCFA(data.stats.totalVolume)} 
          subText={`${data.stats.totalTransactions} transactions aujourd'hui`} 
          annotation={data.stats.volumeTrend} 
          annotationTrend={data.stats.volumeTrend.startsWith('+') ? 'up' : 'down'}
        >
          <div className="h-24 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <Line type="monotone" dataKey="d" stroke="#234D96" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="r" stroke="#6ABCA6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard 
          className="col-span-12 lg:col-span-4" 
          title="Commissions générées" 
          stat={formatFCFA(data.stats.totalCommissions)} 
          subText="Bénéfice net marchand" 
          annotation={data.stats.commissionTrend} 
          annotationTrend={data.stats.commissionTrend.startsWith('+') ? 'up' : 'down'}
          icon={<TrendingUp size={16} className="text-emerald-500" />}
        >
          <div className="h-24 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData}>
                <Area type="monotone" dataKey={(v) => (v.d + v.r) * 0.02} stroke="#6ABCA6" strokeWidth={3} fillOpacity={0.1} fill="#6ABCA6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard 
          className="col-span-12 lg:col-span-4" 
          title="État du Réseau"
          headerAction={
            <Dropdown
              onSelect={() => {}}
              trigger={
                <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-slate-100 transition-all">
                  Supervision <ChevronDown size={10} />
                </div>
              }
              options={[
                { label: "Temps réel", value: "realtime" },
                { label: "Historique", value: "history" },
              ]}
            />
          }
        >
          <div className="flex items-center h-40">
            <div className="relative w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={liquidityPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={2} dataKey="value">
                    {liquidityPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                <span className="text-xl font-black text-slate-900">{data.stats.nbAgences}</span>
                <span className="text-[7px] font-black text-slate-400 uppercase">Agences</span>
              </div>
            </div>
            <div className="flex-1 pl-4 space-y-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Circle size={6} fill="#234D96" className="text-transparent" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Actives (OK)</span>
                </div>
                <p className="text-xs font-black text-slate-900 pl-4">{data.liveSupervision.summary.active_agencies}</p>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Circle size={6} fill="#6ABCA6" className="text-transparent" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">A Surveiller</span>
                </div>
                <p className="text-xs font-black text-slate-900 pl-4">{data.liveSupervision.summary.watch_agencies}</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Row 2: Analytics */}
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard 
          className="col-span-12 lg:col-span-8" 
          title="Évolution de l'activité (7j)" 
          headerAction={
            <Dropdown
              onSelect={() => {}}
              trigger={
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md hover:bg-slate-100 transition-all">
                  Toutes transactions <ChevronDown size={12} />
                </div>
              }
              options={[
                { label: "Dépôts", value: "d" },
                { label: "Retraits", value: "r" },
                { label: "Total", value: "all" },
              ]}
            />
          }
        >
          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData}>
                <defs>
                   <linearGradient id="colorD" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#234D96" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#234D96" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6ABCA6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6ABCA6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94A3B8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94A3B8' }} dx={-5} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  formatter={(value: number) => [new Intl.NumberFormat().format(value) + " FCFA", ""]}
                />
                <Area type="monotone" name="Dépôts" dataKey="d" stroke="#234D96" strokeWidth={3} fillOpacity={1} fill="url(#colorD)" />
                <Area type="monotone" name="Retraits" dataKey="r" stroke="#6ABCA6" strokeWidth={3} fillOpacity={1} fill="url(#colorR)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard className="col-span-12 lg:col-span-4" title="Top Agences par Volume">
          <div className="h-64 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topAgences} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748B' }} width={100} />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]} barSize={14} fill="#234D96">
                   {data.topAgences.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#234D96' : index === 1 ? '#4A6FB3' : '#6ABCA6'} />
                  ))}
                </Bar>
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(v: number) => formatFCFA(v)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Row 3: Operational & Alerts */}
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard className="col-span-12 lg:col-span-8" title="État des Stocks (Gaz & Divers)">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase pl-2">Produit</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Agence</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-center">Prix</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-center">Quantité</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Statut</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 pl-2">
                        <span className="text-xs font-bold text-slate-900">{item.nom}</span>
                      </td>
                      <td className="py-4 text-[10px] font-bold text-slate-400">{item.agence}</td>
                      <td className="py-4 text-xs font-bold text-slate-900 text-center">{formatFCFA(item.prix)}</td>
                      <td className="py-4 text-xs font-black text-slate-900 text-center">{item.stock}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                          item.stock > 5 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        }`}>
                          {item.stock > 5 ? "En stock" : "Rupture"}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100 flex items-center justify-center mx-auto gap-2 text-slate-400 hover:text-blue-900">
                          <Plus size={14} />
                          <span className="text-[10px] font-black uppercase">Réappro</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs font-bold text-slate-400 italic">Aucun produit trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <DashboardCard title="Dernière Transaction">
             <div className="mt-4 space-y-4">
                {data.recentTransactions.map((tx, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${
                        tx.nature === 'DEPOT' ? "bg-blue-100 text-blue-900" : "bg-emerald-100 text-emerald-900"
                      }`}>{tx.nature}</span>
                      <span className="text-[10px] font-bold text-slate-400">{tx.date}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{formatFCFA(tx.montant)}</p>
                      <p className="text-[10px] font-bold text-slate-400">{tx.agence}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                       <span className="text-[10px] font-bold text-slate-500 uppercase">{tx.reference}</span>
                       <span className="text-[9px] font-black text-emerald-600 uppercase italic">Confirmé</span>
                    </div>
                  </div>
                ))}
             </div>
          </DashboardCard>

          <DashboardCard title="Alertes & Clôtures">
            <div className="space-y-4 mt-4">
              {data.pendingBilans.map((bilan) => (
                <div key={bilan.id_bilan} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                      {bilan.agence.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 uppercase">{bilan.agence}</p>
                      <p className="text-[9px] font-bold text-slate-400">{bilan.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[11px] font-black ${bilan.ecart < 0 ? "text-red-500" : bilan.ecart > 0 ? "text-blue-500" : "text-emerald-500"}`}>
                      {bilan.ecart === 0 ? "Équilibré" : formatFCFA(bilan.ecart)}
                    </p>
                    <button className="text-[8px] font-black text-blue-900 uppercase underline decoration-2 underline-offset-2">Détails</button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

// --- Main App Wrapper ---

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children,
  className = "max-w-lg",
  hideHeader = false
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title?: React.ReactNode; 
  subtitle?: string; 
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full ${className} bg-white rounded-[3rem] shadow-2xl overflow-hidden`}
          >
            <div className={`p-10 pt-12 ${hideHeader ? 'p-0 pt-0' : ''}`}>
              {!hideHeader && (
                <button 
                  onClick={onClose}
                  className="absolute top-8 right-8 w-10 h-10 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={20} />
                </button>
              )}
              
              {!hideHeader && (
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
                  {subtitle && <p className="text-sm font-semibold text-slate-400">{subtitle}</p>}
                </div>
              )}

              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, placeholder, value, onChange, type = "text", icon }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; icon?: React.ReactNode }) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const currentType = isPassword ? (showPass ? "text" : "password") : type;

  return (
    <div className="space-y-2 mb-6">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative group">
        <input 
          type={currentType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 transition-all outline-none"
        />
        {isPassword && (
          <button 
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#234D96] transition-colors"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

// --- Sub-pages Views ---

function AgencesView() {
  const navigate = useNavigate();
  const [viewTab, setViewTab] = useState<"Agences" | "Agents">("Agences");
  const [modalMode, setModalMode] = useState<"none" | "new_agence" | "edit_agence" | "new_agent">("none");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form States
  const [agenceName, setAgenceName] = useState("");
  const [agenceAddress, setAgenceAddress] = useState("");
  const [agencePlafond, setAgencePlafond] = useState("");
  const [agenceHasGas, setAgenceHasGas] = useState(false);
  
  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentAgence, setAgentAgence] = useState("");
  const [agentPass, setAgentPass] = useState("");
  
  const handleCreateAgent = () => {
    if (!agentName || !agentPhone || !agentAgence || !agentPass) {
       alert("Veuillez remplir tous les champs.");
       return;
    }

    const agentLoginUrl = `${window.location.origin}/agent/auth`;
    const message = `Bonjour ${agentName},\n\nVotre compte agent sur la plateforme FinTrack a été créé avec succès.\n\nVoici vos accès :\n- Téléphone : ${agentPhone}\n- Mot de passe initial : ${agentPass}\n- Agence : ${agentAgence}\n\nVous pouvez vous connecter via ce lien : ${agentLoginUrl}\n\nMerci de changer votre mot de passe dès votre première connexion.`;
    
    // Clean phone number for WhatsApp link
    const cleanedPhone = agentPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Close modal and reset
    setModalMode("none");
    setAgentName("");
    setAgentPhone("");
    setAgentPass("");
  };

  const agences = [
    { id: 1, name: "Agence Cotonou Centre", status: "ACTIVE", profitToday: "0 F", topActivity: "RESEAUX", agentsCount: 1, plafond: "5 000 000 F", current: 4200000, address: "Cadjehoun, Rue 125" },
    { id: 2, name: "Agence Calavi", status: "ACTIVE", profitToday: "0 F", topActivity: "RESEAUX", agentsCount: 1, plafond: "3 000 000 F", current: 1500000, address: "Kpota, Face Université" },
    { id: 3, name: "Agence Porto-Novo", status: "ACTIVE", profitToday: "0 F", topActivity: "RESEAUX", agentsCount: 0, plafond: "2 000 000 F", current: 1800000, address: "Ouando, Carré 14" },
  ];

  const agents = [
    { id: 1, name: "Marius Ahonon", phone: "+229 97 00 00 01", agence: "Agence Cotonou Centre", status: "Actif", lastActive: "Il y a 2 min", role: "Superviseur Senior", bio: "Expert en gestion de flux et relation client.", waiting: true },
    { id: 2, name: "Lisa Koukpaki", phone: "+229 96 00 00 02", agence: "Agence Calavi", status: "En attente", lastActive: "Jamais connecté", role: "Gestionnaire Caisse", bio: "Spécialisée dans les remontées de fonds.", waiting: true },
    { id: 3, name: "Jean Koffi", phone: "+229 95 00 00 03", agence: "Agence Porto-Novo", status: "Actif", lastActive: "Il y a 4h", role: "Agent de Terrain", bio: "Responsable des collectes de proximité.", waiting: false },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + " F";
  };

  const handleEditAgence = (agence: any) => {
    setAgenceName(agence.name);
    setAgenceAddress(agence.address === "Sans adresse" ? "" : agence.address);
    setAgencePlafond(agence.plafond.toString());
    setModalMode("edit_agence");
  };

  const filteredAgences = agences.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.phone.includes(searchQuery) ||
    a.agence.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* ... (Header remains same) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Réseau d'Agences</h2>
          <p className="text-sm font-bold text-slate-400">Supervision et gestion en temps réel de vos points de vente.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <button 
                onClick={() => navigate("/agent/auth")}
                className="px-6 py-3.5 bg-blue-50 text-[#234D96] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-3 border border-blue-100"
              >
                <Smartphone size={18} /> Demo: Interface Agent
          </button>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#234D96] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher une agence ou un agent..." 
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-50/50 w-full md:w-80 shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { setModalMode("new_agence"); }}
            className="px-6 py-3.5 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm"
          >
            <Plus size={18} /> Nouvelle Agence
          </button>
          <button 
            onClick={() => { setModalMode("new_agent"); }}
            className="px-6 py-3.5 bg-[#234D96] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95"
          >
            <Plus size={18} /> Ajouter un Agent
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 border-b border-slate-100 pb-1">
        <button 
          onClick={() => setViewTab("Agences")}
          className={`pb-4 text-sm font-black transition-all relative ${
            viewTab === "Agences" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Agences ({filteredAgences.length})
          {viewTab === "Agences" && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-[#234D96] rounded-full" />}
        </button>
        <button 
          onClick={() => setViewTab("Agents")}
          className={`pb-4 text-sm font-black transition-all relative ${
            viewTab === "Agents" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Agents ({filteredAgents.length})
          {viewTab === "Agents" && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-[#234D96] rounded-full" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {viewTab === "Agences" ? filteredAgences.map((agence) => (
          <motion.div 
            key={agence.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
          >
            {/* Agency Header - As per screenshot */}
            <div className="flex items-start justify-between mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#234D96] to-[#6ABCA6] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                     <Building size={24} />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-[18px] font-black text-slate-900 leading-tight">{agence.name}</h3>
                     <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-500 text-[9px] font-black rounded-lg uppercase tracking-widest border border-emerald-100/30">ACTIVE</span>
                  </div>
               </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-slate-400 mb-6">
               <MapPin size={14} className="text-slate-300" />
               <span className="text-[11px] font-bold text-slate-400">{agence.address}</span>
            </div>

            {/* Stats Row - As per screenshot */}
            <div className="grid grid-cols-3 gap-3 mb-6">
               <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">PROFIT AUJ.</p>
                  <p className="text-[13px] font-black text-slate-900">{agence.profitToday}</p>
               </div>
               <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">ACTIVITÉ TOP</p>
                  <p className="text-[11px] font-black text-slate-900">{agence.topActivity}</p>
               </div>
               <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">AGENTS</p>
                  <p className="text-[13px] font-black text-slate-900">{agence.agentsCount}</p>
               </div>
            </div>

            {/* Plafond - As per screenshot */}
            <div className="px-5 py-3 bg-amber-50/50 border border-amber-100/30 rounded-2xl flex items-center gap-2 mb-6">
               <Star size={12} className="text-amber-500" />
               <span className="text-[11px] font-bold text-amber-900/60 tracking-tight">Plafond: {agence.plafond}</span>
            </div>

            <div className="h-px bg-slate-50 mb-6" />

            {/* Action Buttons - As per screenshot */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
               <button 
                 onClick={() => handleEditAgence(agence)}
                 className="py-3.5 bg-white border border-slate-100 text-slate-900 rounded-xl font-black text-[11px] hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm"
               >
                 Modifier
               </button>
               <button className="py-3.5 bg-red-50 text-red-500 border border-red-100 rounded-xl font-black text-[11px] hover:bg-red-100 transition-all uppercase tracking-widest shadow-sm">
                 Désactiver
               </button>
            </div>
          </motion.div>
        )) : filteredAgents.map((agent) => (
          <motion.div 
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group"
          >
            {/* Agent Header - As per screenshot */}
            <div className="flex items-start justify-between mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#234D96] to-[#6ABCA6] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20">
                     A
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-[17px] font-black text-slate-900 leading-tight">{agent.name}</h3>
                     <div className="flex items-center gap-1.5 text-slate-400">
                        <Phone size={14} strokeWidth={2.5} />
                        <span className="text-[12px] font-bold">{agent.phone}</span>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col items-end gap-1">
                 <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest border transition-colors ${
                   agent.status === "Actif" 
                     ? "bg-emerald-50 text-emerald-500 border-emerald-100/30" 
                     : "bg-amber-50 text-amber-500 border-amber-100/30"
                 }`}>
                   {agent.status}
                 </span>
                 {agent.status === "En attente" && (
                   <span className="text-[9px] font-bold text-amber-400 italic">Compte non activé</span>
                 )}
               </div>
            </div>

            {/* Agence Card */}
            <div className="px-5 py-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center gap-3 mb-3">
               <Building size={14} className="text-[#234D96]" />
               <span className="text-[11px] font-black text-blue-950 uppercase tracking-tight">{agent.agence}</span>
            </div>

            {/* Agent Information Section */}
            <div className="px-5 py-4 bg-blue-50/30 border border-blue-100/20 rounded-2xl flex flex-col gap-2 mb-3">
               <div className="flex items-center gap-2">
                  <Info size={14} className="text-[#234D96]" />
                  <span className="text-[10px] font-black text-[#234D96] uppercase tracking-widest">Information sur l'agent</span>
               </div>
               <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">
                  "{agent.bio}"
               </p>
            </div>

            {/* Waiting Notice - As per screenshot */}
            {agent.waiting && (
              <div className="px-5 py-4 bg-amber-50/50 border border-amber-100/30 rounded-2xl flex items-center gap-3 mb-6">
                 <ShieldAlert size={14} className="text-amber-500" />
                 <span className="text-[11px] font-black text-amber-900/60 uppercase tracking-tight">En attente d'activation</span>
              </div>
            )}

            <div className="h-px bg-slate-50 mb-6" />

            {/* Buttons - As per screenshot */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
               <button className="py-3.5 bg-slate-50 text-slate-400 rounded-xl font-black text-[11px] hover:bg-slate-100 transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm border border-slate-50">
                 <Users size={14} /> Désactiver
               </button>
               <button className="py-3.5 bg-white border border-slate-100 text-slate-900 rounded-xl font-black text-[11px] hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm">
                 Modifier
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={modalMode === "new_agence"} 
        onClose={() => setModalMode("none")}
        title="Nouvelle Agence"
        subtitle="Créez un nouveau point de vente dans votre réseau."
      >
        <div className="space-y-1">
          <Input label="Nom de l'agence" placeholder="Ex: Agence Cotonou" value={agenceName} onChange={setAgenceName} />
          <Input label="Adresse" placeholder="Ex: Avenue Steinmetz" value={agenceAddress} onChange={setAgenceAddress} />
          <Input label="Plafond Cash (FCFA)" placeholder="50000" value={agencePlafond} onChange={setAgencePlafond} />
          
          <div 
            onClick={() => setAgenceHasGas(!agenceHasGas)}
            className="p-6 bg-[#F8FAFC] border-2 border-transparent hover:border-[#234D96]/10 rounded-[1.8rem] flex items-center gap-4 cursor-pointer transition-all mb-8 group"
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agenceHasGas ? 'bg-[#234D96] border-[#234D96]' : 'bg-white border-slate-200 group-hover:border-[#234D96]'}`}>
              {agenceHasGas && <Plus size={16} className="text-white" />}
            </div>
            <div>
              <p className="text-[13px] font-black text-slate-900 leading-none mb-1">Cette agence vend du Gaz / Produits divers</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-tight">Un catalogue de produits sera créé automatiquement</p>
            </div>
          </div>

          <button className="w-full py-5 bg-[#234D96] text-white rounded-[1.8rem] font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-[0.98]">
            Créer l'agence
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={modalMode === "edit_agence"} 
        onClose={() => setModalMode("none")}
        title="Modifier l'Agence"
        subtitle="Mettez à jour les informations du point de vente."
      >
        <div className="space-y-1">
          <Input label="Nom de l'agence" placeholder="Agence Calavi" value={agenceName} onChange={setAgenceName} />
          <Input label="Adresse" placeholder="Ex: Avenue Steinmetz" value={agenceAddress} onChange={setAgenceAddress} />
          <Input label="Plafond Cash (FCFA)" placeholder="3000000,00" value={agencePlafond} onChange={setAgencePlafond} />
          
          <button className="w-full mt-4 py-5 bg-[#234D96] text-white rounded-[1.8rem] font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-[0.98]">
            Enregistrer les modifications
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={modalMode === "new_agent"} 
        onClose={() => setModalMode("none")}
        title="Ajouter un Agent"
        subtitle="Créez un compte pour votre collaborateur."
      >
        <div className="space-y-1">
          <Input label="Nom complet" placeholder="Ex: Aimé Gédéon" value={agentName} onChange={setAgentName} />
          <Input label="Téléphone" placeholder="+229 01..." value={agentPhone} onChange={setAgentPhone} />
          
          <div className="space-y-2 mb-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Affecter à l'agence</label>
            <select 
              value={agentAgence}
              onChange={(e) => setAgentAgence(e.target.value)}
              className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-900 transition-all outline-none appearance-none cursor-pointer"
            >
              {agences.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>

          <Input label="Mot de passe initial" placeholder="••••••••" value={agentPass} onChange={setAgentPass} type="password" />
          
          <button 
            onClick={handleCreateAgent}
            className="w-full mt-4 py-5 bg-[#234D96] text-white rounded-[1.8rem] font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-[0.98]"
          >
            Créer le compte agent
          </button>
        </div>
      </Modal>
    </div>
  );
}

function TransactionsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [txModalOpen, setTxModalOpen] = useState(false);
  
  const transactions = [
    { ref: "TXN-890740B6", date: "15/04/2026", time: "01:57", dateTime: "15/04/2026 01:57", service: "Moov Money", type: "RESEAUX", agent: "Agent Cotonou", agence: "Agence Porto-Novo", montant: "155 776", comm: "778,88", status: "EN ATTENTE", refOp: "Non renseigné" },
    { ref: "TXN-8906F0B7", date: "14/04/2026", time: "11:57", dateTime: "14/04/2026 11:57", service: "MTN MoMo", type: "RESEAUX", agent: "Agent Cotonou", agence: "Agence Cotonou Centre", montant: "399 191", comm: "1995,96", status: "CONFIRME", refOp: "OP-44920" },
    { ref: "TXN-89060AB2", date: "14/04/2026", time: "01:57", dateTime: "14/04/2026 01:57", service: "Moov Money", type: "RESEAUX", agent: "Agent Cotonou", agence: "Agence Porto-Novo", montant: "138 537", comm: "692,69", status: "EN ATTENTE", refOp: "Non renseigné" },
    { ref: "TXN-890788A2", date: "13/04/2026", time: "18:57", dateTime: "13/04/2026 18:57", service: "MTN MoMo", type: "RESEAUX", agent: "Agent Calavi", agence: "Agence Cotonou Centre", montant: "266 858", comm: "1334,29", status: "EN ATTENTE", refOp: "Non renseigné" },
    { ref: "TXN-8907A175", date: "11/04/2026", time: "02:57", dateTime: "11/04/2026 02:57", service: "Orange Money", type: "RESEAUX", agent: "Agent Calavi", agence: "Agence Calavi", montant: "405 294", comm: "2026,47", status: "CONFIRME", refOp: "OP-88210" },
    { ref: "TXN-89071018", date: "10/04/2026", time: "05:57", dateTime: "10/04/2026 05:57", service: "Orange Money", type: "RESEAUX", agent: "Agent Calavi", agence: "Agence Porto-Novo", montant: "56 583", comm: "282,92", status: "CONFIRME", refOp: "OP-11202" },
    { ref: "TXN-8907B83A", date: "09/04/2026", time: "22:57", dateTime: "09/04/2026 22:57", service: "Celtis", type: "RESEAUX", agent: "Agent Calavi", agence: "Agence Calavi", montant: "116 650", comm: "583,25", status: "EN ATTENTE", refOp: "Non renseigné" },
    { ref: "TXN-890649A5", date: "09/04/2026", time: "18:57", dateTime: "09/04/2026 18:57", service: "Moov Money", type: "RESEAUX", agent: "Agent Cotonou", agence: "Agence Cotonou Centre", montant: "90 846", comm: "454,23", status: "EN ATTENTE", refOp: "Non renseigné" },
  ];

  const handleOpenTxModal = (tx: any) => {
    setSelectedTx(tx);
    setTxModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Search & Filters Bar */}
      <div className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RECHERCHE</label>
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Réf, commentaire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-[#234D96] rounded-xl pl-10 pr-4 py-3.5 text-[11px] font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="w-56 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SECTEUR</label>
            <div className="relative">
              <select className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-[#234D96] rounded-xl px-4 py-3.5 text-[11px] font-black text-slate-900 outline-none appearance-none cursor-pointer">
                <option>Tous les secteurs</option>
                <option>RESEAUX</option>
                <option>GAZ</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="w-56 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">STATUT</label>
            <div className="relative">
              <select className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-[#234D96] rounded-xl px-4 py-3.5 text-[11px] font-black text-slate-900 outline-none appearance-none cursor-pointer">
                <option>Tous les statuts</option>
                <option>CONFIRME</option>
                <option>EN ATTENTE</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <button className="px-8 py-3.5 bg-[#3F51B5] text-white rounded-xl font-black text-[12px] hover:bg-[#303F9F] transition-all shadow-lg shadow-blue-500/10 h-[46px]">
            Filtrer les résultats
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pl-10 pr-4 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">RÉFÉRENCE & COMMENTAIRE</th>
                <th className="px-4 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">RÉSEAU / SERVICE</th>
                <th className="px-4 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">AGENCE & AGENT</th>
                <th className="px-4 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">MONTANT & COM.</th>
                <th className="px-4 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">DATE</th>
                <th className="px-4 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">STATUT</th>
                <th className="pl-4 pr-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/60">
              {transactions.map((tx, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="pl-10 pr-4 py-5">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-black text-slate-900 tracking-tight">{tx.ref}</span>
                      <span className="text-[10px] font-bold text-slate-300">—</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                        <Smartphone size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-black text-slate-900">{tx.service}</span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{tx.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-900">{tx.agence}</span>
                      <span className="text-[10px] font-bold text-slate-400">{tx.agent}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-mono">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-black text-slate-900">{tx.montant} F</span>
                      <span className="text-[10px] font-bold text-emerald-500">+{tx.comm} F</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-900">{tx.date}</span>
                      <span className="text-[10px] font-bold text-slate-400">{tx.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        tx.status === 'CONFIRME' 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-orange-50 text-orange-600"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'CONFIRME' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="pl-4 pr-10 py-5 text-right">
                    <button 
                      onClick={() => handleOpenTxModal(tx)}
                      className="p-2 text-slate-400 hover:text-[#234D96] transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal - Fiche d'Opération */}
      <Modal 
        isOpen={txModalOpen} 
        onClose={() => setTxModalOpen(false)} 
        title="" 
        hideHeader 
        className="max-w-md !p-0"
      >
        {selectedTx && (
          <div className="bg-white overflow-hidden rounded-[2rem]">
            {/* Blue Header */}
            <div className="bg-[#3F51B5] p-8 pb-10 text-white relative">
               <button 
                 onClick={() => setTxModalOpen(false)}
                 className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white"
               >
                 <X size={18} />
               </button>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                     <Activity size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-0.5">FICHE D'OPÉRATION</p>
                    <h3 className="text-2xl font-black tracking-tight">{selectedTx.ref}</h3>
                  </div>
               </div>
            </div>

            {/* Content Body */}
            <div className="p-8 -mt-6 bg-white rounded-t-[2rem] relative z-10 space-y-8">
               {/* Badges Row */}
               <div className="flex gap-3">
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase flex items-center gap-2 ${
                    selectedTx.status === 'CONFIRME' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    <Clock size={14} />
                    {selectedTx.status}
                  </div>
                  <div className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border border-slate-100">
                    Mise à jour :
                  </div>
               </div>

               {/* Info Multi-Grid */}
               <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3F51B5]">
                       <Calendar size={18} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DATE INITIATION</p>
                       <p className="text-xs font-black text-slate-900">{selectedTx.dateTime}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3F51B5]">
                       <Building size={18} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">POINT DE VENTE</p>
                       <p className="text-xs font-black text-slate-900">{selectedTx.agence}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3F51B5]">
                       <User size={18} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AGENT RESPONSABLE</p>
                       <p className="text-xs font-black text-slate-900">{selectedTx.agent}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3F51B5]">
                       <ExternalLink size={18} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">RÉF. OPÉRATEUR</p>
                       <p className="text-xs font-black text-slate-900">{selectedTx.refOp}</p>
                    </div>
                  </div>
               </div>

               {/* Financial Details Card */}
               <div className="p-8 bg-[#F8FAFC] rounded-[2rem] border border-slate-100 space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-[13px] font-black text-slate-500">Montant Transaction</span>
                     <span className="text-xl font-black text-slate-900">{selectedTx.montant} F</span>
                  </div>
                  <div className="border-t border-dashed border-slate-200" />
                  <div className="flex items-center justify-between">
                     <span className="text-[13px] font-black text-slate-500">Commission Entreprise</span>
                     <span className="text-xl font-black text-emerald-600">+{selectedTx.comm} F</span>
                  </div>
               </div>

               {/* Evidence Warning / Alert */}
               <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex gap-4">
                  <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] font-bold text-amber-900/70 leading-relaxed">
                    <span className="font-black text-amber-900">En attente de preuve :</span> L'agent n'a pas encore téléchargé de document pour confirmer cette opération.
                  </p>
               </div>
            </div>

            {/* Modal Actions */}
            <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex justify-end">
               <button 
                 onClick={() => setTxModalOpen(false)}
                 className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all shadow-sm"
               >
                 Fermer la vue
               </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function CaissesView({ agences }: { agences: any[] }) {
  const fluxHistory = []; // Empty as per screenshot
  const [capitalInitialized, setCapitalInitialized] = useState(false);

  const kpis = [
    { label: "SOLDE CASH (COFFRE)", value: "0 F", sub: "Cash physique disponible au siège.", icon: <Wallet size={18} />, color: "emerald" },
    { label: "SOLDE BANQUES", value: "0 F", sub: "Total des fonds déposés en banque.", icon: <Landmark size={18} />, color: "blue" },
    { label: "COMPTE PLATEFORME", value: "0 F", sub: "Solde du compte virtuel entreprise.", icon: <Globe size={18} />, color: "purple" }
  ];

  const secondaryKpis = [
    { label: "VERSÉES EN BANQUE", value: "0 F", sub: "0 remontées confirmées.", icon: <CheckCircle size={18} />, color: "emerald" },
    { label: "EN ATTENTE (TRANSIT)", value: "0 F", sub: "À valider dans la liste ci-dessous.", icon: <AlertTriangle size={18} />, color: "orange" }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Caisse & Flux Financiers</h2>
        <p className="text-sm font-medium text-slate-400 font-bold italic">Gérez les fonds globaux de l'entreprise et les dotations agences.</p>
      </div>

      {/* KPI Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm relative group overflow-hidden">
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-700`}>
              {k.icon}
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl bg-${k.color}-50 flex items-center justify-center text-${k.color}-500`}>
                  {k.icon}
                </div>
                <span className="px-2.5 py-1 bg-slate-50 text-slate-400 text-[8px] font-black rounded-lg uppercase tracking-widest border border-slate-100">ACTIF</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{k.label}</p>
                <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{k.value}</h4>
                <p className="text-[11px] font-medium text-slate-400 italic">{k.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KPI Middle Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {secondaryKpis.map((k, i) => (
          <div key={i} className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-${k.color}-50 flex items-center justify-center text-${k.color}-500 group-hover:scale-110 transition-transform`}>
                {k.icon}
             </div>
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{k.label}</p>
                </div>
                <h4 className={`text-4xl font-black text-slate-900 tracking-tighter group-hover:text-${k.color}-600 transition-colors`}>{k.value}</h4>
                <p className="text-[11px] font-medium text-slate-400 italic">{k.sub}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
             <div className="p-8 border-b border-slate-50 flex items-center gap-3">
                <History size={18} className="text-[#234D96]" />
                <h3 className="text-base font-black text-slate-900 tracking-tight">Historique des flux</h3>
             </div>
             
             <div className="flex-1 overflow-x-auto relative">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-50 bg-slate-50/20">
                      <th className="pl-10 pr-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type/Ref</th>
                      <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Auteur/Agence</th>
                      <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant</th>
                      <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</th>
                      <th className="pl-4 pr-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/60">
                    {fluxHistory.map((flux: any, i: number) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                        {/* Map flux history if available */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {fluxHistory.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center space-y-6">
                     <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center animate-pulse">
                        <AlertCircle size={40} strokeWidth={1} className="text-slate-200" />
                     </div>
                     <p className="text-[15px] font-black text-slate-400/80">Aucun mouvement enregistre.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Sidebar Forms */}
        <div className="lg:col-span-3 space-y-6">
          {/* Capital de depart Form */}
          {capitalInitialized ? (
            <div className="bg-emerald-50/30 border-2 border-dashed border-emerald-200 rounded-[2rem] p-8 space-y-4 animate-in fade-in zoom-in duration-500">
               <div className="flex items-center gap-3">
                 <ShieldCheck size={20} className="text-emerald-500" />
                 <h3 className="text-sm font-black text-emerald-600">Capital initialisé</h3>
               </div>
               <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                 Votre capital de départ a été verrouillé. Pour toute nouvelle entrée de fonds, veuillez utiliser les flux de dotation admin.
               </p>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-3">
                 <Plus size={16} className="text-[#234D96]" />
                 <h3 className="text-sm font-black text-slate-900">Capital de depart</h3>
              </div>
              <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">Fonds propres (Caisse)</label>
                   <input type="text" placeholder="0,00" defaultValue="0,00" className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-[#234D96] rounded-[1.2rem] px-5 py-4 text-sm font-black outline-none transition-all placeholder:text-slate-300" />
                 </div>
                 <button 
                  onClick={() => setCapitalInitialized(true)}
                  className="w-full py-5 bg-[#234D96] text-white rounded-[1.2rem] font-black text-[11px] uppercase tracking-wider shadow-lg shadow-blue-900/10 hover:bg-blue-900 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                 >
                   <Banknote size={16} /> Mettre a jour la caisse
                 </button>
              </div>
            </div>
          )}

          {/* Dotation Agence Form */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
               <Building size={16} className="text-emerald-500" />
               <h3 className="text-sm font-black text-slate-900">Dotation agence</h3>
            </div>
            <div className="space-y-5">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Agence Cible</label>
                 <div className="relative">
                    <select className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-emerald-500 rounded-[1.2rem] px-5 py-4 text-sm font-black outline-none appearance-none cursor-pointer">
                      <option>Selectionner...</option>
                      {agences?.map(a => <option key={a.id} value={a.id}>{a.nom}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Montant</label>
                 <input type="text" placeholder="0" defaultValue="0" className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-emerald-500 rounded-[1.2rem] px-5 py-4 text-sm font-black outline-none transition-all placeholder:text-slate-300" />
               </div>
               <button className="w-full py-5 bg-[#4BCA9D] text-white rounded-[1.2rem] font-black text-[11px] uppercase tracking-wider shadow-lg shadow-emerald-900/10 hover:bg-[#3fac85] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                 <ShieldCheck size={16} /> Financer l'agence
               </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-[#1E293B] rounded-[2rem] p-8 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-500" size={20} />
              <h4 className="text-sm font-black tracking-tight tracking-wide">Note Securite</h4>
            </div>
            <p className="text-[12px] font-medium text-slate-400 leading-relaxed">
              Toute validation de remontee vers la <span className="text-white font-black">Banque</span> exige un recu scanne lisible. Les soldes sont synchronises en temps reel des votre validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StocksView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Produits & Stocks</h2>
          <p className="text-xs font-medium text-slate-400">Gestion de l'inventaire physique par point de vente.</p>
        </div>
        <button className="px-6 py-3 bg-blue-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center gap-2">
          <Plus size={14} /> Nouveau Produit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 border border-slate-100 rounded-[2rem] p-6 bg-white h-fit space-y-6">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Ajouter un produit</h4>
          <div className="space-y-4">
             <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Nom du produit</label>
                <input type="text" placeholder="Ex: Gaz 12kg" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none border focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all" />
             </div>
             <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Agence</label>
                <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold appearance-none outline-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all">
                   <option>Cotonou Star</option>
                   <option>Calavi Center</option>
                </select>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Quantité</label>
                   <input type="number" placeholder="50" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all" />
                </div>
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Prix (FCFA)</label>
                   <input type="number" placeholder="8500" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all" />
                </div>
             </div>
             <button className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all mt-2">Enregistrer</button>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <DashboardCard title="Inventaire Global" className="p-0 overflow-hidden">
             <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Produit</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Agence</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Quantité</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Prix</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-[11px] font-black text-slate-900">Gaz Bouteille {i === 1 ? '12kg' : '6kg'}</td>
                      <td className="px-6 py-4 text-[10px] font-bold text-slate-500">Cotonou Agence {i}</td>
                      <td className="px-6 py-4 text-[11px] font-black text-slate-900 text-center">{i * 15}</td>
                      <td className="px-6 py-4 text-[11px] font-black text-slate-900 text-center">{i === 1 ? '8.500' : '4.500'} FCFA</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${i === 3 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                           {i === 3 ? "Rupture" : "En stock"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

function CloturesView() {
  const stats = [
    { label: "TOTAL CLOTURES", value: "11", color: "slate-900" },
    { label: "EN ATTENTE", value: "6", color: "orange-500" },
    { label: "DETTES CREEES", value: "2", color: "red-600" },
    { label: "VOLUME DES ECARTS", value: "135 000 F", color: "#234D96", isSpecial: true },
  ];

  const clotures = [
    { agence: "Agence Calavi", agent: "Agent Calavi", date: "10/04/2026", ecart: -50000, justification: "Erreur de caisse inex...", statut: "VALIDEE", subStatut: "DETTE CREEÉ" },
    { agence: "Agence Cotonou Centre", agent: "Agent Cotonou", date: "15/04/2026", ecart: -25000, justification: "Perte de 25.000 durin...", statut: "VALIDEE", subStatut: "DETTE CREEÉ" },
    { agence: "Agence Porto-Novo", agent: "Agent Cotonou", date: "17/04/2026", ecart: 5000, justification: "Oubli d'enregistremen...", statut: "EN ATTENTE" },
    { agence: "Agence Porto-Novo", agent: "Agent Calavi", date: "18/04/2026", ecart: -15000, justification: "Faux billet détecté lor...", statut: "VALIDEE" },
    { agence: "Agence Porto-Novo", agent: "Agent Cotonou", date: "19/04/2026", ecart: 0, justification: "Aucune", statut: "EN ATTENTE" },
    { agence: "Agence Calavi", agent: "Agent Cotonou", date: "17/04/2026", ecart: 5000, justification: "Oubli d'enregistremen...", statut: "EN ATTENTE" },
    { agence: "Agence Calavi", agent: "Agent Calavi", date: "18/04/2026", ecart: -15000, justification: "Faux billet détecté lor...", statut: "VALIDEE" },
    { agence: "Agence Calavi", agent: "Agent Cotonou", date: "19/04/2026", ecart: 0, justification: "Aucune", statut: "EN ATTENTE" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Suivi des Clotures</h2>
          <p className="text-sm font-medium text-slate-400 font-bold italic">Validez les clotures et gerez les ecarts de votre reseau.</p>
        </div>
        <button className="px-6 py-3 bg-white border border-slate-100 rounded-[1.2rem] flex items-center gap-2 text-xs font-black text-slate-900 shadow-sm hover:shadow-md transition-all">
          <FileText size={16} className="text-[#234D96]" />
          <span>Rapports</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <h4 className={`text-3xl font-black ${s.isSpecial ? "text-[#234D96]" : `text-${s.color}`}`}>{s.value}</h4>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#234D96] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher une agence ou un agent..." 
            className="w-full bg-white border border-slate-100 rounded-[1.5rem] py-4 pl-16 pr-6 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#234D96]/10 transition-all"
          />
        </div>
        <button className="px-8 py-4 bg-white border border-slate-100 rounded-[1.5rem] flex items-center gap-4 text-sm font-black text-slate-900 shadow-sm hover:shadow-md transition-all">
          <Filter size={18} className="text-slate-400" />
          <span>Toutes les clotures</span>
          <ChevronDown size={14} className="text-slate-300 ml-4" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 uppercase tracking-widest">
                <th className="pl-10 pr-4 py-6 text-[10px] font-black text-slate-400">Agence & Agent</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-400">Date</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-400">Ecart</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-400">Justification</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-400">Statut</th>
                <th className="pl-4 pr-10 py-6 text-[10px] font-black text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/60">
              {clotures.map((c, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="pl-10 pr-4 py-5">
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900">{c.agence}</p>
                      <div className="flex items-center gap-1.5 text-slate-400">
                         <User size={12} strokeWidth={2.5} />
                         <span className="text-[11px] font-bold tracking-tight">{c.agent}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-black text-slate-900 text-[12px]">{c.date}</td>
                  <td className={`px-4 py-5 font-black text-[13px] ${c.ecart < 0 ? "text-red-500" : c.ecart > 0 ? "text-emerald-500" : "text-slate-900"}`}>
                    {c.ecart > 0 ? "+" : ""}{new Intl.NumberFormat().format(c.ecart)} F
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2 text-slate-400 max-w-[200px]">
                       {c.justification !== "Aucune" && <Info size={14} className="shrink-0 text-blue-400" />}
                       <span className="text-[11px] font-bold truncate italic">{c.justification}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-1 items-start">
                       <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                         c.statut === 'VALIDEE' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-400"
                       }`}>
                         {c.statut}
                       </span>
                       {c.subStatut && (
                         <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[8px] font-black rounded-md border border-red-100">
                           {c.subStatut}
                         </span>
                       )}
                    </div>
                  </td>
                  <td className="pl-4 pr-10 py-5 text-right">
                    <button className="px-5 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-[#234D96] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                      Details
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

function ReportTemplate({ data, period }: { data: any[]; period: string }) {
  const totalVolume = data.reduce((acc, curr) => acc + curr.value, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
  const totalTransactions = data.reduce((acc, curr) => acc + curr.transactions, 0);

  return (
    <div className="bg-white p-8 sm:p-12 border border-slate-100 rounded-[2rem] shadow-sm font-sans text-slate-900 max-h-[70vh] overflow-y-auto no-scrollbar">
      {/* Report Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-b border-slate-100 pb-10">
        <div>
          <Logo className="h-24 w-auto mb-4" />
          <h1 className="text-2xl font-black tracking-tight text-slate-900">RAPPORT D'ACTIVITÉ</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{period} - DOCUMENT OFFICIEL</p>
        </div>
        <div className="text-left sm:text-right space-y-1">
          <p className="text-xs font-black text-slate-900 uppercase">Généré le: {new Date().toLocaleDateString('fr-FR')}</p>
          <p className="text-[10px] font-bold text-slate-400">ID Rapport: RT-{Math.floor(Math.random() * 1000000)}</p>
          <p className="text-[10px] font-bold text-slate-400">Entreprise: GazPlus Bénin S.A.R.L</p>
        </div>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10">
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume Total</p>
          <p className="text-lg font-black text-[#234D96]">{new Intl.NumberFormat().format(totalVolume)} F</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Profit Net</p>
          <p className="text-lg font-black text-emerald-600">{new Intl.NumberFormat().format(totalProfit)} F</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Transactions</p>
          <p className="text-lg font-black text-slate-900">{totalTransactions}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Taux Marge</p>
          <p className="text-lg font-black text-slate-900">{(totalProfit / totalVolume * 100).toFixed(2)} %</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Ventilation par Réseau</h3>
        <div className="overflow-hidden rounded-2xl border border-slate-50">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Réseau / Service</th>
                <th className="px-6 py-4 text-center">TXS</th>
                <th className="px-6 py-4 text-center">Volume</th>
                <th className="px-6 py-4 text-right">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((item, i) => (
                <tr key={i} className="text-xs font-bold text-slate-700 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-2 shadow-sm overflow-hidden shrink-0">
                        {item.logo ? (
                          <img src={item.logo} alt={item.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        )}
                      </div>
                      <span className="font-black text-slate-900 uppercase text-sm tracking-tight">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{item.transactions}</td>
                  <td className="px-6 py-4 text-center text-[#234D96]">{new Intl.NumberFormat().format(item.value)} F</td>
                  <td className="px-6 py-4 text-right text-emerald-600">{new Intl.NumberFormat().format(item.profit)} F</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/50 text-xs font-black text-slate-900">
                <td className="px-6 py-5">TOTAL CONSOLIDÉ</td>
                <td className="px-6 py-5 text-center">{totalTransactions}</td>
                <td className="px-6 py-5 text-center text-[#234D96]">{new Intl.NumberFormat().format(totalVolume)} F</td>
                <td className="px-6 py-5 text-right text-emerald-600 font-black">{new Intl.NumberFormat().format(totalProfit)} F</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Footer / Signature & Actions - SWAPPED FOR RIGHT ALIGNMENT */}
      <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-end gap-12">
        <button className="w-full sm:w-auto px-10 py-5 bg-[#234D96] text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 order-2 sm:order-1">
          <Download size={18} /> Télécharger le PDF
        </button>

        <div className="space-y-4 w-full max-w-[250px] text-right order-1 sm:order-2">
           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Signature du Marchand</div>
           <div className="w-full h-32 border-2 border-slate-100 rounded-2xl bg-white shadow-inner" />
        </div>
      </div>

      <div className="mt-12 flex items-center gap-2 opacity-20 grayscale">
        <Logo className="h-8" />
        <div className="h-4 w-px bg-slate-900" />
        <span className="text-[9px] font-black tracking-widest uppercase text-slate-900">Fintrack Intelligence Unit</span>
      </div>
    </div>
  );
}

function RapportsView() {

  const [reportPeriod, setReportPeriod] = useState("Global");
  const [serviceFilter, setServiceFilter] = useState("Tous les services");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const serviceData = [
    { name: "Celtis", value: 534752, transactions: 2, profit: 2673.76, color: "#234D96", logo: "https://yt3.googleusercontent.com/f9-K0j6x1q6I971708XlyXN3dD2_W3F2X8U9t-p9f3YhX_v_d9XpY199_9eFvFvF9f-9=s900-c-k-c0x00ffffff-no-rj" },
    { name: "Moov Money", value: 703973, transactions: 5, profit: 3519.88, color: "#6ABCA6", logo: "https://upload.wikimedia.org/wikipedia/fr/b/bc/Moov_Africa_Logo.png" },
    { name: "MTN MoMo", value: 975266, transactions: 3, profit: 4876.34, color: "#8B5CF6", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1024px-MTN_Logo.svg.png" },
    { name: "Orange Money", value: 1333485, transactions: 10, profit: 6667.45, color: "#F59E0B", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1024px-Orange_logo.svg.png" },
  ];

  const volumeEvolution = [
    { name: "01", vol: 0 },
    { name: "02", vol: 0 },
    { name: "03", vol: 450000 },
    { name: "04", vol: 800000 },
    { name: "05", vol: 0 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header section with controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Statistiques & Analyses</h2>
          <p className="text-sm font-medium text-slate-400 font-bold italic">Analysez vos performances et archivez vos rapports officiels.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            onSelect={setReportPeriod}
            trigger={
              <button className="flex items-center gap-3 px-5 py-3 bg-white rounded-[1.2rem] border border-slate-100 text-xs font-black text-slate-900 shadow-sm hover:shadow-md transition-all">
                <Calendar size={16} className="text-slate-400" />
                <span>{reportPeriod}</span>
                <ChevronDown size={14} className="text-slate-300" />
              </button>
            }
            options={[
              { label: "Global", value: "Global" },
              { label: "Ce mois", value: "Ce mois" },
              { label: "Mois dernier", value: "Mois dernier" },
            ]}
          />

          <Dropdown
            onSelect={setServiceFilter}
            trigger={
              <button className="flex items-center gap-3 px-5 py-3 bg-white rounded-[1.2rem] border border-slate-100 text-xs font-black text-slate-900 shadow-sm hover:shadow-md transition-all">
                <Search size={16} className="text-slate-300" />
                <span>{serviceFilter}</span>
                <ChevronDown size={14} className="text-slate-300" />
              </button>
            }
            options={[
              { label: "Tous les services", value: "Tous les services" },
              { label: "Réseaux", value: "Réseaux" },
              { label: "Gaz", value: "Gaz" },
            ]}
          />

          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="px-6 py-3 bg-[#234D96] text-white rounded-[1.2rem] font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Eye size={16} /> Aperçu du Rapport
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
        title="Rapport d'Activité Professionnel"
        subtitle="Visualisation du document certifié"
        className="max-w-4xl"
      >
        <ReportTemplate data={serviceData} period={reportPeriod} />
      </Modal>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard title="Évolution du Volume" icon={<TrendingUp size={14} className="text-blue-500" />}>
           <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeEvolution}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94A3B8' }} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="vol" fill="#234D96" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </DashboardCard>

        <DashboardCard title="Répartition par Service" icon={<Activity size={14} className="text-emerald-500" />}>
           <div className="h-64 w-full mt-4 flex items-center gap-8">
              <div className="flex-1 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-48 space-y-3">
                 {serviceData.map((s, i) => (
                   <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-md" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px] font-black text-slate-900">{s.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </DashboardCard>
      </div>

      {/* Detail Performance table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50">
            <h3 className="text-base font-black text-slate-900 tracking-tight">Détail des Performances</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-50 uppercase tracking-widest">
                     <th className="pl-8 pr-4 py-6 text-[10px] font-black text-slate-400">Service / Réseau</th>
                     <th className="px-4 py-6 text-[10px] font-black text-slate-400 text-center">Transactions</th>
                     <th className="px-4 py-6 text-[10px] font-black text-slate-400 text-center">V. d'affaires</th>
                     <th className="pl-4 pr-8 py-6 text-[10px] font-black text-slate-400 text-right">Profit Brut</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50/60">
                  {serviceData.map((s, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors font-black">
                       <td className="pl-8 pr-4 py-5 text-sm text-slate-900">{s.name}</td>
                       <td className="px-4 py-5 text-sm text-slate-400 text-center">{s.transactions} tx</td>
                       <td className="px-4 py-5 text-sm text-[#234D96] text-center">{new Intl.NumberFormat().format(s.value)} F</td>
                       <td className="pl-4 pr-8 py-5 text-sm text-emerald-600 text-right tracking-tight">{new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(s.profit)} F</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Archived Reports Histroy */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex items-center gap-3">
             <History size={18} className="text-[#234D96]" />
            <h3 className="text-base font-black text-slate-900 tracking-tight">Historique des Rapports Archivés</h3>
         </div>
         <div className="p-20 text-center space-y-2 opacity-50">
            <p className="text-sm font-black text-slate-900">Aucun rapport n'a encore été archivé.</p>
            <p className="text-xs font-bold text-slate-400">Utilisez le bouton "Exporter" pour sauvegarder un rapport ici.</p>
         </div>
      </div>
    </div>
  );
}

function SettingsView({ user }: { user: any }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackCategory, setFeedbackCategory] = useState("Interface");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  const categories = ["Interface", "Performance", "Nouveaux Services", "Support Client"];

  const handleSubmitFeedback = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Configuration du compte</h2>
        <p className="text-[13px] font-medium text-slate-400 font-bold italic">Gerez vos informations, votre securite et le suivi de votre abonnement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profil Personnel */}
        <DashboardCard 
          title="Profil personnel" 
          icon={<div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900"><Users size={16} /></div>}
        >
          <div className="space-y-6 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom complet</label>
                <input type="text" defaultValue={user.nom} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Téléphone</label>
                <input type="text" defaultValue="+22900000002" className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse email</label>
              <input type="email" defaultValue={user.email} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
            </div>
            <button className="px-6 py-3 bg-[#234D96] text-white rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10">
              <Download size={14} className="rotate-180" /> Enregistrer les modifications
            </button>
          </div>
        </DashboardCard>

        {/* Informations Entreprise */}
        <DashboardCard 
          title="Informations entreprise"
          icon={<div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900"><Building size={16} /></div>}
        >
          <div className="space-y-5 py-2">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Raison sociale</label>
              <input type="text" defaultValue={user.entreprise.nom} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro IFU</label>
                <input type="text" defaultValue="IFU-2024-001" className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Statut</label>
                <div className="w-full bg-[#F8FAFC] rounded-[1.2rem] px-5 py-3 text-sm font-bold flex items-center gap-2 text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ACTIF
                </div>
              </div>
            </div>
            <div className="p-4 bg-emerald-50/50 rounded-[1.2rem] flex items-center gap-3 border border-emerald-100/50">
               <ShieldCheck size={18} className="text-emerald-500" />
               <p className="text-[11px] font-bold text-emerald-600">Votre entreprise est verifiée et active.</p>
            </div>
          </div>
        </DashboardCard>

        {/* Boite de notifications */}
        <DashboardCard 
          title="Boite de notifications"
          headerAction={<button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-tighter transition-all">Tout marquer lu</button>}
          icon={<div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500"><Bell size={16} /></div>}
        >
          <div className="min-h-[160px] flex flex-col justify-center relative">
            <p className="absolute top-0 left-0 text-[10px] font-black text-slate-300">0 non lues</p>
            <div className="text-center space-y-2 opacity-50">
               <p className="text-xs font-black text-slate-400">Aucune notification pour le moment.</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 top-10 border-2 border-dashed border-slate-50 rounded-[2rem]" />
          </div>
        </DashboardCard>

        {/* Securite du compte */}
        <DashboardCard 
          title="Securite du compte"
          icon={<div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500"><Shield size={16} /></div>}
        >
          <div className="space-y-5 py-2">
            <div className="space-y-1 relative">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mot de passe actuel</label>
              <div className="relative">
                <input type="password" defaultValue="********" className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
                <Eye size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmation</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.2rem] px-5 py-3 text-sm font-bold outline-none" />
              </div>
            </div>
            <button className="w-full py-4 bg-white border-2 border-[#234D96]/20 text-[#234D96] rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Key size={14} /> Actualiser ma securite
            </button>
          </div>
        </DashboardCard>

        {/* Abonnement et plan */}
        <DashboardCard 
          title="Abonnement et plan"
          icon={<div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><CreditCard size={16} /></div>}
        >
          <div className="space-y-6 pt-2">
             <div className="bg-[#2D3A4B] rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                   <Activity size={80} strokeWidth={1} />
                </div>
                <div className="relative space-y-6">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Plan de service</p>
                      <div className="flex items-center gap-3">
                         <h4 className="text-4xl font-black tracking-tighter">PRO</h4>
                         <span className="px-2 py-0.5 bg-slate-500/20 rounded-md text-[9px] font-black uppercase">Annuel</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-y-4 pt-2">
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black text-slate-400 uppercase">Statut du compte</p>
                         <p className="text-[11px] font-black text-emerald-400 uppercase">ACTIF</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                         <p className="text-[9px] font-black text-slate-400 uppercase">Limite agences</p>
                         <p className="text-[11px] font-black uppercase">5 agences</p>
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black text-slate-400 uppercase">Tarif</p>
                         <p className="text-[11px] font-black uppercase tracking-tight">29 900 F CFA</p>
                      </div>
                   </div>
                </div>
             </div>
             <button 
                onClick={() => setIsInvoicesOpen(true)}
                className="w-full py-4 text-[10px] font-black text-slate-900 uppercase tracking-wider hover:bg-slate-50 rounded-[1.2rem] border border-slate-100 transition-all"
             >
                Historique des factures
             </button>
          </div>
        </DashboardCard>

        <Modal
          isOpen={isInvoicesOpen}
          onClose={() => setIsInvoicesOpen(false)}
          title="Historique des Factures"
          subtitle="Suivi de vos paiements d'abonnement FinTrack"
          className="max-w-2xl"
        >
          <div className="space-y-4">
            {[
              { id: "FT-B-88392", date: "12 Avril 2024", amount: "29 900 F", method: "MTN MoMo", status: "Payée" },
              { id: "FT-B-77291", date: "12 Avril 2023", amount: "29 900 F", method: "Moov Money", status: "Payée" },
              { id: "FT-B-66510", date: "12 Avril 2022", amount: "25 000 F", method: "Orange Money", status: "Payée" },
            ].map((invoice, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100/80 transition-colors border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Facture #{invoice.id}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{invoice.date} • {invoice.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-900">{invoice.amount}</p>
                    <p className="text-[9px] font-black uppercase text-emerald-600 mt-0.5">{invoice.status}</p>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-fintrack-primary hover:border-fintrack-primary transition-all">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-4 text-center">
              <p className="text-[10px] font-bold text-slate-400 italic">Pour toute réclamation, contactez notre support technique.</p>
            </div>
          </div>
        </Modal>

        {/* Preferences */}
        <DashboardCard 
          title="Preferences"
          icon={<div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-950"><BellRing size={16} /></div>}
        >
          <div className="space-y-8 pt-4">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[12px] font-black text-slate-900">Alertes de cloture</p>
                   <p className="text-[10px] font-bold text-slate-400 italic">Notifications quand une cloture demande votre validation.</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[12px] font-black text-slate-900">Rapports hebdomadaires</p>
                   <p className="text-[10px] font-bold text-slate-400 italic">Recapitulatif regulier de votre activite.</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
             </div>
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[12px] font-black text-slate-900">Notifications push</p>
                   <p className="text-[10px] font-bold text-slate-400 italic">Active la memorisation de cet appareil pour les alertes serveur navigateur.</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
             </div>
          </div>
        </DashboardCard>

        {/* Avis & Feedback */}
        <DashboardCard 
          title="Avis & Feedback"
          icon={<div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-950"><MessageCircle size={16} /></div>}
          className="lg:col-span-2"
        >
          <div className="space-y-8 pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-50">
               <div className="space-y-1">
                  <p className="text-[14px] font-black text-slate-900 tracking-tight">Votre expérience compte</p>
                  <p className="text-[12px] font-medium text-slate-400">Aidez-nous à faire de FinTrack l'outil idéal pour votre business.</p>
               </div>
               
               <div className="flex flex-col items-center sm:items-end gap-1">
                  <div className="flex items-center gap-1.5 bg-slate-50/80 p-2 rounded-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="cursor-pointer"
                      >
                        <Star 
                          size={28} 
                          className={`transition-all duration-300 ${
                            (hoverRating || rating) >= star 
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                              : "text-slate-200"
                          }`} 
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mr-2">
                    {rating === 5 ? "Excellent !" : rating === 4 ? "Très bon" : rating === 3 ? "Satisfaisant" : "À améliorer"}
                  </p>
               </div>
            </div>

            <div className="space-y-4">
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Qu'est-ce qui vous intéresse le plus ?</p>
               <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setFeedbackCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[11px] font-black transition-all border-2 ${
                           feedbackCategory === cat 
                           ? "bg-[#234D96] border-[#234D96] text-white shadow-lg shadow-blue-900/20" 
                           : "bg-white border-slate-100 text-slate-600 hover:border-[#234D96]/30 hover:bg-slate-50"
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            <div className="relative group">
              <textarea 
                placeholder="Un détail précis ? Une suggestion ? Nous vous lisons avec attention..." 
                className="w-full bg-[#F8FAFC] border-2 border-slate-50 focus:border-[#234D96] focus:bg-white rounded-[2rem] px-8 py-6 text-sm font-bold outline-none min-h-[160px] shadow-inner transition-all duration-300"
              />
              <div className="absolute bottom-6 right-8 text-slate-200 group-focus-within:text-[#234D96]/20 transition-colors">
                <Edit2 size={24} />
              </div>
            </div>

            <button 
              onClick={handleSubmitFeedback}
              disabled={isSubmitting || isSuccess}
              className={`w-full py-5 rounded-[1.5rem] font-black text-[13px] uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                isSuccess 
                  ? "bg-emerald-500 text-white" 
                  : "bg-[#234D96] text-white hover:bg-blue-900 shadow-xl shadow-blue-900/20"
              }`}
            >
              {isSubmitting ? (
                <RotateCcw className="animate-spin" size={20} />
              ) : isSuccess ? (
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-3">
                  <CheckCircle size={20} /> Merci pour votre avis !
                </motion.div>
              ) : (
                <>
                  <MessageCircle size={20} /> Envoyer le feedback
                </>
              )}
              
              {isSubmitting && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
            </button>
          </div>
        </DashboardCard>
      </div>

      <div className="pt-10 flex items-center justify-center gap-2 text-slate-300">
         <HelpCircle size={16} />
         <p className="text-xs font-bold">Besoin d'aide ? <span className="text-blue-900 underline decoration-2 cursor-pointer">Guide complet</span></p>
      </div>
    </div>
  );
}

function ServicesView() {
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [baremeModalOpen, setBaremeModalOpen] = useState(false);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [selectedServiceToActivate, setSelectedServiceToActivate] = useState("");

  const servicesConfig = [
    { name: "ABONNEMENT", icon: <CreditCard size={18} />, subItems: ["Canal+", "StarTimes", "Autres"] },
    { name: "CREDIT", icon: <Smartphone size={18} />, subItems: [] },
    { name: "FORFAIT INTERNET", icon: <Globe size={18} />, subItems: [] },
    { name: "FORFAIT VOIX", icon: <Activity size={18} />, subItems: [] },
    { name: "PAIEMENT FACTURE", icon: <FileText size={18} />, subItems: ["SBEE (Électricité)", "SONEB (Eau)"] },
    { name: "DEPOT/RETRAIT", icon: <ArrowUpRight size={18} />, isGroup: true, items: [
      { name: "DEPOT", icon: <ArrowUpRight size={18} /> },
      { name: "RETRAIT", icon: <ArrowDownRight size={18} /> }
    ]}
  ];

  const availableCatalogue = [
    { name: "BOA", type: "BANQUE", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Bank_of_Africa_Group_logo.svg/1200px-Bank_of_Africa_Group_logo.svg.png" },
    { name: "Ecobank", type: "BANQUE" },
    { name: "NSIA Banque", type: "BANQUE" },
    { name: "UBA", type: "BANQUE" },
    { name: "CANAL+", type: "FACTURIER" },
    { name: "SBEE", type: "FACTURIER" },
    { name: "SONEB", type: "FACTURIER" },
    { name: "StarTimes", type: "FACTURIER" },
    { name: "Celtis", type: "MOBILE_MONEY" },
    { name: "Celtis Cash", type: "MOBILE_MONEY" },
    { name: "Moov Money", type: "MOBILE_MONEY" },
    { name: "MTN Mobile Money", type: "MOBILE_MONEY" },
    { name: "MTN MoMo", type: "MOBILE_MONEY" },
    { name: "Orange Money", type: "MOBILE_MONEY" },
    { name: "Wave", type: "MOBILE_MONEY" },
  ];

  type Palier = { min: string; max: string; fixe: string; taux: string };
  const [paliers, setPaliers] = useState<{ [category: string]: Palier[] }>({
    "ABONNEMENT": [],
    "Canal+": [],
    "StarTimes": [],
    "Autres": [],
    "CREDIT": [{ min: "0", max: "Infini", fixe: "0", taux: "0" }],
    "DEPOT": [],
    "FORFAIT INTERNET": [],
    "FORFAIT VOIX": [],
    "PAIEMENT FACTURE": [],
    "SBEE (Électricité)": [],
    "SONEB (Eau)": [],
    "RETRAIT": []
  });

  const handleAddPalier = (cat: string) => {
    setPaliers(prev => ({
      ...prev,
      [cat]: [...(prev[cat] || []), { min: "0", max: "Infini", fixe: "0", taux: "0" }]
    }));
  };

  const handleRemovePalier = (cat: string, index: number) => {
    setPaliers(prev => ({
      ...prev,
      [cat]: prev[cat].filter((_, i) => i !== index)
    }));
  };

  const handleUpdatePalier = (cat: string, index: number, field: keyof Palier, value: string) => {
    setPaliers(prev => {
      const newCatPaliers = [...prev[cat]];
      newCatPaliers[index] = { ...newCatPaliers[index], [field]: value };
      return { ...prev, [cat]: newCatPaliers };
    });
  };

  const [networks, setNetworks] = useState([
    { id: "1", name: "Orange Money", type: "TÉLÉCOM / MM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1024px-Orange_logo.svg.png", active: true },
    { id: "2", name: "MTN MoMo", type: "TÉLÉCOM / MM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1024px-MTN_Logo.svg.png", active: true },
    { id: "3", name: "Moov Money", type: "TÉLÉCOM / MM", logo: "https://upload.wikimedia.org/wikipedia/fr/b/bc/Moov_Africa_Logo.png", active: true },
    { id: "4", name: "Celtis", type: "TÉLÉCOM / MM", logo: "https://yt3.googleusercontent.com/f9-K0j6x1q6I971708XlyXN3dD2_W3F2X8U9t-p9f3YhX_v_d9XpY199_9eFvFvF9f-9=s900-c-k-c0x00ffffff-no-rj", active: false }
  ]);

  const toggleNetwork = (id: string) => {
    setNetworks(prev => prev.map(n => n.id === id ? { ...n, active: !n.active } : n));
  };

  const assignedAgencies = ["Agence Calavi", "Agence Cotonou Centre", "Agence Porto-Novo"];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Services & Commissions</h2>
          <p className="text-[13px] font-medium text-slate-400 font-bold italic">Configurez vos réseaux et les paliers de commissions (Vraie Vie).</p>
        </div>
        <button 
          onClick={() => setActivationModalOpen(true)}
          className="px-6 py-4 bg-[#234D96] text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={18} /> Activer un Nouveau Service
        </button>
      </div>

      <div className="space-y-4">
        {networks.map((network) => (
          <motion.div 
            key={network.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 group hover:shadow-xl transition-all duration-500 overflow-hidden relative"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.2rem] bg-white border border-slate-100 flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform duration-500">
                     <img src={network.logo} alt={network.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-slate-900">{network.name}</h3>
                        <span className="px-3 py-1 bg-blue-50 text-[#234D96] text-[9px] font-black rounded-lg uppercase tracking-widest">
                           {network.type}
                        </span>
                     </div>
                     <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ID: #{network.id}</p>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <button 
                    onClick={() => { setSelectedNetwork(network); setBaremeModalOpen(true); }}
                    className="px-6 py-3 bg-[#EEF2FF] text-[#234D96] rounded-[1rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all flex items-center gap-2 border border-blue-100/50"
                  >
                    <Banknote size={14} /> Commissions
                  </button>
                  <button 
                    onClick={() => toggleNetwork(network.id)}
                    className={`px-6 py-3 rounded-[1rem] font-black text-[10px] uppercase tracking-widest transition-all border ${
                      network.active 
                        ? "bg-red-50 text-red-500 border-red-100/30 hover:bg-red-500 hover:text-white" 
                        : "bg-emerald-50 text-emerald-600 border-emerald-100/30 hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    {network.active ? "Désactiver" : "Activer"}
                  </button>
               </div>
            </div>

            {/* Auto-deployment Notice - Minimalist Design */}
            <div className="p-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center gap-3">
               <Check size={14} strokeWidth={3} className="text-emerald-500 shrink-0" />
               <p className="text-[12px] font-medium text-slate-500">
                  Ce service est déployé automatiquement sur <span className="font-black text-slate-700">toutes vos agences</span>.
               </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bareme Modal */}
      <Modal
        isOpen={baremeModalOpen}
        onClose={() => setBaremeModalOpen(false)}
        title={
          <div className="flex items-center justify-center gap-4">
            {selectedNetwork?.logo && (
              <img src={selectedNetwork.logo} alt="" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
            )}
            <span>Configuration: {selectedNetwork?.name || ""}</span>
          </div>
        }
        subtitle="Définissez vos tranches de commissions de manière fluide et précise."
        className="max-w-3xl"
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar pr-2 mb-8 -mx-2 px-2">
          {servicesConfig.map((service) => (
            <div key={service.name}>
              {service.isGroup ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.items?.map((item) => (
                    <div key={item.name} className="p-6 bg-[#F8FAFC]/50 border border-slate-100 rounded-[2.5rem] space-y-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group/card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#234D96] shadow-sm group-hover/card:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-wider">{item.name}</h4>
                        </div>
                        <button 
                          onClick={() => handleAddPalier(item.name)}
                          className="p-2 bg-[#EEF2FF] text-[#234D96] rounded-lg font-black text-[10px] hover:bg-[#234D96] hover:text-white transition-all shadow-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(paliers[item.name] || []).length > 0 ? (
                          paliers[item.name].map((palier, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 p-4 rounded-[1.5rem] space-y-3 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Min</label>
                                  <input type="text" value={palier.min} onChange={(e) => handleUpdatePalier(item.name, idx, "min", e.target.value)} className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Max</label>
                                  <input type="text" value={palier.max} onChange={(e) => handleUpdatePalier(item.name, idx, "max", e.target.value)} className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Fixe</label>
                                  <input type="text" value={palier.fixe} onChange={(e) => handleUpdatePalier(item.name, idx, "fixe", e.target.value)} className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Taux %</label>
                                  <input type="text" value={palier.taux} onChange={(e) => handleUpdatePalier(item.name, idx, "taux", e.target.value)} className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold" />
                                </div>
                              </div>
                              <button onClick={() => handleRemovePalier(item.name, idx)} className="w-full py-1.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all text-[8px] font-black uppercase">Supprimer</button>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center border-2 border-dashed border-slate-100 rounded-[1.5rem] bg-slate-50/30">
                            <p className="text-[9px] font-black text-slate-400">Aucun barème</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-[#F8FAFC]/50 border border-slate-100 rounded-[2.5rem] space-y-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group/card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#234D96] shadow-sm group-hover/card:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <h4 className="text-base font-black text-slate-900 tracking-tight uppercase tracking-wider">{service.name}</h4>
                    </div>
                    {service.subItems?.length === 0 && (
                      <button 
                        onClick={() => handleAddPalier(service.name)}
                        className="px-5 py-2.5 bg-[#EEF2FF] text-[#234D96] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#234D96] hover:text-white transition-all shadow-sm flex items-center gap-2"
                      >
                        <Plus size={14} /> Ajouter un palier
                      </button>
                    )}
                  </div>

                  {service.subItems?.length === 0 ? (
                    <div className="space-y-4">
                      {(paliers[service.name] || []).length > 0 ? (
                        <div className="space-y-3">
                          {paliers[service.name].map((palier, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              key={idx} 
                              className="bg-white border border-slate-100 p-5 rounded-[1.5rem] grid grid-cols-1 sm:grid-cols-5 gap-4 items-end shadow-sm hover:border-[#234D96]/30 transition-all"
                            >
                              {/* ... fields ... */}
                              <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Min (F)</label>
                                <input type="text" value={palier.min} onChange={(e) => handleUpdatePalier(service.name, idx, "min", e.target.value)} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300" placeholder="0" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Max (F)</label>
                                <input type="text" value={palier.max} onChange={(e) => handleUpdatePalier(service.name, idx, "max", e.target.value)} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300" placeholder="10 000" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Fixe (F)</label>
                                <input type="text" value={palier.fixe} onChange={(e) => handleUpdatePalier(service.name, idx, "fixe", e.target.value)} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300" placeholder="100" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Taux (%)</label>
                                <input type="text" value={palier.taux} onChange={(e) => handleUpdatePalier(service.name, idx, "taux", e.target.value)} className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300" placeholder="0.5" />
                              </div>
                              <button onClick={() => handleRemovePalier(service.name, idx)} className="w-full sm:w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all group/trash">
                                <Trash2 size={16} />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center space-y-2 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                          <p className="text-[11px] font-black text-slate-400 tracking-tight">Aucun barème général défini.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {service.subItems?.map((sub) => (
                        <div key={sub} className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-6">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-black text-[#234D96]">{sub}</h5>
                            <button onClick={() => handleAddPalier(sub)} className="px-4 py-2 bg-blue-50/50 text-[#234D96] rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#234D96] hover:text-white transition-all flex items-center gap-2 border border-blue-100/50">
                              <Plus size={12} /> Nouveau palier
                            </button>
                          </div>
                          <div className="space-y-3">
                            {(paliers[sub] || []).length > 0 ? (
                              paliers[sub].map((palier, sIdx) => (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={sIdx} className="bg-[#F8FAFC] p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-5 gap-4 items-end border border-transparent hover:border-slate-200 transition-all">
                                  <div className="space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Min (F)</label>
                                    <input type="text" value={palier.min} onChange={(e) => handleUpdatePalier(sub, sIdx, "min", e.target.value)} className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-[11px] font-bold outline-none" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Max (F)</label>
                                    <input type="text" value={palier.max} onChange={(e) => handleUpdatePalier(sub, sIdx, "max", e.target.value)} className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-[11px] font-bold outline-none" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Fixe (F)</label>
                                    <input type="text" value={palier.fixe} onChange={(e) => handleUpdatePalier(sub, sIdx, "fixe", e.target.value)} className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-[11px] font-bold outline-none" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Taux (%)</label>
                                    <input type="text" value={palier.taux} onChange={(e) => handleUpdatePalier(sub, sIdx, "taux", e.target.value)} className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-[11px] font-bold outline-none" />
                                  </div>
                                  <button onClick={() => handleRemovePalier(sub, sIdx)} className="w-full sm:w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
                                    <Trash2 size={14} />
                                  </button>
                                </motion.div>
                              ))
                            ) : (
                              <p className="text-center py-4 text-[10px] font-bold text-slate-400 italic">Aucun barème pour {sub}.</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => setBaremeModalOpen(false)}
          className="w-full py-5 bg-[#234D96] text-white rounded-[2rem] font-black text-sm shadow-2xl shadow-blue-900/30 hover:bg-blue-900 transition-all active:scale-[0.98] group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[30deg]" />
          <span className="relative z-10 uppercase tracking-widest">Enregistrer les Configurations</span>
        </button>
      </Modal>

      {/* Service Activation Modal */}
      <Modal
        isOpen={activationModalOpen}
        onClose={() => setActivationModalOpen(false)}
        title="Activation de Service (Catalogue Admin)"
        subtitle="Service disponible dans le Catalogue"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <select 
              value={selectedServiceToActivate}
              onChange={(e) => setSelectedServiceToActivate(e.target.value)}
              className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-900 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="">Sélectionnez un service à activer...</option>
              {availableCatalogue.map((service, idx) => (
                <option key={idx} value={service.name}>
                  {service.name} — [{service.type}]
                </option>
              ))}
            </select>

            {selectedServiceToActivate && (
              <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[1.8rem] animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center p-2 shadow-sm overflow-hidden">
                  <img 
                    src={availableCatalogue.find(s => s.name === selectedServiceToActivate)?.logo} 
                    alt="" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Aperçu du service</p>
                   <p className="text-lg font-black text-[#234D96]">{selectedServiceToActivate}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-[1.8rem] text-amber-900">
             <p className="text-xs leading-relaxed">
               <span className="font-black text-amber-700">Note :</span> Une fois activé, ce service sera disponible automatiquement pour <span className="font-black">tous vos agents</span> dans <span className="font-black">toutes vos agences</span> actuelles et futures.
             </p>
          </div>

          <button 
            onClick={() => setActivationModalOpen(false)}
            className="w-full py-5 bg-[#234D96] text-white rounded-[1.2rem] font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-[0.95]"
          >
            Enregistrer le réseau
          </button>
        </div>
      </Modal>
    </div>
  );
}

function DettesView() {
  const dettes = [
    { 
      agent: "Agent Calavi", 
      agence: "Agence Calavi", 
      phone: "+229000000004", 
      reste: "15 000", 
      initiale: "50 000", 
      date: "10/04/2026", 
      motif: "Justification rejetée" 
    },
    { 
      agent: "Agent Cotonou", 
      agence: "Agence Cotonou Centre", 
      phone: "+229000000003", 
      reste: "25 000", 
      initiale: "25 000", 
      date: "15/04/2026", 
      motif: "Justification rejetée" 
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Suivi des Dettes Agents</h2>
        <p className="text-[13px] font-medium text-slate-400 font-bold italic">Consultez et régularisez les écarts de caisse rejetés.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dettes.map((d, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{d.agent}</h3>
                    <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mt-0.5">
                       <Building size={12} /> {d.agence}
                    </p>
                    <p className="text-[11px] font-black text-[#234D96] mt-0.5">{d.phone}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-red-50 text-red-500 text-[9px] font-black rounded-lg uppercase tracking-widest border border-red-100/50">EN ATTENTE</span>
              </div>

              <div className="p-6 bg-white border border-red-100 rounded-[2rem] space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Reste à payer</p>
                <h4 className="text-4xl font-black text-red-500 tracking-tighter">{d.reste} F</h4>
                <p className="text-[10px] font-bold text-slate-400">Dette initiale : {d.initiale} F</p>
              </div>

              <div className="space-y-3 px-1">
                <div className="flex items-center gap-3 text-slate-400">
                  <Calendar size={14} className="text-slate-300" />
                  <p className="text-[11px] font-bold">Date du bilan : <span className="text-slate-600">{d.date}</span></p>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Info size={14} className="text-slate-300" />
                  <p className="text-[11px] font-bold">Motif : <span className="text-slate-600">{d.motif}</span></p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#F8FAFC] border border-slate-100 rounded-[1.5rem] text-slate-400 hover:text-[#234D96] hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest">
                <RotateCcw size={14} className="animate-spin-slow" />
                <span>En attente d'ajustement agent</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Main App Wrapper ---

export default function MerchantDashboard(props: Partial<MerchantDashboardProps>) {
  const data = { ...DEFAULT_PROPS, ...props };
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Mai 02 - Juin 02");
  const [timeframe, setTimeframe] = useState("24h");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard": return (
        <DashboardView 
          data={data}
          searchQuery={searchQuery} 
          dateRange={dateRange} 
          setDateRange={setDateRange}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      );
      case "Agences": return <AgencesView />;
      case "Services": return <ServicesView />;
      case "Transactions": return <TransactionsView />;
      case "Caisses": return <CaissesView agences={data.liveSupervision.agencies} />;
      case "Stocks": return <StocksView />;
      case "Clôtures": return <CloturesView />;
      case "Dettes": return <DettesView />;
      case "Rapports": return <RapportsView />;
      case "Paramètres": return <SettingsView user={data.user} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
            <LayoutDashboard size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Page {activeTab} en cours</h3>
            <p className="text-sm font-medium text-slate-400">Cette section est en cours d'intégration dans votre système Fintrack2.</p>
          </div>
          <button onClick={() => setActiveTab("Dashboard")} className="px-6 py-2 bg-blue-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Retour au Dashboard</button>
        </div>
      );
    }
  };

  return (
    <div className="flex h-full bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar - Fintrack2 Style */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-8 flex justify-center border-b border-slate-50 mb-4 h-32 items-center">
          <Logo className="h-24 w-auto drop-shadow-sm" />
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar pb-8">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
          <SidebarItem icon={<Users size={20} />} label="Agences & Agents" active={activeTab === "Agences"} onClick={() => setActiveTab("Agences")} />
          <SidebarItem icon={<LayoutGrid size={20} />} label="Services & Commissions" active={activeTab === "Services"} onClick={() => setActiveTab("Services")} />
          <SidebarItem icon={<Activity size={20} />} label="Transactions" active={activeTab === "Transactions"} onClick={() => setActiveTab("Transactions")} />
          <SidebarItem icon={<MessageSquare size={20} />} label="Caisses & Remontées" active={activeTab === "Caisses"} onClick={() => setActiveTab("Caisses")} />
          <SidebarItem icon={<Package size={20} />} label="Produits & Stocks" active={activeTab === "Stocks"} onClick={() => setActiveTab("Stocks")} />
          <SidebarItem icon={<Calendar size={20} />} label="Clôtures & Bilans" active={activeTab === "Clôtures"} onClick={() => setActiveTab("Clôtures")} />
          <SidebarItem icon={<ShieldAlert size={20} />} label="Dettes agents" active={activeTab === "Dettes"} onClick={() => setActiveTab("Dettes")} />
          <SidebarItem icon={<BarChart2 size={20} />} label="Rapports" active={activeTab === "Rapports"} onClick={() => setActiveTab("Rapports")} />
          <SidebarItem icon={<Settings size={20} />} label="Paramètres" active={activeTab === "Paramètres"} onClick={() => setActiveTab("Paramètres")} />
        </nav>

        {/* Plan Card */}
        <div className="px-5 pb-8">
          <div className="p-6 bg-[#234D96] rounded-[2rem] text-white relative overflow-hidden group shadow-xl shadow-blue-900/40">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-400/40 transition-all duration-700" />
            <div className="relative z-10 space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-black italic tracking-tight">Plan Actuel PRO</h4>
                <p className="text-[9px] text-white/60 font-medium">5 agences maximum</p>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex items-baseline">
                   <span className="text-xl font-black">15K</span>
                   <span className="text-[9px] font-bold opacity-60 ml-0.5">/mois</span>
                </div>
                <button className="bg-white text-blue-900 px-4 py-2.5 rounded-2xl text-[10px] font-black tracking-tight hover:scale-105 transition-all shadow-md">Upgrade!</button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full mt-4 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] bg-red-500/5 border border-red-500/20 text-[#FF4B4B] hover:bg-red-500/10 transition-all font-black text-xs tracking-widest uppercase"
          >
            <LogOut size={18} />
            <span>Deconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Functional Search & User Controls */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 shrink-0 relative z-40">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-900 transition-colors" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chercher une transaction, un stock, une agence..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all outline-none placeholder:text-slate-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Dropdown
                onSelect={setDateRange}
                trigger={
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl text-[11px] font-bold text-slate-500 cursor-pointer hover:shadow-sm border border-slate-100 transition-all">
                    <Filter size={14} />
                    <span>{dateRange}</span>
                    <ChevronDown size={14} />
                  </div>
                }
                options={[
                  { label: "Aujourd'hui", value: "Aujourd'hui" },
                  { label: "7 derniers jours", value: "7 derniers jours" },
                  { label: "Mai 02 - Juin 02", value: "Mai 02 - Juin 02" },
                  { label: "Mois dernier", value: "Mois dernier" },
                ]}
              />
              
              <Dropdown
                onSelect={setTimeframe}
                trigger={
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl text-[11px] font-bold text-slate-500 border border-slate-100 cursor-pointer hover:shadow-sm transition-all">
                    <span>{timeframe}</span>
                    <ChevronDown size={14} />
                  </div>
                }
                options={[
                  { label: "1h", value: "1h" },
                  { label: "12h", value: "12h" },
                  { label: "24h", value: "24h" },
                  { label: "7j", value: "7j" },
                ]}
              />
            </div>
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                <div className="relative">
                  <div 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                      isNotificationsOpen 
                        ? "bg-blue-50 text-blue-900 border-blue-100" 
                        : "text-slate-400 border-slate-100 hover:text-blue-950 hover:bg-slate-50"
                    }`}
                  >
                    <Bell size={20} />
                  </div>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />

                  {/* Notification Panel */}
                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-4 w-[380px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden z-50 flex flex-col"
                      >
                        {/* Header */}
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Centre de Notifications</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mise à jour 12:19</p>
                          </div>
                          <button className="text-[10px] font-black text-[#234D96] uppercase tracking-widest hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all">
                            Tout marquer lu
                          </button>
                        </div>

                        {/* Content - Empty State */}
                        <div className="p-16 flex flex-col items-center text-center space-y-6">
                          <div className="w-20 h-20 bg-slate-50 rounded-[1.8rem] flex items-center justify-center rotate-3 border border-slate-50">
                            <Bell size={32} className="text-slate-200" />
                          </div>
                          <p className="text-base font-black text-slate-400 tracking-tight">Aucune nouvelle notification</p>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-50">
                          <button className="w-full py-4 text-[11px] font-black text-[#234D96] uppercase tracking-[0.1em] hover:bg-slate-50 rounded-2xl flex items-center justify-center gap-2 group transition-all">
                            Voir tout le journal
                            <MessageCircle size={14} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Dropdown
                  onSelect={() => {}}
                  trigger={
                    <div className="flex items-center gap-3 group cursor-pointer">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-slate-900">{data.user.nom}</p>
                        <p className="text-[10px] font-bold text-emerald-600">{data.user.entreprise.nom}</p>
                      </div>
                      <div className="relative">
                        <img src={`https://ui-avatars.com/api/?name=${data.user.nom}&background=F1F5F9&color=234D96&bold=true`} alt="User" className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm group-hover:scale-105 transition-transform" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                      </div>
                      <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                  }
                  options={[
                    { label: "Mon Profil", value: "profile", icon: <Users size={14} /> },
                    { label: "Paramètres", value: "settings", icon: <Settings size={14} /> },
                    { label: "Aide & Support", value: "support", icon: <AlertCircle size={14} /> },
                  ]}
                />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-[#F8FAFC]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
