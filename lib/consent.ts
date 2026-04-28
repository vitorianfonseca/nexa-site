const CONSENT_KEY = "nexa_cookie_consent";
const CONSENT_VERSION = "1";

export type ConsentState = {
  version: string;
  timestamp: string;
  analytics: boolean;
};

export function saveConsent(analytics: boolean): void {
  try {
    const state: ConsentState = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      analytics,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("nexa:consent-updated", { detail: state }));
  } catch {}
}

export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as ConsentState;
    if (state.version !== CONSENT_VERSION) return null;
    return state;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics ?? false;
}
