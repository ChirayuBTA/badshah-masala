'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOtpStore } from '@/store/otpStore';
import OtpDigitInput from '@/components/ui/OtpDigitInput';
import Button from '@/components/ui/Button';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

const RESEND_COOLDOWN_SECONDS = 30;

export default function OtpPanel() {
  const { phone, verifyOtp, otpError, isLoading, isResending, lastSentAt, resendOtp } = useOtpStore();
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [cooldown, setCooldown] = useState(0);

  // Sync cooldown timer whenever lastSentAt changes
  useEffect(() => {
    if (!lastSentAt) return;
    const elapsed = Math.floor((Date.now() - lastSentAt) / 1000);
    const remaining = Math.max(0, RESEND_COOLDOWN_SECONDS - elapsed);
    setCooldown(remaining);
    if (remaining === 0) return;

    const interval = setInterval(() => {
      const secs = Math.max(0, RESEND_COOLDOWN_SECONDS - Math.floor((Date.now() - lastSentAt) / 1000));
      setCooldown(secs);
      if (secs === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSentAt]);

  const handleVerify = async () => {
    await verifyOtp(digits.join(''));
  };

  const handleComplete = async (code: string) => {
    await verifyOtp(code);
  };

  const handleResend = async () => {
    setDigits(['', '', '', '']);
    await resendOtp();
  };

  const maskedPhone = `+91 ****${phone.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="mx-6 mb-6 bg-white rounded-2xl border border-parchment-dark shadow-sm p-6 flex flex-col gap-5"
    >
      <AnimatedReveal>
        <div className="flex flex-col gap-1 text-center">
          <h2 className="font-display text-xl font-bold text-espresso">Enter Your Code</h2>
          <p className="font-body text-sm text-espresso/60">
            We&apos;ve sent a 4-digit code to{' '}
            <span className="font-semibold text-espresso">{maskedPhone}</span>
          </p>
        </div>
      </AnimatedReveal>

      <OtpDigitInput
        value={digits}
        onChange={setDigits}
        onComplete={handleComplete}
        error={otpError}
      />

      <Button
        label="Claim My Chance to Win"
        onClick={handleVerify}
        isLoading={isLoading}
        disabled={digits.some((d) => !d)}
        accessibilityLabel="Verify OTP and proceed to survey"
      />

      <button
        onClick={handleResend}
        disabled={cooldown > 0 || isResending}
        className="font-body text-sm text-center transition-colors disabled:cursor-not-allowed
          enabled:text-crimson/70 enabled:underline enabled:underline-offset-2 enabled:hover:text-crimson
          disabled:text-espresso/30"
        aria-label="Resend OTP code"
      >
        {isResending
          ? 'Sending…'
          : cooldown > 0
          ? `Resend code in ${cooldown}s`
          : 'Resend code'}
      </button>
    </motion.div>
  );
}
