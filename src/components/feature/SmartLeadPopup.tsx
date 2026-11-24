import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  POPUP_SERVICE_OPTIONS,
  PopupLeadFormData,
  isSearchCrawlerOrAuditBot,
  hasVisitorSubmittedLead,
  markVisitorLeadSubmitted,
  getOrInitNextPopupTimestamp,
  schedulePopupReopenAfterDismissal,
  validatePopupLeadForm,
  openPopupWhatsAppChat,
} from '@/utils/leadCapture';

export default function SmartLeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(() => hasVisitorSubmittedLead());
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const [form, setForm] = useState<PopupLeadFormData>({
    name: '',
    mobile: '',
    email: '',
    service: '',
    requirements: '',
    consent: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const clearScheduledTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNextTrigger = useCallback(
    (targetTimestamp: number) => {
      clearScheduledTimer();
      if (hasVisitorSubmittedLead() || isSearchCrawlerOrAuditBot()) return;

      const remainingMs = Math.max(250, targetTimestamp - Date.now());
      timerRef.current = window.setTimeout(() => {
        if (hasVisitorSubmittedLead()) return;
        previousFocusRef.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
      }, remainingMs);
    },
    [clearScheduledTimer]
  );

  // Initialize persistent 5–10 second (7s) timer across website pages until visitor clicks Submit
  useEffect(() => {
    if (hasSubmitted || isSearchCrawlerOrAuditBot()) {
      clearScheduledTimer();
      return;
    }
    if (!isOpen) {
      const targetTs = getOrInitNextPopupTimestamp();
      scheduleNextTrigger(targetTs);
    }
    return () => {
      clearScheduledTimer();
    };
  }, [hasSubmitted, isOpen, scheduleNextTrigger, clearScheduledTimer]);

  // Dismiss handler: if visitor closes without submitting, reopen after 5–10 seconds (7s)
  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    setShowPrivacyPolicy(false);
    setErrorMessage('');

    if (!hasSubmitted && !hasVisitorSubmittedLead()) {
      const nextTs = schedulePopupReopenAfterDismissal();
      scheduleNextTrigger(nextTs);
    }

    if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      previousFocusRef.current.focus();
    }
  }, [hasSubmitted, scheduleNextTrigger]);

  // Keyboard accessibility: Escape key & Focus Trap inside dialog
  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (dialogRef.current) {
        dialogRef.current.focus();
      }
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleDismiss();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleDismiss]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validatePopupLeadForm(form);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please verify your details and try again.');
      return;
    }

    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : 'https://aisoftwaretechnology.in/';

    // 1. Mark submitted so the popup stops appearing for this visitor
    markVisitorLeadSubmitted();
    setHasSubmitted(true);
    clearScheduledTimer();

    // 2. Open WhatsApp Click-to-Chat (+91 9990390519) with pre-filled enquiry details
    openPopupWhatsAppChat(form, currentUrl);

    // 3. Close the popup cleanly
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          aria-live="polite"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="smart-enquiry-popup-title"
            aria-describedby="smart-enquiry-popup-desc"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#07111F] border border-white/[0.14] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(31,60,255,0.22)] text-white my-auto"
          >
            {/* Top gradient accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500" />

            {/* Header */}
            <div className="sticky top-0 z-20 flex items-start justify-between gap-3 px-5 sm:px-6 pt-4 pb-3 bg-[#07111F]/95 backdrop-blur-xl border-b border-white/[0.07]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-500/15 border border-primary-500/30 text-accent-400 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Free Architecture &amp; Cost Consultation
                </div>
                <h2
                  id="smart-enquiry-popup-title"
                  className="font-heading text-lg sm:text-xl font-bold text-white leading-snug"
                >
                  Discuss Your Software Project
                </h2>
                <p
                  id="smart-enquiry-popup-desc"
                  className="text-xs text-white/60 mt-0.5"
                >
                  AI Software Technology — A Brand of Digi India Solutions (Delhi NCR)
                </p>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Close enquiry popup"
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 sm:px-6 py-4 sm:py-5">
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name (Required) */}
                  <div>
                    <label
                      htmlFor="popup-lead-name"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="popup-lead-name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="e.g. Rajesh Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-accent-400 transition-colors"
                    />
                  </div>

                  {/* Mobile Number (Required) */}
                  <div>
                    <label
                      htmlFor="popup-lead-mobile"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Mobile / WhatsApp Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="popup-lead-mobile"
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="+91 98765 43210"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-accent-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Interested Service (Required) */}
                  <div>
                    <label
                      htmlFor="popup-lead-service"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Interested Service <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="popup-lead-service"
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192E] border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-accent-400 transition-colors"
                    >
                      <option value="" disabled>
                        Select a service...
                      </option>
                      {POPUP_SERVICE_OPTIONS.map((serviceOption) => (
                        <option key={serviceOption} value={serviceOption}>
                          {serviceOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Email Address (Optional) */}
                  <div>
                    <label
                      htmlFor="popup-lead-email"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Email Address <span className="text-white/35 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="popup-lead-email"
                      type="email"
                      maxLength={254}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-accent-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Project Requirements (Optional) */}
                <div>
                  <label
                    htmlFor="popup-lead-requirements"
                    className="block text-xs font-medium text-white/80 mb-1"
                  >
                    Project Requirements{' '}
                    <span className="text-white/35 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="popup-lead-requirements"
                    rows={2}
                    maxLength={1000}
                    placeholder="Briefly describe your workflow, modules, or timeline..."
                    value={form.requirements}
                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-accent-400 transition-colors resize-none"
                  />
                </div>

                {/* Unchecked Consent Checkbox & Privacy Notice */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] space-y-2">
                  <label
                    htmlFor="popup-lead-consent"
                    className="flex items-start gap-2.5 cursor-pointer select-none"
                  >
                    <input
                      id="popup-lead-consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-white/25 bg-dark-500 text-primary-500 focus:ring-accent-400 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-[11px] text-white/75 leading-relaxed">
                      I consent to <strong className="text-white">AI Software Technology</strong>{' '}
                      (A Brand of Digi India Solutions) contacting me via phone, WhatsApp, or email regarding this enquiry.{' '}
                      <span className="text-rose-400">*</span>
                    </span>
                  </label>

                  <div className="flex items-center justify-between text-[10px] text-white/45 pt-0.5 border-t border-white/[0.05]">
                    <span>Your details open directly in WhatsApp (+91 9990390519).</span>
                    <button
                      type="button"
                      onClick={() => setShowPrivacyPolicy((prev) => !prev)}
                      className="text-accent-400 hover:text-accent-300 underline font-medium cursor-pointer"
                    >
                      {showPrivacyPolicy ? 'Hide Privacy Policy' : 'Privacy Notice'}
                    </button>
                  </div>

                  {showPrivacyPolicy && (
                    <div className="p-2.5 rounded-lg bg-[#040B14] border border-white/[0.08] text-[10px] text-white/65 space-y-1.5 leading-relaxed">
                      <p className="font-semibold text-white/90">
                        Enquiry Privacy Notice
                      </p>
                      <p>
                        When you click Submit, your entered details are formatted into a pre-filled WhatsApp message to AI Software Technology (+91 9990390519) so you can review and press Send directly in WhatsApp. We do not store your personal details in browser storage or send them to analytics platforms.
                      </p>
                    </div>
                  )}
                </div>

                {/* Validation Error */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
                  >
                    <i className="ri-error-warning-line text-base flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 text-white text-xs sm:text-sm font-semibold shadow-[0_8px_25px_rgba(31,60,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="ri-whatsapp-line text-base" />
                    <span>Submit &amp; Send on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-white/60 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
