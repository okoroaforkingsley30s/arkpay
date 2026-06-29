import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
import VoiceGuide from "@/components/common/VoiceGuide";
import deviceManager from "@/services/deviceManager";

const steps = [
  {
    label: "Preparing Personalization Device",
    note: "Checking printer, encoder and personalization readiness.",
    icon: Printer,
    action: "getPrinterStatus",
  },
  {
    label: "Loading Blank Card",
    note: "Loading a blank card into the card path.",
    icon: CreditCard,
    action: "detectCard",
  },
  {
    label: "Printing Customer Artwork",
    note: "Applying approved bank artwork and customer print data.",
    icon: Printer,
    action: "printCard",
  },
  {
    label: "Writing EMV Chip",
    note: "Writing chip data provided by the bank personalization system.",
    icon: Cpu,
    action: "encodeCard",
  },
  {
    label: "Writing Magnetic Stripe",
    note: "Writing magnetic stripe data for supported channels.",
    icon: CreditCard,
    action: "encodeCard",
  },
  {
    label: "Printing Card",
    note: "Printing visible customer and card information.",
    icon: Printer,
    action: "printCard",
  },
  {
    label: "Quality Verification",
    note: "Verifying personalization output before release.",
    icon: ShieldCheck,
    action: "getEncoderStatus",
  },
  {
    label: "Ejecting Card",
    note: "Moving the completed card to the collection area.",
    icon: CreditCard,
    action: "detectCard",
  },
];

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [stepResults, setStepResults] = useState({});

  useEffect(() => {
    let cancelled = false;

    const runProcessing = async () => {
      for (let index = 0; index < steps.length; index += 1) {
        if (cancelled) return;

        const step = steps[index];
        setCurrentStep(index);

        try {
          const actionFn = deviceManager[step.action];

          if (typeof actionFn === "function") {
            const result = await actionFn(createDevicePayload(step, formData));

            if (cancelled) return;

            setStepResults((prev) => ({
              ...prev,
              [index]: {
                success: result?.success !== false,
                simulated: result?.simulated || result?.success === false,
                message: result?.message || "Step completed.",
              },
            }));
          } else {
            await delay(900);

            if (cancelled) return;

            setStepResults((prev) => ({
              ...prev,
              [index]: {
                success: true,
                simulated: true,
                message: "Simulated step completed.",
              },
            }));
          }
        } catch (error) {
          if (cancelled) return;

          setStepResults((prev) => ({
            ...prev,
            [index]: {
              success: true,
              simulated: true,
              message:
                error?.message ||
                "Hardware not connected. Simulated step completed.",
            },
          }));
        }

        await delay(650);
      }

      if (!cancelled) {
        setCompleted(true);
      }
    };

    runProcessing();

    return () => {
      cancelled = true;
    };
  }, [formData]);

  const progress = Math.round(
    ((completed ? steps.length : currentStep + 1) / steps.length) * 100
  );

  const handleContinue = () => {
    navigate("/collect-card", {
      state: {
        ...formData,
        personalization_status: "completed",
        card_ejected: true,
        device_sdk_connected: false,
        device_processing_results: stepResults,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <VoiceGuide
        message={
          completed
            ? "Card personalization is complete. The card has been ejected. Please continue to card collection."
            : "Your card is now being personalized. Please wait and do not remove the card or interrupt the kiosk."
        }
      />

      <div className="space-y-7">
        <SectionTitle
          icon={Printer}
          title="Card Personalization"
          subtitle="Please wait while ArkPay personalizes the customer card."
        />

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Identity Verified" />
          <StatusBadge status="success" label="Signature Captured" />
          <StatusBadge
            status="success"
            label={formData.card_type || "Card Product Selected"}
          />
          <StatusBadge
            status={completed ? "success" : "pending"}
            label={completed ? "Card Ready for Collection" : "Processing"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.85fr] gap-6">
          <GlassCard
            title="Personalization Progress"
            subtitle="This sequence represents the live card printer and encoder workflow."
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
                  const result = stepResults[index];

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

                          {result?.simulated && done && (
                            <p className="mt-3 text-xs text-amber-300 font-semibold">
                              Simulation mode: waiting for real device SDK.
                            </p>
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
            subtitle="In live mode, this area will reflect real printer and encoder events."
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
                  <div className="w-44 h-44 mx-auto rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-20 h-20 text-green-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-8">
                    Card Ejected
                  </h3>

                  <p className="text-blue-300 mt-4 leading-relaxed">
                    The card has been personalized and moved to the collection
                    area. Continue to confirm customer card collection.
                  </p>

                  <PrimaryButton
                    fullWidth
                    className="mt-8"
                    onClick={handleContinue}
                  >
                    Continue to Card Collection
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

function createDevicePayload(step, formData) {
  if (step.action === "printCard") {
    return {
      fullName:
        formData.name_on_card ||
        formData.full_name ||
        formData.customer_profile?.full_name,
      cardType: formData.card_type,
      cardNetwork: formData.card_network,
      accountNumber: formData.account_number,
      theme: formData.card_theme_name,
    };
  }

  if (step.action === "encodeCard") {
    return {
      accountNumber: formData.account_number,
      cardType: formData.card_type,
      cardNetwork: formData.card_network,
      personalizationReference: formData.personalization_reference,
    };
  }

  return {
    accountNumber: formData.account_number,
    cardType: formData.card_type,
  };
}

function delay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}