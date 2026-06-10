'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { SingleQuestion, ConditionalQuestion } from '@/data/survey';

interface Props {
  question: SingleQuestion | ConditionalQuestion;
  value: string;
  onChange: (id: string) => void;
}

export default function SingleSelect({ question, value, onChange }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2">
      {question.options.map((opt, i) => {
        const selected = value === opt.id;
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            whileTap={shouldReduce ? undefined : { scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: selected ? [1, 1.03, 1] : 1 }}
            initial={{ opacity: 0, y: 5 }}
            transition={
              selected
                ? { duration: 0.26, ease: 'easeOut' }
                : { delay: i * 0.03, duration: 0.22, ease: [0.23, 1, 0.32, 1] }
            }
            aria-pressed={selected}
            aria-label={opt.label}
            className="px-3.5 py-2.5 rounded-xl font-body text-sm font-medium min-h-[44px] transition-colors duration-150"
            style={{
              background: selected ? '#BE1E2D' : '#F0EBE6',
              color: selected ? '#ffffff' : '#1A0800',
              border: `1.5px solid ${selected ? '#BE1E2D' : '#E2D9D4'}`,
              boxShadow: selected ? '0 1px 4px rgba(190,30,45,0.25)' : 'none',
            }}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
