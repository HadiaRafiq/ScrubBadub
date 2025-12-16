import axiosInstance from './axiosInstance';
import { User } from '@/types/user';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  status: boolean;
  message?: string;
  data?: {
    user: User;
    authToken: string;
  };
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullname: string;
  phone: string;
  role: string;
  emailOtp?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: any;
  profileImage?: any;
  laundryFacilityImages?: any[];
  laundryFacilityDetails?: any;
  equipments?: any;
  isSmokeFree?: boolean;
}

export interface SignUpResponse {
  status: boolean;
  message?: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: boolean;
  message?: string;
  data?: any;
}

export const signIn = async (
  credentials: SignInRequest,
): Promise<SignInResponse> => {
  const response = await axiosInstance.post<{
    user: User;
    authToken: string;
    status?: boolean;
    message?: string;
  }>('/auth/login', credentials);

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
    '/auth/signup',
    payload,
  );

  if (response.data?.status) {
    return response.data?.message || 'Sign up successful';
  }

  throw new Error(response.data?.message || 'Sign up failed');
};

export const sendEmailOtp = async (email: string): Promise<string> => {
  const response = await axiosInstance.post('/auth/send-otp-for-email', {
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
  }>('/auth/verify-email-otp', { email, otp });

  if (response.data?.status) {
    return response.data?.message || 'OTP verified successfully';
  }

  throw new Error(response.data?.message || 'Failed to verify OTP');
};

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<string> => {
  const response = await axiosInstance.post<ForgotPasswordResponse>(
    '/auth/forgot-password',
    payload,
  );

  if (response.data?.status) {
    return response.data?.message || 'Password reset email sent successfully';
  }

  throw new Error(
    response.data?.message || 'Failed to send password reset email',
  );
};  