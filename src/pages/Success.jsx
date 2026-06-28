import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, FileText } from "lucide-react";
import KioskButton from "@/components/kiosk/KioskButton";

function maskAccount(accountNumber = "") {
  const value = String(accountNumber || "");
  if (value.length <= 4) return value || "—";

  return `${"*".repeat(Math.max(value.length - 4, 0))}${value.slice(-4)}`;
}

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  useEffect(() => {
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

        <h1 className="text-3xl font-bold text-white mb-2">
          Transaction Completed
        </h1>

        <p className="text-blue-300/80 text-sm mb-2">
          Your card has been successfully personalized and collected.
        </p>

        <p className="text-blue-400/50 text-xs mb-8">
          Thank you for using the ArkPay Self-Service Card Issuance Kiosk.
        </p>

        <div className="bg-white/5 backdrop-blur rounded-2xl p-5 w-full max-w-xs border border-white/10 mb-8">
          <div className="space-y-2 text-sm">
            <SummaryLine
              label="Name"
              value={
                formData.full_name ||
                formData.customer_profile?.full_name ||
                formData.name_on_card
              }
            />
            <SummaryLine
              label="Account"
              value={maskAccount(formData.account_number)}
            />
            <SummaryLine label="Card" value={formData.card_type} />
            <SummaryLine
              label="Card No."
              value={formData.card_last4 ? `•••• ${formData.card_last4}` : "•••• 7821"}
              mono
            />
            <SummaryLine label="Status" value="Completed" />
          </div>
        </div>

        <div className="space-y-3 w-full max-w-xs">
          <KioskButton
            onClick={() => navigate("/receipt", { state: formData })}
            className="w-full"
            icon={<FileText className="w-5 h-5" />}
          >
            View Receipt
          </KioskButton>

          <KioskButton
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full text-blue-300"
          >
            Done — Return Home
          </KioskButton>
        </div>
      </motion.div>
    </div>
  );
}

function SummaryLine({ label, value, mono = false }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-blue-300/60">{label}</span>
      <span
        className={`text-white font-medium text-right ${
          mono ? "font-mono" : ""
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}