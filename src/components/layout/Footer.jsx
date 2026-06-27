import React from "react";
import { ShieldCheck, Wifi, WifiOff, Copyright } from "lucide-react";
import { useKiosk } from "@/contexts/KioskContext";

export default function Footer() {
  const { config, isOnline } = useKiosk();

  return (
    <footer className="h-14 border-t border-blue-900/30 bg-[#071321]/90 backdrop-blur-md flex items-center justify-between px-8">

      {/* Left */}

      <div className="flex items-center gap-6 text-sm">

        <div className="flex items-center gap-2 text-green-400">
          <ShieldCheck className="w-4 h-4" />
          <span>PCI Secure</span>
        </div>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-400" />
              <span className="text-red-400">Offline</span>
            </>
          )}
        </div>

      </div>

      {/* Center */}

      <div className="text-blue-300 text-sm font-medium">
        {config.app.name} OS v{config.app.version}
      </div>

      {/* Right */}

      <div className="flex items-center gap-2 text-blue-400 text-sm">

        <Copyright className="w-4 h-4" />

        {config.appearance.showDeveloperBranding
          ? `${config.app.manufacturer} • Developed by ${config.app.developer}`
          : config.app.manufacturer}

      </div>

    </footer>
  );
}