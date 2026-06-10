'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useResultStore } from '@/store/resultStore';
import { useOtpStore } from '@/store/otpStore';
import { DEV_MODE } from '@/lib/config';
import WinScreen from '@/components/result/WinScreen';
import NoWinScreen from '@/components/result/NoWinScreen';

export default function ResultPage() {
  const { result } = useResultStore();
  const { name } = useOtpStore();
  const router = useRouter();

  useEffect(() => {
    if (!DEV_MODE && result === null) {
      router.replace('/survey');
    }
  }, [result, router]);

  const displayName = name || 'Friend';

  if (DEV_MODE) {
    return (
      <div className="max-w-lg mx-auto w-full">
        <div className="bg-spice/10 border border-spice/30 px-4 py-2 text-center">
          <span className="font-body text-xs font-semibold text-spice uppercase tracking-widest">
            DEV MODE — WIN SCREEN ↓
          </span>
        </div>
        <WinScreen name={displayName} />
        <div className="bg-spice/10 border border-spice/30 px-4 py-2 text-center">
          <span className="font-body text-xs font-semibold text-spice uppercase tracking-widest">
            DEV MODE — NO WIN SCREEN ↓
          </span>
        </div>
        <NoWinScreen name={displayName} />
      </div>
    );
  }

  if (result === 'win') return <WinScreen name={displayName} />;
  if (result === 'no_win') return <NoWinScreen name={displayName} />;

  return null;
}
