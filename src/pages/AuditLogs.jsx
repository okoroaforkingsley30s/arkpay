import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Search, Filter, CheckCircle2, XCircle, Clock, Download } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import { Input } from "@/components/ui/input";

const MOCK_LOGS = [
  { id: 1, user: "admin", action: "Card Issued",          ref: "ARK-005", device: "Seaory S21 Printer",  datetime: "27 Jun 2026, 09:00", status: "success"  },
  { id: 2, user: "admin", action: "Card Issued",          ref: "ARK-006", device: "Seaory S21 Printer",  datetime: "26 Jun 2026, 16:45", status: "success"  },
  { id: 3, user: "admin", action: "Print Failed",         ref: "ARK-007", device: "Seaory S21 Printer",  datetime: "27 Jun 2026, 08:55", status: "failed"   },
  { id: 4, user: "admin", action: "Chip Encode Failed",   ref: "ARK-008", device: "Smart Card Reader",   datetime: "26 Jun 2026, 11:20", status: "failed"   },
  { id: 5, user: "admin", action: "Fingerprint Captured", ref: "ARK-003", device: "Fingerprint Scanner", datetime: "27 Jun 2026, 09:48", status: "success"  },
  { id: 6, user: "admin", action: "ID Scanned",           ref: "ARK-003", device: "Camera",              datetime: "27 Jun 2026, 09:46", status: "success"  },
  { id: 7, user: "admin", action: "PIN Set",              ref: "ARK-004", device: "PIN Pad",             datetime: "27 Jun 2026, 09:22", status: "pending"  },
  { id: 8, user: "admin", action: "Card Read",            ref: "ARK-002", device: "Smart Card Reader",   datetime: "27 Jun 2026, 10:10", status: "success"  },
  { id: 9, user: "admin", action: "Emboss File Uploaded", ref: "BATCH-001", device: "System",            datetime: "27 Jun 2026, 10:00", status: "success"  },
  { id: 10, user: "admin", action: "Device Test Run",     ref: "SYS",     device: "All Devices",         datetime: "27 Jun 2026, 08:30", status: "pending"  },
];

const statusMap = {
  success: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2, dot: "bg-green-500" },
  failed:  { color: "text-red-600",   bg: "bg-red-50",   icon: XCircle,      dot: "bg-red-500"   },
  pending: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock,        dot: "bg-amber-500" },
};

export default function AuditLogs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = MOCK_LOGS.filter(l => {
    const matchStatus = filter === "all" || l.status === filter;
    const matchSearch = !search
      || l.action.toLowerCase().includes(search.toLowerCase())
      || l.ref.toLowerCase().includes(search.toLowerCase())
      || l.device.toLowerCase().includes(search.toLowerCase())
      || l.user.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" /> Audit Logs
            </h2>
            <p className="text-gray-500 text-sm mt-1">{MOCK_LOGS.length} log entries</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="pl-9 h-11 rounded-xl"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-4">
          {["all", "success", "failed", "pending"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors capitalize ${
                filter === f ? "bg-gray-900 text-white" : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Log entries */}
        <div className="space-y-2">
          {filtered.map((log, i) => {
            const cfg = statusMap[log.status];
            const StatusIcon = cfg.icon;
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-6 h-6 rounded-full ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${cfg.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{log.action}</p>
                      <p className="text-xs text-gray-400">{log.user} · {log.device}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${cfg.bg} ${cfg.color} shrink-0`}>
                    {log.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 ml-8.5">
                  <span className="font-mono font-medium text-gray-600">{log.ref}</span>
                  <span>{log.datetime}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}