import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  ChevronRight,
  Shield,
  Wifi,
  Clock3,
  CalendarDays,
  Building2,
  Circle,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = time.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const networkOnline = navigator.onLine;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071321] via-[#0A2540] to-[#102B4C] relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[650px] h-[650px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[650px] h-[650px] rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-10 py-6 text-white">

        <div>
          <h1 className="text-2xl font-bold">ArkPay</h1>
          <p className="text-blue-300 text-sm">
            Smart Card Personalization Platform
          </p>
        </div>

        <div className="text-right space-y-1">

          <div className="flex items-center justify-end gap-2">
            <Clock3 className="w-4 h-4 text-blue-300" />
            <span className="font-semibold">{currentTime}</span>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm text-blue-300">
            <CalendarDays className="w-4 h-4" />
            {currentDate}
          </div>

        </div>

      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-10">

        {/* Bank Placeholder */}

        <div className="w-40 h-20 rounded-2xl border-2 border-dashed border-blue-400/30 bg-white/5 flex flex-col items-center justify-center mb-8">

          <Building2 className="w-8 h-8 text-blue-300" />

          <span className="text-xs text-blue-200 mt-2">
            Bank Logo
          </span>

        </div>

        {/* ArkPay Logo */}

        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          transition={{ duration: .5 }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-600/30 mb-8"
        >
          <CreditCard className="w-12 h-12 text-white" />
        </motion.div>

        <h2 className="text-5xl font-black text-white">
          Welcome
        </h2>

        <p className="mt-5 text-blue-200 text-lg max-w-lg leading-relaxed">
          Issue new cards, replace existing cards and securely manage
          banking card services using ArkPay.
        </p>

        <p className="text-blue-400 mt-3">
          Average transaction time: Less than 3 minutes
        </p>

        {/* Device Status */}

        <div className="grid grid-cols-2 gap-4 mt-10">

          {[
            "Printer Ready",
            "Camera Ready",
            "Smart Card Ready",
            networkOnline ? "Network Connected" : "Offline",
          ].map((item) => (

            <div
              key={item}
              className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3"
            >
              <Circle
                fill="#00C853"
                className="w-3 h-3 text-green-500"
              />

              <span className="text-blue-100 text-sm">
                {item}
              </span>

            </div>

          ))}

        </div>

        {/* Start Button */}

        <motion.button
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          onClick={() => navigate("/services")}
          className="mt-14 bg-blue-600 hover:bg-blue-500 rounded-2xl px-16 py-5 text-xl font-bold text-white flex items-center gap-3 shadow-2xl shadow-blue-600/30"
        >
          Touch To Start

          <ChevronRight />

        </motion.button>

      </div>

      {/* Footer */}

      <div className="absolute bottom-0 left-0 right-0 px-10 py-5 flex justify-between items-center text-sm">

        <div className="flex items-center gap-5 text-blue-300">

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            PCI Secure
          </div>

          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            {networkOnline ? "Online" : "Offline"}
          </div>

        </div>

        <div className="text-blue-400">
          Powered by Ark Technologies Group • ArkPay v1.0
        </div>

      </div>

      {/* Admin */}

      <button
        onClick={() => navigate("/admin-login")}
        className="absolute bottom-6 right-8 flex items-center gap-2 text-blue-300 hover:text-white transition"
      >
        <Settings className="w-4 h-4" />
        Administrator
      </button>

    </div>
  );
}