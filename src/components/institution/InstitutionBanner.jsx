import React from "react";
import { Building2, MapPin, Landmark } from "lucide-react";
import { useKiosk } from "@/contexts/KioskContext";

export default function InstitutionBanner() {
  const { config } = useKiosk();

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-blue-900/30 rounded-2xl p-6">

      <div className="flex items-center gap-5">

        {/* Bank Logo */}

        <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-blue-500/30 flex items-center justify-center bg-[#0b1d33]">

          {config.institution.logo ? (
            <img
              src={config.institution.logo}
              alt="Institution Logo"
              className="w-20 h-20 object-contain"
            />
          ) : (
            <Building2 className="w-10 h-10 text-blue-400" />
          )}

        </div>

        {/* Institution Details */}

        <div className="flex-1">

          <h2 className="text-3xl font-bold text-white">
            {config.institution.name}
          </h2>

          <div className="mt-3 flex flex-wrap gap-6 text-blue-300">

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {config.institution.branch}
            </div>

            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              {config.kiosk.kioskId}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}