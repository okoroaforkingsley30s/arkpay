const DEFAULT_CONFIG = {
  app: {
    name: "ArkPay Kiosk",
    version: "0.1.0",
    mode: "simulation",
  },

  institution: {
    name: "Institution not configured",
    branch: "Branch not configured",
    logoUrl: null,
  },

  kiosk: {
    id: "ARK-KIOSK-001",
    location: "Main Branch — Lobby",
    region: "Nigeria",
  },

  devices: {
    printer: {
      name: "Seaory S21 Card Printer",
      vendor: "Seaory",
      model: "S21",
      type: "card_printer",
      connection: "USB",
      port: "USB Port 1",
      sdk: "mock",
      driver: "Seaory S21 Driver",
      serialNumber: "",
      enabled: true,
    },

    encoder: {
      name: "Smart Card Encoder",
      vendor: "Generic",
      model: "USB CCID",
      type: "card_encoder",
      connection: "USB / CCID",
      port: "Microsoft USB CCID",
      sdk: "mock",
      driver: "Microsoft USB CCID",
      serialNumber: "",
      enabled: true,
    },

    fingerprint: {
      name: "Fingerprint Scanner",
      vendor: "Generic",
      model: "USB Fingerprint Scanner",
      type: "fingerprint_scanner",
      connection: "USB",
      port: "USB Port 3",
      sdk: "mock",
      driver: "Vendor Driver Required",
      serialNumber: "",
      enabled: true,
    },

    camera: {
      name: "Customer Camera",
      vendor: "Generic",
      model: "USB2.0 Camera",
      type: "camera",
      connection: "USB",
      port: "USB Port 2",
      sdk: "browser",
      driver: "Windows Camera Driver",
      serialNumber: "",
      enabled: true,
    },

    signaturePad: {
      name: "Signature Pad",
      vendor: "Generic",
      model: "Signature Device",
      type: "signature_pad",
      connection: "USB / HID",
      port: "USB HID",
      sdk: "mock",
      driver: "Vendor Driver Required",
      serialNumber: "",
      enabled: true,
    },

    pinPad: {
      name: "PIN Pad",
      vendor: "Vendor required",
      model: "PIN Pad",
      type: "pin_pad",
      connection: "Serial / USB",
      port: "Vendor required",
      sdk: "mock",
      driver: "Vendor Driver Required",
      serialNumber: "",
      enabled: false,
    },

    contactlessReader: {
      name: "Contactless Reader",
      vendor: "Vendor required",
      model: "NFC Module",
      type: "contactless_reader",
      connection: "NFC / USB",
      port: "Vendor required",
      sdk: "mock",
      driver: "Vendor Driver Required",
      serialNumber: "",
      enabled: false,
    },

    barcodeScanner: {
      name: "Barcode Scanner",
      vendor: "Generic",
      model: "USB Barcode Scanner",
      type: "barcode_scanner",
      connection: "USB HID",
      port: "USB HID",
      sdk: "keyboard",
      driver: "Windows HID Driver",
      serialNumber: "",
      enabled: false,
    },
  },

  sdk: {
    active: "mock",
    simulationMode: true,
  },
};

const STORAGE_KEY = "arkpay_kiosk_config";

function deepMerge(defaults, saved) {
  const output = { ...defaults };

  Object.keys(saved || {}).forEach((key) => {
    if (
      saved[key] &&
      typeof saved[key] === "object" &&
      !Array.isArray(saved[key]) &&
      defaults[key] &&
      typeof defaults[key] === "object" &&
      !Array.isArray(defaults[key])
    ) {
      output[key] = deepMerge(defaults[key], saved[key]);
    } else {
      output[key] = saved[key];
    }
  });

  return output;
}

function loadConfig() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_CONFIG;

    return deepMerge(DEFAULT_CONFIG, JSON.parse(saved));
  } catch {
    return DEFAULT_CONFIG;
  }
}

export const configManager = {
  getConfig() {
    return loadConfig();
  },

  saveConfig(config) {
    const nextConfig = deepMerge(DEFAULT_CONFIG, config);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
    return nextConfig;
  },

  resetConfig() {
    window.localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_CONFIG;
  },

  getApp() {
    return loadConfig().app;
  },

  getInstitution() {
    return loadConfig().institution;
  },

  getKiosk() {
    return loadConfig().kiosk;
  },

  getDevices() {
    return loadConfig().devices;
  },

  getDevice(deviceKey) {
    return loadConfig().devices?.[deviceKey] || null;
  },

  getSDK() {
    return loadConfig().sdk;
  },

  isSimulationMode() {
    return loadConfig().sdk.simulationMode === true;
  },
};

export default configManager;