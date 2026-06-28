import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, Printer } from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";

export default function CollectCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [cardRemoved, setCardRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardRemoved(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate("/receipt", {
      state: {
        ...formData,
        card_collected: true,
        card_removed_from_kiosk: cardRemoved,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="max-w-4xl mx-auto space-y-7">
        <SectionTitle
          icon={CreditCard}
          title="Collect Card"
          subtitle="The card is ready. Please remove the card from the kiosk collection area."
        />

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Card Personalized" />
          <StatusBadge status="success" label="Card Ejected" />
          <StatusBadge
            status={cardRemoved ? "success" : "pending"}
            label={cardRemoved ? "Card Removed" : "Waiting for Card Removal"}
          />
        </div>

        <GlassCard
          title="Card Collection"
          subtitle="In live mode, ArkPay will detect when the card has been removed."
          icon={Printer}
        >
          <div className="min-h-[520px] flex flex-col items-center justify-center text-center">
            <div
              className={`w-52 h-52 rounded-full border flex items-center justify-center ${
                cardRemoved
                  ? "bg-green-500/10 border-green-500/40"
                  : "bg-blue-500/10 border-blue-500/40 animate-pulse"
              }`}
            >
              {cardRemoved ? (
                <CheckCircle2 className="w-24 h-24 text-green-300" />
              ) : (
                <CreditCard className="w-24 h-24 text-blue-300" />
              )}
            </div>

            <h3 className="text-3xl font-bold text-white mt-10">
              {cardRemoved ? "Card Removed" : "Your Card Is Ready"}
            </h3>

            <p className="text-blue-300 mt-4 max-w-lg leading-relaxed">
              {cardRemoved
                ? "Card collection has been confirmed. You may now continue to the receipt."
                : "Please remove your card from the collection area before proceeding."}
            </p>

            <PrimaryButton
              className="mt-10"
              size="lg"
              disabled={!cardRemoved}
              onClick={handleContinue}
            >
              Continue to Receipt
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>
    </KioskLayout>
  );
}