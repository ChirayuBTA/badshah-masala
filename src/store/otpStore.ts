import { create } from 'zustand';
import { MOCK_OTP } from '@/lib/config';

type OtpStep = 'form' | 'otp' | 'verified';

interface OtpState {
  name: string;
  phone: string;
  step: OtpStep;
  otpError: string | null;
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  sendOtp: () => void;
  verifyOtp: (code: string) => boolean;
  reset: () => void;
}

export const useOtpStore = create<OtpState>((set) => ({
  name: '',
  phone: '',
  step: 'form',
  otpError: null,

  setName: (v) => set({ name: v }),
  setPhone: (v) => set({ phone: v }),

  sendOtp: () => set({ step: 'otp', otpError: null }),

  verifyOtp: (code) => {
    if (code === MOCK_OTP) {
      set({ step: 'verified', otpError: null });
      return true;
    }
    set({ otpError: 'Incorrect code. Please try 1234.' });
    return false;
  },

  reset: () => set({ name: '', phone: '', step: 'form', otpError: null }),
}));
