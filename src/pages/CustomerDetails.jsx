import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const branches = ["Main Branch", "Victoria Island", "Ikeja", "Lekki", "Marina", "Surulere", "Abuja Central"];
const cardTypes = ["Visa Debit", "Mastercard Debit", "Visa Credit", "Mastercard Credit", "Verve"];

export default function CustomerDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceType = location.state?.serviceType || "Issue New Card";

  const [form, setForm] = useState({
    full_name: "",
    account_number: "",
    phone_number: "",
    email: "",
    card_type: "",
    branch: "",
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const isValid = form.full_name && form.account_number && form.phone_number && form.card_type && form.branch;

  const handleContinue = () => {
    navigate("/id-verification", { state: { ...form, service_type: serviceType } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/services")} step={1} totalSteps={6} />

      <div className="flex-1 p-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">{serviceType}</span>
            <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
            <p className="text-gray-500 text-sm mt-1">Please enter your information below</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</Label>
              <Input
                value={form.full_name}
                onChange={e => update("full_name", e.target.value)}
                placeholder="Enter your full name"
                className="h-12 text-base rounded-xl"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Account Number</Label>
              <Input
                value={form.account_number}
                onChange={e => update("account_number", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit account number"
                className="h-12 text-base rounded-xl"
                inputMode="numeric"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</Label>
              <Input
                value={form.phone_number}
                onChange={e => update("phone_number", e.target.value)}
                placeholder="+234 XXX XXX XXXX"
                className="h-12 text-base rounded-xl"
                inputMode="tel"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</Label>
              <Input
                value={form.email}
                onChange={e => update("email", e.target.value)}
                placeholder="email@example.com"
                className="h-12 text-base rounded-xl"
                type="email"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Card Type</Label>
              <Select value={form.card_type} onValueChange={v => update("card_type", v)}>
                <SelectTrigger className="h-12 text-base rounded-xl">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  {cardTypes.map(ct => <SelectItem key={ct} value={ct}>{ct}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Branch</Label>
              <Select value={form.branch} onValueChange={v => update("branch", v)}>
                <SelectTrigger className="h-12 text-base rounded-xl">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8">
            <KioskButton onClick={handleContinue} disabled={!isValid} className="w-full">
              Continue
            </KioskButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}