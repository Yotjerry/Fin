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
  X,
  Eye,
  EyeOff
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
      <div className="flex items-center gap-4">
        <span className={`${active ? "text-white" : "group-hover:scale-110 transition-all duration-300"}`}>
          {icon}
        </span>
        <span className="text-[13px] font-bold">{label}</span>
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
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  subtitle: string; 
  children: React.ReactNode;
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
            className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-10 pt-12">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-10 h-10 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
                <p className="text-sm font-semibold text-slate-400">{subtitle}</p>
              </div>

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
  const [viewTab, setViewTab] = useState<"Agences" | "Agents">("Agences");
  const [modalMode, setModalMode] = useState<"none" | "new_agence" | "edit_agence" | "new_agent">("none");
  
  // Form States
  const [agenceName, setAgenceName] = useState("");
  const [agenceAddress, setAgenceAddress] = useState("");
  const [agencePlafond, setAgencePlafond] = useState("");
  const [agenceHasGas, setAgenceHasGas] = useState(false);
  
  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentAgence, setAgentAgence] = useState("");
  const [agentPass, setAgentPass] = useState("");
  
  const agences = [
    { id: 1, name: "Agence Cotonou Centre", status: "ACTIVE", profit: "0 F", agents: 1, plafond: 5000000, current: 4200000, address: "Sans adresse" },
    { id: 2, name: "Agence Calavi", status: "ACTIVE", profit: "0 F", agents: 1, plafond: 3000000, current: 1500000, address: "Sans adresse" },
    { id: 3, name: "Agence Porto-Novo", status: "ACTIVE", profit: "0 F", agents: 0, plafond: 2000000, current: 1800000, address: "Sans adresse" },
  ];

  const agents = [
    { id: 1, name: "Agent Cotonou", phone: "+22900000003", agence: "Agence Cotonou Centre", status: "Actif" },
    { id: 2, name: "Agent Calavi", phone: "+22900000004", agence: "Agence Calavi", status: "Actif" },
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Agences & Agents</h2>
          <p className="text-xs font-semibold text-slate-400 mt-1">Gérez vos points de vente et votre équipe depuis un seul endroit.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setModalMode("new_agence"); setAgenceName(""); setAgenceAddress(""); setAgencePlafond(""); setAgenceHasGas(false); }}
            className="px-5 py-3 bg-white text-[#234D96] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 border border-slate-100 shadow-sm"
          >
            <Plus size={16} /> Agence
          </button>
          <button 
            onClick={() => { setModalMode("new_agent"); setAgentName(""); setAgentPhone(""); setAgentAgence("Agence Cotonou Centre"); setAgentPass(""); }}
            className="px-5 py-3 bg-[#234D96] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Plus size={16} /> Agent
          </button>
        </div>
      </div>

      <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <button 
          onClick={() => setViewTab("Agences")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
            viewTab === "Agences" ? "bg-[#234D96] text-white shadow-md shadow-blue-900/10" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <LayoutDashboard size={14} />
          Agences
          <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${viewTab === "Agences" ? "bg-white/20" : "bg-slate-100"}`}>4</span>
        </button>
        <button 
          onClick={() => setViewTab("Agents")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
            viewTab === "Agents" ? "bg-[#234D96] text-white shadow-md shadow-blue-900/10" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Users size={14} />
          Agents
          <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${viewTab === "Agents" ? "bg-white/20" : "bg-slate-100"}`}>2</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {viewTab === "Agences" ? agences.map((agence) => {
          const usage = (agence.current / agence.plafond) * 100;
          const isCritical = usage >= 85;
          const isWarning = usage >= 60 && usage < 85;

          return (
            <motion.div 
              key={agence.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative group overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-[#234D96] shadow-sm">
                    <LayoutDashboard size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{agence.name}</h3>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 rounded-lg text-[8px] font-black uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative w-12 h-12">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="24" cy="24" r="20" className="fill-none stroke-slate-100" strokeWidth="4" />
                      <motion.circle 
                        cx="24" cy="24" r="20" 
                        className={`fill-none ${isCritical ? 'stroke-red-500' : isWarning ? 'stroke-orange-400' : 'stroke-blue-900'}`} 
                        strokeWidth="4" 
                        strokeDasharray={125.6}
                        initial={{ strokeDashoffset: 125.6 }}
                        animate={{ strokeDashoffset: 125.6 - (125.6 * usage) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-[8px] font-black ${isCritical ? 'text-red-500' : 'text-blue-900'}`}>{Math.round(usage)}%</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 mb-6 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold italic">{agence.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-50 transition-colors group-hover:bg-white group-hover:border-blue-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Profit Auj.</p>
                  <p className="text-sm font-black text-[#234D96]">{agence.profit}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-50 transition-colors group-hover:bg-white group-hover:border-blue-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Agents</p>
                  <p className="text-sm font-black text-[#234D96]">{agence.agents}</p>
                </div>
              </div>

              <div className={`mb-8 p-4 rounded-2xl flex items-center justify-between border ${
                isCritical ? 'bg-red-50/50 border-red-100' : isWarning ? 'bg-orange-50/50 border-orange-100' : 'bg-[#EBF1FA] border-[#234D96]/10'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isCritical ? 'bg-red-100 text-red-600' : 'bg-white shadow-sm text-blue-900'}`}>
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <p className={`text-[8px] font-black uppercase tracking-widest mb-0.5 ${isCritical ? 'text-red-600' : 'text-slate-400'}`}>Seuil Plafond</p>
                    <p className="text-[11px] font-black text-slate-900">{formatCurrency(agence.plafond)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 italic">Dispo:</p>
                  <p className={`text-[11px] font-black ${isCritical ? 'text-red-600' : 'text-emerald-600'}`}>
                    {formatCurrency(agence.plafond - agence.current)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                <button 
                  onClick={() => handleEditAgence(agence)}
                  className="py-3 bg-white border border-slate-100 text-[#234D96] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F8FAFC] transition-all"
                >
                  Modifier
                </button>
                <button className="py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all">Désactiver</button>
              </div>
            </motion.div>
          );
        }) : agents.map((agent) => (
          <motion.div 
            key={agent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative group overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#234D96] rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-900/10">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{agent.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                    <ShoppingCart size={12} className="opacity-40" />
                    <span className="text-[10px] font-medium tracking-tight">{agent.phone}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 rounded-lg text-[8px] font-black uppercase tracking-widest">Actif</span>
            </div>

            <div className="space-y-3 mb-8">
              <div className="p-4 bg-[#F8FAFC] rounded-2xl flex items-center justify-between border border-slate-50 group-hover:border-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={14} className="text-[#234D96] opacity-60" />
                  <p className="text-[10px] font-bold text-slate-600">{agent.agence}</p>
                </div>
                <ChevronDown size={12} className="-rotate-90 text-slate-300" />
              </div>
              <div className="p-4 bg-orange-50/50 rounded-2xl flex items-center gap-3 border border-orange-100/30">
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <p className="text-[10px] font-bold text-orange-900/60 uppercase tracking-tight">Vérification identité requise</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
              <button className="py-3 bg-slate-50/50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2">
                <Users size={14} /> Désactiver
              </button>
              <button className="py-3 bg-white border border-slate-100 text-[#234D96] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50/30 transition-all focus:ring-2 focus:ring-blue-100 outline-none">Modifier</button>
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
            Enregistrer
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
              className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-[#234D96] rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-900 transition-all outline-none appearance-none"
            >
              {agences.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>

          <Input label="Mot de passe initial" placeholder="••••••••" value={agentPass} onChange={setAgentPass} type="password" />
          
          <button className="w-full mt-4 py-5 bg-[#234D96] text-white rounded-[1.8rem] font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-[0.98]">
            Créer le compte agent
          </button>
        </div>
      </Modal>
    </div>
  );
}

function TransactionsView() {
  const transactions = [
    { ref: "TXN-8492", date: "18/04 14:32", nature: "DEPOT", reseau: "MTN", montant: "50.000", comm: "750", agent: "Marius", agence: "Cotonou Star", status: "CONFIRME" },
    { ref: "TXN-8493", date: "18/04 14:45", nature: "RETRAIT", reseau: "Moov", montant: "15.000", comm: "225", agent: "Jean K.", agence: "Calavi Center", status: "EN_ATTENTE" },
    { ref: "TXN-8494", date: "18/04 15:10", nature: "VENTE", reseau: "GazPlus", montant: "8.500", comm: "425", agent: "Marius", agence: "Cotonou Star", status: "CONFIRME" },
    { ref: "TXN-8495", date: "18/04 15:22", nature: "DEPOT", reseau: "Celtis", montant: "100.000", comm: "1.500", agent: "Lisa", agence: "Porto-Novo", status: "ECHEC" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Historique des Transactions</h2>
          <p className="text-xs font-medium text-slate-400">Toutes les opérations de votre réseau d'agences.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
            <Download size={14} /> Exporter CSV
          </button>
        </div>
      </div>

      <DashboardCard title="Base de données Transactions" className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Référence</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Date & Heure</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Nature</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Réseau</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Montant</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Comm.</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.ref} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-black text-slate-900 tracking-wider">{tx.ref}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-slate-500">{tx.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                      tx.nature === 'DEPOT' ? "bg-blue-50 text-blue-600" : tx.nature === 'RETRAIT' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                    }`}>{tx.nature}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-slate-700">{tx.reseau}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-black text-slate-900">{tx.montant} FCFA</span>
                  </td>
                  <td className="px-6 py-4 text-emerald-600">
                    <span className="text-[11px] font-black">+{tx.comm} FCFA</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                      tx.status === 'CONFIRME' ? "bg-emerald-50 text-emerald-600" : tx.status === 'EN_ATTENTE' ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                    }`}>{tx.status.replace('_', ' ')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}

function CaissesView() {
  const [activeSubTab, setActiveSubTab] = useState("Remontées");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Caisses & Remontées</h2>
      </div>

      <div className="flex gap-4 border-b border-slate-100 pb-px">
        {["Remontées", "Dotations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeSubTab === tab ? "text-blue-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
            {activeSubTab === tab && (
              <motion.div layoutId="activeSubTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-900 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {activeSubTab === "Remontées" ? (
        <div className="grid grid-cols-1 gap-6">
          <DashboardCard title="Versements Bancaires en attente">
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-3xl gap-6 border border-slate-100">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-300">
                      <Plus size={30} strokeWidth={1} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 italic">Preuve_banque_{i}.jpg</p>
                      <p className="text-xs font-bold text-slate-400 uppercase">Agence {i === 1 ? "Cotonou" : "Calavi"}</p>
                      <p className="text-xl font-black text-blue-900 mt-1">{i === 1 ? "250.000" : "450.000"} FCFA</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-red-50 border-b-2 shadow-sm hover:bg-red-50 transition-all">Rejeter</button>
                    <button className="px-6 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all">Valider le versement</button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto pt-8">
           <DashboardCard title="Nouvelle Dotation (Flotte)">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Agence bénéficiaire</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-4 pr-10 text-xs font-bold appearance-none outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all">
                          <option>Choisir l'agence...</option>
                          <option>Cotonou Star</option>
                          <option>Calavi Center</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Type d'unité</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-4 pr-10 text-xs font-bold appearance-none outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all">
                          <option>MTN Moov</option>
                          <option>Orange Money</option>
                          <option>Celtis</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                      </div>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Montant de la dotation (FCFA)</label>
                   <input type="number" placeholder="Ex: 500.000" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                <button className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Confirmer l'envoi</button>
              </div>
           </DashboardCard>
        </div>
      )}
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
  const clotures = [
    { date: "18/04/2026", agent: "Marius D.", agence: "Cotonou Star", theory: "154.200", physical: "154.200", gap: 0 },
    { date: "17/04/2026", agent: "Jean K.", agence: "Calavi Center", theory: "98.500", physical: "93.500", gap: -5000 },
    { date: "17/04/2026", agent: "Marius D.", agence: "Cotonou Star", theory: "142.000", physical: "144.500", gap: 2500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clôtures & Bilans</h2>
          <p className="text-xs font-medium text-slate-400">Vérification de l'équilibre des caisses en fin de journée.</p>
        </div>
      </div>

      <DashboardCard title="Journal des clôtures d'agents" className="p-0 overflow-hidden">
         <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Agent & Agence</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Système</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Déclaré</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Écart</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center tracking-widest pl-12">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clotures.map((c, i) => (
                <tr key={i}>
                   <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{c.date}</td>
                   <td className="px-6 py-4">
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{c.agent}</p>
                      <p className="text-[10px] font-bold text-slate-400">{c.agence}</p>
                   </td>
                   <td className="px-6 py-4 text-[11px] font-black text-slate-700 text-center">{c.theory} FCFA</td>
                   <td className="px-6 py-4 text-[11px] font-black text-slate-900 text-center">{c.physical} FCFA</td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${c.gap === 0 ? "bg-emerald-500" : c.gap < 0 ? "bg-red-500" : "bg-blue-500"}`} />
                         <span className={`text-[11px] font-black ${c.gap === 0 ? "text-emerald-600" : c.gap < 0 ? "text-red-500" : "text-blue-500"}`}>
                            {c.gap === 0 ? "Équilibre" : `${c.gap > 0 ? '+' : ''}${c.gap} FCFA`}
                         </span>
                      </div>
                   </td>
                   <td className="px-6 py-4 text-center pl-12">
                      {c.gap < 0 ? (
                        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100">Transformer en dette</button>
                      ) : (
                        <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg font-black text-[9px] uppercase tracking-widest hover:text-slate-900 transition-all border border-slate-100">Valider</button>
                      )}
                   </td>
                </tr>
              ))}
            </tbody>
         </table>
      </DashboardCard>
    </div>
  );
}

