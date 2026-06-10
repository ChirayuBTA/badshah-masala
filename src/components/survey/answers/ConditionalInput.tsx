'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1">
              <label className="font-body text-sm font-semibold text-espresso/70 mb-1.5 block">
                {question.conditionalLabel}
              </label>
              <input
                type="text"
                value={conditionalValue}
                onChange={(e) => onConditionalChange(e.target.value)}
                placeholder={question.conditionalPlaceholder}
                aria-label={question.conditionalLabel}
                className="w-full rounded-xl border-2 border-parchment-dark bg-white px-4 py-3 text-base font-body text-espresso outline-none transition-colors duration-150 placeholder:text-espresso/30 focus:border-crimson"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
