'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Confetti from './Confetti';
import Button from '@/components/ui/Button';
import { PRIZE_NAME, WHATSAPP_SHARE_URL } from '@/lib/config';
import { useOtpStore } from '@/store/otpStore';

interface Props {
  name: string;
}

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function WinScreen({ name }: Props) {
  const { phone } = useOtpStore();
  const shouldReduce = useReducedMotion();
  const maskedPhone = phone ? `+91 ****${phone.slice(-4)}` : '+91 ****XXXX';

  const shareText = encodeURIComponent(
    `I just won a ${PRIZE_NAME} from Badshah Masala! 🎉 Take the survey and enter the draw: [link]`
  );

  return (
    <div
      className="flex flex-col items-center px-5 py-10 gap-6 text-center min-h-screen justify-center"
      style={{ background: '#FAFAFA' }}
    >
      {!shouldReduce && <Confetti active />}

      {/* Crown */}
      <motion.div
        initial={shouldReduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.28, delay: 0.1 }}
        className="text-5xl select-none"
        aria-hidden
      >
        👑
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, delay: 0.22, ease: EASE }}
        className="flex flex-col gap-1"
      >
        <p className="font-body text-xs font-semibold tracking-widest uppercase text-saffron">
          Congratulations
        </p>
        <h1
          className="font-display font-bold text-ink"
          style={{
            fontSize: 'clamp(2rem, 7vw, 2.8rem)',
            letterSpacing: '-0.02em',
            textWrap: 'balance',
          }}
        >
          You&apos;re a Winner,{' '}
          <span className="text-crimson">{name}!</span>
        </h1>
      </motion.div>

      {/* Prize card */}
      <motion.div
        initial={shouldReduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.15, delay: 0.35 }}
        className="w-full max-w-xs rounded-2xl p-5 flex flex-col gap-3"
        style={{
          background: '#FFFFFF',
          border: '2px solid #F5A623',
          boxShadow: '0 4px 24px rgba(245,166,35,0.15)',
        }}
      >
        <div className="text-3xl" aria-hidden>🎁</div>
        <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-ink/40">
          You&apos;ve won
        </p>
        <p className="font-display text-lg font-bold text-ink leading-snug">{PRIZE_NAME}</p>
        <div className="w-full h-px bg-border" />
        <p className="font-body text-xs leading-relaxed text-ink/50">
          Our team will contact you on{' '}
          <span className="font-semibold text-ink/70">{maskedPhone}</span>{' '}
          within 3 working days.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.52, ease: EASE }}
        className="w-full max-w-xs flex flex-col gap-3"
      >
        <Button
          label="Share the Good News on WhatsApp 🎉"
          onClick={() => window.open(`${WHATSAPP_SHARE_URL}${shareText}`, '_blank')}
          accessibilityLabel="Share your win on WhatsApp"
        />
        <Button
          label="Explore Badshah Products"
          variant="ghost"
          onClick={() => {}}
          accessibilityLabel="Explore Badshah product range"
        />
      </motion.div>

      <motion.a
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.65 }}
        href="/"
        className="font-body text-sm text-ink/35 transition-colors duration-150 hover:text-ink/60"
      >
        Back to home
      </motion.a>
    </div>
  );
}
