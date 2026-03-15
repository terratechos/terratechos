import { useState, useCallback } from 'react';

const RATE_LIMIT_MS = 60_000; // 60 seconds
const COOLDOWN_MS = 3_000; // 3 seconds

export function useFormSpamProtection(formKey: string) {
  const [honeypot, setHoneypot] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const checkSpam = useCallback((): { blocked: boolean; reason?: string } => {
    // Honeypot check
    if (honeypot) {
      return { blocked: true }; // Silent reject
    }

    // Rate limit check
    const lastSubmit = localStorage.getItem(`tt-last-submit-${formKey}`);
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10);
      if (elapsed < RATE_LIMIT_MS) {
        setRateLimited(true);
        return { blocked: true, reason: 'Please wait before submitting again.' };
      }
    }

    return { blocked: false };
  }, [honeypot, formKey]);

  const recordSubmission = useCallback(() => {
    localStorage.setItem(`tt-last-submit-${formKey}`, Date.now().toString());
    setCooldown(true);
    setTimeout(() => setCooldown(false), COOLDOWN_MS);
  }, [formKey]);

  return {
    honeypot,
    setHoneypot,
    cooldown,
    rateLimited,
    setRateLimited,
    checkSpam,
    recordSubmission,
  };
}
