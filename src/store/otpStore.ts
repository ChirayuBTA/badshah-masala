import { create } from 'zustand';

type OtpStep = 'form' | 'otp' | 'verified';

interface OtpState {
  name: string;
  phone: string;
  step: OtpStep;
  otpError: string | null;
  userId: string | null;
  isLoading: boolean;
  isResending: boolean;
  apiError: string | null;
  lastSentAt: number | null;
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  sendOtp: () => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  reset: () => void;
}

export const useOtpStore = create<OtpState>((set, get) => ({
  name: '',
  phone: '',
  step: 'form',
  otpError: null,
  userId: null,
  isLoading: false,
  isResending: false,
  apiError: null,
  lastSentAt: null,

  setName: (v) => set({ name: v }),
  setPhone: (v) => set({ phone: v }),

  sendOtp: async () => {
    const { name, phone } = get();
    set({ isLoading: true, apiError: null });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (res.status === 409) {
        set({ apiError: "You've already completed the survey." });
        return;
      }
      if (!res.ok) throw new Error('Failed to send OTP');
      set({ step: 'otp', otpError: null, lastSentAt: Date.now() });
    } catch {
      set({ apiError: 'Something went wrong. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  verifyOtp: async (code) => {
    const { phone } = get();
    set({ isLoading: true, otpError: null });
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      if (!res.ok) {
        const data = await res.json();
        const msg =
          data.error === 'expired'
            ? 'Code has expired. Please request a new one.'
            : 'Incorrect code. Please try again.';
        set({ otpError: msg });
        return;
      }
      const { userId } = await res.json();
      set({ step: 'verified', userId, otpError: null });
    } catch {
      set({ otpError: 'Something went wrong. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  resendOtp: async () => {
    const { phone } = get();
    set({ isResending: true, otpError: null });
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (res.status === 409) {
        set({ apiError: "You've already completed the survey." });
        return;
      }
      if (!res.ok) throw new Error('Failed to resend OTP');
      set({ lastSentAt: Date.now(), otpError: null });
    } catch {
      set({ otpError: 'Could not resend code. Please try again.' });
    } finally {
      set({ isResending: false });
    }
  },

  reset: () =>
    set({ name: '', phone: '', step: 'form', otpError: null, userId: null, isLoading: false, isResending: false, apiError: null, lastSentAt: null }),
}));
