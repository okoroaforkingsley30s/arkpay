import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import BankCardPreview from "@/components/card/BankCardPreview";

export default function FinalCardPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const handleContinue = () => {
    navigate("/processing", { state: formData });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={CreditCard}
            title="Final Card Preview"
            subtitle="Review the final card details before personalization begins."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => navigate("/card-personalization", { state: formData })}
          >
            Back
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Card Product Selected" />
          <StatusBadge status="success" label="Personalization Ready" />
          <StatusBadge status="pending" label="Awaiting Final Confirmation" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.9fr] gap-6">
          <GlassCard
            title="Card Preview"
            subtitle="This is the card layout that will be sent to the printer."
            icon={CreditCard}
          >
            <div className="min-h-[520px] flex flex-col items-center justify-center">
              <BankCardPreview
                cardType={formData.card_type || "Card Product"}
                cardNetwork={formData.card_network || "VISA"}
                nameOnCard={formData.name_on_card || "CARD HOLDER"}
                themeGradient={
                  formData.card_theme_gradient ||
                  "from-[#071321] via-[#0A2540] to-[#123B67]"
                }
              />
            </div>
          </GlassCard>

          <GlassCard
            title="Confirmation Summary"
            subtitle="Confirm the details before printing and encoding."
            icon={ShieldCheck}
          >
            <div className="space-y-4">
              <Info label="Customer Name" value={formData.full_name || formData.customer_profile?.full_name} />
              <Info label="Name on Card" value={formData.name_on_card} />
              <Info label="Account Number" value={formData.account_number} />
              <Info label="Card Product" value={formData.card_type} />
              <Info label="Card Network" value={formData.card_network} />
              <Info label="Card Theme" value={formData.card_theme_name} />
              <Info label="Fingerprint" value={formData.fingerprint_verified ? "Verified" : "—"} />
              <Info label="Face Match" value={formData.face_verified ? "Verified" : "—"} />
              <Info label="Signature" value={formData.signature_captured ? "Captured" : "—"} />

              <div className="pt-5">
                <PrimaryButton
                  fullWidth
                  size="lg"
                  iconRight={ArrowRight}
                  onClick={handleContinue}
                >
                  Confirm & Personalize Card
                </PrimaryButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </KioskLayout>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-blue-900/30 p-4">
      <p className="text-blue-300 text-xs uppercase tracking-wide">{label}</p>
      <p className="text-white font-semibold mt-1">{value || "—"}</p>
    </div>
  );
}