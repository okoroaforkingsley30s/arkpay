import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Check, CreditCard, Monitor, Upload } from "lucide-react";

import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import configManager from "@/services/configManager";

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

  const currentConfig = useMemo(() => configManager.getConfig(), []);

  const [form, setForm] = useState({
    bank_name: currentConfig.institution.name,
    branch_name: currentConfig.institution.branch,
    institution_code: currentConfig.institution.code || "ARK001",
    swift_code: currentConfig.institution.swiftCode || "",
    sort_code: currentConfig.institution.sortCode || "",
    kiosk_id: currentConfig.kiosk.id,
    kiosk_location: currentConfig.kiosk.location,
    region: currentConfig.kiosk.region,
    card_template: currentConfig.institution.cardTemplate || "t2",
    logo: currentConfig.institution.logoUrl || null,
  });

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleLogoChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    update("logo", reader.result);
  };

  reader.readAsDataURL(file);
};

  const handleSave = () => {
    const existingConfig = configManager.getConfig();

    configManager.saveConfig({
      ...existingConfig,
      institution: {
        ...existingConfig.institution,
        name: form.bank_name,
        branch: form.branch_name,
        code: form.institution_code,
        swiftCode: form.swift_code,
        sortCode: form.sort_code,
        logoUrl: form.logo,
        cardTemplate: form.card_template,
      },
      kiosk: {
        ...existingConfig.kiosk,
        id: form.kiosk_id,
        location: form.kiosk_location,
        region: form.region,
      },
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedTemplate = CARD_TEMPLATES.find(
    (template) => template.id === form.card_template
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Institution Setup
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Configure institution and kiosk identity used across ArkPay.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Institution Details
              </h3>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Bank / Institution Name
                </Label>
                <Input
                  value={form.bank_name}
                  onChange={(event) => update("bank_name", event.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Branch Name
                </Label>
                <Input
                  value={form.branch_name}
                  onChange={(event) =>
                    update("branch_name", event.target.value)
                  }
                  className="h-11 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Institution Code
                </Label>
                <Input
                  value={form.institution_code}
                  onChange={(event) =>
                    update("institution_code", event.target.value)
                  }
                  className="h-11 rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    SWIFT Code
                  </Label>
                  <Input
                    value={form.swift_code}
                    onChange={(event) =>
                      update("swift_code", event.target.value)
                    }
                    placeholder="e.g. ARKBNGLA"
                    className="h-11 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Sort Code
                  </Label>
                  <Input
                    value={form.sort_code}
                    onChange={(event) =>
                      update("sort_code", event.target.value)
                    }
                    placeholder="e.g. 058"
                    className="h-11 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                Kiosk Details
              </h3>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Kiosk ID
                </Label>
                <Input
                  value={form.kiosk_id}
                  onChange={(event) => update("kiosk_id", event.target.value)}
                  className="h-11 rounded-xl font-mono"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Kiosk Location
                </Label>
                <Input
                  value={form.kiosk_location}
                  onChange={(event) =>
                    update("kiosk_location", event.target.value)
                  }
                  className="h-11 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Region
                </Label>
                <Input
                  value={form.region}
                  onChange={(event) => update("region", event.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Upload className="w-4 h-4 text-blue-600" />
                Logo Upload
              </h3>

              <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  {form.logo ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {form.logo || "Upload bank logo"}
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, SVG recommended · Max 2MB
                  </p>
                </div>

                <input
                  type="file"
                  accept=".png,.svg,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-blue-600" />
                Card Template
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {CARD_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => update("card_template", template.id)}
                    className={`relative rounded-xl overflow-hidden h-16 bg-gradient-to-br ${
                      template.color
                    } transition-all ${
                      form.card_template === template.id
                        ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {form.card_template === template.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 text-center">
                Selected:{" "}
                <span className="font-medium text-gray-700">
                  {selectedTemplate?.name}
                </span>
              </p>
            </div>

            {saved && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <Check className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-green-700 font-medium">
                  Institution and kiosk settings saved successfully.
                </p>
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