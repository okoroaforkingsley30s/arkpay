import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Eye,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";

const mockCustomerProfile = {
  full_name: "KINGSLEY OKOROAFOR",
  date_of_birth: "03 July 1993",
  account_number: "0123456789",
  bvn: "221******89",
  nin: "123********45",
  phone_number: "+234 801 234 5678",
  email: "customer@example.com",
  address: "Customer registered address",
  branch: "Victoria Island Branch",
  customer_id: "CUST-ARK-0001",
  account_status: "Active",
  account_type: "Savings Account",
};

export default function FingerprintCapture() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const [faceStatus, setFaceStatus] = useState("scanning");
  const [customerProfile, setCustomerProfile] = useState(null);

  const scanning = faceStatus === "scanning";
  const passed = faceStatus === "passed";
  const failed = faceStatus === "failed";

  useEffect(() => {
    const timer = setTimeout(() => {
      setFaceStatus("passed");
      setCustomerProfile({
        ...mockCustomerProfile,
        account_number: formData.account_number || mockCustomerProfile.account_number,
        bvn: formData.bvn
          ? `${formData.bvn.slice(0, 3)}******${formData.bvn.slice(-2)}`
          : mockCustomerProfile.bvn,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [formData.account_number, formData.bvn]);

  const handleRetry = () => {
    setFaceStatus("scanning");
    setCustomerProfile(null);

    setTimeout(() => {
      setFaceStatus("passed");
      setCustomerProfile({
        ...mockCustomerProfile,
        account_number: formData.account_number || mockCustomerProfile.account_number,
        bvn: formData.bvn
          ? `${formData.bvn.slice(0, 3)}******${formData.bvn.slice(-2)}`
          : mockCustomerProfile.bvn,
      });
    }, 2500);
  };

  const handleCancel = () => {
    navigate("/services");
  };

  const handleContinue = () => {
    navigate("/signature", {
      state: {
        ...formData,
        face_verified: true,
        customer_profile: customerProfile,
        full_name: customerProfile?.full_name,
        phone_number: customerProfile?.phone_number,
        email: customerProfile?.email,
        branch: customerProfile?.branch,
        account_status: customerProfile?.account_status,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={Camera}
            title="Face Verification"
            subtitle="Look directly at the camera. After verification, confirm your customer details before continuing."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => navigate("/id-verification", { state: formData })}
          >
            Back
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Fingerprint Verified" />
          <StatusBadge
            status={passed ? "success" : failed ? "error" : "pending"}
            label={
              passed
                ? "Face Match Passed"
                : failed
                ? "Face Match Failed"
                : "Face Match In Progress"
            }
          />
          <StatusBadge
            status={customerProfile ? "success" : "pending"}
            label={customerProfile ? "Customer Details Fetched" : "Awaiting Details"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
          <GlassCard
            title="Camera Frame"
            subtitle="Position your face or eyes at camera level."
            icon={Eye}
          >
            <div className="relative min-h-[520px] rounded-3xl border border-blue-900/30 bg-black/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-900/20" />

              <div className="relative w-72 h-96 rounded-full border-4 border-blue-400/50 flex items-center justify-center">
                <div className="absolute inset-6 rounded-full border border-blue-300/20" />
                <div className="absolute top-24 left-16 w-12 h-6 rounded-full border-2 border-blue-300/60" />
                <div className="absolute top-24 right-16 w-12 h-6 rounded-full border-2 border-blue-300/60" />
                <div className="absolute top-48 w-24 h-10 rounded-b-full border-b-2 border-blue-300/50" />

                {passed ? (
                  <CheckCircle2 className="w-20 h-20 text-green-400" />
                ) : failed ? (
                  <XCircle className="w-20 h-20 text-red-400" />
                ) : (
                  <Camera className="w-20 h-20 text-blue-300/70" />
                )}
              </div>

              {scanning && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-blue-200 font-semibold">
                  <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  Matching face...
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard
            title={customerProfile ? "Confirm Customer Details" : "Verification Status"}
            subtitle={
              customerProfile
                ? "Review the fetched customer information before signature capture."
                : "Customer details will display after successful face verification."
            }
            icon={customerProfile ? UserRound : ShieldCheck}
          >
            {!customerProfile && (
              <div className="min-h-[520px] flex flex-col items-center justify-center text-center">
                <div
                  className={`w-52 h-52 rounded-full border flex items-center justify-center mb-8 ${
                    failed
                      ? "bg-red-500/10 border-red-500/40"
                      : "bg-blue-500/10 border-blue-500/40 animate-pulse"
                  }`}
                >
                  {failed ? (
                    <XCircle className="w-24 h-24 text-red-400" />
                  ) : (
                    <Camera className="w-24 h-24 text-blue-300" />
                  )}
                </div>

                <h3 className="text-3xl font-bold text-white">
                  {failed ? "Face Match Failed" : "Face Verification In Progress"}
                </h3>

                <p className="text-blue-300 mt-6 max-w-xl text-lg">
                  {failed
                    ? "Face could not be matched. Retry or cancel the transaction."
                    : "Please remain still and look directly at the camera."}
                </p>

                {failed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-xl">
                    <PrimaryButton fullWidth icon={Camera} onClick={handleRetry}>
                      Retry Face Match
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
            )}

            {customerProfile && (
              <div className="space-y-6">
                <div className="rounded-3xl bg-green-500/10 border border-green-500/30 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-300 mt-0.5" />
                    <div>
                      <h3 className="text-green-300 font-bold text-lg">
                        Identity Verified
                      </h3>
                      <p className="text-green-200/80 text-sm mt-1">
                        Fingerprint and face match passed. Customer information has been fetched for confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Info label="Full Name" value={customerProfile.full_name} />
                  <Info label="Date of Birth" value={customerProfile.date_of_birth} />
                  <Info label="Account Number" value={customerProfile.account_number} />
                  <Info label="BVN" value={customerProfile.bvn} />
                  <Info label="NIN" value={customerProfile.nin} />
                  <Info label="Phone Number" value={customerProfile.phone_number} />
                  <Info label="Email" value={customerProfile.email} />
                  <Info label="Account Type" value={customerProfile.account_type} />
                  <Info label="Branch" value={customerProfile.branch} />
                  <Info label="Account Status" value={customerProfile.account_status} />
                  <Info label="Customer ID" value={customerProfile.customer_id} />
                  <Info label="Address" value={customerProfile.address} />
                </div>

                <PrimaryButton
                  fullWidth
                  size="lg"
                  iconRight={ArrowRight}
                  onClick={handleContinue}
                >
                  Confirm Details & Continue to Signature
                </PrimaryButton>
              </div>
            )}
          </GlassCard>
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