function RapportsView() {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rapports & Archives</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Journalier", "Hebdomadaire", "Mensuel", "Comptabilité Gaz"].map((title) => (
             <DashboardCard key={title} title={title}>
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900">
                      <BarChart2 size={30} />
                   </div>
                   <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                      <Download size={14} /> Télécharger
                   </button>
                </div>
             </DashboardCard>
          ))}
       </div>
    </div>
  );
}

function SettingsView({ user }: { user: any }) {
  return (
    <div className="space-y-8 max-w-4xl">
       <div className="flex items-center gap-6">
          <div className="relative group">
            <img src={`https://ui-avatars.com/api/?name=${user.nom}&background=F1F5F9&color=234D96&size=128&bold=true`} className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-xl group-hover:opacity-80 transition-all" alt="" />
            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-blue-900/80 p-2 rounded-xl text-white backdrop-blur-md">
                  <Plus size={20} />
               </div>
            </button>
          </div>
          <div>
             <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.nom}</h2>
             <p className="text-slate-400 font-bold">{user.entreprise.nom} • Marchand</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <DashboardCard title="Informations de l'entreprise">
             <div className="space-y-4 py-2">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Raison sociale</p>
                   <p className="text-sm font-bold text-slate-900">{user.entreprise.nom}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Téléphone pro</p>
                   <p className="text-sm font-bold text-slate-900">{user.entreprise.telephone}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Email facturation</p>
                   <p className="text-sm font-bold text-slate-900">{user.email}</p>
                </div>
                <button className="text-[10px] font-black text-blue-900 uppercase underline decoration-2 underline-offset-2">Modifier les informations</button>
             </div>
          </DashboardCard>

          <DashboardCard title="Paramètres du compte">
             <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                   <div className="flex items-center gap-3">
                      <Settings size={18} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-800">Sécurité & Mot de passe</span>
                   </div>
                   <ChevronDown size={14} className="-rotate-90 text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                   <div className="flex items-center gap-3">
                      <Bell size={18} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-800">Alertes SMS & Notifications</span>
                   </div>
                   <ChevronDown size={14} className="-rotate-90 text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all mt-4">
                   <div className="flex items-center gap-3 font-bold">
                      <LogOut size={18} />
                      <span className="text-xs">Fermer la session</span>
                   </div>
                </button>
             </div>
          </DashboardCard>
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
      case "Transactions": return <TransactionsView />;
      case "Caisses": return <CaissesView />;
      case "Stocks": return <StocksView />;
      case "Clôtures": return <CloturesView />;
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
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar - Fintrack2 Style */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-8 flex justify-center border-b border-slate-50 mb-4 h-32 items-center">
          <Logo className="h-24 w-auto drop-shadow-sm" />
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar pb-8">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
          <SidebarItem icon={<Users size={20} />} label="Agences & Agents" active={activeTab === "Agences"} onClick={() => setActiveTab("Agences")} />
          <SidebarItem icon={<ShoppingCart size={20} />} label="Transactions" active={activeTab === "Transactions"} onClick={() => setActiveTab("Transactions")} />
          <SidebarItem icon={<MessageSquare size={20} />} label="Caisses & Remontées" active={activeTab === "Caisses"} onClick={() => setActiveTab("Caisses")} badge={data.liveSupervision.summary.pending_remontees} />
          <SidebarItem icon={<Package size={20} />} label="Produits & Stocks" active={activeTab === "Stocks"} onClick={() => setActiveTab("Stocks")} />
          <SidebarItem icon={<Calendar size={20} />} label="Clôtures & Bilans" active={activeTab === "Clôtures"} onClick={() => setActiveTab("Clôtures")} badge={data.liveSupervision.summary.pending_closures} />
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 border border-slate-100 hover:text-blue-950 hover:bg-slate-50 cursor-pointer transition-all">
                    <Bell size={20} />
                  </div>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
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
