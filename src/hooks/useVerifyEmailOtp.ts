import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { verifyEmailOtp } from '@/api/authService';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

export interface VerifyEmailOtpRequest {
  email: string;
  otp: string;
}

export const useVerifyEmailOtp = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const mutation = useMutation<string, Error, VerifyEmailOtpRequest>({
    mutationFn: ({ email, otp }) => verifyEmailOtp(email, otp),
    onSuccess: message => {
      setOtpVerified(true);
      setError(undefined);
      showSuccessToast(
        message || 'Your email has been successfully verified',
        'Email Verified',
      );
    },
    onError: (err: Error) => {
      const errorMsg =
        err.message || 'An unexpected error occurred. Please try again.';
      setOtpVerified(false);
      setError(errorMsg);
      showErrorToast(errorMsg, 'Verification Failed');
    },
  });

  const reset = useCallback(() => {
    setOtpVerified(false);
    setError(undefined);
  }, []);

  return {
    ...mutation,
    otpVerified,
    error,
    reset,
  };
};
