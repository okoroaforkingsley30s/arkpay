import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import InstitutionBanner from "@/components/institution/InstitutionBanner";
import DeviceStatus from "@/components/device/DeviceStatus";

export default function KioskLayout({
  children,
  showInstitution = true,
  showDevices = true,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071321] via-[#0A2540] to-[#102B4C] flex flex-col">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

          {showInstitution && <InstitutionBanner />}

          {showDevices && <DeviceStatus />}

          <section className="bg-white/5 border border-blue-900/30 rounded-3xl backdrop-blur-md p-8 min-h-[420px]">

            {children}

          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}