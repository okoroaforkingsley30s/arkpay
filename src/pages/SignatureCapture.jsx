import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, PenTool, RotateCcw, ShieldCheck } from "lucide-react";

import KioskLayout from "@/components/layout/KioskLayout";
import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";
import SectionTitle from "@/components/common/SectionTitle";
import StatusBadge from "@/components/common/StatusBadge";
import VoiceGuide from "@/components/common/VoiceGuide";

export default function SignatureCapture() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const getPos = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    return {
      x: ((clientX - rect.left) / rect.width) * canvasRef.current.width,
      y: ((clientY - rect.top) / rect.height) * canvasRef.current.height,
    };
  };

  const startDraw = (event) => {
    event.preventDefault();

    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(event);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    setIsDrawing(true);
  };

  const draw = (event) => {
    event.preventDefault();

    if (!isDrawing) return;

    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(event);

    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#0a1628";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    setHasSignature(true);
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleContinue = () => {
    navigate("/card-preview", {
      state: {
        ...formData,
        signature_captured: true,
      },
    });
  };

  return (
    <KioskLayout showInstitution={false} showDevices={false}>
    <VoiceGuide message="Please sign inside the signature box using the signature pen or touchscreen. Press continue when your signature is captured." />
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-5">
          <SectionTitle
            icon={PenTool}
            title="Signature Capture"
            subtitle="Use the signature pen or touchscreen to sign inside the box."
          />

          <PrimaryButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => navigate("/fingerprint", { state: formData })}
          >
            Back
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="success" label="Fingerprint Verified" />
          <StatusBadge status="success" label="Face Verified" />
          <StatusBadge
            status={hasSignature ? "success" : "pending"}
            label={hasSignature ? "Signature Captured" : "Signature Required"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.8fr] gap-6">
          <GlassCard
            title="Customer Signature"
            subtitle="Please sign clearly. This signature may be stored with the card issuance record."
            icon={PenTool}
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={900}
                height={360}
                className="w-full h-[360px] bg-white rounded-3xl border-4 border-blue-900/30 touch-none cursor-crosshair shadow-inner"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />

              <div className="absolute bottom-16 left-10 right-10 border-t-2 border-dashed border-gray-300" />

              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-3 text-gray-300">
                    <PenTool className="w-8 h-8" />
                    <span className="text-2xl font-bold">Sign here</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-between gap-4">
              <PrimaryButton
                variant="secondary"
                icon={RotateCcw}
                onClick={clearSignature}
                disabled={!hasSignature}
              >
                Clear Signature
              </PrimaryButton>

              <PrimaryButton
                iconRight={ArrowRight}
                onClick={handleContinue}
                disabled={!hasSignature}
              >
                Continue
              </PrimaryButton>
            </div>
          </GlassCard>

          <GlassCard
            title="Signature Status"
            subtitle="Foundation mode uses browser canvas until signature pad SDK is connected."
            icon={ShieldCheck}
          >
            <div className="min-h-[360px] flex flex-col items-center justify-center text-center">
              <div
                className={`w-36 h-36 rounded-full border flex items-center justify-center mb-6 ${
                  hasSignature
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-blue-500/10 border-blue-500/40"
                }`}
              >
                <PenTool
                  className={`w-16 h-16 ${
                    hasSignature ? "text-green-400" : "text-blue-300"
                  }`}
                />
              </div>

              <h3 className="text-2xl font-bold text-white">
                {hasSignature ? "Signature Captured" : "Awaiting Signature"}
              </h3>

              <p className="text-blue-300 mt-4 max-w-sm">
                {hasSignature
                  ? "Signature has been captured. Continue to card preview."
                  : "Ask the customer to sign using the pen or touchscreen."}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </KioskLayout>
  );
}