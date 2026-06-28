import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Cpu,
  Printer,
  ShieldCheck,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";

const steps = [
  {
    label: "Initializing Seaory S21 printer",
    note: "Preparing card personalization device.",
    icon: Printer,
  },
  {
    label: "Loading blank card",
    note: "Checking card hopper and blank card availability.",
    icon: CreditCard,
  },
  {
    label: "Encoding chip data",
    note: "Writing card personalization data placeholder.",
    icon: Cpu,
  },
  {
    label: "Printing card surface",
    note: "Applying customer and card product details.",
    icon: Printer,
  },
  {
    label: "Verifying card output",
    note: "Confirming card personalization result.",
    icon: ShieldCheck,
  },
];

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((previousStep) => {
        if (previousStep >= steps.length - 1) {
          clearInterval(timer);

          setTimeout(() => {
            setCompleted(true);
          }, 700);

          return previousStep;
        }

        return previousStep + 1;
      });
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  const handleContinue = () => {
    navigate("/success", {
      state: {
        ...formData,
        personalization_status: "demo_completed",
        device_sdk_connected: false,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="space-y-7">
        <SectionTitle
          icon={Printer}
          title="Card Personalization"
          subtitle="Please wait while ArkPay prepares the card for encoding and printing."
        />

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Identity Verified" />
          <StatusBadge status="success" label="Signature Captured" />
          <StatusBadge status="success" label={formData.card_type || "Card Product Selected"} />
          <StatusBadge
            status={completed ? "warning" : "pending"}
            label={completed ? "SDK Placeholder Mode" : "Processing"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.85fr] gap-6">
          <GlassCard
            title="Personalization Progress"
            subtitle="This demo simulates the printer and card encoder workflow until the real SDK is connected."
            icon={Cpu}
          >
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-300 font-semibold">
                    Overall Progress
                  </span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>

                <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const active = index === currentStep && !completed;
                  const done = index < currentStep || completed;

                  return (
                    <div
                      key={step.label}
                      className={`rounded-2xl border p-5 transition-all ${
                        done
                          ? "bg-green-500/10 border-green-500/30"
                          : active
                          ? "bg-blue-500/10 border-blue-500/40"
                          : "bg-white/5 border-blue-900/30 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            done
                              ? "bg-green-500/20"
                              : active
                              ? "bg-blue-500/20"
                              : "bg-white/10"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-6 h-6 text-green-300" />
                          ) : (
                            <Icon
                              className={`w-6 h-6 ${
                                active ? "text-blue-300" : "text-blue-500/60"
                              }`}
                            />
                          )}
                        </div>

                        <div>
                          <h3 className="text-white font-bold">{step.label}</h3>
                          <p className="text-blue-300 text-sm mt-1">
                            {step.note}
                          </p>

                          {active && (
                            <div className="mt-3 flex items-center gap-2 text-blue-200 text-sm font-semibold">
                              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                              In progress...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          <GlassCard
            title="Device Status"
            subtitle="Hardware integration will be connected after SDK access is available."
            icon={Printer}
          >
            <div className="min-h-[520px] flex flex-col justify-center">
              {!completed ? (
                <div className="text-center">
                  <div className="w-44 h-44 mx-auto rounded-full bg-blue-500/10 border border-blue-500/40 flex items-center justify-center animate-pulse">
                    <Printer className="w-20 h-20 text-blue-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-8">
                    Personalization Running
                  </h3>

                  <p className="text-blue-300 mt-4">
                    Please do not remove the card or interrupt the kiosk.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-44 h-44 mx-auto rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                    <AlertTriangle className="w-20 h-20 text-amber-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-8">
                    Device SDK Not Connected
                  </h3>

                  <p className="text-blue-300 mt-4 leading-relaxed">
                    ArkPay completed the demo personalization flow. Real card
                    printing, chip encoding and device verification will be
                    enabled when the Seaory S21 and encoder SDKs are connected.
                  </p>

                  <PrimaryButton
                    fullWidth
                    className="mt-8"
                    onClick={handleContinue}
                  >
                    Continue in Demo Mode
                  </PrimaryButton>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </KioskLayout>
  );
}