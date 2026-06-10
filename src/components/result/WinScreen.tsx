'use client';

import { motion } from 'framer-motion';
import Confetti from './Confetti';
import Button from '@/components/ui/Button';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { PRIZE_NAME, WHATSAPP_SHARE_URL } from '@/lib/config';
import { useOtpStore } from '@/store/otpStore';

interface Props {
  name: string;
}

export default function WinScreen({ name }: Props) {
  const { phone } = useOtpStore();
  const maskedPhone = `+91 ****${phone.slice(-4)}`;

  const shareText = encodeURIComponent(
    `I just won a ${PRIZE_NAME} from Badshah Masala! 🎉 Take the survey and enter the lucky draw: [link]`
  );

  return (
    <div className="flex flex-col items-center px-6 py-10 gap-6 text-center min-h-screen bg-parchment justify-center">
      <Confetti active />

      <AnimatedReveal delay={0.1}>
        <motion.div
          animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl select-none"
        >
          👑
        </motion.div>
      </AnimatedReveal>

      <AnimatedReveal delay={0.2}>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-bold text-espresso leading-tight">
            You&apos;re a Winner,
            <br />
            <span className="text-crimson">{name}!</span>
          </h1>
        </div>
      </AnimatedReveal>

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.2, delay: 0.35 }}
        className="bg-white rounded-2xl border-2 border-saffron shadow-lg px-6 py-5 max-w-xs w-full"
      >
        <div className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center mx-auto mb-1">
            <span className="text-2xl">🎁</span>
          </div>
          <p className="font-body text-sm text-espresso/60 uppercase tracking-widest font-semibold">
            You&apos;ve won
          </p>
          <p className="font-display text-xl font-bold text-espresso">{PRIZE_NAME}</p>
          <div className="w-full h-px bg-parchment-dark my-1" />
          <p className="font-body text-xs text-espresso/50 leading-relaxed">
            Our team will contact you on{' '}
            <span className="font-semibold text-espresso/70">{maskedPhone}</span>{' '}
            within 3 working days.
          </p>
        </div>
      </motion.div>

      <AnimatedReveal delay={0.55} className="w-full max-w-xs flex flex-col gap-3">
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
      </AnimatedReveal>

      <AnimatedReveal delay={0.65}>
        <a href="/" className="font-body text-sm text-espresso/40 underline underline-offset-2 hover:text-espresso/60 transition-colors">
          Back to home
        </a>
      </AnimatedReveal>
    </div>
  );
}
