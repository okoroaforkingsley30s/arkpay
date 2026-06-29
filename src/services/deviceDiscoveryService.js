export const deviceDiscoveryService = {
  async scanBrowserDevices() {
    const result = {
      cameras: [],
      microphones: [],
      speakers: [],
      supported: false,
      permissionRequired: false,
      message: "",
    };

    if (!navigator.mediaDevices?.enumerateDevices) {
      return {
        ...result,
        message: "Browser device discovery is not supported.",
      };
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      result.supported = true;
      result.cameras = devices
        .filter((device) => device.kind === "videoinput")
        .map((device, index) => ({
          id: device.deviceId,
          label: device.label || `Camera ${index + 1}`,
          kind: device.kind,
          type: "camera",
          connection: "Browser MediaDevices",
        }));

      result.microphones = devices
        .filter((device) => device.kind === "audioinput")
        .map((device, index) => ({
          id: device.deviceId,
          label: device.label || `Microphone ${index + 1}`,
          kind: device.kind,
          type: "microphone",
          connection: "Browser MediaDevices",
        }));

      result.speakers = devices
        .filter((device) => device.kind === "audiooutput")
        .map((device, index) => ({
          id: device.deviceId,
          label: device.label || `Speaker ${index + 1}`,
          kind: device.kind,
          type: "speaker",
          connection: "Browser MediaDevices",
        }));

      if (
        result.cameras.length === 0 &&
        result.microphones.length === 0 &&
        result.speakers.length === 0
      ) {
        result.message = "No browser-accessible media devices found.";
      } else {
        result.message = "Browser-accessible media devices scanned.";
      }

      return result;
    } catch (error) {
      return {
        ...result,
        supported: true,
        permissionRequired: true,
        message:
          error?.message ||
          "Unable to scan browser devices. Camera permission may be required.",
      };
    }
  },

  async requestCameraPermission() {
    if (!navigator.mediaDevices?.getUserMedia) {
      return {
        success: false,
        message: "Camera permission is not supported by this browser.",
      };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      stream.getTracks().forEach((track) => track.stop());

      return {
        success: true,
        message: "Camera permission granted.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.message ||
          "Camera permission was denied or the camera is unavailable.",
      };
    }
  },

  async scanAll() {
    const browserDevices = await this.scanBrowserDevices();

    return {
      success: true,
      mode: "browser_only",
      browserDevices,
      windowsDevices: {
        supported: false,
        devices: [],
        message:
          "Windows USB/device discovery requires Electron or a native Windows service.",
      },
      message: "Device discovery scan completed.",
    };
  },
};

export default deviceDiscoveryService;