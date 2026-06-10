'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Confetti from './Confetti';
import Button from '@/components/ui/Button';
import { PRIZE_NAME, WHATSAPP_SHARE_URL } from '@/lib/config';
import { useOtpStore } from '@/store/otpStore';

interface Props {
  name: string;
}

export default function WinScreen({ name }: Props) {
  const { phone } = useOtpStore();
  const shouldReduce = useReducedMotion();
  const maskedPhone = `+91 ****${phone.slice(-4)}`;

  const shareText = encodeURIComponent(
    `I just won a ${PRIZE_NAME} from Badshah Masala! 🎉 Take the survey and enter the draw: [link]`
  );

  return (
    <div
      className="flex flex-col items-center px-5 py-10 gap-6 text-center min-h-screen justify-center"
      style={{ background: '#120500' }}
    >
      {!shouldReduce && <Confetti active />}

      {/* Crown */}
      <motion.div
        initial={shouldReduce ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.3, delay: 0.1 }}
        className="text-5xl select-none"
        aria-hidden
      >
        👑
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col gap-1"
      >
        <p className="font-body text-sm font-semibold tracking-widest uppercase" style={{ color: '#F5A623' }}>
          Congratulations
        </p>
        <h1
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)', letterSpacing: '-0.02em', textWrap: 'balance' }}
        >
          You&apos;re a Winner,<br />
          <span style={{ color: '#F5A623' }}>{name}!</span>
        </h1>
      </motion.div>

      {/* Prize card */}
      <motion.div
        initial={shouldReduce ? false : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.15, delay: 0.38 }}
        className="w-full max-w-xs rounded-2xl p-5 flex flex-col gap-3"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(245,166,35,0.3)',
          boxShadow: '0 0 40px rgba(245,166,35,0.08)',
        }}
      >
        <div className="text-3xl" aria-hidden>🎁</div>
        <p className="font-body text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          You&apos;ve won
        </p>
        <p className="font-display text-lg font-bold text-white leading-snug">{PRIZE_NAME}</p>
        <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Our team will contact you on{' '}
          <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{maskedPhone}</span>{' '}
          within 3 working days.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
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
        transition={{ duration: 0.22, delay: 0.7 }}
        href="/"
        className="font-body text-sm transition-colors duration-150"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        Back to home
      </motion.a>
    </div>
  );
}
