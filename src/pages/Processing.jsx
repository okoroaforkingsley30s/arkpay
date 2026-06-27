import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Printer, CreditCard, CheckCircle2, AlertTriangle } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";

const steps = [
  { label: "Initializing printer...", icon: Printer },
  { label: "Loading card blank...", icon: CreditCard },
  { label: "Encoding chip data...", icon: CreditCard },
  { label: "Printing card surface...", icon: Printer },
  { label: "Verifying card...", icon: CheckCircle2 },
];

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);
  const [showSdkNotice, setShowSdkNotice] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => setShowSdkNotice(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const isDone = currentStep >= steps.length - 1 && showSdkNotice;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader step={6} totalSteps={6} />

      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-sm">
          {!isDone ? (
            <>
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Processing Card</h2>
                <p className="text-gray-500 text-sm mt-1">Please wait while we prepare your card</p>
              </div>

              <div className="space-y-3">
                {steps.map((step, i) => {
                  const StepIcon = step.icon;
                  const isActive = i === currentStep;
                  const isComplete = i < currentStep;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isActive ? "bg-blue-50 border border-blue-200" : isComplete ? "bg-green-50 border border-green-200" : "bg-white border border-gray-100"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isComplete ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-gray-200"
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <StepIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isComplete ? "text-green-700" : isActive ? "text-blue-700" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <AlertTriangle className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Device SDK Not Connected</h2>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">
                The Seaory S21 printer and card encoding hardware are not connected yet. This is a demo mode.
              </p>
              <button
                onClick={() => navigate("/success", { state: formData })}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold text-base transition-colors w-full"
              >
                Continue (Demo Mode)
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}