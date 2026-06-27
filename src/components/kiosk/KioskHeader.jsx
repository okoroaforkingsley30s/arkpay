import React from "react";
import { CreditCard } from "lucide-react";

export default function KioskHeader({ showBack, onBack, step, totalSteps }) {
  return (
    <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2744] text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none">ArkPay</h1>
            <p className="text-[10px] text-blue-300 font-medium tracking-wider uppercase">Smart Card Kiosk</p>
          </div>
        </div>
      </div>
      {step && totalSteps && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-300">Step {step}/{totalSteps}</span>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}