import React, { useEffect, useState } from "react";
import {
  Printer,
  Camera,
  Fingerprint,
  CreditCard,
  Wifi,
  Keyboard,
  ScanLine,
  Circle,
} from "lucide-react";
import deviceManager from "@/services/deviceManager";

const devices = [
  {
    key: "printer",
    title: "Printer",
    icon: Printer,
  },
  {
    key: "smartCardReader",
    title: "Card Reader",
    icon: CreditCard,
  },
  {
    key: "camera",
    title: "Camera",
    icon: Camera,
  },
  {
    key: "fingerprintScanner",
    title: "Fingerprint",
    icon: Fingerprint,
  },
  {
    key: "pinPad",
    title: "PIN Pad",
    icon: Keyboard,
  },
  {
    key: "contactlessReader",
    title: "Contactless",
    icon: Wifi,
  },
  {
    key: "barcodeScanner",
    title: "Barcode",
    icon: ScanLine,
  },
];

export default function DeviceStatus() {
  const [deviceStatus, setDeviceStatus] = useState({});
  useEffect(() => {
  let mounted = true;

  async function loadStatus() {
    const health = await deviceManager.healthCheck();

    if (!mounted) return;

    const status = {};

    (health.devices || []).forEach((device) => {
      status[device.key] = device.success ? "Ready" : "Offline";
    });

    setDeviceStatus(status);
  }

  loadStatus();

  return () => {
    mounted = false;
  };
}, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">

      {devices.map((device) => {

        const Icon = device.icon;
        const status = deviceStatus[device.key] || "Offline";
        const ready = status === "Ready";

        return (
          <div
            key={device.key}
            className="bg-white/5 border border-blue-900/30 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-blue-500/50 transition-all"
          >
            <Icon className="w-8 h-8 text-blue-300 mb-3" />

            <h3 className="text-white text-sm font-semibold text-center">
              {device.title}
            </h3>

            <div className="flex items-center gap-2 mt-3">

              <Circle
                className={`w-3 h-3 ${
                  ready
                    ? "text-green-500 fill-green-500"
                    : "text-red-500 fill-red-500"
                }`}
              />

              <span
                className={`text-xs font-medium ${
                  ready ? "text-green-400" : "text-red-400"
                }`}
              >
                {status}
              </span>

            </div>

          </div>
        );
      })}
    </div>
  );
}