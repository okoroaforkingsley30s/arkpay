import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import KioskButton from "@/components/kiosk/KioskButton";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Mock admin credentials
    if (username === "admin" && password === "admin123") {
      navigate("/admin");
    } else {
      setError("Invalid credentials. Try admin / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1d35] to-[#162544] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0a1628] to-[#1a2744] flex items-center justify-center mb-3">
              <CreditCard className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 text-sm">ArkPay Kiosk Management</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(""); }}
                  placeholder="Enter username"
                  className="h-12 pl-10 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  className="h-12 pl-10 rounded-xl"
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center">
                {error}
              </motion.p>
            )}

            <KioskButton onClick={handleLogin} className="w-full mt-2">
              Sign In
            </KioskButton>
          </div>
        </div>

        <button onClick={() => navigate("/")} className="block mx-auto mt-4 text-blue-300/60 hover:text-blue-300 text-sm transition-colors">
          ← Back to Kiosk
        </button>
      </motion.div>
    </div>
  );
}