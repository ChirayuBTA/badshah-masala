'use client';

import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduce = useReducedMotion();

  const base =
    'relative flex items-center justify-center w-full rounded-xl font-body font-semibold text-[15px] min-h-[52px] px-6 select-none overflow-hidden outline-none transition-colors duration-150';

  const styles = {
    primary: {
      background: disabled ? '#D4A0A5' : '#BE1E2D',
      color: '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    ghost: {
      background: 'transparent',
      color: disabled ? '#D4A0A5' : '#BE1E2D',
      border: `2px solid ${disabled ? '#D4A0A5' : '#BE1E2D'}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileTap={shouldReduce || disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
      aria-label={accessibilityLabel ?? label}
      style={styles[variant]}
      className={`${base} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span style={{ filter: 'blur(0.4px)', opacity: 0.8 }}>{label}</span>
        </span>
      ) : label}
    </motion.button>
  );
}
