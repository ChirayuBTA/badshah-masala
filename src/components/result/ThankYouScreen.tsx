'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOtpStore } from '@/store/otpStore';
import { useSurveyStore } from '@/store/surveyStore';
import Button from '@/components/ui/Button';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

interface Props {
  name: string;
}

export default function ThankYouScreen({ name }: Props) {
  const router = useRouter();
  const resetOtp = useOtpStore((s) => s.reset);
  const resetSurvey = useSurveyStore((s) => s.reset);

  const handleHome = () => {
    resetOtp();
    resetSurvey();
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center px-6 py-10 gap-6 text-center min-h-screen bg-parchment justify-center">
      <AnimatedReveal delay={0.1}>
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-6xl select-none"
        >
          🙏
        </motion.div>
      </AnimatedReveal>

      <AnimatedReveal delay={0.2}>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-bold text-espresso leading-tight">
            Thank you, <span className="text-crimson">{name}!</span>
          </h1>
          <p className="font-body text-base text-espresso/60 leading-relaxed max-w-xs mx-auto">
            We&apos;ve received your responses. Our team will get back to you soon.
          </p>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={0.4} className="w-full max-w-xs">
        <Button
          label="Back to Home"
          onClick={handleHome}
          accessibilityLabel="Go back to home page"
        />
      </AnimatedReveal>
    </div>
  );
}
