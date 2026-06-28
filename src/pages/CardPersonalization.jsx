import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
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
import VoiceGuide from "@/components/common/VoiceGuide";

const fallbackThemes = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    gradient: "from-[#071321] via-[#0A2540] to-[#123B67]",
    eligible: true,
  },
  {
    id: "midnight-black",
    name: "Corporate Black",
    gradient: "from-[#020617] via-[#111827] to-[#1f2937]",
    eligible: true,
  },
  {
    id: "premium-gold",
    name: "Premium Gold",
    gradient: "from-[#3b2605] via-[#8a5a12] to-[#d6a13d]",
    eligible: true,
  },
  {
    id: "salary-card",
    name: "Salary Card",
    gradient: "from-[#052e2b] via-[#065f46] to-[#10b981]",
    eligible: true,
  },
];

function normalizeName(value = "") {
  return value
    .toUpperCase()
    .replace(/[^A-Z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function createNameOptions(fullName = "") {
  const cleanName = normalizeName(fullName || "CARD HOLDER");

  if (cleanName.length <= 26) {
    return [cleanName];
  }

  const parts = cleanName.split(" ").filter(Boolean);
  const first = parts[0] || "";
  const middle = parts.slice(1, -1);
  const last = parts[parts.length - 1] || "";

  const options = new Set();

  if (parts.length >= 3) {
    const initials = middle.map((name) => name[0]).join(" ");
    options.add(`${first} ${initials} ${last}`.slice(0, 26).trim());
  }

  if (parts.length >= 2) {
    options.add(`${first} ${last[0]}`.slice(0, 26).trim());
    options.add(`${first[0]} ${last}`.slice(0, 26).trim());
    options.add(`${first} ${last}`.slice(0, 26).trim());
  }

  options.add(cleanName.slice(0, 26).trim());

  return Array.from(options).filter((option) => option.length >= 3);
}

export default function CardPersonalization() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const officialName = useMemo(() => {
    return normalizeName(
      formData.full_name ||
        formData.customer_profile?.full_name ||
        "CARD HOLDER"
    );
  }, [formData]);

  const nameOptions = useMemo(() => {
    const bankNameOptions =
      formData.name_options ||
      formData.card_name_options ||
      formData.customer_profile?.card_name_options;

    if (Array.isArray(bankNameOptions) && bankNameOptions.length > 0) {
      return bankNameOptions.map(normalizeName).filter((name) => name.length >= 3);
    }

    return createNameOptions(officialName);
  }, [formData, officialName]);

  const themes = useMemo(() => {
    const bankThemes =
      formData.card_themes ||
      formData.cardThemes ||
      formData.card_product?.themes;

    if (Array.isArray(bankThemes) && bankThemes.length > 0) {
      return bankThemes.map((theme) => ({
        ...theme,
        eligible: theme.eligible !== false,
      }));
    }

    return fallbackThemes;
  }, [formData]);

  const [nameOnCard, setNameOnCard] = useState(nameOptions[0] || "CARD HOLDER");
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const canContinue = nameOnCard && selectedTheme;

  const handleContinue = () => {
    if (!canContinue) return;

    navigate("/final-card-preview", {
      state: {
        ...formData,
        official_customer_name: officialName,
        name_on_card: nameOnCard,
        card_name_rule: "bank_controlled",
        card_theme_id: selectedTheme.id,
        card_theme_name: selectedTheme.name,
        card_theme_gradient: selectedTheme.gradient,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
    <VoiceGuide message="Please select the approved name that will appear on your card. Next, choose the approved card artwork. When you are satisfied, continue to the final preview." />
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={Palette}
            title="Card Personalization"
            subtitle="Select bank-approved name format and card artwork before final preview."
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
          <StatusBadge status="success" label="Bank-Controlled Name" />
          <StatusBadge
            status={canContinue ? "success" : "pending"}
            label={canContinue ? "Personalization Ready" : "Personalization Required"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <GlassCard
            title="Personalization Options"
            subtitle="Only bank-approved card name formats and themes can be selected."
            icon={UserRound}
          >
            <div className="space-y-6">
              <div>
                <p className="text-blue-300 text-xs uppercase tracking-wide">
                  Official Customer Name
                </p>
                <p className="text-white text-lg font-bold mt-1">
                  {officialName}
                </p>
              </div>

              <div>
                <p className="text-blue-200 mb-3 block font-semibold">
                  Approved Name on Card
                </p>

                <div className="space-y-3">
                  {nameOptions.map((option) => {
                    const selected = nameOnCard === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setNameOnCard(option)}
                        className={`w-full rounded-2xl border p-4 text-left flex items-center justify-between gap-4 transition-all ${
                          selected
                            ? "bg-blue-600/20 border-blue-300 shadow-lg shadow-blue-500/20"
                            : "bg-white/5 border-blue-900/30 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-white font-bold tracking-wide">
                          {option}
                        </span>

                        {selected && (
                          <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="text-blue-400 text-xs mt-3">
                  Maximum 26 characters. Customer cannot freely type a card name;
                  final options are controlled by the bank.
                </p>
              </div>

              <div>
                <p className="text-blue-200 mb-3 block font-semibold">
                  Card Artwork
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map((theme) => {
                    const selected = selectedTheme?.id === theme.id;

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
                            label={selected ? "Selected" : "Artwork"}
                            size="sm"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-blue-400 text-xs mt-3">
                  In live mode, card artwork will come from approved bank PNG/SVG
                  templates instead of colour gradients.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard
            title="Live Card Preview"
            subtitle="Preview updates as bank-approved personalization options change."
            icon={CreditCard}
          >
            <div className="min-h-[520px] flex flex-col items-center justify-center">
              <BankCardPreview
                cardNetwork={formData.card_network || "VISA"}
                nameOnCard={nameOnCard}
                themeGradient={
                  selectedTheme?.gradient ||
                  "from-[#071321] via-[#0A2540] to-[#123B67]"
                }
              />

              <p className="text-blue-300 text-center mt-8 max-w-md">
                The printed name and card artwork are controlled by bank rules.
                ArkPay only displays approved options.
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