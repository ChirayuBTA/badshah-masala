'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useOtpStore } from '@/store/otpStore';
import HeroSection from '@/components/landing/HeroSection';
import RegistrationForm from '@/components/landing/RegistrationForm';
import OtpPanel from '@/components/landing/OtpPanel';

export default function HomePage() {
  const { step } = useOtpStore();
  const router = useRouter();

  useEffect(() => {
    if (step === 'verified') router.push('/survey');
  }, [step, router]);

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto w-full" style={{ background: '#120500' }}>
      <HeroSection />

      <AnimatePresence mode="wait">
        {step !== 'otp' ? (
          <RegistrationForm key="form" />
        ) : (
          <OtpPanel key="otp" />
        )}
      </AnimatePresence>
    </div>
  );
}
