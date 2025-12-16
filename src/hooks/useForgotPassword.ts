import { useMutation } from '@tanstack/react-query';
import { forgotPassword, ForgotPasswordRequest } from '@/api/authService';
import { showSuccessToast } from '@/utils/toast';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export const useForgotPassword = () => {
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  return useMutation<string, Error, ForgotPasswordRequest>({
    mutationFn: forgotPassword,
    onSuccess: message => {
      showSuccessToast(
        message || 'Password reset email sent. Please check your inbox.',
      );
      navigation.navigate(AUTH_ROUTES.SIGNIN);
    },
  });
};

