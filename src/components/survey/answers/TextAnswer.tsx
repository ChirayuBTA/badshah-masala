'use client';

import type { TextQuestion } from '@/data/survey';

interface Props {
  question: TextQuestion;
  value: string;
  onChange: (v: string) => void;
}

export default function TextAnswer({ question, value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder ?? 'Type your answer here…'}
      aria-label={question.label}
      rows={3}
      className="w-full rounded-xl border-2 border-parchment-dark bg-white px-4 py-3 text-base font-body text-espresso outline-none resize-none transition-colors duration-150 placeholder:text-espresso/30 focus:border-crimson"
    />
  );
}
