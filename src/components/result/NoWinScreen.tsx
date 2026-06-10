'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { DRAW_END_DATE, WHATSAPP_SHARE_URL } from '@/lib/config';

interface Props {
  name: string;
}

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

function formatDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NoWinScreen({ name }: Props) {
  const shouldReduce = useReducedMotion();
  const nextDraw = new Date(DRAW_END_DATE.getTime() + 30 * 24 * 60 * 60 * 1000);

  const shareText = encodeURIComponent(
    `I just shared my spice story with Badshah Masala! Take the survey and enter the lucky draw: [link]`
  );

  const stagger = (delay: number) => ({
    initial: shouldReduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.26, delay, ease: EASE },
  });

  return (
    <div
      className="flex flex-col items-center px-5 py-10 gap-6 text-center min-h-screen justify-center"
      style={{ background: '#FAFAFA' }}
    >
      {/* Icon */}
      <motion.div {...stagger(0.05)}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(30,86,49,0.1)',
            border: '1.5px solid rgba(30,86,49,0.2)',
          }}
        >
          <svg viewBox="0 0 48 48" width="36" height="36" fill="none" aria-hidden>
            <rect x="12" y="16" width="24" height="24" rx="4" fill="#1E5631" opacity="0.2" />
            <rect x="15" y="19" width="18" height="18" rx="3" fill="#1E5631" opacity="0.35" />
            <rect x="14" y="10" width="20" height="9" rx="3" fill="#F5A623" opacity="0.7" />
            <rect x="17" y="13" width="14" height="3" rx="1.5" fill="#1E5631" opacity="0.5" />
            <text x="24" y="32" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif"
              fontWeight="bold" fill="#1E5631" opacity="0.8">BM</text>
          </svg>
        </div>
      </motion.div>

      {/* Text */}
      <div className="flex flex-col gap-3 max-w-xs">
        <motion.h1
          {...stagger(0.1)}
          className="font-display font-bold text-ink"
          style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
            letterSpacing: '-0.02em',
            textWrap: 'balance',
          }}
        >
          Thank You, {name}.
        </motion.h1>

        <motion.p {...stagger(0.22)} className="font-body text-sm leading-relaxed text-ink/60">
          Your feedback helps us bring the best flavours to your kitchen.
        </motion.p>

        <motion.div
          {...stagger(0.36)}
          className="rounded-2xl p-4 text-left"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2D9D4',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-ink/35 mb-1.5">
            Next draw
          </p>
          <p className="font-body text-sm leading-relaxed text-ink/70">
            You&apos;re entered into our next lucky draw — results announced on{' '}
            <span className="font-semibold text-cardamom">{formatDate(nextDraw)}.</span>
          </p>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        {...stagger(0.5)}
        className="w-full max-w-xs flex flex-col gap-3"
      >
        <Button
          label="Give a Friend a Chance — Share"
          onClick={() => window.open(`${WHATSAPP_SHARE_URL}${shareText}`, '_blank')}
          accessibilityLabel="Share the survey on WhatsApp"
        />
        <Button
          label="Discover Badshah Recipes"
          variant="ghost"
          onClick={() => {}}
          accessibilityLabel="Discover recipes using Badshah Masala"
        />
      </motion.div>

      <motion.a
        {...stagger(0.62)}
        href="/"
        className="font-body text-sm text-ink/35 transition-colors duration-150 hover:text-ink/60"
      >
        Back to home
      </motion.a>
    </div>
  );
}
