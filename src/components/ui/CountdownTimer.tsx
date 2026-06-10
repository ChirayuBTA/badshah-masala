'use client';

import { useEffect, useState } from 'react';

interface Props {
  targetDate: Date;
  dark?: boolean;
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

export default function CountdownTimer({ targetDate, dark = false }: Props) {
  const [time, setTime] = useState<ReturnType<typeof getDiff> | null>(null);

  useEffect(() => {
    setTime(getDiff(targetDate));
    const id = setInterval(() => setTime(getDiff(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!time) {
    return (
      <span className={`font-body text-sm ${dark ? 'text-white/50' : 'text-ink/50'}`}>
        Draw closes soon…
      </span>
    );
  }

  const isExpired = !time.days && !time.hours && !time.minutes && !time.seconds;

  if (isExpired) {
    return <span className="font-body text-sm text-spice">Draw has closed</span>;
  }

  return (
    <span className={`font-body text-sm tabular-nums ${dark ? 'text-white/70' : 'text-ink/60'}`}>
      Draw closes in:{' '}
      <span className="font-semibold text-saffron animate-pulse-gentle">
        {time.days}d {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </span>
    </span>
  );
}
