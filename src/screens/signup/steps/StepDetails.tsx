import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { Image, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Theme } from '@rneui/themed';
import { z } from 'zod';

import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useSendEmailOtp } from '@/hooks/useSendEmailOtp';
import { useVerifyEmailOtp } from '@/hooks/useVerifyEmailOtp';
import { pickImage } from '@/utils/imagePicker';

import { SignUpStyles } from '../types';
import { ScrubSignUpForm } from '..';

// Zod schema for StepDetails validation
const stepDetailsSchema = z
  .object({
    email: z.string().email('Enter a valid email address'),
    fullName: z.string().min(1, 'Full name is required'),
    otp: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    phone: z.string().min(6, 'Phone number must be at least 6 characters'),
    dob: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    profileImage: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Props = {
  styles: SignUpStyles;
  theme: Theme;
  control: Control<ScrubSignUpForm>;
  errors: FieldErrors<ScrubSignUpForm>;
  genderValue?: 'male' | 'female' | 'other';
  onGenderSelect: (value: 'male' | 'female' | 'other') => void;
  setValue: UseFormSetValue<ScrubSignUpForm>;
  onOtpVerifiedChange?: (verified: boolean) => void;
};

const noMarginBottom = { marginBottom: 0 };

const StepDetails: React.FC<Props> = ({
  styles,
  theme,
  control,
  errors,
  genderValue,
  onGenderSelect,
  setValue,
  onOtpVerifiedChange,
}) => {
  const emailValue = useWatch({ control, name: 'email' });
  const otpValue = useWatch({ control, name: 'otp' });

  // Custom hooks for OTP operations
  const sendOtpMutation = useSendEmailOtp();
  const verifyOtpMutation = useVerifyEmailOtp();

  const { otpSent, error: sendError, reset: resetSendOtp } = sendOtpMutation;
  const {
    otpVerified,
    error: verifyError,
    reset: resetVerifyOtp,
  } = verifyOtpMutation;

  // Use zod schema for email validation
  const emailValid = useMemo(() => {
    if (!emailValue) return false;
    const result = stepDetailsSchema.shape.email.safeParse(emailValue);

    return result.success;
  }, [emailValue]);

  // Reset OTP state when email changes
  useEffect(() => {
    resetSendOtp();
    resetVerifyOtp();
    onOtpVerifiedChange?.(false);
  }, [emailValue, onOtpVerifiedChange, resetSendOtp, resetVerifyOtp]);

  // Update parent component when OTP verification status changes
  useEffect(() => {
    onOtpVerifiedChange?.(otpVerified);
  }, [otpVerified, onOtpVerifiedChange]);

  const handleSendOtp = () => {
    if (!emailValid || sendOtpMutation.isPending) return;
    sendOtpMutation.mutate(emailValue);
  };

  const handleVerifyOtp = () => {
    if (!otpValue || verifyOtpMutation.isPending) return;
    verifyOtpMutation.mutate({ email: emailValue, otp: otpValue });
  };

  const profileImageValue = useWatch({ control, name: 'profileImage' });
  const dobValue = useWatch({ control, name: 'dob' });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleImagePicker = useCallback(async () => {
    const result = await pickImage();

    if (result) {
      setValue('profileImage', result.uri || '', { shouldValidate: true });
    }
  }, [setValue]);

  // Format date to mm/dd/yyyy
  const formatDate = useCallback((date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }, []);

  // Parse date from mm/dd/yyyy string
  const parseDate = useCallback((dateString: string): Date | null => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return null;

    return date;
  }, []);

  // Get initial date value or default to current date
  const getInitialDate = useCallback((): Date => {
    if (dobValue) {
      const parsed = parseDate(dobValue);
      if (parsed) return parsed;
    }
    // Default to date 18 years ago (minimum age requirement)
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);

    return date;
  }, [dobValue, parseDate]);

  const handleDatePickerConfirm = useCallback(
    (date: Date) => {
      const formattedDate = formatDate(date);
      setValue('dob', formattedDate, { shouldValidate: true });
      setIsDatePickerVisible(false);
    },
    [setValue, formatDate],
  );

  const handleDatePickerCancel = useCallback(() => {
    setIsDatePickerVisible(false);
  }, []);

  const handleDateFieldPress = useCallback(() => {
    setIsDatePickerVisible(true);
  }, []);

  // Render gender selection pills
  const renderGenderPill = useCallback(
    (value: 'male' | 'female' | 'other', label: string) => {
      const isActive = genderValue === value;

      return (
        <Button
          title={label}
          type={isActive ? 'solid' : 'outline'}
          onPress={() => onGenderSelect(value)}
          containerStyle={styles.genderPillContainer}
          buttonStyle={[
            styles.genderPill,
            isActive && {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            },
          ]}
          titleStyle={[
            styles.genderPillText,
            isActive && { color: theme.colors.background },
          ]}
        />
      );
    },
    [genderValue, onGenderSelect, styles, theme.colors],
  );

  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Enter Details</Text>

      {/* Upload Image */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Upload Image</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          activeOpacity={0.85}
          onPress={handleImagePicker}
        >
          {profileImageValue ? (
            <Image source={{ uri: profileImageValue }} style={styles.preview} />
          ) : (
            <>
              <Ionicons
                name="image-outline"
                size={moderateScale(22)}
                color="#9E9E9E"
              />
              <Text style={styles.uploadText}>Upload Image</Text>
              <Text style={styles.linkText}>Choose from gallery</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.colors.grey2}
              />
            }
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.fullName?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      {/* Email Address */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email Address"
            placeholder="Enter your email"
            leftIcon={
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.colors.grey2}
              />
            }
            rightIcon={
              <Button
                title={otpSent ? 'Resend OTP' : 'Send OTP'}
                type="solid"
                onPress={handleSendOtp}
                disabled={
                  !emailValid || sendOtpMutation.isPending || otpVerified
                }
                loading={sendOtpMutation.isPending}
                containerStyle={styles.sendOtpButton}
                buttonStyle={styles.sendOtpButtonStyle}
                titleStyle={styles.sendOtpTitle}
              />
            }
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.email?.message || sendError}
            containerStyle={styles.inputContainer}
            autoCapitalize="none"
          />
        )}
      />

      {/* Fields shown after OTP is verified - in order: Gender, Phone, Enter OTP, DOB, Password, Confirm Password */}
      {otpVerified && (
        <>
          {/* Gender */}
          <View style={styles.inlineRow}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              {renderGenderPill('male', 'Male')}
              {renderGenderPill('female', 'Female')}
              {renderGenderPill('other', 'Other')}
            </View>
          </View>

          {/* Phone */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone"
                placeholder="Phone Number"
                leftIcon={
                  <View style={styles.flagContainer}>
                    <Text style={styles.flagEmoji}>🇺🇸</Text>
                    <Text style={styles.flagCode}>+1</Text>
                  </View>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.phone?.message}
                containerStyle={styles.inputContainer}
                keyboardType="phone-pad"
              />
            )}
          />
        </>
      )}

      {/* Enter OTP - Only shown after OTP is sent */}
      {otpSent && (
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Enter OTP"
              placeholder="Enter OTP"
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.colors.grey2}
                />
              }
              rightIcon={
                <Button
                  title="Verify"
                  type="outline"
                  onPress={handleVerifyOtp}
                  loading={verifyOtpMutation.isPending}
                  disabled={otpVerified}
                  containerStyle={styles.sendOtpButton}
                  buttonStyle={styles.sendOtpButtonStyle}
                  titleStyle={styles.sendOtpTitle}
                />
              }
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={verifyError || errors.otp?.message}
              containerStyle={styles.inputContainer}
              secureTextEntry
            />
          )}
        />
      )}

      {/* Remaining fields shown after OTP is verified */}
      {otpVerified && (
        <>
          {/* Date of Birth */}
          <Controller
            control={control}
            name="dob"
            render={({ field: { value } }) => (
              <TouchableOpacity
                onPress={handleDateFieldPress}
                activeOpacity={0.7}
                style={styles.inputContainer}
              >
                <Input
                  label="Date of Birth"
                  placeholder="mm/dd/yyyy"
                  leftIcon={
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={theme.colors.grey2}
                    />
                  }
                  rightIcon={
                    <Ionicons
                      name="calendar"
                      size={20}
                      color={theme.colors.primary}
                    />
                  }
                  value={value || ''}
                  editable={false}
                  errorMessage={errors.dob?.message}
                  containerStyle={noMarginBottom}
                />
              </TouchableOpacity>
            )}
          />
          {/* Date Picker */}
          <DatePicker
            isVisible={isDatePickerVisible}
            value={getInitialDate()}
            mode="date"
            maximumDate={new Date()} // Cannot select future dates
            minimumDate={new Date(1900, 0, 1)} // Minimum date: Jan 1, 1900
            onConfirm={handleDatePickerConfirm}
            onCancel={handleDatePickerCancel}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                leftIcon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={theme.colors.grey2}
                  />
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.password?.message}
                containerStyle={styles.inputContainer}
                secureTextEntry
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                leftIcon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={theme.colors.grey2}
                  />
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.confirmPassword?.message}
                containerStyle={styles.inputContainer}
                secureTextEntry
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default StepDetails;
