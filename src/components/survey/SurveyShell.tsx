'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useSurveyStore } from '@/store/surveyStore';
import { useResultStore } from '@/store/resultStore';
import type { SurveyConfig, Section } from '@/data/survey';
import SectionProgress from './SectionProgress';
import QuestionCard from './QuestionCard';
import Button from '@/components/ui/Button';

interface Props {
  sections: SurveyConfig;
}

function isSectionComplete(section: Section, answers: Record<string, string | string[]>): boolean {
  return section.questions.every((q) => {
    if (q.type === 'compound') return true;
    if (!q.required) return true;
    const val = answers[q.id];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  });
}

export default function SurveyShell({ sections }: Props) {
  const router = useRouter();
  const shouldReduce = useReducedMotion();
  const { currentSectionIndex, answers, nextSection, prevSection, isSubmitting, submit } = useSurveyStore();
  const { determineResult } = useResultStore();
  const direction = useRef<'forward' | 'back'>('forward');

  const section = sections[currentSectionIndex];
  const isFirst = currentSectionIndex === 0;
  const isLast = currentSectionIndex === sections.length - 1;
  const canAdvance = isSectionComplete(section, answers);

  const handleNext = () => {
    if (!canAdvance) return;
    direction.current = 'forward';
    nextSection();
  };

  const handlePrev = () => {
    direction.current = 'back';
    prevSection();
  };

  const handleSubmit = async () => {
    if (!canAdvance) return;
    await submit();
    determineResult();
    router.push('/result');
  };

  const slideVariants = {
    enterForward: { x: shouldReduce ? 0 : 36, opacity: 0 },
    enterBack:    { x: shouldReduce ? 0 : -36, opacity: 0 },
    center:       { x: 0, opacity: 1 },
    exitForward:  { x: shouldReduce ? 0 : -36, opacity: 0 },
    exitBack:     { x: shouldReduce ? 0 : 36, opacity: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#FAFAFA' }}>
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10"
        style={{ background: '#FAFAFA', borderBottom: '1px solid #E2D9D4' }}
      >
        <div className="flex items-center px-4 py-3 gap-1">
          {!isFirst ? (
            <button
              onClick={handlePrev}
              aria-label="Previous section"
              className="flex items-center justify-center rounded-xl transition-colors duration-150 min-h-[44px] min-w-[44px]"
              style={{ color: '#1A0800' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div className="w-[44px]" />
          )}

          <span className="font-display text-[15px] font-bold text-ink flex-1 text-center truncate px-1">
            {section.title}
          </span>

          {/* Wordmark chip */}
          <div className="w-[44px] flex justify-end">
            <span className="font-display text-xs font-extrabold text-crimson tracking-tight">BM</span>
          </div>
        </div>

        <SectionProgress
          current={currentSectionIndex}
          total={sections.length}
          subtitle={section.subtitle}
        />
      </div>

      {/* Scrollable questions */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={section.id}
            initial={direction.current === 'forward' ? slideVariants.enterForward : slideVariants.enterBack}
            animate={slideVariants.center}
            exit={direction.current === 'forward' ? slideVariants.exitForward : slideVariants.exitBack}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3 p-4 pb-32"
          >
            {section.questions.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto w-full px-4 py-4"
        style={{
          background: 'rgba(250,250,250,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid #E2D9D4',
        }}
      >
        {!canAdvance && (
          <p className="font-body text-xs text-spice text-center mb-2">
            Answer all required questions to continue
          </p>
        )}
        <Button
          label={isLast ? 'Reveal My Prize' : 'Next Section →'}
          onClick={isLast ? handleSubmit : handleNext}
          isLoading={isSubmitting}
          disabled={!canAdvance}
          accessibilityLabel={isLast ? 'Submit survey and reveal prize' : 'Go to next section'}
        />
      </div>
    </div>
  );
}
