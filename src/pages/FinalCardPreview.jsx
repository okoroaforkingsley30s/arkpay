import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckSquare,
  CreditCard,
  FileSignature,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import BankCardPreview from "@/components/card/BankCardPreview";
import VoiceGuide from "@/components/common/VoiceGuide";
import configManager from "@/services/configManager";

export default function FinalCardPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const config = useMemo(() => configManager.getConfig(), []);

  const [confirmed, setConfirmed] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const customerName =
    formData.full_name || formData.customer_profile?.full_name || "—";

  const customerPhoto =
    formData.customer_photo ||
    formData.customer_profile?.passport_photo ||
    formData.customer_profile?.photo_url;

  const signatureImage =
    formData.signature_image ||
    formData.signature_data_url ||
    formData.customer_profile?.signature_url;

  const canContinue = confirmed && authorized;

  const handleContinue = () => {
    if (!canContinue) return;

    navigate("/processing", {
      state: {
        ...formData,
        final_confirmation_completed: true,
        customer_confirmed_details: confirmed,
        customer_authorized_personalization: authorized,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
    <VoiceGuide message="This is your final card preview. Please review your customer details and card information carefully. Confirm both check boxes before personalizing the card." />
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={CreditCard}
            title="Final Card Preview"
            subtitle="Review customer details, card information and authorization before personalization begins."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() =>
              navigate("/card-personalization", { state: formData })
            }
          >
            Back
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Card Product Selected" />
          <StatusBadge status="success" label="Personalization Ready" />
          <StatusBadge
            status={canContinue ? "success" : "pending"}
            label={canContinue ? "Confirmed" : "Awaiting Final Confirmation"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.9fr] gap-6">
          <GlassCard
            title="Card Preview"
            subtitle="Final card preview before printing and encoding."
            icon={CreditCard}
          >
            <div className="min-h-[520px] flex flex-col items-center justify-center">
              <BankCardPreview
  bankName={config.institution.name}
  bankLogo={config.institution.logoUrl}
  cardNetwork={formData.card_network || "VISA"}
  nameOnCard={formData.name_on_card || "CARD HOLDER"}
  themeGradient={
    formData.card_theme_gradient ||
    "from-[#071321] via-[#0A2540] to-[#123B67]"
  }
/>

              <p className="text-blue-300 text-center mt-8 max-w-md">
                Final printed card details will be supplied by the bank
                personalization system.
              </p>
            </div>
          </GlassCard>

          <GlassCard
            title="Customer Confirmation"
            subtitle="Confirm bank-returned customer information before personalization."
            icon={ShieldCheck}
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PreviewBox
                  icon={Camera}
                  title="Customer Photograph"
                  image={customerPhoto}
                  fallback="Photo will appear here when returned by the bank."
                />

                <PreviewBox
                  icon={FileSignature}
                  title="Signature on File"
                  image={signatureImage}
                  fallback={
                    formData.signature_captured
                      ? "Signature captured for this session."
                      : "Signature will appear here when returned by the bank."
                  }
                />
              </div>

              <div className="space-y-4">
                <Info label="Customer Name" value={customerName} />
                <Info label="Name on Card" value={formData.name_on_card} />
                <Info label="Account Number" value={formData.account_number} />
                <Info label="Card Product" value={formData.card_type} />
                <Info label="Card Network" value={formData.card_network} />
                <Info label="Card Theme" value={formData.card_theme_name} />
                <Info
                  label="Fingerprint"
                  value={formData.fingerprint_verified ? "Verified" : "—"}
                />
                <Info
                  label="Face Match"
                  value={formData.face_verified ? "Verified" : "—"}
                />
                <Info
                  label="Signature"
                  value={formData.signature_captured ? "Captured" : "—"}
                />
              </div>

              <div className="space-y-3 pt-3">
                <ConfirmCheck
                  checked={confirmed}
                  onChange={() => setConfirmed((value) => !value)}
                  label="I confirm that all customer and card information is correct."
                />

                <ConfirmCheck
                  checked={authorized}
                  onChange={() => setAuthorized((value) => !value)}
                  label="I authorize the bank to personalize this card."
                />
              </div>

              <div className="pt-4">
                <PrimaryButton
                  fullWidth
                  size="lg"
                  iconRight={ArrowRight}
                  disabled={!canContinue}
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

function PreviewBox({ icon: Icon, title, image, fallback }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-blue-900/30 p-4 min-h-[180px]">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-blue-300" />
        <p className="text-white font-bold">{title}</p>
      </div>

      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-32 rounded-2xl object-cover border border-white/10"
        />
      ) : (
        <div className="h-32 rounded-2xl bg-blue-950/40 border border-blue-900/30 flex flex-col items-center justify-center text-center px-4">
          <UserRound className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-blue-300 text-xs leading-relaxed">{fallback}</p>
        </div>
      )}
    </div>
  );
}

function ConfirmCheck({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full rounded-2xl border p-4 text-left flex items-start gap-3 transition-all ${
        checked
          ? "bg-green-500/10 border-green-500/40"
          : "bg-white/5 border-blue-900/30 hover:bg-white/10"
      }`}
    >
      <CheckSquare
        className={`w-6 h-6 shrink-0 mt-0.5 ${
          checked ? "text-green-300" : "text-blue-400"
        }`}
      />
      <span className="text-blue-100 text-sm font-semibold leading-relaxed">
        {label}
      </span>
    </button>
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