/**
 * ArkPay Mock SDK Service
 * Hardware Abstraction Layer for kiosk device integration.
 * Replace each function body with real SDK calls when vendor SDKs are available.
 */

const SDK_NOT_CONNECTED = "Device SDK not connected yet";

const delay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function notConnected(device, extra = {}) {
  return {
    success: false,
    message: SDK_NOT_CONNECTED,
    device,
    ...extra,
  };
}

export const mockSDK = {
  async getPrinterStatus() {
    await delay();
    return notConnected("Seaory S21 Printer", {
      status: "offline",
    });
  },

  async connectPrinter() {
    await delay();
    return notConnected("Seaory S21 Printer");
  },

  async disconnectPrinter() {
    await delay();
    return {
      success: true,
      message: "Printer disconnected",
      device: "Seaory S21 Printer",
      status: "disconnected",
    };
  },

  async printCard(cardData) {
    await delay();
    console.log("[ArkPay SDK] printCard called with:", cardData);
    return notConnected("Seaory S21 Printer");
  },

  async getEncoderStatus() {
    await delay();
    return notConnected("Smart Card Encoder", {
      status: "offline",
    });
  },

  async readSmartCard() {
    await delay(1000);
    console.log("[ArkPay SDK] readSmartCard called");
    return notConnected("Smart Card Reader");
  },

  async detectCard() {
    await delay();
    return notConnected("Card Path Sensor", {
      inserted: false,
    });
  },

  async detectCardRemoval() {
    await delay();
    return notConnected("Card Collection Sensor", {
      removed: false,
    });
  },

  async encodeCard(chipData) {
    await delay();
    console.log("[ArkPay SDK] encodeCard called with:", chipData);
    return notConnected("Smart Card Reader/Encoder");
  },

  async captureFingerprint(finger = 1) {
    await delay(1200);
    console.log("[ArkPay SDK] captureFingerprint called, finger:", finger);
    return notConnected("Fingerprint Scanner");
  },

  async startCameraPreview() {
    await delay();
    return notConnected("Customer Camera");
  },

  async stopCameraPreview() {
    await delay();
    return {
      success: true,
      message: "Camera preview stopped",
      device: "Customer Camera",
    };
  },

  async capturePhoto(mode = "id") {
    await delay();
    console.log("[ArkPay SDK] capturePhoto called, mode:", mode);
    return notConnected("Customer Camera");
  },

  async getSignaturePadStatus() {
    await delay();
    return notConnected("Signature Pad", {
      status: "offline",
    });
  },

  async captureSignature() {
    await delay();
    return notConnected("Signature Pad");
  },

  async getPinPadStatus() {
    await delay();
    return notConnected("PIN Pad", {
      status: "offline",
    });
  },

  async setPin(encryptedPin) {
    await delay();
    console.log("[ArkPay SDK] setPin called:", encryptedPin ? "PIN block received" : "No PIN block");
    return notConnected("PIN Pad");
  },

  async readContactlessCard() {
    await delay();
    return notConnected("Contactless Reader", {
      detected: false,
    });
  },

  async getContactlessReaderStatus() {
    await delay();
    return notConnected("Contactless Reader", {
      status: "offline",
    });
  },

  async printReceipt(receiptData) {
    await delay();
    console.log("[ArkPay SDK] printReceipt called with:", receiptData);
    return notConnected("Receipt Printer");
  },
};

export default mockSDK;