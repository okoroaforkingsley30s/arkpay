import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, Printer, XCircle, Ban, Search } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const MOCK_QUEUE = [
  { id: "ARK-001", name: "Adaeze Okonkwo", account: "2034567891", card: "Visa Debit", branch: "Lekki", date: "27 Jun 2026, 10:32", status: "pending" },
  { id: "ARK-002", name: "Bello Haruna", account: "3045678902", card: "Mastercard Debit", branch: "Abuja Central", date: "27 Jun 2026, 10:15", status: "pending" },
  { id: "ARK-003", name: "Chioma Eze", account: "3045678901", card: "Mastercard Debit", branch: "Victoria Island", date: "27 Jun 2026, 09:48", status: "approved" },
  { id: "ARK-004", name: "David Nwosu", account: "5067890124", card: "Visa Credit", branch: "Surulere", date: "27 Jun 2026, 09:20", status: "approved" },
  { id: "ARK-005", name: "Ibrahim Musa", account: "4067890123", card: "Visa Debit", branch: "Main Branch", date: "27 Jun 2026, 09:00", status: "printed" },
  { id: "ARK-006", name: "Ngozi Obi", account: "5078901234", card: "Mastercard Credit", branch: "Marina", date: "26 Jun 2026, 16:45", status: "printed" },
  { id: "ARK-007", name: "Amina Yusuf", account: "7090123456", card: "Visa Debit", branch: "Ikeja", date: "27 Jun 2026, 08:55", status: "failed", reason: "Printer jam" },
  { id: "ARK-008", name: "Emeka Nwosu", account: "8001234567", card: "Mastercard Debit", branch: "Main Branch", date: "26 Jun 2026, 11:20", status: "failed", reason: "Chip encoding error" },
  { id: "ARK-009", name: "Felix Adekunle", account: "7089012346", card: "Visa Debit", branch: "Victoria Island", date: "25 Jun 2026, 14:10", status: "cancelled" },
];

const statusConfig = {
  pending:   { label: "Pending",   icon: Clock,         color: "text-amber-600",  bg: "bg-amber-50",  dot: "bg-amber-500"  },
  approved:  { label: "Approved",  icon: CheckCircle2,  color: "text-blue-600",   bg: "bg-blue-50",   dot: "bg-blue-500"   },
  printed:   { label: "Printed",   icon: Printer,       color: "text-green-600",  bg: "bg-green-50",  dot: "bg-green-500"  },
  failed:    { label: "Failed",    icon: XCircle,       color: "text-red-600",    bg: "bg-red-50",    dot: "bg-red-500"    },
  cancelled: { label: "Cancelled", icon: Ban,           color: "text-gray-500",   bg: "bg-gray-100",  dot: "bg-gray-400"   },
};

const TABS = ["all", "pending", "approved", "printed", "failed", "cancelled"];

export default function CardRequestQueue() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_QUEUE.filter(r => {
    const matchesTab = activeTab === "all" || r.status === activeTab;
    const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.account.includes(search);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Card Request Queue</h2>
            <p className="text-gray-500 text-sm mt-1">{MOCK_QUEUE.length} total requests</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, ID, or account..."
            className="pl-9 h-11 rounded-xl"
          />
        </div>

        {/* Status summary chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
          {Object.entries(statusConfig).map(([key, cfg]) => {
            const count = MOCK_QUEUE.filter(r => r.status === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === key ? `${cfg.bg} ${cfg.color} ring-2 ring-current ring-offset-1` : "bg-white text-gray-500 border border-gray-200"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label} ({count})
              </button>
            );
          })}
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "all" ? "bg-gray-900 text-white" : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            All ({MOCK_QUEUE.length})
          </button>
        </div>

        {/* Records */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No records found</p>
            </div>
          )}
          {filtered.map((r, i) => {
            const cfg = statusConfig[r.status];
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{r.id} · {r.account}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${cfg.bg} ${cfg.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{r.card} · {r.branch}</span>
                  <span>{r.date}</span>
                </div>
                {r.reason && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">⚠ {r.reason}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}