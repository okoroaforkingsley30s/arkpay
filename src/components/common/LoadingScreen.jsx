import React from "react";
import { Loader2, CreditCard } from "lucide-react";

export default function LoadingScreen({
  title = "Loading ArkPay",
  message = "Please wait while the system prepares your session.",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071321] via-[#0A2540] to-[#102B4C] flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
          <CreditCard className="w-10 h-10 text-blue-300" />
        </div>

        <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-6" />

        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <p className="text-blue-300 mt-2 max-w-sm">{message}</p>
      </div>
    </div>
  );
}