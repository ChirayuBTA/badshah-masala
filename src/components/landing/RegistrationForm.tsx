'use client';

import { useState } from 'react';
import { useOtpStore } from '@/store/otpStore';
import Button from '@/components/ui/Button';
import PhoneInput from '@/components/ui/PhoneInput';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

export default function RegistrationForm() {
  const { name, phone, setName, setPhone, sendOtp, isLoading, apiError } = useOtpStore();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (phone.length !== 10) e.phone = 'Enter a valid 10-digit number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) await sendOtp();
  };

  return (
    <div className="flex flex-col gap-4 px-6 pb-6">
      <AnimatedReveal delay={0.32}>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-sm font-semibold text-espresso/70">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            aria-label="Your name"
            className={`rounded-xl border-2 bg-white px-4 py-3.5 text-base font-body text-espresso outline-none transition-colors duration-150 placeholder:text-espresso/30 ${
              errors.name
                ? 'border-spice'
                : 'border-parchment-dark focus:border-crimson'
            }`}
          />
          {errors.name && <p className="text-spice text-sm font-body">{errors.name}</p>}
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={0.38}>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-sm font-semibold text-espresso/70">Mobile Number</label>
          <PhoneInput value={phone} onChange={setPhone} error={errors.phone} />
        </div>
      </AnimatedReveal>

      {apiError && (
        <AnimatedReveal>
          <p className="font-body text-sm text-spice text-center">{apiError}</p>
        </AnimatedReveal>
      )}

      <AnimatedReveal delay={0.44}>
        <Button
          label="Send Me a Code"
          onClick={handleSubmit}
          isLoading={isLoading}
          accessibilityLabel="Send me an OTP code"
        />
      </AnimatedReveal>

      <AnimatedReveal delay={0.48}>
        <p className="font-body text-xs text-espresso/40 text-center leading-relaxed">
          By continuing, you agree to our terms. We&apos;ll only contact you about your prize.
        </p>
      </AnimatedReveal>
    </div>
  );
}
