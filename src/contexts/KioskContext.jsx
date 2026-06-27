import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { KIOSK_CONFIG, DEVICE_STATUS } from "@/config/kiosk";

const KioskContext = createContext(null);

export function KioskProvider({ children }) {
  const [config, setConfig] = useState(KIOSK_CONFIG);
  const [deviceStatus, setDeviceStatus] = useState(DEVICE_STATUS);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const updateInstitution = (institutionUpdates = {}) => {
    setConfig((prev) => ({
      ...prev,
      institution: {
        ...prev.institution,
        ...institutionUpdates,
      },
    }));
  };

  const updateDeviceStatus = (deviceKey, status) => {
    setDeviceStatus((prev) => ({
      ...prev,
      [deviceKey]: status,
    }));
  };

  const markDeviceReady = (deviceKey) => {
    updateDeviceStatus(deviceKey, "Ready");
  };

  const markDeviceOffline = (deviceKey) => {
    updateDeviceStatus(deviceKey, "Offline");
  };

  const value = useMemo(
    () => ({
      config,
      deviceStatus,
      isOnline,
      currentTime,
      updateInstitution,
      updateDeviceStatus,
      markDeviceReady,
      markDeviceOffline,
    }),
    [config, deviceStatus, isOnline, currentTime]
  );

  return (
    <KioskContext.Provider value={value}>
      {children}
    </KioskContext.Provider>
  );
}

export function useKiosk() {
  const context = useContext(KioskContext);

  if (!context) {
    throw new Error("useKiosk must be used within a KioskProvider");
  }

  return context;
}