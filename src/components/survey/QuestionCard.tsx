'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useSurveyStore } from '@/store/surveyStore';
import type { Question } from '@/data/survey';
import SingleSelect from './answers/SingleSelect';
import MultiSelect from './answers/MultiSelect';
import TextAnswer from './answers/TextAnswer';
import ConditionalInput from './answers/ConditionalInput';

interface Props {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: Props) {
  const { answers, setAnswer } = useSurveyStore();
  const shouldReduce = useReducedMotion();

  const renderInput = () => {
    if (question.type === 'single') {
      return (
        <SingleSelect
          question={question}
          value={(answers[question.id] as string) ?? ''}
          onChange={(id) => setAnswer(question.id, id)}
        />
      );
    }
    if (question.type === 'multi') {
      return (
        <MultiSelect
          question={question}
          value={(answers[question.id] as string[]) ?? []}
          onChange={(ids) => setAnswer(question.id, ids)}
        />
      );
    }
    if (question.type === 'text') {
      return (
        <TextAnswer
          question={question}
          value={(answers[question.id] as string) ?? ''}
          onChange={(v) => setAnswer(question.id, v)}
        />
      );
    }
    if (question.type === 'conditional') {
      return (
        <ConditionalInput
          question={question}
          value={(answers[question.id] as string) ?? ''}
          conditionalValue={(answers[`${question.id}_conditional`] as string) ?? ''}
          onChange={(id) => setAnswer(question.id, id)}
          onConditionalChange={(v) => setAnswer(`${question.id}_conditional`, v)}
        />
      );
    }
    if (question.type === 'compound') {
      return (
        <div className="flex flex-col gap-4">
          {question.parts.map((part) => (
            <div key={part.id} className="flex flex-col gap-2">
              <p className="font-body text-[13px] font-semibold" style={{ color: 'rgba(26,8,0,0.55)' }}>
                {part.label}
              </p>
              {part.type === 'text' ? (
                <TextAnswer
                  question={part}
                  value={(answers[part.id] as string) ?? ''}
                  onChange={(v) => setAnswer(part.id, v)}
                />
              ) : (
                <SingleSelect
                  question={part}
                  value={(answers[part.id] as string) ?? ''}
                  onChange={(id) => setAnswer(part.id, id)}
                />
              )}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col gap-3 rounded-2xl p-4"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2D9D4',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <p className="font-body text-[15px] font-semibold text-ink leading-snug">
        {question.label}
        {question.type !== 'compound' && question.required && (
          <span className="text-crimson ml-0.5" aria-hidden>*</span>
        )}
      </p>
      {renderInput()}
    </motion.div>
  );
}
