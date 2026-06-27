import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, CreditCard } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";

export default function CardPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const mockCardNumber = "5399 •••• •••• 7821";
  const mockExpiry = "06/29";

  const isVisa = formData.card_type?.toLowerCase().includes("visa");
  const isMastercard = formData.card_type?.toLowerCase().includes("master");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/signature", { state: formData })} step={5} totalSteps={6} />

      <div className="flex-1 p-6 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Card Preview</h2>
            <p className="text-gray-500 text-sm mt-1">Review your card details before printing</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Card */}
            <motion.div
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-80 h-48 rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#152244] to-[#1e3a6e] p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Card pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-white/90 text-xs font-semibold tracking-wider">ArkPay Bank</p>
                  <p className="text-blue-300 text-[10px] uppercase tracking-widest">{formData.card_type || "Debit Card"}</p>
                </div>
                <Wifi className="w-5 h-5 text-white/60 rotate-90" />
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-gradient-to-br from-yellow-300 to-yellow-500" />
                <span className="text-white text-lg font-mono tracking-widest">{mockCardNumber}</span>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-blue-300/60 text-[9px] uppercase tracking-wider">Card Holder</p>
                  <p className="text-white font-semibold text-sm tracking-wide">{formData.full_name?.toUpperCase() || "CARD HOLDER"}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-300/60 text-[9px] uppercase tracking-wider">Expires</p>
                  <p className="text-white font-mono text-sm">{mockExpiry}</p>
                </div>
              </div>

              {/* Network logo */}
              <div className="absolute bottom-4 right-5 z-10">
                {isMastercard && (
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                    <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80" />
                  </div>
                )}
                {isVisa && <span className="text-white font-bold text-sm italic">VISA</span>}
                {!isMastercard && !isVisa && <CreditCard className="w-6 h-6 text-white/40" />}
              </div>
            </motion.div>

            {/* Details summary */}
            <div className="mt-6 w-full max-w-sm bg-white rounded-xl p-4 space-y-2 border border-gray-100">
              <DetailRow label="Service" value={formData.service_type} />
              <DetailRow label="Account" value={formData.account_number} />
              <DetailRow label="Branch" value={formData.branch} />
              <DetailRow label="Phone" value={formData.phone_number} />
            </div>
          </div>

          <div className="mt-auto flex gap-3">
            <KioskButton variant="secondary" onClick={() => navigate("/signature", { state: formData })} className="flex-1">
              Back
            </KioskButton>
            <KioskButton onClick={() => navigate("/processing", { state: formData })} className="flex-1">
              Print & Encode Card
            </KioskButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-900 font-medium">{value || "—"}</span>
    </div>
  );
}