import React from "react";
import {
  Wifi,
  WifiOff,
  Clock3,
  CalendarDays,
  Building2,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useKiosk } from "@/contexts/KioskContext";
import { useMemo } from "react";
import configManager from "@/services/configManager";

export default function Header() {
  const navigate = useNavigate();

  const { isOnline, currentTime } = useKiosk();

const config = useMemo(() => configManager.getConfig(), []);

  const time = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = currentTime.toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="w-full h-20 bg-[#071321]/90 backdrop-blur-md border-b border-blue-900/30 flex items-center justify-between px-8">

      {/* Left */}

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">

          <Building2 className="text-white w-6 h-6" />

        </div>

        <div>

          <h1 className="text-white font-bold text-2xl">

            {config.app.name}

          </h1>

          <p className="text-blue-300 text-sm">

            {config.app.tagline}

          </p>

        </div>

      </div>

      {/* Center */}

      <div className="text-center">

        <p className="text-white font-semibold text-lg">

          {config.institution.name}

        </p>

        <p className="text-blue-300 text-sm">

          {config.institution.branch}

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 text-blue-200">

          {isOnline ? (
            <Wifi className="w-5 h-5 text-green-400" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}

          <span className="text-sm">

            {isOnline ? "Online" : "Offline"}

          </span>

        </div>

        <div className="text-right">

          <div className="flex items-center justify-end gap-2 text-white">

            <Clock3 className="w-4 h-4 text-blue-300" />

            {time}

          </div>

          <div className="flex items-center justify-end gap-2 text-blue-300 text-sm">

            <CalendarDays className="w-4 h-4" />

            {date}

          </div>

        </div>

        <button
          onClick={() => navigate("/admin-login")}
          className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 transition flex items-center justify-center"
        >
          <Settings className="text-white w-5 h-5" />
        </button>

      </div>

    </header>
  );
}