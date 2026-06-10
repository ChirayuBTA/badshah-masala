import { create } from 'zustand';
import { survey } from '@/data/survey';

type AnswerValue = string | string[];

interface SurveyState {
  currentSectionIndex: number;
  answers: Record<string, AnswerValue>;
  isSubmitting: boolean;
  setAnswer: (questionId: string, value: AnswerValue) => void;
  nextSection: () => void;
  prevSection: () => void;
  submit: () => Promise<void>;
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
    set({ isSubmitting: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ isSubmitting: false });
  },
}));
