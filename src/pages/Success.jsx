import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Printer } from "lucide-react";
import KioskButton from "@/components/kiosk/KioskButton";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  useEffect(() => {
    // Auto-redirect after 30 seconds
    const timer = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1d35] to-[#162544] flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-green-500/20 ring-4 ring-green-500/30 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-14 h-14 text-green-400" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Card Issued Successfully!</h1>
        <p className="text-blue-300/80 text-sm mb-2">Your new {formData.card_type || "debit card"} is ready</p>
        <p className="text-blue-400/50 text-xs mb-8">Please collect your card from the dispenser below</p>

        <div className="bg-white/5 backdrop-blur rounded-2xl p-5 w-full max-w-xs border border-white/10 mb-8">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-300/60">Name</span>
              <span className="text-white font-medium">{formData.full_name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300/60">Account</span>
              <span className="text-white font-medium">{formData.account_number || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300/60">Card</span>
              <span className="text-white font-medium">{formData.card_type || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300/60">Card No.</span>
              <span className="text-white font-mono">•••• 7821</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 w-full max-w-xs">
          <KioskButton
            onClick={() => navigate("/receipt", { state: formData })}
            className="w-full"
            icon={<Printer className="w-5 h-5" />}
          >
            Print Receipt
          </KioskButton>
          <KioskButton variant="ghost" onClick={() => navigate("/")} className="w-full text-blue-300">
            Done — Return Home
          </KioskButton>
        </div>
      </motion.div>
    </div>
  );
}