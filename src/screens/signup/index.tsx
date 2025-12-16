import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { makeStyles, useTheme } from '@rneui/themed';
import { z } from 'zod';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Stepper, { Step } from '@/components/Stepper';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { AuthStackNavigatorParamList } from '@/types/routes';
import { ROLES } from '@/types/user';
import StepRole from './steps/StepRole';
import StepDetails from './steps/StepDetails';
import StepAddress from './steps/StepAddress';
import StepAdditional from './steps/StepAdditional';
import StepReview from './steps/StepReview';

export const scrubSignUpSchema = z.object({
  role: z.nativeEnum(ROLES).optional(),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  gender: z.enum(['male', 'female', 'other']).optional(),
  phone: z.string().min(6, 'Enter phone'),
  otp: z.string().optional(),
  dob: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Confirm your password'),
  profileImage: z.string().optional(),
  address: z.string().min(1, 'Address required'),
  city: z.string().min(1, 'City required'),
  state: z.string().min(1, 'State required'),
  country: z.string().min(1, 'Country required'),
  postalCode: z.string().min(1, 'Postal code required'),
  pinLocation: z.string().optional(),
  additionalInfo: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type ScrubSignUpForm = z.infer<typeof scrubSignUpSchema>;

const SignUp = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  const form = useForm<ScrubSignUpForm>({
    resolver: zodResolver(scrubSignUpSchema),
    mode: 'onChange',
    defaultValues: {
      role: undefined,
      fullName: '',
      email: '',
      gender: undefined,
      phone: '',
      otp: '',
      dob: '',
      password: '',
      confirmPassword: '',
      profileImage: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      pinLocation: 'AB-123, Some Rd, Some City',
      additionalInfo: '',
    },
  });

  const { control, handleSubmit, formState, setValue, watch } = form;
  const { errors, isSubmitting } = formState;
  const roleValue = watch('role');
  const genderValue = watch('gender');

    const isDuberOrScrub = roleValue === ROLES.DUBER || roleValue === ROLES.SCRUB;

  const steps: Step[] = useMemo(() => {
    const base: Step[] = [{ label: 'Role' }, { label: 'Details' }, { label: 'Address' }];
      if (isDuberOrScrub) {
      base.push({ label: 'Additional' });
    }
    base.push({ label: 'Review' });
    return base;
  }, [isDuberOrScrub]);

  const stepFields = useMemo(() => {
      if (isDuberOrScrub) {
      return {
        0: ['role'],
        1: ['fullName', 'email', 'phone', 'password', 'confirmPassword'],
        2: ['address', 'city', 'state', 'country', 'postalCode'],
        3: ['additionalInfo'],
        4: [],
      } as Record<number, (keyof ScrubSignUpForm)[]>;
    }
    return {
      0: ['role'],
      1: ['fullName', 'email', 'phone', 'password', 'confirmPassword'],
      2: ['address', 'city', 'state', 'country', 'postalCode'],
      3: [],
    } as Record<number, (keyof ScrubSignUpForm)[]>;
  }, [isDuberOrScrub]);

  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep } =
    useMultiStepForm(steps.length, form, {
      stepFields,
    });

  const countryOptions = useMemo(
    () => [
      { label: 'United States', value: 'USA' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Canada', value: 'CAN' },
    ],
    [],
  );

  const renderStepContent = () => {
      if (isDuberOrScrub) {
      switch (currentStep) {
        case 0:
          return (
            <StepRole
              styles={styles}
              theme={theme}
              roleValue={roleValue}
              onSelectRole={role => setValue('role', role)}
            />
          );
        case 1:
          return (
            <StepDetails
              styles={styles}
              theme={theme}
              control={control}
              errors={errors}
              genderValue={genderValue}
              onGenderSelect={value => setValue('gender', value)}
              setValue={setValue}
            />
          );
        case 2:
          return (
            <StepAddress
              styles={styles}
              theme={theme}
              control={control}
              errors={errors}
              countryOptions={countryOptions}
            />
          );
        case 3:
          return (
            <StepAdditional
              styles={styles}
              control={control}
              errors={errors}
            />
          );
        case 4:
          return (
            <StepReview
              styles={styles}
              theme={theme}
              watch={watch}
              genderValue={genderValue}
                  isDuberOrScrub={isDuberOrScrub}
            />
          );
        default:
          return null;
      }
    }

    switch (currentStep) {
      case 0:
        return (
          <StepRole
            styles={styles}
            theme={theme}
            roleValue={roleValue}
            onSelectRole={role => setValue('role', role)}
          />
        );
      case 1:
        return (
          <StepDetails
            styles={styles}
            theme={theme}
            control={control}
            errors={errors}
            genderValue={genderValue}
            onGenderSelect={value => setValue('gender', value)}
            setValue={setValue}
          />
        );
      case 2:
        return (
          <StepAddress
            styles={styles}
            theme={theme}
            control={control}
            errors={errors}
            countryOptions={countryOptions}
          />
        );
      case 3:
        return (
          <StepReview
            styles={styles}
            theme={theme}
            watch={watch}
            genderValue={genderValue}
                isDuberOrScrub={false}
          />
        );
      default:
        return null;
    }
  };

  const onSubmit = (values: ScrubSignUpForm) => {
    console.log('Scrub signup form', values);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Sign Up" isBack onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.stepperContainer}>
          <Stepper steps={steps} currentStep={currentStep} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {renderStepContent()}
        </ScrollView>

        <View style={styles.navigationContainer}>
          {!isFirstStep && (
            <Button
              title="Back"
              onPress={previousStep}
              type="outline"
                          containerStyle={styles.buttonContainer}
            />
          )}
          {isLastStep ? (
            <Button
              title="Submit & Create Account"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
                          containerStyle={styles.buttonContainer}
            />
          ) : (
                          <Button
                              title="Continue"
                              onPress={nextStep}
                              containerStyle={styles.buttonContainer}
                          />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  stepperContainer: {
    backgroundColor: theme.colors.background,
    paddingTop: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
  stepContent: {
    flex: 1,
    gap: verticalScale(12),
  },
  stepTitle: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#000000',
    marginBottom: verticalScale(8),
  },
  stepSubtitle: {
    fontSize: moderateScale(14),
    color: '#6B6B6B',
    marginBottom: verticalScale(12),
  },
  roleGrid: {
    gap: verticalScale(12),
  },
  roleCard: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    backgroundColor: '#F9F9F9',
  },
  roleCardSelected: {
    borderWidth: 1,
  },
  roleCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5F7F4',
    marginBottom: verticalScale(8),
  },
  roleCardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1D1D1D',
    marginBottom: verticalScale(4),
  },
  roleCardDescription: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
  },
  inputContainer: {
    marginBottom: verticalScale(12),
  },
  inlineRow: {
    gap: verticalScale(8),
  },
  label: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
  },
  genderRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  genderPillContainer: {
    flex: 1,
  },
  genderPill: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: verticalScale(8),
  },
  genderPillText: {
    color: theme.colors.primary,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BDBDBD',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    gap: verticalScale(6),
  },
  uploadText: {
    color: '#8A8A8A',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  linkText: {
    color: '#10C8BB',
    fontSize: moderateScale(12),
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  preview: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(10),
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    marginLeft: moderateScale(6),
  },
  flagEmoji: {
    fontSize: moderateScale(18),
  },
  flagCode: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
  },
  sendOtpButton: {
    paddingHorizontal: 0,
  },
  sendOtpButtonStyle: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  sendOtpTitle: {
    fontSize: moderateScale(12),
    color: theme.colors.background,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    paddingHorizontal: moderateScale(20),
      paddingVertical: verticalScale(16),
    backgroundColor: theme.colors.background,
  },
    buttonContainer: {
    flex: 1,
    width:'50%'
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    backgroundColor: '#F9F9F9',
    gap: verticalScale(8),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.grey2,
  },
  reviewEdit: {
    color: theme.colors.primary,
    fontSize: moderateScale(14),
  },
  reviewRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  reviewLabel: {
    fontWeight: '600',
    color: theme.colors.grey2,
    fontSize: moderateScale(14),
  },
  reviewValue: {
    color: theme.colors.grey2,
    fontSize: moderateScale(14),
    flexShrink: 1,
  },
}));

export default SignUp;

