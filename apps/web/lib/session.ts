/**
 * Wizard state kept in sessionStorage (never localStorage): it survives a reload of
 * the tab and disappears with it. Nothing leaves the browser.
 */
import type { Answers } from "@nis2-check/engine";

export type Step = "sector" | "questions" | "verdict";

export interface Session {
  step: Step;
  sectorId?: string;
  answers: Record<string, string | string[]>;
  /** Id of the question on screen. */
  current?: string;
}

const KEY = "nis2-check:session";
export const EMPTY: Session = { step: "sector", answers: {} };

export function readSession(): Session {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const s = JSON.parse(raw) as Session;
    return s && typeof s === "object" && s.answers ? s : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function writeSession(s: Session): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // storage unavailable (private mode, quota): the wizard keeps working in memory
  }
}

export function clearSession(): void {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export const asAnswers = (a: Session["answers"]): Answers => a;
