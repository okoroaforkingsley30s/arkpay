import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  CreditCard,
  Fingerprint,
  Loader2,
  Lock,
  PenTool,
  Printer,
  RefreshCw,
  Wifi,
  XCircle,
} from "lucide-react";

import deviceManager from "@/services/deviceManager";

const devices = [
  {
    id: "printer",
    name: "Card Printer",
    icon: Printer,
    detail: "Seaory S21 / Supported printer adapter",
  },
  {
    id: "encoder",
    name: "Card Encoder",
    icon: CreditCard,
    detail: "Smart card reader / encoder",
  },
  {
    id: "fingerprint",
    name: "Fingerprint Scanner",
    icon: Fingerprint,
    detail: "Biometric scanner",
  },
  {
    id: "camera",
    name: "Customer Camera",
    icon: Camera,
    detail: "Face verification camera",
  },
  {
    id: "signature",
    name: "Signature Pad",
    icon: PenTool,
    detail: "Signature capture device",
  },
  {
    id: "pinpad",
    name: "PIN Pad",
    icon: Lock,
    detail: "Secure PIN entry device",
  },
  {
    id: "contactless",
    name: "Contactless Reader",
    icon: Wifi,
    detail: "NFC/contactless module",
  },
];

const statusConfig = {
  connected: {
    label: "Connected",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
    dot: "bg-green-500",
  },
  disconnected: {
    label: "Disconnected",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    dot: "bg-red-500",
  },
  simulation: {
    label: "Simulation",
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
  },
};

export default function DeviceStatusPanel() {
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [deviceResults, setDeviceResults] = useState({});

  const refreshStatus = async () => {
    setLoading(true);

    const health = await deviceManager.healthCheck();

    const mappedResults = {
      printer: health.devices?.[0],
      encoder: health.devices?.[1],
      signature: health.devices?.[2],
      pinpad: health.devices?.[3],
      contactless: health.devices?.[4],
      fingerprint: await deviceManager.captureFingerprint(1),
      camera: await deviceManager.capturePhoto("status-check"),
    };

    setDeviceResults(mappedResults);
    setLastChecked(new Date());
    setLoading(false);
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  const connectedCount = Object.values(deviceResults).filter(
    (result) => result?.success
  ).length;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-900">
              Device Health Overview
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {deviceManager.simulationMode
                ? "Simulation mode active until vendor SDKs are connected."
                : "Live device mode active."}
            </p>
          </div>

          <button
            onClick={refreshStatus}
            disabled={loading}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <MiniStat label="Devices" value={devices.length} />
          <MiniStat label="Ready" value={connectedCount} />
          <MiniStat
            label="Mode"
            value={deviceManager.simulationMode ? "SIM" : "LIVE"}
          />
        </div>

        {lastChecked && (
          <p className="text-[11px] text-gray-400 mt-3">
            Last health check: {lastChecked.toLocaleTimeString()}
          </p>
        )}
      </div>

      {devices.map((device) => {
        const result = deviceResults[device.id];
        const status = getStatus(result);
        const cfg = statusConfig[status];
        const StatusIcon = cfg.icon;
        const Icon = device.icon;

        return (
          <div
            key={device.id}
            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-gray-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {device.name}
                </p>
                <p className="text-xs text-gray-400">{device.detail}</p>
                {result?.message && (
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {result.message}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg}`}
            >
              <StatusIcon className={`w-3.5 h-3.5 ${cfg.color}`} />
              <span className={`text-xs font-medium ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getStatus(result) {
  if (!result) return "disconnected";
  if (result.success) return "connected";
  if (result.simulated) return "simulation";
  return "disconnected";
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-[10px] text-gray-400">{label}</p>
    </div>
  );
}