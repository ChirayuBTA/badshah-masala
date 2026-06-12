"use client";

import AnimatedReveal from "@/components/ui/AnimatedReveal";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center px-6 pt-10 pb-6 gap-4">
      <AnimatedReveal delay={0}>
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-4xl font-bold text-crimson tracking-tight leading-none">
            BADSHAH
          </span>
          <span className="font-body text-xs font-medium text-espresso/40 tracking-[0.2em] uppercase">
            Masalas &amp; Spices™
          </span>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={0.08}>
        <div className="w-28 h-28 rounded-full bg-crimson/10 border-4 border-crimson/20 flex items-center justify-center">
          <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
            {/* Spice jar illustration */}
            <rect
              x="22"
              y="28"
              width="36"
              height="38"
              rx="6"
              fill="#BE1E2D"
              opacity="0.15"
            />
            <rect
              x="26"
              y="32"
              width="28"
              height="30"
              rx="4"
              fill="#BE1E2D"
              opacity="0.3"
            />
            <rect
              x="28"
              y="20"
              width="24"
              height="12"
              rx="4"
              fill="#F5A623"
              opacity="0.8"
            />
            <rect x="32" y="24" width="16" height="4" rx="2" fill="#BE1E2D" />
            <text
              x="40"
              y="52"
              textAnchor="middle"
              fontSize="11"
              fontFamily="Georgia, serif"
              fontWeight="bold"
              fill="#BE1E2D"
            >
              BM
            </text>
            {/* Stars */}
            <circle cx="18" cy="22" r="2.5" fill="#F5A623" opacity="0.7" />
            <circle cx="62" cy="30" r="2" fill="#F5A623" opacity="0.6" />
            <circle cx="58" cy="18" r="1.5" fill="#E8621A" opacity="0.6" />
          </svg>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={0.14}>
        <h1 className="font-display text-2xl font-bold text-espresso leading-snug max-w-xs">
          Share Your Spice Story &amp; Win!
        </h1>
      </AnimatedReveal>

      <AnimatedReveal delay={0.2}>
        <p className="font-body text-sm text-espresso/60 leading-relaxed max-w-xs">
          Answer a few quick questions about your kitchen and get a chance to
          win a{" "}
          <span className="text-crimson font-semibold">
            Badshah Premium Masala Gift Hamper.
          </span>
        </p>
      </AnimatedReveal>

    </div>
  );
}
