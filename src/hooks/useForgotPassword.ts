import { useMutation } from '@tanstack/react-query';
import {
  forgotPassword,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '@/api/authService';
import { showSuccessToast } from '@/utils/toast';

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationFn: forgotPassword,
    onSuccess: response => {
      if (response.status) {
        showSuccessToast(
          'Password reset email sent. Please check your inbox.',
        );
      }
    },
  });
};

