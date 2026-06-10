import { create } from 'zustand';

type Result = 'win' | 'no_win' | null;

interface ResultState {
  result: Result;
  setResult: (r: 'win' | 'no_win') => void;
  determineResult: () => 'win' | 'no_win';
}

export const useResultStore = create<ResultState>((set) => ({
  result: null,

  setResult: (r) => set({ result: r }),

  determineResult: () => {
    const r: 'win' | 'no_win' = Math.random() < 0.3 ? 'win' : 'no_win';
    set({ result: r });
    return r;
  },
}));
