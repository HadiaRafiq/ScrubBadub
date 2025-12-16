import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles, Text } from '@rneui/themed';
import { z } from 'zod';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Stepper, { Step } from '@/components/Stepper';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

// Define the form data schema
const multiStepFormSchema = z.object({
  // Step 1: Location
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),

  // Step 2: Select Scrubber
  scrubberName: z.string().min(1, 'Please select a scrubber'),
  serviceType: z.string().min(1, 'Service type is required'),

  // Step 3: Order Detail
  pickupDate: z.string().min(1, 'Pickup date is required'),
  specialInstructions: z.string().optional(),

  // Step 4: Checkout
  paymentMethod: z.string().min(1, 'Payment method is required'),
});

type MultiStepFormData = z.infer<typeof multiStepFormSchema>;

const MultiStepFormExample = () => {
  const styles = useStyles();

  // Define steps
  const steps: Step[] = [
    { label: 'Location' },
    { label: 'Select Scrubber' },
    { label: 'Order Detail' },
    { label: 'Checkout' },
  ];

  // Initialize form with react-hook-form
  const form = useForm<MultiStepFormData>({
    resolver: zodResolver(multiStepFormSchema),
    mode: 'onChange', // Real-time validation
    defaultValues: {
      address: '',
      city: '',
      zipCode: '',
      scrubberName: '',
      serviceType: '',
      pickupDate: '',
      specialInstructions: '',
      paymentMethod: '',
    },
  });

  // Configure which fields belong to which step for validation
  const stepFields: Record<number, (keyof MultiStepFormData)[]> = {
    0: ['address', 'city', 'zipCode'], // Step 1: Location
    1: ['scrubberName', 'serviceType'], // Step 2: Select Scrubber
    2: ['pickupDate'], // Step 3: Order Detail (specialInstructions is optional)
    3: ['paymentMethod'], // Step 4: Checkout
  };

  // Use multi-step form hook
  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep } =
    useMultiStepForm(steps.length, form, {
      stepFields,
    });

  // Handle form submission
  const onSubmit = (_data: MultiStepFormData) => {
    // Handle form submission logic here
    // e.g., API call, navigation, etc.
  };

  // Render step content based on current step
  const renderStepContent = () => {
    const { control, formState } = form;
    const { errors } = formState;

    switch (currentStep) {
      case 0: // Location
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Enter Your Location</Text>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Address"
                  placeholder="Enter your address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.address?.message}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="City"
                  placeholder="Enter your city"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.city?.message}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Zip Code"
                  placeholder="Enter zip code"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.zipCode?.message}
                  keyboardType="numeric"
                  containerStyle={styles.inputContainer}
                />
              )}
            />
          </View>
        );

      case 1: // Select Scrubber
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Your Scrubber</Text>
            <Controller
              control={control}
              name="scrubberName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Scrubber Name"
                  placeholder="Enter scrubber name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.scrubberName?.message}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
            <Controller
              control={control}
              name="serviceType"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Service Type"
                  placeholder="Enter service type"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.serviceType?.message}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
          </View>
        );

      case 2: // Order Detail
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Order Details</Text>
            <Controller
              control={control}
              name="pickupDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Pickup Date"
                  placeholder="Enter pickup date"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.pickupDate?.message}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
            <Controller
              control={control}
              name="specialInstructions"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Special Instructions (Optional)"
                  placeholder="Any special instructions?"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
          </View>
        );

      case 3: // Checkout
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Checkout</Text>
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Payment Method"
                  placeholder="Enter payment method"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.paymentMethod?.message}
                  containerStyle={styles.inputContainer}
                />
              )}
            />
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <Text style={styles.summaryText}>
                Address: {form.watch('address')}
              </Text>
              <Text style={styles.summaryText}>
                Scrubber: {form.watch('scrubberName')}
              </Text>
              <Text style={styles.summaryText}>
                Pickup Date: {form.watch('pickupDate')}
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Stepper at the top */}
        <View style={styles.stepperContainer}>
          <Stepper steps={steps} currentStep={currentStep} />
        </View>

        {/* Form content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {renderStepContent()}
        </ScrollView>

        {/* Navigation buttons */}
        <View style={styles.navigationContainer}>
          {!isFirstStep && (
            <Button
              title="Previous"
              onPress={previousStep}
              type="outline"
              containerStyle={styles.previousButton}
            />
          )}
          {isLastStep ? (
            <Button
              title="Submit"
              onPress={form.handleSubmit(onSubmit)}
              containerStyle={styles.submitButton}
              loading={form.formState.isSubmitting}
            />
          ) : (
            <Button
              title="Next"
              onPress={nextStep}
              containerStyle={styles.nextButton}
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
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(24),
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: theme.colors.black || '#252525',
    marginBottom: verticalScale(24),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  summaryContainer: {
    marginTop: verticalScale(24),
    padding: moderateScale(16),
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(12),
  },
  summaryTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: theme.colors.black || '#252525',
    marginBottom: verticalScale(12),
  },
  summaryText: {
    fontSize: moderateScale(14),
    color: theme.colors.black || '#252525',
    marginBottom: verticalScale(8),
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: theme.colors.background,
    gap: moderateScale(12),
  },
  previousButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
    marginLeft: 'auto',
  },
}));

export default MultiStepFormExample;
