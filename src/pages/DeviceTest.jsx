import React, { useMemo, useState } from "react";
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
  ScanLine,
  Usb,
  Wifi,
} from "lucide-react";

import KioskHeader from "@/components/kiosk/KioskHeader";
import deviceManager from "@/services/deviceManager";
import configManager from "@/services/configManager";
import deviceDiscoveryService from "@/services/deviceDiscoveryService";

const deviceIconMap = {
  printer: Printer,
  encoder: CreditCard,
  fingerprint: Fingerprint,
  camera: Camera,
  signaturePad: PenTool,
  pinPad: Lock,
  contactlessReader: Wifi,
  barcodeScanner: ScanLine,
};

const deviceTestMap = {
  printer: {
    sdkFn: "getPrinterStatus",
    args: [],
  },
  encoder: {
    sdkFn: "readSmartCard",
    args: [],
  },
  fingerprint: {
    sdkFn: "captureFingerprint",
    args: [1],
  },
  camera: {
    sdkFn: "capturePhoto",
    args: ["customer"],
  },
  signaturePad: {
    sdkFn: "getSignaturePadStatus",
    args: [],
  },
  pinPad: {
    sdkFn: "getPinPadStatus",
    args: [],
  },
  contactlessReader: {
    sdkFn: "getContactlessReaderStatus",
    args: [],
  },
  barcodeScanner: {
    sdkFn: null,
    args: [],
  },
};

export default function DeviceTest() {
  const navigate = useNavigate();

  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [discovering, setDiscovering] = useState(false);
  const [discovered, setDiscovered] = useState(null);

  const devices = useMemo(() => {
    const configuredDevices = configManager.getDevices();

    return Object.entries(configuredDevices).map(([key, device]) => ({
      key,
      ...device,
      icon: deviceIconMap[key] || Usb,
      sdkFn: deviceTestMap[key]?.sdkFn || null,
      args: deviceTestMap[key]?.args || [],
    }));
  }, []);

  const runTest = async (device) => {
    setLoading((prev) => ({ ...prev, [device.key]: true }));
    setResults((prev) => ({ ...prev, [device.key]: null }));

    let result;

    try {
      const testFn = device.sdkFn ? deviceManager[device.sdkFn] : null;

      if (device.enabled === false) {
        result = {
          success: false,
          simulated: true,
          device: device.name,
          message: `${device.name} is disabled in kiosk configuration.`,
        };
      } else if (device.sdkFn && typeof testFn === "function") {
        result = await testFn(...device.args);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        result = {
          success: false,
          simulated: true,
          device: device.name,
          message: "Device test function is not available yet.",
        };
      }
    } catch (error) {
      result = {
        success: false,
        simulated: true,
        device: device.name,
        message: error?.message || "Device test failed.",
      };
    }

    setLoading((prev) => ({ ...prev, [device.key]: false }));
    setResults((prev) => ({ ...prev, [device.key]: result }));
  };

  const runAll = async () => {
    for (const device of devices) {
      await runTest(device);
    }
  };

  const scanDevices = async () => {
    setDiscovering(true);

    await deviceDiscoveryService.requestCameraPermission();

    const result = await deviceDiscoveryService.scanAll();

    setDiscovered(result);
    setDiscovering(false);
  };

  const testedCount = Object.values(results).filter(Boolean).length;
  const passedCount = Object.values(results).filter(
    (result) => result?.success
  ).length;
  const enabledCount = devices.filter((device) => device.enabled !== false)
    .length;

  const discoveredCameras = discovered?.browserDevices?.cameras || [];
  const discoveredMicrophones = discovered?.browserDevices?.microphones || [];
  const discoveredSpeakers = discovered?.browserDevices?.speakers || [];

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
              Hardware readiness check using the current kiosk device
              configuration.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={scanDevices}
              disabled={discovering}
              className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {discovering ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Usb className="w-4 h-4" />
              )}
              {discovering ? "Scanning..." : "Scan Devices"}
            </button>

            <button
              onClick={runAll}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Test All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <SummaryCard label="Configured" value={devices.length} />
          <SummaryCard label="Enabled" value={enabledCount} />
          <SummaryCard label="Tested" value={testedCount} />
          <SummaryCard label="Passed" value={passedCount} />
        </div>

        {discovered && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-bold text-gray-900">
                  Device Discovery Results
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {discovered.message}
                </p>
              </div>

              <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {discovered.mode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <DiscoveryStat label="Cameras" value={discoveredCameras.length} />
              <DiscoveryStat
                label="Microphones"
                value={discoveredMicrophones.length}
              />
              <DiscoveryStat label="Speakers" value={discoveredSpeakers.length} />
            </div>

            <div className="space-y-4">
              <DiscoveryGroup
                title="Cameras"
                empty="No browser-accessible cameras detected."
                devices={discoveredCameras}
              />

              <DiscoveryGroup
                title="Microphones"
                empty="No browser-accessible microphones detected."
                devices={discoveredMicrophones}
              />

              <DiscoveryGroup
                title="Speakers"
                empty="No browser-accessible speakers detected."
                devices={discoveredSpeakers}
              />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700">
              Windows USB discovery for card printers, fingerprint scanners,
              PIN pads, smart card readers and other kiosk hardware requires
              ArkPay to run as an Electron application with a native Windows
              Device Service.
            </div>
          </div>
        )}

        <div className="space-y-3">
          {devices.map((device, index) => {
            const result = results[device.key];
            const isLoading = loading[device.key];
            const Icon = device.icon;
            const enabled = device.enabled !== false;

            return (
              <motion.div
                key={device.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`bg-white rounded-xl p-4 border shadow-sm ${
                  enabled ? "border-gray-100" : "border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900">
                          {device.name}
                        </p>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            enabled
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Usb className="w-3.5 h-3.5" />
                          {device.connection}
                        </span>
                        <span>•</span>
                        <span>{device.port}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 text-xs">
                        <InfoPill label="Vendor" value={device.vendor} />
                        <InfoPill label="Model" value={device.model} />
                        <InfoPill label="SDK" value={device.sdk} />
                        <InfoPill label="Driver" value={device.driver} />
                        <InfoPill
                          label="Serial"
                          value={device.serialNumber || "Not set"}
                        />
                        <InfoPill label="Type" value={device.type} />
                      </div>
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

                      {result.vendor || result.model || result.sdk ? (
                        <p className="mt-1 text-[11px] opacity-80">
                          {result.vendor || device.vendor}{" "}
                          {result.model || device.model} • SDK:{" "}
                          {result.sdk || device.sdk}
                        </p>
                      ) : null}
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

function DiscoveryStat({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

function DiscoveryGroup({ title, devices, empty }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-900 mb-2">{title}</h4>

      {devices.length > 0 ? (
        <div className="space-y-2">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
            >
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {device.label}
                </p>

                <p className="text-xs text-gray-500">{device.connection}</p>
              </div>

              <span className="text-green-600 text-xs font-semibold">
                Detected
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">{empty}</p>
      )}
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <p className="text-[10px] text-gray-400">{label}</p>
      <p className="text-xs font-semibold text-gray-700 truncate">
        {value || "—"}
      </p>
    </div>
  );
}