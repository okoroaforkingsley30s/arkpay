import mockSDK from "@/lib/mockSDK";

const activeSDK = mockSDK;
const SIMULATION_MODE = true;

function normalizeResult(result, device = "Unknown Device") {
  return {
    success: result?.success === true,
    simulated: SIMULATION_MODE || result?.simulated === true,
    device: result?.device || device,
    message: result?.message || "Device operation completed.",
    ...result,
  };
}

async function safeCall(action, fallbackDevice, ...args) {
  try {
    if (typeof activeSDK[action] !== "function") {
      return normalizeResult(
        {
          success: false,
          message: `${action} is not available in the active SDK.`,
        },
        fallbackDevice
      );
    }

    const result = await activeSDK[action](...args);
    return normalizeResult(result, fallbackDevice);
  } catch (error) {
    return normalizeResult(
      {
        success: false,
        message: error?.message || `${action} failed.`,
      },
      fallbackDevice
    );
  }
}

export const deviceManager = {
  simulationMode: SIMULATION_MODE,

  async initialize() {
    return {
      success: true,
      simulated: SIMULATION_MODE,
      message: "Device manager initialized.",
    };
  },

  async shutdown() {
    return {
      success: true,
      simulated: SIMULATION_MODE,
      message: "Device manager shutdown completed.",
    };
  },

  async healthCheck() {
    const checks = await Promise.all([
      this.getPrinterStatus(),
      this.getEncoderStatus(),
      this.getSignaturePadStatus(),
      this.getPinPadStatus(),
      this.getContactlessReaderStatus(),
    ]);

    return {
      success: checks.some((check) => check.success),
      simulated: SIMULATION_MODE,
      devices: checks,
      message: "Device health check completed.",
    };
  },

  async getConnectedDevices() {
    return {
      success: true,
      simulated: SIMULATION_MODE,
      devices: [
        "Seaory S21 Card Printer",
        "Smart Card Encoder",
        "Fingerprint Scanner",
        "Customer Camera",
        "Signature Pad",
        "PIN Pad",
        "Contactless Reader",
      ],
      message: "Connected device list returned.",
    };
  },

  async getPrinterStatus() {
    return safeCall("getPrinterStatus", "Seaory S21 Printer");
  },

  async connectPrinter() {
    return safeCall("connectPrinter", "Seaory S21 Printer");
  },

  async disconnectPrinter() {
    return safeCall("disconnectPrinter", "Seaory S21 Printer");
  },

  async loadBlankCard() {
    return safeCall("detectCard", "Card Path Sensor");
  },

  async detectCard() {
    return safeCall("detectCard", "Card Path Sensor");
  },

  async ejectCard() {
    return {
      success: true,
      simulated: SIMULATION_MODE,
      device: "Card Printer",
      message: "Card ejected to collection area.",
    };
  },

  async retainCard() {
    return {
      success: true,
      simulated: SIMULATION_MODE,
      device: "Card Printer",
      message: "Card retained by kiosk.",
    };
  },

  async detectCardRemoval() {
    return safeCall("detectCardRemoval", "Card Collection Sensor");
  },

  async printCard(cardData) {
    return safeCall("printCard", "Seaory S21 Printer", cardData);
  },

  async getEncoderStatus() {
    return safeCall("getEncoderStatus", "Smart Card Encoder");
  },

  async readSmartCard() {
    return safeCall("readSmartCard", "Smart Card Reader");
  },

  async encodeCard(chipData) {
    return safeCall("encodeCard", "Smart Card Reader/Encoder", chipData);
  },

  async writeMagneticStripe(trackData) {
    return safeCall("encodeCard", "Magnetic Stripe Encoder", trackData);
  },

  async verifyCard(cardData) {
    return {
      success: true,
      simulated: SIMULATION_MODE,
      device: "Card Verification",
      message: "Card verification completed.",
      cardData,
    };
  },

  async captureFingerprint(finger = 1) {
    return safeCall("captureFingerprint", "Fingerprint Scanner", finger);
  },

  async startCameraPreview() {
    return safeCall("startCameraPreview", "Customer Camera");
  },

  async stopCameraPreview() {
    return safeCall("stopCameraPreview", "Customer Camera");
  },

  async capturePhoto(mode = "customer") {
    return safeCall("capturePhoto", "Customer Camera", mode);
  },

  async getSignaturePadStatus() {
    return safeCall("getSignaturePadStatus", "Signature Pad");
  },

  async captureSignature() {
    return safeCall("captureSignature", "Signature Pad");
  },

  async getPinPadStatus() {
    return safeCall("getPinPadStatus", "PIN Pad");
  },

  async setPin(encryptedPin) {
    return safeCall("setPin", "PIN Pad", encryptedPin);
  },

  async getContactlessReaderStatus() {
    return safeCall("getContactlessReaderStatus", "Contactless Reader");
  },

  async readContactlessCard() {
    return safeCall("readContactlessCard", "Contactless Reader");
  },
};

export default deviceManager;