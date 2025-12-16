import { Address, User } from './user';

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

export interface LaundryFacilityDetails {
  name?: string;
  description?: string;
  [key: string]: unknown;
}

export interface Equipment {
  [key: string]: unknown;
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
  address?: Address;
  profileImage?: string;
  laundryFacilityImages?: string[];
  laundryFacilityDetails?: LaundryFacilityDetails;
  equipments?: Equipment;
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
  data?: Record<string, unknown>;
}
