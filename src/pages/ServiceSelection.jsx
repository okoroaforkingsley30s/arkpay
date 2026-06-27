import React from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, RefreshCw, RotateCcw, Lock, Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import KioskHeader from "@/components/kiosk/KioskHeader";

const services = [
  { id: "issue", label: "Issue New Card", icon: CreditCard, desc: "Get a brand new debit or credit card", color: "from-blue-500 to-blue-600" },
  { id: "replace", label: "Replace Card", icon: RefreshCw, desc: "Replace a lost, stolen or damaged card", color: "from-emerald-500 to-emerald-600" },
  { id: "reissue", label: "Re-Issue Card", icon: RotateCcw, desc: "Re-issue an expired or renewed card", color: "from-violet-500 to-violet-600" },
  { id: "pin", label: "PIN Change", icon: Lock, desc: "Change your card PIN securely", color: "from-amber-500 to-amber-600" },
  { id: "balance", label: "Balance Inquiry", icon: Search, desc: "Check your account balance", color: "from-cyan-500 to-cyan-600" },
];

export default function ServiceSelection() {
  const navigate = useNavigate();

  const handleSelect = (service) => {
    navigate("/customer-details", { state: { serviceType: service.label } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/")} />
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Select a Service</h2>
          <p className="text-gray-500 text-sm mt-1">Choose what you'd like to do today</p>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(service)}
              className="bg-white rounded-2xl p-5 text-left shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 shadow-lg`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">{service.label}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{service.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}