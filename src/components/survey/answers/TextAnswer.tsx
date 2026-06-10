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
      className="w-full rounded-xl px-4 py-3 text-[15px] font-body text-ink outline-none resize-none transition-all duration-150"
      style={{
        background: '#F0EBE6',
        border: '1.5px solid transparent',
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#BE1E2D'; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
    />
  );
}
