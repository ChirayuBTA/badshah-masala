'use client';

import { motion } from 'framer-motion';

interface Props {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  accessibilityLabel?: string;
}

export default function Button({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  accessibilityLabel,
}: Props) {
  const base =
    'relative flex items-center justify-center rounded-xl font-body font-semibold text-base min-h-[52px] px-6 w-full transition-colors duration-200 select-none overflow-hidden';

  const variants = {
    primary: 'bg-crimson text-white active:bg-crimson-dark disabled:opacity-50',
    ghost: 'bg-transparent border-2 border-crimson text-crimson active:bg-parchment-dark disabled:opacity-40',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', duration: 0.2 }}
      aria-label={accessibilityLabel ?? label}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="blur-[0.5px]">{label}</span>
        </span>
      ) : label}
    </motion.button>
  );
}
