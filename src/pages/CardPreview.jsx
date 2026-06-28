import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
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

const cardProducts = [
  {
    id: "visa-debit",
    name: "Visa Debit",
    description: "Standard debit card for ATM, POS and online transactions.",
    network: "VISA",
    type: "Debit",
  },
  {
    id: "mastercard-debit",
    name: "Mastercard Debit",
    description: "Debit card for local and international transactions.",
    network: "MASTERCARD",
    type: "Debit",
  },
  {
    id: "verve-debit",
    name: "Verve Debit",
    description: "Local debit card for Nigerian banking transactions.",
    network: "VERVE",
    type: "Debit",
  },
  {
    id: "prepaid-card",
    name: "Prepaid Card",
    description: "Prepaid card option for controlled spending.",
    network: "PREPAID",
    type: "Prepaid",
  },
];

export default function CardPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleContinue = () => {
    if (!selectedProduct) return;

    navigate("/card-personalization", {
      state: {
        ...formData,
        card_product_id: selectedProduct.id,
        card_type: selectedProduct.name,
        card_network: selectedProduct.network,
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
            subtitle="Choose the card product to personalize for this customer."
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
            status={selectedProduct ? "success" : "pending"}
            label={selectedProduct ? selectedProduct.name : "Card Product Required"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
          <GlassCard
            title="Available Card Products"
            subtitle="Products shown here will later come from the bank card product setup."
            icon={Landmark}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cardProducts.map((product) => {
                const selected = selectedProduct?.id === product.id;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className={`rounded-3xl border p-5 text-left transition-all ${
                      selected
                        ? "bg-blue-600/20 border-blue-300 shadow-lg shadow-blue-500/20"
                        : "bg-white/5 border-blue-900/30 hover:bg-white/10 hover:border-blue-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                        <CreditCard className="w-7 h-7 text-blue-300" />
                      </div>

                      <StatusBadge
                        status={selected ? "success" : "pending"}
                        label={selected ? "Selected" : product.type}
                        size="sm"
                      />
                    </div>

                    <h3 className="text-white text-xl font-bold mt-5">
                      {product.name}
                    </h3>

                    <p className="text-blue-300 text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    <p className="text-blue-200 text-xs font-bold mt-5 tracking-widest">
                      {product.network}
                    </p>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard
            title="Card Product Preview"
            subtitle="Preview updates after selecting a card product."
            icon={ShieldCheck}
          >
            <div className="min-h-[460px] flex flex-col items-center justify-center">
              <BankCardPreview
                cardType={selectedProduct?.name || "Select Card Product"}
                cardNetwork={selectedProduct?.network || "VISA"}
                nameOnCard={
                  formData.full_name?.toUpperCase() ||
                  formData.customer_profile?.full_name?.toUpperCase() ||
                  "CARD HOLDER"
                }
              />

              <p className="text-blue-300 text-center mt-8 max-w-sm">
                {selectedProduct
                  ? `${selectedProduct.name} is ready for personalization.`
                  : "Select a card product to continue."}
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