'use client';

import { useOtpStore } from '@/store/otpStore';
import ThankYouScreen from '@/components/result/ThankYouScreen';

export default function ResultPage() {
  const { name } = useOtpStore();
  return <ThankYouScreen name={name || 'Friend'} />;
}
