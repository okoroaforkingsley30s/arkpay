import mockSDK from "@/lib/mockSDK";

const activeSDK = mockSDK;

export const deviceManager = {
  async getPrinterStatus() {
    return activeSDK.getPrinterStatus();
  },

  async connectPrinter() {
    return activeSDK.connectPrinter();
  },

  async disconnectPrinter() {
    return activeSDK.disconnectPrinter();
  },

  async printCard(cardData) {
    return activeSDK.printCard(cardData);
  },

  async getEncoderStatus() {
    return activeSDK.getEncoderStatus();
  },

  async readSmartCard() {
    return activeSDK.readSmartCard();
  },

  async detectCard() {
    return activeSDK.detectCard();
  },

  async detectCardRemoval() {
    return activeSDK.detectCardRemoval();
  },

  async encodeCard(chipData) {
    return activeSDK.encodeCard(chipData);
  },

  async captureFingerprint(finger = 1) {
    return activeSDK.captureFingerprint(finger);
  },

  async startCameraPreview() {
    return activeSDK.startCameraPreview();
  },

  async stopCameraPreview() {
    return activeSDK.stopCameraPreview();
  },

  async capturePhoto(mode = "customer") {
    return activeSDK.capturePhoto(mode);
  },

  async getSignaturePadStatus() {
    return activeSDK.getSignaturePadStatus();
  },

  async captureSignature() {
    return activeSDK.captureSignature();
  },

  async getPinPadStatus() {
    return activeSDK.getPinPadStatus();
  },

  async setPin(encryptedPin) {
    return activeSDK.setPin(encryptedPin);
  },

  async getContactlessReaderStatus() {
    return activeSDK.getContactlessReaderStatus();
  },

  async readContactlessCard() {
    return activeSDK.readContactlessCard();
  },
};

export default deviceManager;