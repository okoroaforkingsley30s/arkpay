import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import VoiceGuide from "@/components/common/VoiceGuide";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <VoiceGuide message="Welcome to ArkPay. Touch the screen to start." />

      <div className="min-h-[430px] flex items-center justify-center">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <SectionTitle
              icon={CreditCard}
              title="Welcome to ArkPay"
              subtitle="Secure self-service card issuance and banking services for banks, fintechs and financial institutions."
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <StatusBadge status="ready" label="Device Ready" />
              <StatusBadge status="online" label="Network Connected" />
              <StatusBadge status="success" label="PCI Secure" />
            </div>

            <div className="mt-10">
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              >
                <PrimaryButton
                  size="xl"
                  iconRight={ChevronRight}
                  onClick={() => navigate("/services")}
                  className="min-w-[360px]"
                >
                  Touch To Start
                </PrimaryButton>
              </motion.div>
            </div>
          </div>

          <GlassCard padding="lg" className="text-center">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
              <Building2 className="w-12 h-12 text-blue-300" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Institution Setup Required
            </h3>

            <p className="text-blue-300 mt-3">
              Configure the bank name, branch, logo, card template and kiosk ID
              from the admin portal.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center gap-3 text-blue-100">
                <Timer className="w-5 h-5 text-blue-300" />
                Average completion time: Under 3 minutes
              </div>

              <div className="flex items-center gap-3 text-blue-100">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                Designed for secure card personalization workflows
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </KioskLayout>
  );
}