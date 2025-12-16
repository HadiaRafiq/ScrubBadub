import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendEmailOtp } from '@/api/authService';
import { showSuccessToast } from '@/utils/toast';

export const useSendEmailOtp = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const mutation = useMutation<string, Error, string>({
    mutationFn: sendEmailOtp,
    onSuccess: message => {
      setOtpSent(true);
      setError(undefined);
      showSuccessToast(
        message || 'Please check your email for the OTP code',
        'OTP Sent',
      );
    },
  });

  const reset = useCallback(() => {
    setOtpSent(false);
    setError(undefined);
  }, []);

  return {
    ...mutation,
    otpSent,
    error,
    reset,
  };
};

