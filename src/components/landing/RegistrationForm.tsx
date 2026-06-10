'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOtpStore } from '@/store/otpStore';
import Button from '@/components/ui/Button';
import PhoneInput from '@/components/ui/PhoneInput';

export default function RegistrationForm() {
  const { name, phone, setName, setPhone, sendOtp } = useOtpStore();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (phone.length !== 10) e.phone = 'Enter a valid 10-digit number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="mx-4 mb-6 rounded-2xl bg-milk flex flex-col gap-5 p-5"
      style={{ boxShadow: '0 -2px 0 0 rgba(190,30,45,0.4), 0 8px 32px rgba(0,0,0,0.45)' }}
    >
      {/* Card header */}
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-bold text-ink leading-tight">
          Enter to Win
        </h2>
        <p className="font-body text-sm" style={{ color: 'rgba(26,8,0,0.5)' }}>
          Takes 2 minutes. Completely free.
        </p>
      </div>

      {/* Name field */}
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[13px] font-semibold" style={{ color: 'rgba(26,8,0,0.55)' }}>
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Priya Sharma"
          aria-label="Your name"
          className={`rounded-xl bg-muted px-4 py-3.5 text-[15px] font-body text-ink outline-none transition-all duration-150 placeholder:text-ink/30 border-2 ${
            errors.name ? 'border-spice' : 'border-transparent focus:border-crimson'
          }`}
          style={{ background: '#F0EBE6' }}
        />
        {errors.name && (
          <p className="font-body text-xs text-spice">{errors.name}</p>
        )}
      </div>

      {/* Phone field */}
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[13px] font-semibold" style={{ color: 'rgba(26,8,0,0.55)' }}>
          Mobile Number
        </label>
        <PhoneInput value={phone} onChange={setPhone} error={errors.phone} />
      </div>

      <Button
        label="Send Me a Code"
        onClick={() => { if (validate()) sendOtp(); }}
        accessibilityLabel="Send OTP to verify your mobile number"
      />

      <p className="font-body text-[11px] text-center leading-relaxed" style={{ color: 'rgba(26,8,0,0.35)' }}>
        By continuing you agree to our terms. We&apos;ll only contact you about your prize.
      </p>
    </motion.div>
  );
}
