'use client';

import { motion } from 'framer-motion';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { DRAW_END_DATE } from '@/lib/config';

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

const item = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, delay, ease: EASE },
});

export default function HeroSection() {
  return (
    <div className="px-4 pt-5 pb-2">
      {/* Crimson hero card */}
      <div
        className="relative rounded-3xl overflow-hidden flex flex-col items-center text-center px-6 pt-10 pb-8 gap-4"
        style={{
          background: 'linear-gradient(160deg, #D42334 0%, #BE1E2D 45%, #8F1521 100%)',
        }}
      >
        {/* Subtle dot grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Wordmark */}
        <motion.div {...item(0)} className="flex flex-col items-center gap-0.5 z-10">
          <span
            className="font-display font-extrabold text-white leading-none"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 3.2rem)', letterSpacing: '-0.02em' }}
          >
            BADSHAH
          </span>
          <span
            className="font-body font-semibold text-white/60 uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.28em' }}
          >
            Masalas &amp; Spices
          </span>
        </motion.div>

        {/* Jar illustration */}
        <motion.div {...item(0.07)} className="z-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(0,0,0,0.18)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <svg viewBox="0 0 72 72" width="52" height="52" fill="none" aria-hidden>
              <rect x="18" y="30" width="36" height="32" rx="6" fill="rgba(255,255,255,0.12)" />
              <rect x="22" y="34" width="28" height="24" rx="4" fill="rgba(255,255,255,0.2)" />
              <rect x="20" y="20" width="32" height="14" rx="5" fill="#F5A623" opacity="0.9" />
              <rect x="26" y="25" width="20" height="4" rx="2" fill="rgba(0,0,0,0.25)" />
              <text x="36" y="50" textAnchor="middle" fontSize="9" fontFamily="Georgia,serif"
                fontWeight="bold" fill="rgba(255,255,255,0.75)">BM</text>
              <circle cx="13" cy="24" r="1.8" fill="#F5A623" opacity="0.5" />
              <circle cx="59" cy="31" r="1.4" fill="#F5A623" opacity="0.4" />
              <circle cx="55" cy="20" r="1" fill="rgba(255,255,255,0.4)" />
            </svg>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div {...item(0.13)} className="flex flex-col gap-2 z-10">
          <h1
            className="font-display font-bold text-white leading-tight"
            style={{
              fontSize: 'clamp(1.45rem, 6vw, 1.9rem)',
              letterSpacing: '-0.01em',
              textWrap: 'balance',
            }}
          >
            Share Your Spice Story &amp; Win
          </h1>
          <p className="font-body text-sm leading-relaxed text-white/65 max-w-[240px] mx-auto">
            Answer a few questions, enter the draw, win a{' '}
            <span className="text-saffron font-semibold">Badshah Premium Gift Hamper.</span>
          </p>
        </motion.div>

        {/* Countdown chip */}
        <motion.div {...item(0.19)} className="z-10">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body text-xs"
            style={{
              background: 'rgba(0,0,0,0.22)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse-gentle"
              style={{ background: '#F5A623' }}
            />
            <CountdownTimer targetDate={DRAW_END_DATE} dark />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
