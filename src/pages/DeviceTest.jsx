import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Printer, CreditCard, Lock, Camera, Fingerprint, PenTool, Wifi, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import KioskHeader from "@/components/kiosk/KioskHeader";
import mockSDK from "@/lib/mockSDK";

const DEVICES = [
  { id: "printer",      name: "Seaory S21 Printer",   icon: Printer,      detail: "USB Port 1",  sdkFn: "printCard",          args: [{ fullName: "Test User", cardNumber: "0000000000000000" }] },
  { id: "card_reader",  name: "Smart Card Reader",     icon: CreditCard,   detail: "COM3",        sdkFn: "readSmartCard",      args: [] },
  { id: "pin_pad",      name: "PIN Pad",               icon: Lock,         detail: "Serial",      sdkFn: "setPin",             args: ["00000000"] },
  { id: "camera",       name: "Camera",                icon: Camera,       detail: "USB Port 2",  sdkFn: "capturePhoto",       args: ["id"] },
  { id: "fingerprint",  name: "Fingerprint Scanner",   icon: Fingerprint,  detail: "USB Port 3",  sdkFn: "captureFingerprint", args: [1] },
  { id: "signature",    name: "Signature Pen",         icon: PenTool,      detail: "Bluetooth",   sdkFn: null,                 args: [] },
  { id: "contactless",  name: "Contactless Reader",    icon: Wifi,         detail: "NFC Module",  sdkFn: null,                 args: [] },
];

export default function DeviceTest() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const runTest = async (device) => {
    setLoading(prev => ({ ...prev, [device.id]: true }));
    setResults(prev => ({ ...prev, [device.id]: null }));

    let result;
    if (device.sdkFn && mockSDK[device.sdkFn]) {
      result = await mockSDK[device.sdkFn](...device.args);
    } else {
      await new Promise(r => setTimeout(r, 800));
      result = { success: false, message: "Device SDK not connected yet", device: device.name };
    }

    setLoading(prev => ({ ...prev, [device.id]: false }));
    setResults(prev => ({ ...prev, [device.id]: result }));
  };

  const runAll = async () => {
    for (const device of DEVICES) {
      await runTest(device);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Device Test</h2>
            <p className="text-gray-500 text-sm mt-1">Test all connected hardware peripherals</p>
          </div>
          <button
            onClick={runAll}
            className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Test All
          </button>
        </div>

        <div className="space-y-3">
          {DEVICES.map((device, i) => {
            const result = results[device.id];
            const isLoading = loading[device.id];
            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <device.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{device.name}</p>
                      <p className="text-xs text-gray-400">{device.detail}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => runTest(device)}
                    disabled={isLoading}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    {isLoading ? "Testing..." : "Test"}
                  </button>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`mt-3 flex items-start gap-2 p-3 rounded-lg text-xs ${result.success ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                  >
                    {result.success
                      ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    }
                    <span className="font-medium">{result.message}</span>
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