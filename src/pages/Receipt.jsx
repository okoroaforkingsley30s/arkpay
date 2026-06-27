import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Printer, Home, CreditCard } from "lucide-react";
import KioskButton from "@/components/kiosk/KioskButton";
import KioskHeader from "@/components/kiosk/KioskHeader";

export default function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const now = new Date();
  const refNo = "APK" + now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + String(Math.floor(Math.random() * 9000) + 1000);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader />

      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Receipt card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2744] p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span className="text-white font-bold text-lg">ArkPay</span>
              </div>
              <p className="text-blue-300 text-xs">Card Issuance Receipt</p>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              <ReceiptLine label="Reference" value={refNo} mono />
              <ReceiptLine label="Date" value={now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} />
              <ReceiptLine label="Time" value={now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} />
              <div className="border-t border-dashed border-gray-200 my-2" />
              <ReceiptLine label="Service" value={formData.service_type || "Issue New Card"} />
              <ReceiptLine label="Customer" value={formData.full_name} />
              <ReceiptLine label="Account" value={formData.account_number} />
              <ReceiptLine label="Card Type" value={formData.card_type} />
              <ReceiptLine label="Card No." value="•••• •••• •••• 7821" mono />
              <ReceiptLine label="Branch" value={formData.branch} />
              <div className="border-t border-dashed border-gray-200 my-2" />
              <ReceiptLine label="Status" value="ISSUED" highlight />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-400">Thank you for using ArkPay Kiosk</p>
              <p className="text-xs text-gray-300 mt-1">Please contact your branch for card activation</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <KioskButton onClick={() => alert("Device SDK not connected yet")} className="w-full" icon={<Printer className="w-5 h-5" />}>
              Print Receipt
            </KioskButton>
            <KioskButton variant="secondary" onClick={() => navigate("/")} className="w-full" icon={<Home className="w-5 h-5" />}>
              Return Home
            </KioskButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ReceiptLine({ label, value, mono, highlight }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={`font-medium ${highlight ? "text-green-600" : "text-gray-900"} ${mono ? "font-mono" : ""}`}>
        {value || "—"}
      </span>
    </div>
  );
}