import React from 'react';
import { View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Text } from '@rneui/themed';

import Input from '@/components/Input';
import { ScrubSignUpForm } from '..';
import { SignUpStyles } from '../types';
import { ROLES } from '@/types/user';

type Props = {
  styles: SignUpStyles;
  control: Control<ScrubSignUpForm>;
  errors: FieldErrors<ScrubSignUpForm>;
  roleValue?: ROLES;
};

const StepAdditional: React.FC<Props> = ({ styles, control, errors, roleValue }) => {
  const getStepTitle = () => {
    switch (roleValue) {
      case ROLES.SCRUB:
        return 'Laundry Facility Information';
      case ROLES.DUBER:
        return 'Additional Information';
      default:
        return 'Additional Step';
    }
  };

  const getStepSubtitle = () => {
    switch (roleValue) {
      case ROLES.SCRUB:
        return 'Tell us about your laundry facility and services.';
      case ROLES.DUBER:
        return 'Provide additional details for your Duber profile.';
      default:
        return 'Placeholder for role-specific onboarding requirements.';
    }
  };

  const getInputLabel = () => {
    switch (roleValue) {
      case ROLES.SCRUB:
        return 'Laundry Facility Details';
      case ROLES.DUBER:
        return 'Additional Info (optional)';
      default:
        return 'Additional Info (optional)';
    }
  };

  const getInputPlaceholder = () => {
    switch (roleValue) {
      case ROLES.SCRUB:
        return 'Describe your laundry services, equipment, capacity, etc.';
      case ROLES.DUBER:
        return 'Add any extra details';
      default:
        return 'Add any extra details';
    }
  };

  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{getStepTitle()}</Text>
      <Text style={styles.stepSubtitle}>{getStepSubtitle()}</Text>

      <Controller
        control={control}
        name="additionalInfo"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={getInputLabel()}
            placeholder={getInputPlaceholder()}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.additionalInfo?.message}
            containerStyle={styles.inputContainer}
            multiline
          />
        )}
      />
    </View>
  );
};

export default StepAdditional;

