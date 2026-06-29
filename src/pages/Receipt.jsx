import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Home, ShieldCheck } from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import VoiceGuide from "@/components/common/VoiceGuide";
import configManager from "@/services/configManager";

export default function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const config = useMemo(() => configManager.getConfig(), []);
  const institution = config.institution;
  const kiosk = config.kiosk;

  const now = useMemo(() => new Date(), []);
  const refNo = useMemo(() => {
    return `APK${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(2, "0")}${String(
      Math.floor(Math.random() * 9000) + 1000
    )}`;
  }, [now]);

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <VoiceGuide message="Your transaction is complete. You may review your receipt on the screen. Press finish to return to the welcome screen." />

      <div className="max-w-5xl mx-auto space-y-7">
        <SectionTitle
          icon={ShieldCheck}
          title="Card Issuance Complete"
          subtitle="The card personalization transaction has been completed in demo mode."
        />

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Identity Verified" />
          <StatusBadge status="success" label="Signature Captured" />
          <StatusBadge status="success" label="Card Personalized" />
          <StatusBadge status="warning" label="SDK Placeholder Mode" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
          <GlassCard
            title="Transaction Receipt"
            subtitle="Customer copy for card issuance record."
            icon={CreditCard}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-[#071321] via-[#0A2540] to-[#123B67] p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <CreditCard className="w-7 h-7 text-blue-300" />
                  <span className="text-white font-black text-2xl">
                    {institution.name || "ArkPay"}
                  </span>
                </div>
                <p className="text-blue-300 text-sm">
                  Card Personalization Receipt
                </p>
              </div>

              <div className="p-6 space-y-4">
                <ReceiptLine label="Reference" value={refNo} mono />
                <ReceiptLine
                  label="Date"
                  value={now.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                />
                <ReceiptLine
                  label="Time"
                  value={now.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />

                <Divider />

                <ReceiptLine
                  label="Institution"
                  value={institution.name}
                />
                <ReceiptLine
                  label="Branch"
                  value={
                    formData.branch ||
                    formData.customer_profile?.branch ||
                    institution.branch
                  }
                />
                <ReceiptLine label="Kiosk ID" value={kiosk.id} />
                <ReceiptLine label="Kiosk Location" value={kiosk.location} />

                <Divider />

                <ReceiptLine
                  label="Service"
                  value={
                    formData.service_type ||
                    formData.serviceType ||
                    "Issue New Card"
                  }
                />
                <ReceiptLine
                  label="Customer"
                  value={
                    formData.full_name ||
                    formData.customer_profile?.full_name
                  }
                />
                <ReceiptLine label="Account" value={formData.account_number} />
                <ReceiptLine label="Card Product" value={formData.card_type} />
                <ReceiptLine
                  label="Card Number"
                  value="•••• •••• •••• 7821"
                  mono
                />

                <Divider />

                <ReceiptLine label="Fingerprint" value="Verified" highlight />
                <ReceiptLine label="Face Match" value="Verified" highlight />
                <ReceiptLine label="Signature" value="Captured" highlight />
                <ReceiptLine label="Status" value="COMPLETED" highlight />
              </div>

              <div className="bg-gray-50 p-5 text-center">
                <p className="text-xs text-gray-500">
                  Thank you for using {institution.name || "ArkPay Kiosk"}.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Please collect your card before leaving.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard
            title="Next Action"
            subtitle="Review the transaction summary and return to the welcome screen."
            icon={ShieldCheck}
          >
            <div className="min-h-[520px] flex flex-col items-center justify-center text-center">
              <div className="w-44 h-44 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mb-8">
                <ShieldCheck className="w-20 h-20 text-green-400" />
              </div>

              <h3 className="text-3xl font-bold text-white">
                Transaction Successful
              </h3>

              <p className="text-blue-300 mt-4 max-w-md leading-relaxed">
                In live mode, ArkPay will save the audit record for the
                institution and optionally send a receipt to the customer.
              </p>

              <div className="w-full max-w-md space-y-4 mt-10">
                <PrimaryButton
                  fullWidth
                  icon={Home}
                  onClick={() => navigate("/")}
                >
                  Finish — Return Home
                </PrimaryButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </KioskLayout>
  );
}

function Divider() {
  return <div className="border-t border-dashed border-gray-200 my-3" />;
}

function ReceiptLine({ label, value, mono = false, highlight = false }) {
  return (
    <div className="flex justify-between items-start gap-4 text-sm">
      <span className="text-gray-400">{label}</span>
      <span
        className={`font-semibold text-right ${
          highlight ? "text-green-600" : "text-gray-900"
        } ${mono ? "font-mono" : ""}`}
      >
        {value || "—"}
      </span>
    </div>
  );
}