import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, Control, FieldErrors, useWatch } from 'react-hook-form';
import { Text } from '@rneui/themed';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { ScrubSignUpForm } from '..';
import { SignUpStyles } from '../types';
import { sendEmailOtp, verifyEmailOtp } from '@/api/authService';
import ImagePickerField from '@/components/ImagePickerField';

type Props = {
  styles: SignUpStyles;
  theme: any;
  control: Control<ScrubSignUpForm>;
  errors: FieldErrors<ScrubSignUpForm>;
  genderValue?: 'male' | 'female' | 'other';
  onGenderSelect: (value: 'male' | 'female' | 'other') => void;
};

const StepDetails: React.FC<Props> = ({
  styles,
  theme,
  control,
  errors,
  genderValue,
  onGenderSelect,
}) => {
    const emailValue = useWatch({ control, name: 'email' });
    const otpValue = useWatch({ control, name: 'otp' });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
  const [sendError, setSendError] = useState<string | undefined>(undefined);
  const [verifyError, setVerifyError] = useState<string | undefined>(undefined);

    const emailValid = useMemo(
        () => !!emailValue && /\S+@\S+\.\S+/.test(emailValue),
        [emailValue],
    );

    const handleSendOtp = async () => {
        if (!emailValid || isSending) return;
        setIsSending(true);
        const result = await sendEmailOtp(emailValue);
        setIsSending(false);
        if (result.status) {
            setOtpSent(true);
      setSendError(undefined);
      setVerifyError(undefined);
        } else {
      setSendError(result.message || 'Unable to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        if (!otpValue || isVerifying) return;
        setIsVerifying(true);
        const result = await verifyEmailOtp(emailValue, otpValue);
        setIsVerifying(false);
        if (result.status) {
            setOtpVerified(true);
      setVerifyError(undefined);
        } else {
      setVerifyError(result.message || 'Invalid OTP');
        }
    };

  const renderGenderPill = (value: 'male' | 'female' | 'other', label: string) => {
    const isActive = genderValue === value;
    return (
      <Button
        title={label}
        type={isActive ? 'solid' : 'outline'}
        onPress={() => onGenderSelect(value)}
        containerStyle={styles.genderPillContainer}
        buttonStyle={[
          styles.genderPill,
          isActive && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
        ]}
        titleStyle={[
          styles.genderPillText,
          isActive && { color: theme.colors.background },
        ]}
      />
    );
  };

  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Enter Details</Text>

          <Controller
              control={control}
              name="profileImage"
              render={({ field: { onChange, value } }) => (
                  <ImagePickerField label="Upload Image" value={value} onChange={onChange} />
              )}
          />

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={
              <Ionicons name="person-outline" size={20} color={theme.colors.grey2} />
            }
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.fullName?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email Address"
            placeholder="Enter your email"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.grey2} />}
            rightIcon={
              <Button
                    title={otpSent ? 'Resend OTP' : 'Send OTP'}
                type="solid"
                    onPress={handleSendOtp}
                    disabled={!emailValid || isSending || otpVerified}
                    loading={isSending}
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

          {otpSent && (
              <Controller
                  control={control}
                  name="otp"
                  render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                          label="Enter OTP"
                          placeholder="***************"
                          leftIcon={<Ionicons name="key-outline" size={20} color={theme.colors.grey2} />}
                          rightIcon={
                              <Button
                                  title="Verify"
                                  type="outline"
                                  onPress={handleVerifyOtp}
                                  loading={isVerifying}
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

          {otpVerified && (
              <>
                  <View style={styles.inlineRow}>
                      <Text style={styles.label}>Gender</Text>
                      <View style={styles.genderRow}>
                          {renderGenderPill('male', 'Male')}
                          {renderGenderPill('female', 'Female')}
                          {renderGenderPill('other', 'Other')}
                      </View>
                  </View>

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

                  <Controller
                      control={control}
                      name="dob"
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              label="Date of Birth"
                              placeholder="mm/dd/yyyy"
                              leftIcon={
                                  <Ionicons name="calendar-outline" size={20} color={theme.colors.grey2} />
                              }
                              rightIcon={<Ionicons name="calendar" size={20} color={theme.colors.primary} />}
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              containerStyle={styles.inputContainer}
                          />
                      )}
                  />

                  <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              label="Password"
                              placeholder="****************"
                              leftIcon={
                                  <Ionicons name="lock-closed-outline" size={20} color={theme.colors.grey2} />
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

                  <Controller
                      control={control}
                      name="confirmPassword"
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              label="Confirm Password"
                              placeholder="****************"
                              leftIcon={
                                  <Ionicons name="lock-closed-outline" size={20} color={theme.colors.grey2} />
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

