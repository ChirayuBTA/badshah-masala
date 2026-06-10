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
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
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
            className={`w-14 h-14 text-center text-2xl font-display font-bold rounded-xl border-2 bg-white outline-none transition-colors duration-150 ${
              error
                ? 'border-spice text-spice'
                : value[i]
                ? 'border-crimson text-crimson'
                : 'border-parchment-dark text-espresso focus:border-crimson'
            }`}
          />
        ))}
      </div>
      {error && (
        <p className="text-spice text-sm font-body text-center">{error}</p>
      )}
    </div>
  );
}
