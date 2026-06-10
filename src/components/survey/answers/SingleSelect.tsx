'use client';

import { motion } from 'framer-motion';
import type { SingleQuestion, ConditionalQuestion } from '@/data/survey';

interface Props {
  question: SingleQuestion | ConditionalQuestion;
  value: string;
  onChange: (id: string) => void;
}

export default function SingleSelect({ question, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {question.options.map((opt, i) => {
        const selected = value === opt.id;
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            whileTap={{ scale: 0.96 }}
            animate={selected ? { scale: [1, 1.03, 1], opacity: 1, y: 0 } : { scale: 1, opacity: 1, y: 0 }}
            transition={selected ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.15 }}
            initial={{ opacity: 0, y: 6 }}
            aria-pressed={selected}
            aria-label={opt.label}
            style={{ transitionDelay: `${i * 40}ms` }}
            className={`relative px-4 py-2.5 rounded-xl border-2 font-body text-sm font-medium transition-colors duration-150 overflow-hidden min-h-[44px] ${
              selected
                ? 'border-crimson bg-crimson text-white'
                : 'border-parchment-dark bg-white text-espresso hover:border-crimson/40'
            }`}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
