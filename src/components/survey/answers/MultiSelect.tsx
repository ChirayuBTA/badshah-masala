'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { MultiQuestion } from '@/data/survey';

interface Props {
  question: MultiQuestion;
  value: string[];
  onChange: (ids: string[]) => void;
}

export default function MultiSelect({ question, value, onChange }: Props) {
  const shouldReduce = useReducedMotion();

  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {question.options.map((opt) => {
        const selected = value.includes(opt.id);
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            whileTap={shouldReduce ? undefined : { scale: 0.96 }}
            animate={{ scale: selected ? [1, 1.03, 1] : 1 }}
            transition={selected ? { duration: 0.26, ease: 'easeOut' } : { duration: 0.15 }}
            aria-pressed={selected}
            aria-label={opt.label}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-body text-sm font-medium min-h-[44px] transition-colors duration-150"
            style={{
              background: selected ? '#BE1E2D' : '#F0EBE6',
              color: selected ? '#ffffff' : '#1A0800',
              border: `1.5px solid ${selected ? '#BE1E2D' : '#E2D9D4'}`,
              boxShadow: selected ? '0 1px 4px rgba(190,30,45,0.25)' : 'none',
            }}
          >
            {selected && (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
