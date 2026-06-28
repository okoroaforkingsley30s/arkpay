import { useEffect, useRef } from "react";

export default function VoiceGuide({
  message,
  enabled = true,
  rate = 0.95,
  pitch = 1,
  volume = 1,
  delay = 1000,
}) {
  const spokenRef = useRef(false);

  useEffect(() => {
    if (!enabled || !message || spokenRef.current) return;

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    spokenRef.current = true;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.88;
utterance.pitch = 0.95;
utterance.volume = 1;
    utterance.lang = "en-US";

    const applyVoice = () => {
      const voices = window.speechSynthesis.getVoices();

const preferredVoices = [
  "Jenny",
  "Aria",
  "Guy",
  "Ryan",
  "Sonia",
  "Libby",
  "David",
  "Zira",
  "Hazel",
  "George"
];

let selectedVoice = null;

for (const preferred of preferredVoices) {
  selectedVoice = voices.find(v =>
    v.name.toLowerCase().includes(preferred.toLowerCase())
  );

  if (selectedVoice) break;
}

if (!selectedVoice) {
  selectedVoice =
    voices.find(v => v.lang === "en-GB") ||
    voices.find(v => v.lang === "en-US") ||
    voices.find(v => v.lang.startsWith("en"));
}

if (selectedVoice) {
  utterance.voice = selectedVoice;
}
    };

    applyVoice();

    const timer = setTimeout(() => {
      applyVoice();
      window.speechSynthesis.speak(utterance);
    }, delay);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [message, enabled, rate, pitch, volume, delay]);

  return null;
}