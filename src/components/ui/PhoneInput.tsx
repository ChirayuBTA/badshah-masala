'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
}

export default function PhoneInput({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center rounded-xl border-2 bg-white overflow-hidden transition-colors duration-150 ${
          error ? 'border-spice' : 'border-parchment-dark focus-within:border-crimson'
        }`}
      >
        <span className="px-3 py-3.5 text-espresso/60 font-body font-medium text-base border-r-2 border-parchment-dark select-none">
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
          className="flex-1 px-3 py-3.5 text-espresso text-base font-body bg-transparent outline-none placeholder:text-espresso/30"
        />
      </div>
      {error && <p className="text-spice text-sm font-body">{error}</p>}
    </div>
  );
}
