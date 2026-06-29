import React, { useMemo } from "react";
import { Copyright } from "lucide-react";
import configManager from "@/services/configManager";

export default function Footer() {
  const config = useMemo(() => configManager.getConfig(), []);

  return (
    <footer className="h-14 border-t border-blue-900/30 bg-[#071321]/90 backdrop-blur-md flex items-center justify-center px-8">
      <div className="flex items-center gap-2 text-blue-400 text-sm whitespace-nowrap">
        <Copyright className="w-4 h-4 shrink-0" />
        <span>
          Powered by Ark Technologies Group • Developed by Nexora Lab Africa •
          v{config.app.version}
        </span>
      </div>
    </footer>
  );
}