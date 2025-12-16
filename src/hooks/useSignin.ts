import { useMutation } from '@tanstack/react-query';

import { signIn } from '@/services/authService';
import { useAuthStore } from '@/store/auth';
import { SignInRequest, SignInResponse } from '@/types/auth';
import { showSuccessToast } from '@/utils/toast';

export const useSignin = () => {
  const { setUser, setToken } = useAuthStore();

  return useMutation<SignInResponse, Error, SignInRequest>({
    mutationFn: signIn,
    onSuccess: response => {
      if (response.status && response.data) {
        setUser(response.data.user);
        setToken(response.data.authToken);
        showSuccessToast('Signin successful');
        // Navigation will automatically switch to authenticated stack via AppNavigator
      }
    },
  });
};
