import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types/auth';
import { User } from '@/types/user';

export const signIn = async (
  credentials: SignInRequest,
): Promise<SignInResponse> => {
  const response = await axiosInstance.post<{
    user: User;
    authToken: string;
    status?: boolean;
    message?: string;
  }>(ENDPOINTS.LOGIN, credentials);

  if (response.data?.user && response.data?.authToken) {
    return {
      status: true,
      data: {
        user: response.data.user,
        authToken: response.data.authToken,
      },
    };
  }

  throw new Error(response.data?.message || 'Sign in failed');
};

export const signUp = async (payload: SignUpRequest): Promise<string> => {
  const response = await axiosInstance.post<SignUpResponse>(
    ENDPOINTS.SIGNUP,
    payload,
  );

  if (response.data?.status) {
    return response.data?.message || 'Sign up successful';
  }

  throw new Error(response.data?.message || 'Sign up failed');
};

export const sendEmailOtp = async (email: string): Promise<string> => {
  const response = await axiosInstance.post(ENDPOINTS.SEND_EMAIL_OTP, {
    email,
  });
  if (response?.status) {
    return 'OTP sent successfully';
  }

  throw new Error(response.data?.message || 'Failed to send OTP');
};

export const verifyEmailOtp = async (
  email: string,
  otp: string,
): Promise<string> => {
  const response = await axiosInstance.post<{
    status: boolean;
    message?: string;
  }>(ENDPOINTS.VERIFY_EMAIL_OTP, { email, otp });

  if (response.data?.status) {
    return response.data?.message || 'OTP verified successfully';
  }

  throw new Error(response.data?.message || 'Failed to verify OTP');
};

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<string> => {
  const response = await axiosInstance.post<ForgotPasswordResponse>(
    ENDPOINTS.FORGOT_PASSWORD,
    payload,
  );

  if (response.data?.status) {
    return response.data?.message || 'Password reset email sent successfully';
  }

  throw new Error(
    response.data?.message || 'Failed to send password reset email',
  );
};
