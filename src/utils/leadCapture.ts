import {
  sanitizeTextInput,
  containsSuspiciousInjection,
  isValidEmail,
  isValidPhone,
  openExternalUrlSafely,
} from '@/utils/security';
import { OFFICIAL_WHATSAPP_NUMBER } from '@/utils/whatsappEnquiry';

export const POPUP_SERVICE_OPTIONS = [
  'Custom Software Development',
  'ERP Software',
  'CRM Software',
  'HRMS & Payroll',
  'SaaS Development',
  'Mobile App Development',
  'Website Development',
  'AI Automation',
  'Inventory Management',
  'Billing & GST Software',
  'Other',
] as const;

export type PopupServiceOption = (typeof POPUP_SERVICE_OPTIONS)[number];

// 5–10 seconds initial load delay and 5–10 seconds recurring reopen delay after dismissal
export const INITIAL_POPUP_DELAY_MS = 7_000;
export const REOPEN_POPUP_DELAY_MS = 7_000;

const SUBMITTED_STORAGE_KEY = 'ais_lead_submitted_v1';
const NEXT_SHOW_AT_SESSION_KEY = 'ais_lead_next_show_at_v1';

export interface PopupLeadFormData {
  name: string;
  mobile: string;
  email: string;
  service: string;
  requirements: string;
  consent: boolean;
}

/**
 * Detects search engine crawlers and automated performance bots so the popup
 * never blocks indexing or Lighthouse/PageSpeed runs.
 */
export function isSearchCrawlerOrAuditBot(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  const ua = navigator.userAgent || '';
  return /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|AhrefsBot|SemrushBot|Applebot|facebot|ia_archiver|Chrome-Lighthouse|PageSpeed|PTST/i.test(
    ua
  );
}

/**
 * Checks whether the visitor has already submitted an enquiry.
 * Stores only a boolean flag ('1') — never stores personal details in browser storage.
 */
export function hasVisitorSubmittedLead(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SUBMITTED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Permanently marks the visitor as having submitted an enquiry so the popup
 * stops showing for that visitor across all pages.
 */
export function markVisitorLeadSubmitted(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SUBMITTED_STORAGE_KEY, '1');
    window.sessionStorage.removeItem(NEXT_SHOW_AT_SESSION_KEY);
  } catch {
    // Ignore storage quota / private mode restrictions
  }
}

/**
 * Gets or initializes the next popup trigger timestamp across internal page navigations.
 */
export function getOrInitNextPopupTimestamp(now = Date.now()): number {
  if (typeof window === 'undefined') return now + INITIAL_POPUP_DELAY_MS;
  try {
    const raw = window.sessionStorage.getItem(NEXT_SHOW_AT_SESSION_KEY);
    if (raw) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed) && parsed > 0) {
        return parsed;
      }
    }
    const nextShowAt = now + INITIAL_POPUP_DELAY_MS;
    window.sessionStorage.setItem(NEXT_SHOW_AT_SESSION_KEY, String(nextShowAt));
    return nextShowAt;
  } catch {
    return now + INITIAL_POPUP_DELAY_MS;
  }
}

/**
 * Schedules the popup to reopen 5–10 seconds (7s) after the visitor closes it without submitting.
 */
export function schedulePopupReopenAfterDismissal(now = Date.now()): number {
  const nextShowAt = now + REOPEN_POPUP_DELAY_MS;
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(NEXT_SHOW_AT_SESSION_KEY, String(nextShowAt));
    } catch {
      // Ignore storage errors
    }
  }
  return nextShowAt;
}

/**
 * Validates the enquiry popup form fields on the frontend before opening WhatsApp.
 */
export function validatePopupLeadForm(form: PopupLeadFormData): {
  valid: boolean;
  error?: string;
} {
  const rawFields = [
    form.name,
    form.mobile,
    form.email,
    form.service,
    form.requirements,
  ];

  if (rawFields.some((val) => containsSuspiciousInjection(val))) {
    return {
      valid: false,
      error: 'Invalid characters detected. Please enter plain text without HTML or script tags.',
    };
  }

  const name = sanitizeTextInput(form.name, 100);
  const mobile = sanitizeTextInput(form.mobile, 20);
  const email = sanitizeTextInput(form.email, 254);
  const service = sanitizeTextInput(form.service, 100);

  if (!name || name.length < 2) {
    return { valid: false, error: 'Please enter your full name (2–100 characters).' };
  }

  if (!mobile || !isValidPhone(mobile)) {
    return { valid: false, error: 'Please enter a valid 10 to 15 digit mobile / WhatsApp number.' };
  }

  if (email && !isValidEmail(email)) {
    return { valid: false, error: 'Please enter a valid email address or leave it optional.' };
  }

  if (
    !service ||
    !POPUP_SERVICE_OPTIONS.includes(service as PopupServiceOption)
  ) {
    return { valid: false, error: 'Please select the service you are interested in.' };
  }

  if (form.requirements && form.requirements.trim().length > 1000) {
    return { valid: false, error: 'Project requirements cannot exceed 1,000 characters.' };
  }

  if (!form.consent) {
    return {
      valid: false,
      error: 'Please check the consent box so our team can assist you with your enquiry.',
    };
  }

  return { valid: true };
}

/**
 * Builds the pre-filled WhatsApp Click-to-Chat URL addressed to +91 9990390519.
 */
export function buildPopupWhatsAppUrl(form: PopupLeadFormData, sourceUrl?: string): string {
  const safeName = sanitizeTextInput(form.name, 100);
  const safeMobile = sanitizeTextInput(form.mobile, 20);
  const safeEmail = sanitizeTextInput(form.email, 254);
  const safeService = sanitizeTextInput(form.service, 100);
  const safeReqs = sanitizeTextInput(form.requirements, 1000);
  const safeSource =
    sanitizeTextInput(sourceUrl || (typeof window !== 'undefined' ? window.location.href : ''), 300) ||
    'https://aisoftwaretechnology.in/';

  const lines = [
    '*NEW PROJECT ENQUIRY — AI SOFTWARE TECHNOLOGY*',
    '',
    `Full Name: ${safeName}`,
    `Mobile Number: ${safeMobile}`,
  ];

  if (safeEmail) {
    lines.push(`Email Address: ${safeEmail}`);
  }

  lines.push(`Interested Service: ${safeService}`);
  lines.push(`Project Requirements: ${safeReqs || 'To be discussed on WhatsApp / call'}`);
  lines.push(`Source Page: ${safeSource}`);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Opens the pre-filled WhatsApp Click-to-Chat URL in a new tab safely.
 */
export function openPopupWhatsAppChat(form: PopupLeadFormData, sourceUrl?: string): string {
  const url = buildPopupWhatsAppUrl(form, sourceUrl);
  openExternalUrlSafely(url);
  return url;
}
