import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  CheckCircle2,
  Cpu,
  Download,
  HardDrive,
  Monitor,
  Network,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import KioskHeader from "@/components/kiosk/KioskHeader";
import deviceManager from "@/services/deviceManager";
import configManager from "@/services/configManager";

export default function KioskDiagnostics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const appVersion = useMemo(() => {
    return import.meta.env.VITE_APP_VERSION || "0.1.0";
  }, []);

  const runDiagnostics = async () => {
    setLoading(true);

    const health = await deviceManager.healthCheck();
    const connectedDevices = await deviceManager.getConnectedDevices();
    const app = configManager.getApp();
    const kiosk = configManager.getKiosk();
    const institution = configManager.getInstitution();
    const sdk = configManager.getSDK();

    const diagnostics = {
  report_type: "arkpay_kiosk_diagnostics",
  schema_version: "1.0",
  generated_at: new Date().toISOString(),
      application: {
  name: app.name,
  version: app.version,
  mode: sdk.mode,
  device_manager: "enabled",
},
      kiosk: {
  kiosk_id: kiosk.id,
  institution: institution.name,
  branch: institution.branch,
  location: kiosk.location,
  region: kiosk.region,
},
      browser: {
        platform: navigator.platform,
        user_agent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages,
        cookies_enabled: navigator.cookieEnabled,
        online: navigator.onLine,
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        available_width: window.screen.availWidth,
        available_height: window.screen.availHeight,
        color_depth: window.screen.colorDepth,
        pixel_ratio: window.devicePixelRatio,
      },
      window: {
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
        location: window.location.href,
      },
      network: {
        online: navigator.onLine,
        connection_type: navigator.connection?.effectiveType || "Unavailable",
        downlink: navigator.connection?.downlink || "Unavailable",
        rtt: navigator.connection?.rtt || "Unavailable",
      },
      devices: {
        health: health.devices || [],
        connected: connectedDevices.devices || [],
      },
      health_status: health.success
        ? "Partial / Ready"
        : "Simulation / Pending SDK",
    };

    setReport(diagnostics);
    setLoading(false);
  };

  const exportReport = () => {
    if (!report) return;

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `arkpay-diagnostics-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <KioskHeader showBack onBack={() => navigate("/admin")} />

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Kiosk Diagnostics
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              System, device and application health report.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            <button
              onClick={exportReport}
              disabled={!report}
              className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <StatCard
  icon={Monitor}
  label="App"
  value={report?.application?.name || "ArkPay"}
/>
          <StatCard
            icon={ShieldCheck}
            label="Mode"
            value={report?.application?.mode?.toUpperCase() || "SIM"}
          />
          <StatCard
            icon={Network}
            label="Network"
            value={navigator.onLine ? "Online" : "Offline"}
          />
          <StatCard
            icon={Activity}
            label="Status"
            value={report?.health_status || "Checking"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Panel title="Application" icon={Cpu}>
            <Info label="Name" value={report?.application?.name} />
<Info label="Version" value={report?.application?.version} />
<Info label="Mode" value={report?.application?.mode} />
            <Info label="Generated At" value={report?.generated_at} />
          </Panel>

          <Panel title="Kiosk Information" icon={Monitor}>
            <Info label="Kiosk ID" value={report?.kiosk?.kiosk_id} />
            <Info label="Institution" value={report?.kiosk?.institution} />
            <Info label="Branch" value={report?.kiosk?.branch} />
          </Panel>

          <Panel title="Browser & System" icon={HardDrive}>
            <Info label="Platform" value={report?.browser?.platform} />
            <Info label="Language" value={report?.browser?.language} />
            <Info
              label="Cookies"
              value={report?.browser?.cookies_enabled ? "Enabled" : "Disabled"}
            />
            <Info
              label="Network"
              value={report?.browser?.online ? "Online" : "Offline"}
            />
          </Panel>

          <Panel title="Display" icon={Monitor}>
            <Info
              label="Screen"
              value={
                report?.screen
                  ? `${report.screen.width} × ${report.screen.height}`
                  : "—"
              }
            />
            <Info
              label="Available"
              value={
                report?.screen
                  ? `${report.screen.available_width} × ${report.screen.available_height}`
                  : "—"
              }
            />
            <Info label="Pixel Ratio" value={report?.screen?.pixel_ratio} />
            <Info label="Color Depth" value={report?.screen?.color_depth} />
          </Panel>

          <Panel title="Network" icon={Network}>
            <Info
              label="Status"
              value={report?.network?.online ? "Online" : "Offline"}
            />
            <Info label="Type" value={report?.network?.connection_type} />
            <Info label="Downlink" value={report?.network?.downlink} />
            <Info label="RTT" value={report?.network?.rtt} />
          </Panel>

          <Panel title="Connected Devices" icon={Activity}>
            <div className="space-y-2">
              {(report?.devices?.connected || []).map((device) => (
                <div
                  key={device}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {device}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Device Health" icon={ShieldCheck}>
            <div className="space-y-3">
              {(report?.devices?.health || []).map((device, index) => (
                <div
                  key={`${device.device}-${index}`}
                  className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {device.device || `Device ${index + 1}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {device.message || "No message"}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                      device.success
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">
                      {device.success ? "Ready" : "Simulation"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <Icon className="w-5 h-5 text-blue-600 mb-3" />
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-gray-900 text-right break-all">
        {value || "—"}
      </span>
    </div>
  );
}