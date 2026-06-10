'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOtpStore } from '@/store/otpStore';
import OtpDigitInput from '@/components/ui/OtpDigitInput';
import Button from '@/components/ui/Button';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

export default function OtpPanel() {
  const { phone, verifyOtp, otpError, sendOtp } = useOtpStore();
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 300));
    verifyOtp(digits.join(''));
    setVerifying(false);
  };

  const handleComplete = (code: string) => {
    verifyOtp(code);
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
          <p className="font-body text-xs text-espresso/40 mt-1">(Hint: try 1234)</p>
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
        isLoading={verifying}
        disabled={digits.some((d) => !d)}
        accessibilityLabel="Verify OTP and proceed to survey"
      />

      <button
        onClick={() => { setDigits(['', '', '', '']); sendOtp(); }}
        className="font-body text-sm text-crimson/70 text-center underline underline-offset-2 hover:text-crimson transition-colors"
        aria-label="Resend code"
      >
        Resend code
      </button>
    </motion.div>
  );
}
