/**
 * ArkPay Mock SDK Service
 * Placeholder functions for hardware device integration.
 * Replace each function body with real SDK calls when the device service is connected.
 */

const SDK_NOT_CONNECTED = "Device SDK not connected yet";

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const mockSDK = {
  /**
   * Sends card data to the Seaory S21 printer for physical card printing.
   * @param {object} cardData - { fullName, cardNumber, expiry, cardType }
   */
  async printCard(cardData) {
    await delay();
    console.log("[ArkPay SDK] printCard called with:", cardData);
    return { success: false, message: SDK_NOT_CONNECTED, device: "Seaory S21 Printer" };
  },

  /**
   * Encodes chip/magnetic stripe data onto the card.
   * @param {object} chipData - { accountNumber, cardNumber, serviceCode, pinOffset }
   */
  async encodeCard(chipData) {
    await delay();
    console.log("[ArkPay SDK] encodeCard called with:", chipData);
    return { success: false, message: SDK_NOT_CONNECTED, device: "Smart Card Reader/Encoder" };
  },

  /**
   * Captures fingerprint from the biometric scanner.
   * @param {number} finger - finger index (1-10)
   */
  async captureFingerprint(finger = 1) {
    await delay(1200);
    console.log("[ArkPay SDK] captureFingerprint called, finger:", finger);
    return { success: false, message: SDK_NOT_CONNECTED, device: "Fingerprint Scanner" };
  },

  /**
   * Captures a photo/ID scan using the kiosk camera.
   * @param {string} mode - "id" | "face"
   */
  async capturePhoto(mode = "id") {
    await delay();
    console.log("[ArkPay SDK] capturePhoto called, mode:", mode);
    return { success: false, message: SDK_NOT_CONNECTED, device: "Camera" };
  },

  /**
   * Reads data from an inserted smart card.
   */
  async readSmartCard() {
    await delay(1000);
    console.log("[ArkPay SDK] readSmartCard called");
    return { success: false, message: SDK_NOT_CONNECTED, device: "Smart Card Reader" };
  },

  /**
   * Sends PIN block to the PIN pad for secure PIN setting.
   * @param {string} encryptedPin - encrypted PIN block from PIN pad
   */
  async setPin(encryptedPin) {
    await delay();
    console.log("[ArkPay SDK] setPin called");
    return { success: false, message: SDK_NOT_CONNECTED, device: "PIN Pad" };
  },

  /**
   * Sends receipt data to the printer for thermal receipt output.
   * @param {object} receiptData - { refNo, name, cardType, date, branch }
   */
  async printReceipt(receiptData) {
    await delay();
    console.log("[ArkPay SDK] printReceipt called with:", receiptData);
    return { success: false, message: SDK_NOT_CONNECTED, device: "Seaory S21 Printer (Receipt)" };
  },
};

export default mockSDK;