'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ConditionalQuestion } from '@/data/survey';
import SingleSelect from './SingleSelect';

interface Props {
  question: ConditionalQuestion;
  value: string;
  conditionalValue: string;
  onChange: (id: string) => void;
  onConditionalChange: (v: string) => void;
}

export default function ConditionalInput({
  question,
  value,
  conditionalValue,
  onChange,
  onConditionalChange,
}: Props) {
  const shouldReduce = useReducedMotion();
  const showConditional = value === question.conditionalTriggerId;

  return (
    <div className="flex flex-col gap-3">
      <SingleSelect question={question} value={value} onChange={onChange} />

      <AnimatePresence>
        {showConditional && (
          <motion.div
            key="conditional"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduce ? 0 : 0.24,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pt-1 flex flex-col gap-1.5">
              <label className="font-body text-[13px] font-semibold" style={{ color: 'rgba(26,8,0,0.55)' }}>
                {question.conditionalLabel}
              </label>
              <input
                type="text"
                value={conditionalValue}
                onChange={(e) => onConditionalChange(e.target.value)}
                placeholder={question.conditionalPlaceholder}
                aria-label={question.conditionalLabel}
                className="w-full rounded-xl px-4 py-3 text-[15px] font-body text-ink outline-none transition-all duration-150"
                style={{ background: '#F0EBE6', border: '1.5px solid transparent' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#BE1E2D'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
