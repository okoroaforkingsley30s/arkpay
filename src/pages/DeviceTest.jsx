import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Usb,
  Wifi,
} from "lucide-react";

import KioskHeader from "@/components/kiosk/KioskHeader";
import mockSDK from "@/lib/mockSDK";

const DEVICES = [
  {
    id: "printer",
    name: "Seaory S21 Card Printer",
    icon: Printer,
    connection: "USB",
    port: "USB Port 1",
    sdkStatus: "Awaiting vendor SDK",
    sdkFn: "getPrinterStatus",
    args: [],
  },
  {
    id: "card_encoder",
    name: "Smart Card Encoder",
    icon: CreditCard,
    connection: "USB / CCID",
    port: "Microsoft USB CCID",
    sdkStatus: "Awaiting encoder SDK",
    sdkFn: "readSmartCard",
    args: [],
  },
  {
    id: "fingerprint",
    name: "Fingerprint Scanner",
    icon: Fingerprint,
    connection: "USB",
    port: "USB Port 3",
    sdkStatus: "Awaiting scanner SDK",
    sdkFn: "captureFingerprint",
    args: [1],
  },
  {
    id: "camera",
    name: "Customer Camera",
    icon: Camera,
    connection: "USB",
    port: "USB2.0 Camera",
    sdkStatus: "Browser camera supported",
    sdkFn: "capturePhoto",
    args: ["customer"],
  },
  {
    id: "signature",
    name: "Signature Pad",
    icon: PenTool,
    connection: "USB / HID",
    port: "Signature Device",
    sdkStatus: "Awaiting signature SDK",
    sdkFn: null,
    args: [],
  },
  {
    id: "pin_pad",
    name: "PIN Pad",
    icon: Lock,
    connection: "Serial / USB",
    port: "Vendor required",
    sdkStatus: "Vendor not confirmed",
    sdkFn: null,
    args: [],
  },
  {
    id: "contactless",
    name: "Contactless Reader",
    icon: Wifi,
    connection: "NFC / USB",
    port: "Vendor required",
    sdkStatus: "Vendor not confirmed",
    sdkFn: null,
    args: [],
  },
];

export default function DeviceTest() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const runTest = async (device) => {
    setLoading((prev) => ({ ...prev, [device.id]: true }));
    setResults((prev) => ({ ...prev, [device.id]: null }));

    let result;

    try {
      if (device.sdkFn && mockSDK[device.sdkFn]) {
        result = await mockSDK[device.sdkFn](...device.args);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        result = {
          success: false,
          message: "SDK not connected yet. Device vendor details required.",
          device: device.name,
        };
      }
    } catch (error) {
      result = {
        success: false,
        message: error?.message || "Device test failed.",
        device: device.name,
      };
    }

    setLoading((prev) => ({ ...prev, [device.id]: false }));
    setResults((prev) => ({ ...prev, [device.id]: result }));
  };

  const runAll = async () => {
    for (const device of DEVICES) {
      await runTest(device);
    }
  };

  const testedCount = Object.values(results).filter(Boolean).length;
  const passedCount = Object.values(results).filter(
    (result) => result?.success
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Device Integration Test
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Phase 2 readiness check for kiosk hardware and vendor SDKs.
            </p>
          </div>

          <button
            onClick={runAll}
            className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Test All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <SummaryCard label="Devices" value={DEVICES.length} />
          <SummaryCard label="Tested" value={testedCount} />
          <SummaryCard label="Passed" value={passedCount} />
        </div>

        <div className="space-y-3">
          {DEVICES.map((device, index) => {
            const result = results[device.id];
            const isLoading = loading[device.id];
            const Icon = device.icon;

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {device.name}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Usb className="w-3.5 h-3.5" />
                          {device.connection}
                        </span>
                        <span>•</span>
                        <span>{device.port}</span>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        {device.sdkStatus}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => runTest(device)}
                    disabled={isLoading}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : null}
                    {isLoading ? "Testing..." : "Test"}
                  </button>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`mt-3 flex items-start gap-2 p-3 rounded-lg text-xs ${
                      result.success
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}

                    <div>
                      <p className="font-semibold">
                        {result.success ? "Device Ready" : "Not Ready"}
                      </p>
                      <p className="mt-0.5">{result.message}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}