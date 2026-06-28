import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  CreditCard,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import BankCardPreview from "@/components/card/BankCardPreview";

const fallbackCardProducts = [
  {
    id: "visa-debit",
    name: "Visa Debit",
    description: "Standard debit card for ATM, POS and online transactions.",
    network: "VISA",
    type: "Debit",
    eligible: true,
  },
  {
    id: "mastercard-debit",
    name: "Mastercard Debit",
    description: "Debit card for local and international transactions.",
    network: "MASTERCARD",
    type: "Debit",
    eligible: true,
  },
  {
    id: "verve-debit",
    name: "Verve Debit",
    description: "Local debit card for Nigerian banking transactions.",
    network: "VERVE",
    type: "Debit",
    eligible: true,
  },
  {
    id: "visa-gold",
    name: "Visa Gold",
    description: "Premium card product controlled by bank eligibility rules.",
    network: "VISA",
    type: "Premium",
    eligible: false,
    reason: "Not eligible for this account profile",
  },
  {
    id: "platinum-card",
    name: "Platinum Card",
    description: "Platinum card product controlled by bank eligibility rules.",
    network: "MASTERCARD",
    type: "Premium",
    eligible: false,
    reason: "Requires bank approval",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Credit card product controlled by bank credit assessment.",
    network: "VISA",
    type: "Credit",
    eligible: false,
    reason: "Credit assessment required",
  },
];

export default function CardPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const products = useMemo(() => {
    const bankProducts =
      formData.eligible_cards ||
      formData.eligibleCards ||
      formData.customer_profile?.eligible_cards;

    if (Array.isArray(bankProducts) && bankProducts.length > 0) {
      return bankProducts.map((product) => ({
        ...product,
        eligible: product.eligible !== false,
      }));
    }

    return fallbackCardProducts;
  }, [formData]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const eligibleCount = products.filter((product) => product.eligible !== false).length;

  const handleSelect = (product) => {
    if (product.eligible === false) return;
    setSelectedProduct(product);
  };

  const handleContinue = () => {
    if (!selectedProduct) return;

    navigate("/card-personalization", {
      state: {
        ...formData,
        card_product_id: selectedProduct.id,
        card_type: selectedProduct.name,
        card_network: selectedProduct.network,
        card_product: selectedProduct,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={CreditCard}
            title="Select Card Product"
            subtitle="Only bank-approved card products can be selected for this customer."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => navigate("/signature", { state: formData })}
          >
            Back
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Identity Verified" />
          <StatusBadge status="success" label="Signature Captured" />
          <StatusBadge
            status={eligibleCount > 0 ? "success" : "warning"}
            label={`${eligibleCount} Eligible Card${eligibleCount === 1 ? "" : "s"}`}
          />
          <StatusBadge
            status={selectedProduct ? "success" : "pending"}
            label={selectedProduct ? selectedProduct.name : "Card Product Required"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
          <GlassCard
            title="Available Card Products"
            subtitle="Eligibility will come from the bank after customer verification."
            icon={Landmark}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => {
                const selected = selectedProduct?.id === product.id;
                const eligible = product.eligible !== false;

                return (
                  <button
                    key={product.id}
                    type="button"
                    disabled={!eligible}
                    onClick={() => handleSelect(product)}
                    className={`rounded-3xl border p-5 text-left transition-all ${
                      selected
                        ? "bg-blue-600/20 border-blue-300 shadow-lg shadow-blue-500/20"
                        : eligible
                        ? "bg-white/5 border-blue-900/30 hover:bg-white/10 hover:border-blue-500/50"
                        : "bg-white/[0.03] border-red-500/20 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${
                          eligible
                            ? "bg-blue-600/20 border-blue-500/20"
                            : "bg-red-500/10 border-red-500/20"
                        }`}
                      >
                        {eligible ? (
                          <CreditCard className="w-7 h-7 text-blue-300" />
                        ) : (
                          <Ban className="w-7 h-7 text-red-300" />
                        )}
                      </div>

                      <StatusBadge
                        status={selected ? "success" : eligible ? "pending" : "warning"}
                        label={selected ? "Selected" : eligible ? product.type : "Not Eligible"}
                        size="sm"
                      />
                    </div>

                    <h3 className="text-white text-xl font-bold mt-5">
                      {product.name}
                    </h3>

                    <p className="text-blue-300 text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <p className="text-blue-200 text-xs font-bold tracking-widest">
                        {product.network}
                      </p>

                      {!eligible && (
                        <p className="text-red-300 text-xs font-semibold text-right">
                          {product.reason || "Bank approval required"}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard
            title="Card Product Preview"
            subtitle="Preview updates after selecting an eligible card product."
            icon={ShieldCheck}
          >
            <div className="min-h-[460px] flex flex-col items-center justify-center">
              <BankCardPreview
                cardNetwork={selectedProduct?.network || "VISA"}
                nameOnCard={
                  formData.full_name?.toUpperCase() ||
                  formData.customer_profile?.full_name?.toUpperCase() ||
                  "CARD HOLDER"
                }
              />

              <p className="text-blue-300 text-center mt-8 max-w-sm">
                {selectedProduct
                  ? `${selectedProduct.name} is eligible and ready for personalization.`
                  : "Select an eligible card product to continue."}
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            iconRight={ArrowRight}
            disabled={!selectedProduct}
            onClick={handleContinue}
          >
            Continue to Card Personalization
          </PrimaryButton>
        </div>
      </div>
    </KioskLayout>
  );
}