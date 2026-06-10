'use client';

import { motion } from 'framer-motion';
import type { MultiQuestion } from '@/data/survey';

interface Props {
  question: MultiQuestion;
  value: string[];
  onChange: (ids: string[]) => void;
}

export default function MultiSelect({ question, value, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {question.options.map((opt) => {
        const selected = value.includes(opt.id);
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            animate={selected ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={selected ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.15 }}
            aria-pressed={selected}
            aria-label={opt.label}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 font-body text-sm font-medium transition-colors duration-150 min-h-[44px] ${
              selected
                ? 'border-crimson bg-crimson text-white'
                : 'border-parchment-dark bg-white text-espresso hover:border-crimson/40'
            }`}
          >
            {selected && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
