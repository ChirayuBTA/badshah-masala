'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOtpStore } from '@/store/otpStore';
import OtpDigitInput from '@/components/ui/OtpDigitInput';
import Button from '@/components/ui/Button';

export default function OtpPanel() {
  const { phone, verifyOtp, otpError, sendOtp } = useOtpStore();
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 320));
    verifyOtp(digits.join(''));
    setVerifying(false);
  };

  const maskedPhone = `+91 ****${phone.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="mx-4 mb-6 rounded-2xl bg-milk flex flex-col gap-5 p-5"
      style={{ boxShadow: '0 -2px 0 0 rgba(190,30,45,0.4), 0 8px 32px rgba(0,0,0,0.45)' }}
    >
      <div className="flex flex-col gap-1 text-center">
        <h2 className="font-display text-xl font-bold text-ink">Enter Your Code</h2>
        <p className="font-body text-sm" style={{ color: 'rgba(26,8,0,0.5)' }}>
          Sent to <span className="font-semibold text-ink">{maskedPhone}</span>
        </p>
        <p className="font-body text-[11px]" style={{ color: 'rgba(26,8,0,0.35)' }}>
          (Hint: try 1234)
        </p>
      </div>

      <OtpDigitInput
        value={digits}
        onChange={setDigits}
        onComplete={(code) => verifyOtp(code)}
        error={otpError}
      />

      <Button
        label="Claim My Chance to Win"
        onClick={handleVerify}
        isLoading={verifying}
        disabled={digits.some((d) => !d)}
        accessibilityLabel="Verify code and proceed to survey"
      />

      <button
        onClick={() => { setDigits(['', '', '', '']); sendOtp(); }}
        className="font-body text-sm text-center transition-colors duration-150"
        style={{ color: 'rgba(26,8,0,0.4)' }}
        aria-label="Resend verification code"
      >
        Didn&apos;t get a code?{' '}
        <span className="text-crimson font-semibold underline underline-offset-2">Resend</span>
      </button>
    </motion.div>
  );
}
