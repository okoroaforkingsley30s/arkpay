export const KIOSK_CONFIG = {
  app: {
    name: "ArkPay",
    version: "1.0.0",
    tagline: "Smart Card Personalization Platform",
    manufacturer: "Ark Technologies Group",
    developer: "Nexora Lab",
    environment: "development",
  },

  institution: {
    code: "",
    name: "No Institution Selected",
    branch: "Not Configured",
    branchCode: "",
    logo: null,
  },

  kiosk: {
    kioskId: "ARKPAY-001",
    location: "",
    terminalId: "",
    serialNumber: "",
  },

  appearance: {
    theme: "dark",
    language: "English",
    showDeveloperBranding: true,
    showClock: true,
    showDate: true,
    showNetworkStatus: true,
    showDeviceStatus: true,
  },

  devices: {
    printer: false,
    smartCardReader: false,
    contactlessReader: false,
    fingerprintScanner: false,
    camera: false,
    signaturePad: false,
    pinPad: false,
    barcodeScanner: false,
  },

  personalization: {
    printerModel: "Seaory S21",
    encoder: "Unknown",
    embossingEnabled: false,
    chipEncodingEnabled: false,
    magneticEncodingEnabled: false,
  },

  security: {
    authentication: false,
    biometricVerification: false,
    pinVerification: false,
    auditLogging: true,
  },

  support: {
    phone: "",
    email: "",
    website: "",
  },
};

export const SERVICES = [
  {
    id: "new-card",
    title: "Issue New Card",
    description: "Create and personalize a new debit or prepaid card.",
  },
  {
    id: "replace-card",
    title: "Replace Card",
    description: "Replace a lost, damaged, or expired card.",
  },
  {
    id: "reissue-card",
    title: "Re-Issue Card",
    description: "Issue another copy of an existing card.",
  },
  {
    id: "pin-change",
    title: "PIN Change",
    description: "Change your existing card PIN securely.",
  },
  {
    id: "balance",
    title: "Balance Inquiry",
    description: "Check your account balance.",
  },
];

export const DEVICE_STATUS = {
  printer: "Offline",
  smartCardReader: "Offline",
  contactlessReader: "Offline",
  fingerprintScanner: "Offline",
  camera: "Offline",
  signaturePad: "Offline",
  pinPad: "Offline",
  barcodeScanner: "Offline",
};