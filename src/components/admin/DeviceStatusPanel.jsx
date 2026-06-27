import React from "react";
import { Printer, CreditCard, Lock, Camera, Fingerprint, PenTool, Wifi, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const devices = [
  { name: "Seaory S21 Printer", icon: Printer, status: "disconnected", detail: "USB Port 1" },
  { name: "Smart Card Reader", icon: CreditCard, status: "connected", detail: "COM3" },
  { name: "PIN Pad", icon: Lock, status: "disconnected", detail: "Serial" },
  { name: "Camera", icon: Camera, status: "connected", detail: "USB Port 2" },
  { name: "Fingerprint Scanner", icon: Fingerprint, status: "warning", detail: "USB Port 3" },
  { name: "Signature Pen", icon: PenTool, status: "disconnected", detail: "Bluetooth" },
  { name: "Contactless Reader", icon: Wifi, status: "connected", detail: "NFC Module" },
];

const statusConfig = {
  connected: { label: "Connected", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", dot: "bg-green-500" },
  disconnected: { label: "Disconnected", icon: XCircle, color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500" },
  warning: { label: "Needs Attention", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-500" },
};

export default function DeviceStatusPanel() {
  return (
    <div className="space-y-3">
      {devices.map((device) => {
        const cfg = statusConfig[device.status];
        const StatusIcon = cfg.icon;
        return (
          <div key={device.name} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <device.icon className="w-4.5 h-4.5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{device.name}</p>
                <p className="text-xs text-gray-400">{device.detail}</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}