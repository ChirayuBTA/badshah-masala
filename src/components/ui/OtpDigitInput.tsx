'use client';

import { useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
  onComplete: (code: string) => void;
  error?: string | null;
}

export default function OtpDigitInput({ value, onChange, onComplete, error }: Props) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handle = (idx: number, char: string) => {
    if (!/^\d$/.test(char)) return;
    const next = [...value];
    next[idx] = char;
    onChange(next);
    if (idx < 3) refs[idx + 1].current?.focus();
    if (next.every(Boolean)) onComplete(next.join(''));
  };

  const handleKey = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const next = [...value];
      if (next[idx]) {
        next[idx] = '';
        onChange(next);
      } else if (idx > 0) {
        refs[idx - 1].current?.focus();
        next[idx - 1] = '';
        onChange(next);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4).split('');
    const next = [...value];
    digits.forEach((d, i) => { if (i < 4) next[i] = d; });
    onChange(next);
    const lastFilled = Math.min(digits.length, 3);
    refs[lastFilled].current?.focus();
    if (digits.length === 4) onComplete(digits.join(''));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-3 justify-center">
        {([0, 1, 2, 3] as const).map((i) => (
          <input
            key={i}
            ref={refs[i]}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={value[i] ?? ''}
            onChange={(e) => handle(i, e.target.value.slice(-1))}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            aria-label={`OTP digit ${i + 1}`}
            className="w-14 h-14 text-center text-2xl font-display font-bold rounded-xl border-2 bg-muted outline-none transition-all duration-150"
            style={{
              background: '#F0EBE6',
              borderColor: error ? '#E8621A' : value[i] ? '#BE1E2D' : '#E2D9D4',
              color: error ? '#E8621A' : value[i] ? '#BE1E2D' : '#1A0800',
              boxShadow: value[i] && !error ? '0 0 0 3px rgba(190,30,45,0.12)' : 'none',
            }}
          />
        ))}
      </div>
      {error && (
        <p className="font-body text-sm text-spice text-center">{error}</p>
      )}
    </div>
  );
}
