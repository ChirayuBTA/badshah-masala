'use client';

import { useEffect, useState } from 'react';

interface Props {
  targetDate: Date;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getDiff(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer({ targetDate }: Props) {
  const [time, setTime] = useState<ReturnType<typeof getDiff> | null>(null);

  useEffect(() => {
    setTime(getDiff(targetDate));
    const id = setInterval(() => setTime(getDiff(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!time) return <span className="font-body text-sm text-espresso/70">Draw closes soon…</span>;

  const isExpired = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  if (isExpired) return <span className="text-spice font-body text-sm">Draw has closed</span>;

  return (
    <span className="font-body text-sm text-espresso/70 tabular-nums">
      Draw closes in:{' '}
      <span className="font-semibold text-spice animate-pulse-gentle">
        {time.days}d {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </span>
    </span>
  );
}
