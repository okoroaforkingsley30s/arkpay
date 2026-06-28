import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Palette,
  UserRound,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import BankCardPreview from "@/components/card/BankCardPreview";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const themes = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    gradient: "from-[#071321] via-[#0A2540] to-[#123B67]",
  },
  {
    id: "midnight-black",
    name: "Midnight Black",
    gradient: "from-[#020617] via-[#111827] to-[#1f2937]",
  },
  {
    id: "premium-gold",
    name: "Premium Gold",
    gradient: "from-[#3b2605] via-[#8a5a12] to-[#d6a13d]",
  },
  {
    id: "emerald",
    name: "Emerald",
    gradient: "from-[#052e2b] via-[#065f46] to-[#10b981]",
  },
];

export default function CardPersonalization() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const defaultName = useMemo(() => {
    return (
      formData.full_name ||
      formData.customer_profile?.full_name ||
      "CARD HOLDER"
    ).toUpperCase();
  }, [formData]);

  const [nameOnCard, setNameOnCard] = useState(defaultName.slice(0, 26));
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const canContinue = nameOnCard.trim().length >= 3 && selectedTheme;

  const handleContinue = () => {
    navigate("/final-card-preview", {
  state: {
    ...formData,
    name_on_card: nameOnCard.trim().toUpperCase(),
    card_theme_id: selectedTheme.id,
    card_theme_name: selectedTheme.name,
    card_theme_gradient: selectedTheme.gradient,
  },
});
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={Palette}
            title="Card Personalization"
            subtitle="Confirm the name and select the approved card theme before final preview."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => navigate("/card-preview", { state: formData })}
          >
            Back
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Card Product Selected" />
          <StatusBadge
            status={canContinue ? "success" : "pending"}
            label={
              canContinue
                ? "Personalization Ready"
                : "Personalization Required"
            }
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <GlassCard
            title="Personalization Options"
            subtitle="These options will later be controlled by bank product rules."
            icon={UserRound}
          >
            <div className="space-y-6">
              <div>
                <Label className="text-blue-200 mb-2 block">
                  Name on Card
                </Label>
                <Input
                  value={nameOnCard}
                  onChange={(event) =>
                    setNameOnCard(event.target.value.toUpperCase().slice(0, 26))
                  }
                  placeholder="Enter name on card"
                  className="h-16 text-xl rounded-2xl bg-white/10 border-blue-900/40 text-white placeholder:text-blue-300/50 uppercase"
                />
                <p className="text-blue-400 text-xs mt-2">
                  Maximum 26 characters. Final rule will depend on the bank and
                  card product.
                </p>
              </div>

              <div>
                <Label className="text-blue-200 mb-3 block">Card Theme</Label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map((theme) => {
                    const selected = selectedTheme.id === theme.id;

                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme)}
                        className={`rounded-3xl border p-4 text-left transition-all ${
                          selected
                            ? "bg-blue-600/20 border-blue-300 shadow-lg shadow-blue-500/20"
                            : "bg-white/5 border-blue-900/30 hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`h-20 rounded-2xl bg-gradient-to-br ${theme.gradient} border border-white/10 mb-4`}
                        />
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-white font-bold">{theme.name}</p>
                          <StatusBadge
                            status={selected ? "success" : "pending"}
                            label={selected ? "Selected" : "Theme"}
                            size="sm"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard
            title="Live Card Preview"
            subtitle="Preview updates as personalization options change."
            icon={CreditCard}
          >
            <div className="min-h-[520px] flex flex-col items-center justify-center">
              <BankCardPreview
                cardType={formData.card_type || "Card Product"}
                cardNetwork={formData.card_network || "VISA"}
                nameOnCard={nameOnCard}
                themeGradient={selectedTheme.gradient}
              />

              <p className="text-blue-300 text-center mt-8 max-w-md">
                Customer-selected personalization is currently in Foundation
                mode. Live bank rules will control what can be edited.
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            iconRight={ArrowRight}
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continue to Final Preview
          </PrimaryButton>
        </div>
      </div>
    </KioskLayout>
  );
}