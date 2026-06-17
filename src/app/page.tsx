'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { AnimatePresence } from 'framer-motion';
import { useOtpStore } from '@/store/otpStore';
import HeroSection from '@/components/landing/HeroSection';
import RegistrationForm from '@/components/landing/RegistrationForm';
// import OtpPanel from '@/components/landing/OtpPanel';

export default function HomePage() {
  const { step } = useOtpStore();
  const router = useRouter();

  // OTP FLOW DISABLED: redirect straight to survey after registration (step becomes 'otp')
  useEffect(() => {
    if (step === 'otp' /* || step === 'verified' */) router.push('/survey');
  }, [step, router]);

  return (
    <div className="bg-parchment flex flex-col h-dvh md:min-h-screen md:h-auto md:items-center md:justify-center">
      <div className="flex flex-col flex-1 w-full md:flex-none md:max-w-lg md:mx-auto md:rounded-2xl md:shadow-xl md:overflow-hidden">
        <HeroSection />

        {/* OTP FLOW DISABLED: always show registration form; OtpPanel commented out
        <AnimatePresence mode="wait">
          {step !== 'otp' ? (
            <RegistrationForm key="form" />
          ) : (
            <OtpPanel key="otp" />
          )}
        </AnimatePresence>
        */}
        <RegistrationForm />
      </div>
    </div>
  );
}
