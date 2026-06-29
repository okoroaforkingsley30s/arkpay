import React, { useState } from "react";
import { useMemo } from "react";
import configManager from "@/services/configManager";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Monitor,
  BarChart3,
  LogOut,
  Cpu,
  Upload,
  List,
  Building2,
  Wrench,
  Shield,
  Package,
  Activity
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeviceStatusPanel from "@/components/admin/DeviceStatusPanel";
import CardStockTracker from "@/components/admin/CardStockTracker";

const mockPending = [
  { id: 1, name: "Adebayo Ogundimu", account: "2034567890", card: "Visa Debit", service: "Issue New Card", date: "27 Jun 2026, 10:32" },
  { id: 2, name: "Chioma Eze", account: "3045678901", card: "Mastercard Debit", service: "Replace Card", date: "27 Jun 2026, 10:15" },
  { id: 3, name: "Funke Adeyemi", account: "1056789012", card: "Verve", service: "Issue New Card", date: "27 Jun 2026, 09:48" },
];

const mockIssued = [
  { id: 4, name: "Ibrahim Musa", account: "4067890123", card: "Visa Debit", last4: "3456", date: "27 Jun 2026, 09:20" },
  { id: 5, name: "Ngozi Obi", account: "5078901234", card: "Mastercard Credit", last4: "7890", date: "26 Jun 2026, 16:45" },
  { id: 6, name: "Tunde Bakare", account: "6089012345", card: "Verve", last4: "2345", date: "26 Jun 2026, 14:30" },
];

const mockFailed = [
  { id: 7, name: "Amina Yusuf", account: "7090123456", card: "Visa Debit", reason: "Printer jam", date: "27 Jun 2026, 08:55" },
  { id: 8, name: "Emeka Nwosu", account: "8001234567", card: "Mastercard Debit", reason: "Chip encoding error", date: "26 Jun 2026, 11:20" },
];

const stats = [
  { label: "Pending", value: 3, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Issued Today", value: 12, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Failed", value: 2, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  { label: "Total", value: 156, icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const config = useMemo(() => configManager.getConfig(), []);
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin header */}
      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2744] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">{config.app.name} Admin</h1>
            <p className="text-[10px] text-blue-300 font-medium tracking-wider uppercase">Kiosk Dashboard</p>
          </div>
        </div>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors">
          <LogOut className="w-4 h-4" /> Exit
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4 h-11 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="pending" className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Pending
            </TabsTrigger>
            <TabsTrigger value="issued" className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Issued
            </TabsTrigger>
            <TabsTrigger value="failed" className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Failed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-3 mt-0">
            {mockPending.map(r => <RequestCard key={r.id} {...r} status="pending" />)}
          </TabsContent>
          <TabsContent value="issued" className="space-y-3 mt-0">
            {mockIssued.map(r => <RequestCard key={r.id} {...r} status="issued" />)}
          </TabsContent>
          <TabsContent value="failed" className="space-y-3 mt-0">
            {mockFailed.map(r => <RequestCard key={r.id} {...r} status="failed" />)}
          </TabsContent>
        </Tabs>

        {/* Kiosk & Device Status */}
        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-gray-400" /> Kiosk Status
          </h3>
          <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
  {config.kiosk.id}
</p><p className="text-xs text-gray-400">
  {config.institution.branch} — {config.kiosk.location}
</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-600">Online</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-900">98%</p>
                <p className="text-[10px] text-gray-400">Uptime</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-900">42</p>
                <p className="text-[10px] text-gray-400">Cards Left</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-900">26°C</p>
                <p className="text-[10px] text-gray-400">Temperature</p>
              </div>
            </div>
          </div>

          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-gray-400" /> Device Status
          </h3>
          <DeviceStatusPanel />
        </div>

        {/* Card Stock Tracker */}
        <div className="mt-6">
          <CardStockTracker />
        </div>

        {/* Quick Nav */}
        <div className="mt-6 mb-4">
          <h3 className="text-base font-bold text-gray-900 mb-3">Management Tools</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
  {
    label: "Emboss Upload",
    icon: Upload,
    path: "/admin/emboss",
  },
  {
    label: "Card Queue",
    icon: List,
    path: "/admin/queue",
  },
  {
    label: "Institution Setup",
    icon: Building2,
    path: "/admin/institution",
  },
  {
    label: "Device Test",
    icon: Wrench,
    path: "/admin/devices",
  },
  {
    label: "Diagnostics",
    icon: Activity,
    path: "/admin/diagnostics",
  },
  {
    label: "Audit Logs",
    icon: Shield,
    path: "/admin/audit",
  },
].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl p-4 text-left hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reports placeholder */}
        <div className="mt-2 mb-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
            <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">Reports & Analytics</p>
            <p className="text-xs text-gray-400 mt-1">Available when connected to the backend</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestCard({ name, account, card, service, date, status, last4, reason }) {
  const statusColors = {
    pending: "bg-amber-50 text-amber-700",
    issued: "bg-green-50 text-green-700",
    failed: "bg-red-50 text-red-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-400 font-mono">{account}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{card}{last4 ? ` •••• ${last4}` : ""}</span>
        <span>{date}</span>
      </div>
      {service && <p className="text-xs text-blue-600 mt-1">{service}</p>}
      {reason && <p className="text-xs text-red-500 mt-1">Reason: {reason}</p>}
    </motion.div>
  );
}