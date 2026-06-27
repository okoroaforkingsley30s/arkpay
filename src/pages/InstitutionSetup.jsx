import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Upload, Check, CreditCard } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CARD_TEMPLATES = [
  { id: "t1", name: "Classic Blue", color: "from-blue-600 to-blue-800" },
  { id: "t2", name: "Dark Navy", color: "from-[#0a1628] to-[#1a2744]" },
  { id: "t3", name: "Emerald", color: "from-emerald-600 to-teal-700" },
  { id: "t4", name: "Midnight Black", color: "from-gray-800 to-gray-950" },
  { id: "t5", name: "Royal Purple", color: "from-violet-600 to-purple-800" },
  { id: "t6", name: "Corporate Gold", color: "from-amber-500 to-yellow-700" },
];

export default function InstitutionSetup() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    bank_name: "ArkPay Bank",
    branch_name: "Main Branch",
    institution_code: "ARK001",
    swift_code: "",
    sort_code: "",
    card_template: "t2",
    logo: null,
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) update("logo", file.name);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedTemplate = CARD_TEMPLATES.find(t => t.id === form.card_template);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Institution Setup</h2>
            <p className="text-gray-500 text-sm mt-1">Configure bank/institution details for card personalization</p>
          </div>

          <div className="space-y-4">
            {/* Institution Info */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" /> Institution Details
              </h3>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Bank / Institution Name</Label>
                <Input value={form.bank_name} onChange={e => update("bank_name", e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Branch Name</Label>
                <Input value={form.branch_name} onChange={e => update("branch_name", e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Institution Code</Label>
                <Input value={form.institution_code} onChange={e => update("institution_code", e.target.value)} className="h-11 rounded-xl font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">SWIFT Code</Label>
                  <Input value={form.swift_code} onChange={e => update("swift_code", e.target.value)} placeholder="e.g. ARKBNGLA" className="h-11 rounded-xl font-mono" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Sort Code</Label>
                  <Input value={form.sort_code} onChange={e => update("sort_code", e.target.value)} placeholder="e.g. 058" className="h-11 rounded-xl font-mono" />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Upload className="w-4 h-4 text-blue-600" /> Logo Upload
              </h3>
              <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  {form.logo ? <Check className="w-6 h-6 text-green-600" /> : <Upload className="w-6 h-6 text-gray-400" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{form.logo || "Upload bank logo"}</p>
                  <p className="text-xs text-gray-400">PNG, SVG recommended · Max 2MB</p>
                </div>
                <input type="file" accept=".png,.svg,.jpg,.jpeg" className="hidden" onChange={handleLogoChange} />
              </label>
            </div>

            {/* Card Template */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-blue-600" /> Card Template
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {CARD_TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => update("card_template", t.id)}
                    className={`relative rounded-xl overflow-hidden h-16 bg-gradient-to-br ${t.color} transition-all ${
                      form.card_template === t.id ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {form.card_template === t.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center">Selected: <span className="font-medium text-gray-700">{selectedTemplate?.name}</span></p>
            </div>

            {saved && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-4">
                <Check className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-green-700 font-medium">Institution settings saved successfully.</p>
              </motion.div>
            )}

            <KioskButton onClick={handleSave} className="w-full">
              Save Institution Settings
            </KioskButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}