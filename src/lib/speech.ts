"use client";

/**
 * Saying the word out loud.
 *
 * The Web Speech API, not audio files. 1000 recordings would be ~40MB to
 * host, would need re-recording to fix one word, and would still be silent
 * for anything a customer's child typed. The browser already ships voices.
 *
 * The honest catch: a device with no English voice installed will say
 * nothing. That is why hasVoice() exists and why the UI tells the learner
 * plainly instead of leaving a button that does nothing.
 */

let warmed = false;

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

/** Voices load asynchronously on most browsers; this nudges the first fetch. */
export function warmVoices() {
  const s = synth();
  if (!s || warmed) return;
  warmed = true;
  s.getVoices();
}

function pickVoice(): SpeechSynthesisVoice | null {
  const s = synth();
  if (!s) return null;
  const voices = s.getVoices();
  if (!voices.length) return null;
  // A native English voice first; a generic "en" is fine; anything else would
  // read English words with Vietnamese phonics, which teaches the wrong sound.
  return (
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang === "en-GB") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
    null
  );
}

export function hasVoice(): boolean {
  return Boolean(pickVoice());
}

/**
 * Speaks one English word.
 *
 * Slower than default: 0.85. Children copy what they hear, and a native-speed
 * word is a blur to a five-year-old hearing it for the first time.
 */
export function say(text: string, rate = 0.85) {
  const s = synth();
  if (!s) return;
  try {
    s.cancel(); // never let two words overlap
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v?.lang ?? "en-US";
    u.rate = rate;
    u.pitch = 1.05;
    s.speak(u);
  } catch {
    // Speech is a help, not a requirement — never break the lesson over it.
  }
}
