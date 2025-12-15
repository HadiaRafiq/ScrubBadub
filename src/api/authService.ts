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
    token: string;
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
  // Add other signup fields as needed
}

export interface SignUpResponse {
  status: boolean;
  message?: string;
  data?: {
    user: User;
    token: string;
  };
}

export const signIn = async (
  credentials: SignInRequest,
): Promise<SignInResponse> => {
  try {
    const response = await axiosInstance.post('/auth/signin', credentials);
    return {
      status: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message || 'Sign in failed',
    };
  }
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const response = await axiosInstance.post('/auth/signup', data);
    return {
      status: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message || 'Sign up failed',
    };
  }
};

export const sendEmailOtp = async (email: string) => {
  try {
    await axiosInstance.post('/auth/send-otp-for-email', { email });
    return { status: true };
  } catch (error: any) {
    return { status: false, message: error?.message || 'Failed to send OTP' };
  }
};

export const verifyEmailOtp = async (email: string, otp: string) => {
  try {
    await axiosInstance.post('/auth/verify-email-otp', { email, otp });
    return { status: true };
  } catch (error: any) {
    return { status: false, message: error?.message || 'Failed to verify OTP' };
  }
};

export const forgotPassword = async (email: string) => {
  await axiosInstance.post('/auth/forgot-password', { email });
};  