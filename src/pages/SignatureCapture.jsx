import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import KioskButton from "@/components/kiosk/KioskButton";

export default function SignatureCapture() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#0a1628";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    setHasSignature(true);
  };

  const endDraw = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/fingerprint", { state: formData })} step={4} totalSteps={6} />

      <div className="flex-1 p-6 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Signature Capture</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in the box below using the stylus</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm">
              <canvas
                ref={canvasRef}
                width={350}
                height={180}
                className="w-full bg-white rounded-2xl border-2 border-gray-200 touch-none cursor-crosshair"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
              <div className="absolute bottom-4 left-4 right-4 border-t border-dashed border-gray-300" />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2 text-gray-300">
                    <PenTool className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign here</span>
                  </div>
                </div>
              )}
            </div>

            {hasSignature && (
              <button onClick={clearSignature} className="mt-3 flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm transition-colors">
                <RotateCcw className="w-4 h-4" /> Clear Signature
              </button>
            )}

            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-xs">Signature pen: Placeholder mode</span>
            </div>
          </div>

          <div className="mt-auto">
            <KioskButton
              onClick={() => navigate("/card-preview", { state: { ...formData, signature_captured: true } })}
              disabled={!hasSignature}
              className="w-full"
            >
              Continue
            </KioskButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}