const SDK_NOT_CONNECTED = "Device SDK not connected yet";

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

function response(device, action, success = false, message = SDK_NOT_CONNECTED, data = null) {
  return {
    success,
    device,
    action,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export const deviceService = {
  async getDeviceHealth() {
    await delay(300);

    return {
      printer: "Offline",
      smartCardReader: "Offline",
      contactlessReader: "Offline",
      fingerprintScanner: "Offline",
      camera: "Offline",
      signaturePad: "Offline",
      pinPad: "Offline",
      barcodeScanner: "Offline",
    };
  },

  async testPrinter() {
    await delay();
    return response("Seaory S21 Printer", "testPrinter");
  },

  async printCard(cardData) {
    await delay();
    return response("Seaory S21 Printer", "printCard", false, SDK_NOT_CONNECTED, cardData);
  },

  async encodeCard(cardData) {
    await delay();
    return response("Card Encoder", "encodeCard", false, SDK_NOT_CONNECTED, cardData);
  },

  async readSmartCard() {
    await delay();
    return response("Smart Card Reader", "readSmartCard");
  },

  async capturePhoto() {
    await delay();
    return response("Camera", "capturePhoto");
  },

  async captureFingerprint() {
    await delay();
    return response("Fingerprint Scanner", "captureFingerprint");
  },

  async captureSignature() {
    await delay();
    return response("Signature Pad", "captureSignature");
  },

  async setPin() {
    await delay();
    return response("PIN Pad", "setPin");
  },

  async readContactlessCard() {
    await delay();
    return response("Contactless Reader", "readContactlessCard");
  },

  async scanBarcode() {
    await delay();
    return response("Barcode Scanner", "scanBarcode");
  },

  async printReceipt(receiptData) {
    await delay();
    return response("Receipt Printer", "printReceipt", false, SDK_NOT_CONNECTED, receiptData);
  },
};

export default deviceService;