import { create } from 'zustand';
import { survey } from '@/data/survey';
import { useOtpStore } from '@/store/otpStore';

type AnswerValue = string | string[];

interface SurveyState {
  currentSectionIndex: number;
  answers: Record<string, AnswerValue>;
  isSubmitting: boolean;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  nextSection: () => void;
  prevSection: () => void;
  submit: () => Promise<void>;
  reset: () => void;
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  currentSectionIndex: 0,
  answers: {},
  isSubmitting: false,

  setAnswer: (questionId, value) =>
    set((s) => ({ answers: { ...s.answers, [questionId]: value } })),

  nextSection: () =>
    set((s) => ({
      currentSectionIndex: Math.min(s.currentSectionIndex + 1, survey.length - 1),
    })),

  prevSection: () =>
    set((s) => ({
      currentSectionIndex: Math.max(s.currentSectionIndex - 1, 0),
    })),

  submit: async () => {
    const { answers } = get();
    const phone = useOtpStore.getState().phone;
    set({ isSubmitting: true });
    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, answers }),
      });
      if (!res.ok) throw new Error('Failed to submit survey');
    } finally {
      set({ isSubmitting: false });
    }
  },

  reset: () => set({ currentSectionIndex: 0, answers: {}, isSubmitting: false }),
}));
