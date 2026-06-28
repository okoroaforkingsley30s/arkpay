import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, KeyRound, ShieldCheck } from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import VoiceGuide from "@/components/common/VoiceGuide";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomerDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceType = location.state?.serviceType || "Issue New Card";
  const serviceId = location.state?.serviceId || "new-card";

  const [form, setForm] = useState({
    account_number: "",
    bvn: "",
  });

  const canContinue =
    form.account_number.length === 10 && form.bvn.length === 11;

  const update = (field, value) => {
    const numeric = value.replace(/\D/g, "");
    const limit = field === "account_number" ? 10 : 11;

    setForm((prev) => ({
      ...prev,
      [field]: numeric.slice(0, limit),
    }));
  };

  const handleContinue = () => {
    navigate("/id-verification", {
      state: {
        serviceId,
        serviceType,
        account_number: form.account_number,
        bvn: form.bvn,
      },
    });
  };

  return (
    <KioskLayout showInstitution showDevices={false}>
      <VoiceGuide message="Please enter your ten digit account number and your eleven digit Bank Verification Number to continue." />

      <div className="max-w-3xl mx-auto space-y-8">
        <SectionTitle
          icon={KeyRound}
          title="Account Verification"
          subtitle="Enter your account number and BVN to begin identity verification."
          action={
            <PrimaryButton
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              onClick={() => navigate("/services")}
            >
              Back
            </PrimaryButton>
          }
        />

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="pending" label={serviceType} />
          <StatusBadge status="pending" label="Account + BVN Required" />
        </div>

        <GlassCard
          title="Enter Verification Details"
          subtitle="Your information will be verified before card personalization continues."
          icon={ShieldCheck}
        >
          <div className="space-y-6">
            <div>
              <Label className="text-blue-200 mb-2 block">
                Account Number
              </Label>
              <Input
                value={form.account_number}
                onChange={(e) => update("account_number", e.target.value)}
                placeholder="Enter 10-digit account number"
                className="h-16 text-xl rounded-2xl bg-white/10 border-blue-900/40 text-white placeholder:text-blue-300/50"
                inputMode="numeric"
              />
            </div>

            <div>
              <Label className="text-blue-200 mb-2 block">BVN</Label>
              <Input
                value={form.bvn}
                onChange={(e) => update("bvn", e.target.value)}
                placeholder="Enter 11-digit BVN"
                className="h-16 text-xl rounded-2xl bg-white/10 border-blue-900/40 text-white placeholder:text-blue-300/50"
                inputMode="numeric"
              />
            </div>

            <PrimaryButton
              fullWidth
              size="xl"
              iconRight={ArrowRight}
              disabled={!canContinue}
              onClick={handleContinue}
            >
              Continue to Fingerprint Verification
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>
    </KioskLayout>
  );
}