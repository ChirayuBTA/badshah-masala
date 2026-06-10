'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOtpStore } from '@/store/otpStore';
import { survey } from '@/data/survey';
import { DEV_MODE } from '@/lib/config';
import SurveyShell from '@/components/survey/SurveyShell';

export default function SurveyPage() {
  const { step } = useOtpStore();
  const router = useRouter();

  useEffect(() => {
    if (!DEV_MODE && step !== 'verified') {
      router.replace('/');
    }
  }, [step, router]);

  return <SurveyShell sections={survey} />;
}
