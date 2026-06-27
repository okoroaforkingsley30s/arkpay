import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Fingerprint, CheckCircle2, AlertCircle } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";

export default function FingerprintCapture() {
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
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/id-verification", { state: formData })} step={3} totalSteps={6} />

      <div className="flex-1 p-6 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fingerprint Capture</h2>
            <p className="text-gray-500 text-sm mt-1">Place your finger on the scanner</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              animate={capturing ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${
                captured ? "bg-green-100 ring-4 ring-green-400" : capturing ? "bg-blue-100 ring-4 ring-blue-400" : "bg-gray-100 ring-2 ring-gray-200"
              }`}
            >
              {captured ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </motion.div>
              ) : (
                <Fingerprint className={`w-16 h-16 ${capturing ? "text-blue-500" : "text-gray-400"}`} />
              )}
            </motion.div>

            <p className={`mt-4 font-semibold text-sm ${captured ? "text-green-600" : capturing ? "text-blue-600" : "text-gray-500"}`}>
              {captured ? "Fingerprint Captured" : capturing ? "Scanning fingerprint..." : "Waiting for finger placement"}
            </p>

            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs">Fingerprint scanner: Placeholder mode</span>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            {!captured && (
              <KioskButton onClick={handleCapture} disabled={capturing} className="w-full" icon={<Fingerprint className="w-5 h-5" />}>
                {capturing ? "Scanning..." : "Capture Fingerprint"}
              </KioskButton>
            )}
            {captured && (
              <KioskButton onClick={() => navigate("/signature", { state: { ...formData, fingerprint_captured: true } })} className="w-full">
                Continue
              </KioskButton>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}