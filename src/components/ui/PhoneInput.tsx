'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
  onDark?: boolean;
}

export default function PhoneInput({ value, onChange, error, onDark = false }: Props) {
  const borderColor = error ? '#E8621A' : 'transparent';
  const focusClass = error ? '' : 'focus-within:border-crimson!';

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center rounded-xl overflow-hidden border-2 transition-colors duration-150 ${focusClass}`}
        style={{
          background: onDark ? 'rgba(255,255,255,0.08)' : '#F0EBE6',
          borderColor,
        }}
      >
        <span
          className="px-3 py-3.5 font-body font-semibold text-[15px] select-none border-r-2"
          style={{
            color: onDark ? 'rgba(255,255,255,0.45)' : 'rgba(26,8,0,0.4)',
            borderColor: onDark ? 'rgba(255,255,255,0.1)' : '#E2D9D4',
          }}
        >
          +91
        </span>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="10-digit mobile number"
          aria-label="Mobile number"
          className="flex-1 px-3 py-3.5 text-[15px] font-body bg-transparent outline-none"
          style={{
            color: onDark ? '#fff' : '#1A0800',
          }}
        />
      </div>
      {error && <p className="font-body text-xs text-spice">{error}</p>}
    </div>
  );
}
