import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  RefreshCw,
  RotateCcw,
  Lock,
  Search,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";

const services = [
  {
    id: "new-card",
    label: "Issue New Card",
    icon: CreditCard,
    desc: "Create and personalize a new debit or prepaid card.",
    route: "/customer-details",
    enabled: true,
    badge: "MVP",
  },
  {
    id: "replace-card",
    label: "Replace Card",
    icon: RefreshCw,
    desc: "Replace a lost, stolen, damaged or expired card.",
    route: "/customer-details",
    enabled: true,
    badge: "MVP",
  },
  {
    id: "reissue-card",
    label: "Re-Issue Card",
    icon: RotateCcw,
    desc: "Issue another copy of an existing card record.",
    route: "/customer-details",
    enabled: false,
    badge: "Later",
  },
  {
    id: "pin-change",
    label: "PIN Change",
    icon: Lock,
    desc: "Change or reset a card PIN securely.",
    route: "/customer-details",
    enabled: false,
    badge: "Later",
  },
  {
    id: "balance",
    label: "Balance Inquiry",
    icon: Search,
    desc: "Check account balance after customer verification.",
    route: "/customer-details",
    enabled: false,
    badge: "Later",
  },
];

export default function ServiceSelection() {
  const navigate = useNavigate();

  const handleSelect = (service) => {
    if (!service.enabled) return;

    navigate(service.route, {
      state: {
        serviceId: service.id,
        serviceType: service.label,
      },
    });
  };

  return (
    <KioskLayout showInstitution showDevices>
      <div className="space-y-8">
        <SectionTitle
          icon={CreditCard}
          title="Select a Service"
          subtitle="Choose the card service you want to perform on this kiosk."
          action={
            <PrimaryButton
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              onClick={() => navigate("/")}
            >
              Back
            </PrimaryButton>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
              >
                <GlassCard
                  clickable={service.enabled}
                  onClick={() => handleSelect(service)}
                  className={
                    service.enabled
                      ? "min-h-[210px]"
                      : "min-h-[210px] opacity-55"
                  }
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-blue-300" />
                      </div>

                      <StatusBadge
                        status={service.enabled ? "ready" : "pending"}
                        label={service.badge}
                        size="sm"
                      />
                    </div>

                    <div className="mt-6 flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {service.label}
                      </h3>

                      <p className="text-blue-300 text-sm mt-3 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-sm">
                      <span
                        className={
                          service.enabled ? "text-green-400" : "text-blue-500"
                        }
                      >
                        {service.enabled ? "Available" : "Coming later"}
                      </span>

                      {service.enabled && (
                        <ArrowRight className="w-5 h-5 text-blue-300" />
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <GlassCard padding="md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">
                Foundation Phase Notice
              </h3>
              <p className="text-blue-300 text-sm mt-1">
                ArkPay is currently focused on completing New Card and Replace
                Card workflows before expanding to PIN services and account
                services.
              </p>
            </div>

            <StatusBadge status="pending" label="SDK placeholders active" />
          </div>
        </GlassCard>
      </div>
    </KioskLayout>
  );
}