'use client';

import { motion } from 'framer-motion';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { DRAW_END_DATE } from '@/lib/config';

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

const item = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, delay, ease: EASE },
});

export default function HeroSection() {
  return (
    <div
      className="relative flex flex-col items-center text-center px-6 pt-12 pb-8 gap-5 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #3E1A0A 0%, #120500 55%)',
      }}
    >
      {/* Ambient spice-dot pattern */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #F5A623 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Wordmark */}
      <motion.div {...item(0)} className="flex flex-col items-center gap-0.5 z-10">
        <span className="font-display text-5xl font-extrabold text-white tracking-[-0.02em] leading-none">
          BADSHAH
        </span>
        <span
          className="font-body text-[10px] font-semibold text-saffron tracking-[0.28em] uppercase"
        >
          Masalas &amp; Spices
        </span>
      </motion.div>

      {/* Spice jar illustration */}
      <motion.div {...item(0.08)} className="z-10">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center relative"
          style={{
            background: 'radial-gradient(circle at 40% 35%, #3E1A0A, #1A0500)',
            boxShadow: '0 0 0 1px rgba(245,166,35,0.2), 0 0 32px 8px rgba(245,166,35,0.08)',
          }}
        >
          <svg viewBox="0 0 72 72" width="60" height="60" fill="none">
            {/* Jar body */}
            <rect x="18" y="30" width="36" height="32" rx="6" fill="#BE1E2D" opacity="0.22" />
            <rect x="22" y="34" width="28" height="24" rx="4" fill="#BE1E2D" opacity="0.45" />
            {/* Jar lid */}
            <rect x="20" y="20" width="32" height="14" rx="5" fill="#F5A623" opacity="0.85" />
            <rect x="26" y="25" width="20" height="4" rx="2" fill="#BE1E2D" opacity="0.7" />
            {/* Label text */}
            <text x="36" y="50" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif"
              fontWeight="bold" fill="#F5A623" opacity="0.9">BM</text>
            {/* Sparkles */}
            <circle cx="13" cy="24" r="2" fill="#F5A623" opacity="0.55" />
            <circle cx="59" cy="32" r="1.5" fill="#F5A623" opacity="0.45" />
            <circle cx="55" cy="20" r="1" fill="#E8621A" opacity="0.6" />
            <circle cx="16" cy="38" r="1" fill="#E8621A" opacity="0.4" />
          </svg>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div {...item(0.14)} className="flex flex-col gap-2 z-10">
        <h1
          className="font-display font-bold text-white leading-tight"
          style={{
            fontSize: 'clamp(1.6rem, 6.5vw, 2.2rem)',
            textWrap: 'balance',
            letterSpacing: '-0.01em',
          }}
        >
          Share Your Spice Story
        </h1>
        <p className="font-body text-sm leading-relaxed max-w-[260px] mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Answer a few questions, enter the lucky draw, win a{' '}
          <span className="text-saffron font-semibold">Badshah Premium Gift Hamper.</span>
        </p>
      </motion.div>

      {/* Countdown chip */}
      <motion.div {...item(0.2)} className="z-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm"
          style={{
            background: 'rgba(245,166,35,0.12)',
            border: '1px solid rgba(245,166,35,0.25)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-spice animate-pulse-gentle flex-shrink-0" />
          <CountdownTimer targetDate={DRAW_END_DATE} dark />
        </div>
      </motion.div>
    </div>
  );
}
