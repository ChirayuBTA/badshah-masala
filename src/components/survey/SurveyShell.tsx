'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useSurveyStore } from '@/store/surveyStore';
import type { SurveyConfig, Section } from '@/data/survey';
import SectionProgress from './SectionProgress';
import QuestionCard from './QuestionCard';
import Button from '@/components/ui/Button';

interface Props {
  sections: SurveyConfig;
}

function isSectionComplete(section: Section, answers: Record<string, string | string[]>): boolean {
  return section.questions.every((q) => {
    if (q.type === 'compound') return true; // compound not required at shell level
    if (!q.required) return true;
    const val = answers[q.id];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  });
}

export default function SurveyShell({ sections }: Props) {
  const router = useRouter();
  const { currentSectionIndex, answers, nextSection, prevSection, isSubmitting, submit } = useSurveyStore();
  const direction = useRef<'forward' | 'back'>('forward');
  const scrollRef = useRef<HTMLDivElement>(null);

  const section = sections[currentSectionIndex];
  const isFirst = currentSectionIndex === 0;
  const isLast = currentSectionIndex === sections.length - 1;
  const canAdvance = isSectionComplete(section, answers);

  const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0 });

  const handleNext = () => {
    if (!canAdvance) return;
    direction.current = 'forward';
    nextSection();
    scrollToTop();
  };

  const handlePrev = () => {
    direction.current = 'back';
    prevSection();
    scrollToTop();
  };

  const handleSubmit = async () => {
    if (!canAdvance) return;
    await submit();
    router.push('/result');
  };

  const variants = {
    enterForward: { x: 40, opacity: 0 },
    enterBack: { x: -40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exitForward: { x: -40, opacity: 0 },
    exitBack: { x: 40, opacity: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-white border-b border-parchment-dark sticky top-0 z-10">
        <div className="flex items-center px-4 py-3 gap-2">
          {!isFirst && (
            <button
              onClick={handlePrev}
              aria-label="Previous section"
              className="p-2 rounded-xl hover:bg-parchment-dark transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="#1A0800" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <span className="font-display text-base font-bold text-espresso flex-1 text-center">
            {section.title}
          </span>
          <div className={isFirst ? 'w-[44px]' : ''} />
        </div>
        <SectionProgress
          current={currentSectionIndex}
          total={sections.length}
          subtitle={section.subtitle}
        />
      </div>

      {/* Questions */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={section.id}
            initial={direction.current === 'forward' ? variants.enterForward : variants.enterBack}
            animate={variants.center}
            exit={direction.current === 'forward' ? variants.exitForward : variants.exitBack}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-4 p-4 pb-32"
          >
            {section.questions.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-parchment border-t border-parchment-dark px-4 py-4 max-w-lg mx-auto w-full">
        {!canAdvance && (
          <p className="font-body text-xs text-spice text-center mb-2">
            Please answer all required questions to continue
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
