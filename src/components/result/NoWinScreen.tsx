'use client';

import AnimatedReveal from '@/components/ui/AnimatedReveal';
import Button from '@/components/ui/Button';
import { DRAW_END_DATE, WHATSAPP_SHARE_URL } from '@/lib/config';

interface Props {
  name: string;
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NoWinScreen({ name }: Props) {
  const nextDraw = new Date(DRAW_END_DATE.getTime() + 30 * 24 * 60 * 60 * 1000);
  const shareText = encodeURIComponent(
    `I just shared my spice story with Badshah Masala! Take the survey and enter the lucky draw: [link]`
  );

  return (
    <div className="flex flex-col items-center px-6 py-10 gap-6 text-center min-h-screen bg-parchment justify-center">
      {/* Spice jar illustration */}
      <AnimatedReveal delay={0.05}>
        <div className="w-20 h-20 rounded-full bg-cardamom/10 border-2 border-cardamom/20 flex items-center justify-center">
          <svg viewBox="0 0 60 60" width="48" height="48" fill="none">
            <rect x="15" y="18" width="30" height="32" rx="5" fill="#1E5631" opacity="0.15" />
            <rect x="19" y="22" width="22" height="24" rx="3" fill="#1E5631" opacity="0.25" />
            <rect x="20" y="12" width="20" height="10" rx="3" fill="#F5A623" opacity="0.7" />
            <rect x="23" y="15" width="14" height="3" rx="1.5" fill="#1E5631" opacity="0.6" />
            <text x="30" y="39" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold" fill="#1E5631" opacity="0.8">BM</text>
          </svg>
        </div>
      </AnimatedReveal>

      <div className="flex flex-col gap-3 max-w-xs">
        <AnimatedReveal delay={0.1}>
          <h1 className="font-display text-2xl font-bold text-espresso">
            Thank You, {name}.
          </h1>
        </AnimatedReveal>

        <AnimatedReveal delay={0.25}>
          <p className="font-body text-sm text-espresso/65 leading-relaxed">
            Your feedback helps us bring the best flavours to your kitchen.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.4}>
          <div className="bg-white rounded-2xl border border-parchment-dark px-5 py-4 text-left">
            <p className="font-body text-xs text-espresso/50 uppercase tracking-widest font-semibold mb-1">
              Next draw
            </p>
            <p className="font-body text-sm text-espresso leading-relaxed">
              You&apos;re entered into our next lucky draw — results announced on{' '}
              <span className="font-semibold text-cardamom">{formatDate(nextDraw)}.</span>
            </p>
          </div>
        </AnimatedReveal>
      </div>

      <AnimatedReveal delay={0.55} className="w-full max-w-xs flex flex-col gap-3">
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
      </AnimatedReveal>

      <AnimatedReveal delay={0.65}>
        <a href="/" className="font-body text-sm text-espresso/40 underline underline-offset-2 hover:text-espresso/60 transition-colors">
          Back to home
        </a>
      </AnimatedReveal>
    </div>
  );
}
