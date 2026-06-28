import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Fingerprint,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cardTypes = [
  "Visa Debit",
  "Mastercard Debit",
  "Verve Debit",
  "Prepaid Card",
];

const mockCustomer = {
  full_name: "Kingsley Okoroafor",
  account_number: "0123456789",
  bvn: "22123456789",
  phone_number: "+234 801 234 5678",
  email: "customer@example.com",
  branch: "Victoria Island Branch",
  customer_id: "CUST-ARK-0001",
  account_status: "Active",
};

export default function CustomerDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceType = location.state?.serviceType || "Issue New Card";
  const serviceId = location.state?.serviceId || "new-card";

  const [lookup, setLookup] = useState({
    account_number: "",
    bvn: "",
  });

  const [customer, setCustomer] = useState(null);
  const [cardType, setCardType] = useState("");
  const [verified, setVerified] = useState(false);

  const canVerify =
    lookup.account_number.length === 10 && lookup.bvn.length === 11;

  const canContinue = verified && customer && cardType;

  const maskedBvn = useMemo(() => {
    if (!customer?.bvn) return "";
    return `${customer.bvn.slice(0, 3)}******${customer.bvn.slice(-2)}`;
  }, [customer]);

  const updateLookup = (field, value) => {
    const numeric = value.replace(/\D/g, "");
    const limit = field === "account_number" ? 10 : 11;

    setLookup((prev) => ({
      ...prev,
      [field]: numeric.slice(0, limit),
    }));
  };

  const handleVerify = () => {
    setCustomer({
      ...mockCustomer,
      account_number: lookup.account_number,
      bvn: lookup.bvn,
    });
    setVerified(true);
  };

  const handleContinue = () => {
    navigate("/id-verification", {
      state: {
        serviceId,
        service_type: serviceType,
        card_type: cardType,
        ...customer,
      },
    });
  };

  return (
    <KioskLayout showInstitution showDevices={false}>
      <div className="space-y-8">
        <SectionTitle
          icon={UserRound}
          title="Customer Lookup"
          subtitle="Enter the customer's account number and BVN to retrieve their banking profile before card personalization."
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
          <StatusBadge
            status={verified ? "success" : "pending"}
            label={verified ? "Customer Verified" : "Verification Required"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <GlassCard
            title="Lookup Details"
            subtitle="For Foundation phase, this uses mock customer lookup data."
            icon={Search}
          >
            <div className="space-y-5">
              <div>
                <Label className="text-blue-200 mb-2 block">
                  Account Number
                </Label>
                <Input
                  value={lookup.account_number}
                  onChange={(e) =>
                    updateLookup("account_number", e.target.value)
                  }
                  placeholder="Enter 10-digit account number"
                  className="h-14 text-lg rounded-2xl bg-white/10 border-blue-900/40 text-white placeholder:text-blue-300/50"
                  inputMode="numeric"
                />
              </div>

              <div>
                <Label className="text-blue-200 mb-2 block">BVN</Label>
                <Input
                  value={lookup.bvn}
                  onChange={(e) => updateLookup("bvn", e.target.value)}
                  placeholder="Enter 11-digit BVN"
                  className="h-14 text-lg rounded-2xl bg-white/10 border-blue-900/40 text-white placeholder:text-blue-300/50"
                  inputMode="numeric"
                />
              </div>

              <PrimaryButton
                fullWidth
                icon={ShieldCheck}
                onClick={handleVerify}
                disabled={!canVerify}
              >
                Verify Customer
              </PrimaryButton>
            </div>
          </GlassCard>

          <GlassCard
            title="Customer Information"
            subtitle={
              verified
                ? "Confirm customer details before proceeding."
                : "Customer profile will appear here after verification."
            }
            icon={BadgeCheck}
            loading={false}
          >
            {!verified ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-5">
                  <Fingerprint className="w-10 h-10 text-blue-300" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  Awaiting Verification
                </h3>

                <p className="text-blue-300 mt-2">
                  Enter account number and BVN, then verify customer identity.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Info label="Full Name" value={customer.full_name} />
                  <Info label="Customer ID" value={customer.customer_id} />
                  <Info label="Account Number" value={customer.account_number} />
                  <Info label="BVN" value={maskedBvn} />
                  <Info label="Phone Number" value={customer.phone_number} />
                  <Info label="Email" value={customer.email} />
                  <Info label="Branch" value={customer.branch} />
                  <Info label="Account Status" value={customer.account_status} />
                </div>

                <div>
                  <Label className="text-blue-200 mb-2 block">
                    Card Product
                  </Label>
                  <Select value={cardType} onValueChange={setCardType}>
                    <SelectTrigger className="h-14 text-lg rounded-2xl bg-white/10 border-blue-900/40 text-white">
                      <SelectValue placeholder="Select card product" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <GlassCard padding="sm" className="bg-green-500/10 border-green-500/30">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-green-300 mt-0.5" />
                    <div>
                      <p className="text-green-300 font-bold">
                        Ready for card personalization
                      </p>
                      <p className="text-green-200/80 text-sm mt-1">
                        Customer record is verified using account number and BVN.
                        Biometric capture will be handled on the next screen.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </GlassCard>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            iconRight={ArrowRight}
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Confirm & Continue
          </PrimaryButton>
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