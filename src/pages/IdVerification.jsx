import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Fingerprint,
  Info,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import InteractiveHand from "@/components/biometric/InteractiveHand";

const workflowSteps = [
  "Service",
  "Account",
  "Fingerprint",
  "Face",
  "Details",
  "Signature",
  "Card",
];

export default function IdVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [selectedFinger, setSelectedFinger] = useState(null);
  const [scanStatus, setScanStatus] = useState("idle");

  const scanning = scanStatus === "scanning";
  const passed = scanStatus === "passed";
  const failed = scanStatus === "failed";

  useEffect(() => {
    if (!selectedFinger) return;

    setScanStatus("scanning");

    const timer = setTimeout(() => {
      setScanStatus("passed");
    }, 2000);

    return () => clearTimeout(timer);
  }, [selectedFinger]);

  useEffect(() => {
    if (!passed) return;

    const timer = setTimeout(() => {
      navigate("/fingerprint", {
        state: {
          ...formData,
          selected_finger: selectedFinger.fullName,
          fingerprint_verified: true,
        },
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [passed, navigate, formData, selectedFinger]);

  const handleTryAnother = () => {
    setSelectedFinger(null);
    setScanStatus("idle");
  };

  const handleCancel = () => {
    navigate("/services");
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={Fingerprint}
            title="Fingerprint Verification"
            subtitle="Select the requested finger. The scanner will begin automatically after selection."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() =>
              navigate("/customer-details", {
                state: {
                  serviceId: formData.serviceId,
                  serviceType: formData.serviceType,
                },
              })
            }
          >
            Back
          </PrimaryButton>
        </div>

        <WizardProgress currentStep={2} />

        <div className="flex flex-wrap gap-3">
          <StatusBadge
            status="pending"
            label={formData.serviceType || "Card Service"}
          />
          <StatusBadge
            status={passed ? "success" : failed ? "error" : "pending"}
            label={
              passed
                ? "Fingerprint Passed"
                : failed
                ? "Fingerprint Failed"
                : scanning
                ? "Waiting for Fingerprint"
                : "Select Finger"
            }
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-6">
          <GlassCard
            title="Select Finger"
            subtitle="Tap the finger requested for verification."
            icon={Fingerprint}
            className={selectedFinger ? "opacity-70" : ""}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HandPanel title="Left Hand">
                <InteractiveHand
                  hand="left"
                  selectedFinger={selectedFinger}
                  onSelect={setSelectedFinger}
                  disabled={Boolean(selectedFinger)}
                />
              </HandPanel>

              <HandPanel title="Right Hand">
                <InteractiveHand
                  hand="right"
                  selectedFinger={selectedFinger}
                  onSelect={setSelectedFinger}
                  disabled={Boolean(selectedFinger)}
                />
              </HandPanel>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-blue-900/30 bg-blue-500/10 p-4 text-blue-200">
              <Info className="w-5 h-5 text-blue-300 shrink-0" />
              <p className="text-sm">
                Select one finger only. Keep the selected finger clean and dry
                before placing it on the scanner.
              </p>
            </div>
          </GlassCard>

          <GlassCard
            title="Scanner Instruction"
            subtitle="Follow the instruction below."
            icon={ShieldCheck}
          >
            <div className="min-h-[540px] flex flex-col items-center justify-center text-center">
              <div
                className={`relative w-52 h-52 rounded-full border flex items-center justify-center mb-8 ${
                  passed
                    ? "bg-green-500/10 border-green-500/40"
                    : failed
                    ? "bg-red-500/10 border-red-500/40"
                    : selectedFinger
                    ? "bg-blue-500/10 border-blue-500/40"
                    : "bg-white/5 border-blue-900/40"
                }`}
              >
                {selectedFinger && !failed && !passed && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
                    <div className="absolute inset-5 rounded-full border border-blue-400/30" />
                    <div className="absolute inset-10 rounded-full border border-blue-400/20" />
                  </>
                )}

                {passed ? (
                  <CheckCircle2 className="w-24 h-24 text-green-400" />
                ) : failed ? (
                  <XCircle className="w-24 h-24 text-red-400" />
                ) : (
                  <Fingerprint
                    className={`w-24 h-24 ${
                      selectedFinger ? "text-blue-300" : "text-blue-500/40"
                    }`}
                  />
                )}
              </div>

              <h3 className="text-3xl font-bold text-white">
                {passed
                  ? "Fingerprint Verified"
                  : failed
                  ? "Fingerprint Not Matched"
                  : selectedFinger
                  ? "Please place your"
                  : "Awaiting Finger Selection"}
              </h3>

              {selectedFinger && !passed && !failed && (
                <p className="mt-3 text-4xl font-black text-blue-300 uppercase tracking-wide">
                  {selectedFinger.fullName}
                </p>
              )}

              {selectedFinger && !passed && !failed && (
                <p className="mt-2 text-2xl text-white">
                  on the fingerprint scanner.
                </p>
              )}

              <p className="text-blue-300 mt-6 max-w-xl text-lg">
                {passed
                  ? "Fingerprint match successful. Proceeding to face verification..."
                  : failed
                  ? "Fingerprint did not match. Choose another finger or cancel the transaction."
                  : selectedFinger
                  ? "Do not remove your finger until verification is complete."
                  : "Select one finger from the hand diagram to begin verification."}
              </p>

              {scanning && (
                <div className="mt-8 flex items-center gap-3 text-blue-200 font-semibold">
                  <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  Waiting for fingerprint...
                </div>
              )}

              {failed && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-xl">
                  <PrimaryButton
                    fullWidth
                    variant="secondary"
                    icon={Fingerprint}
                    onClick={handleTryAnother}
                  >
                    Choose Another Finger
                  </PrimaryButton>

                  <PrimaryButton
                    fullWidth
                    variant="danger"
                    icon={XCircle}
                    onClick={handleCancel}
                  >
                    Cancel Transaction
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

function HandPanel({ title, children }) {
  return (
    <div className="rounded-3xl border border-blue-900/30 bg-white/5 p-5">
      <h3 className="text-center text-blue-300 font-black uppercase tracking-wide mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function WizardProgress({ currentStep }) {
  return (
    <GlassCard padding="sm">
      <div className="grid grid-cols-7 gap-3">
        {workflowSteps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold ${
                  completed
                    ? "bg-blue-600 border-blue-400 text-white"
                    : active
                    ? "bg-blue-600/30 border-blue-300 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white/10 border-blue-900/40 text-blue-300"
                }`}
              >
                {completed ? <Check className="w-5 h-5" /> : index + 1}
              </div>

              <span
                className={`text-xs font-semibold ${
                  active ? "text-white" : "text-blue-300"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}