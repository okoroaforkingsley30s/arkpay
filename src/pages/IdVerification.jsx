import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, AlertCircle } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";

export default function IdVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const [captured, setCaptured] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const handleCapture = () => {
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      setCaptured(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/customer-details", { state: { serviceType: formData.service_type } })} step={2} totalSteps={6} />

      <div className="flex-1 p-6 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">ID Verification</h2>
            <p className="text-gray-500 text-sm mt-1">Place your ID card on the scanner</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className={`w-72 h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
              captured ? "border-green-400 bg-green-50" : capturing ? "border-blue-400 bg-blue-50 animate-pulse" : "border-gray-300 bg-white"
            }`}>
              {captured ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <span className="text-green-700 font-semibold text-sm">ID Captured Successfully</span>
                </motion.div>
              ) : capturing ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-blue-600 font-medium text-sm">Scanning...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <Camera className="w-12 h-12" />
                  <span className="text-sm font-medium">ID Scanner Ready</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs">Camera device: Placeholder mode</span>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            {!captured && (
              <KioskButton onClick={handleCapture} disabled={capturing} className="w-full" icon={<Camera className="w-5 h-5" />}>
                {capturing ? "Scanning..." : "Capture ID"}
              </KioskButton>
            )}
            {captured && (
              <KioskButton onClick={() => navigate("/fingerprint", { state: { ...formData, id_verified: true } })} className="w-full">
                Continue
              </KioskButton>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}