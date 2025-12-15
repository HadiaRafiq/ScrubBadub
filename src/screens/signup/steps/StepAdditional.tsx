import React from 'react';
import { View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Text } from '@rneui/themed';

import Input from '@/components/Input';
import { ScrubSignUpForm } from '..';
import { SignUpStyles } from '../types';

type Props = {
  styles: SignUpStyles;
  control: Control<ScrubSignUpForm>;
  errors: FieldErrors<ScrubSignUpForm>;
};

const StepAdditional: React.FC<Props> = ({ styles, control, errors }) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Additional Step</Text>
      <Text style={styles.stepSubtitle}>
        Placeholder for Bud/Scrub-specific onboarding requirements.
      </Text>

      <Controller
        control={control}
        name="additionalInfo"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Additional Info (optional)"
            placeholder="Add any extra details"
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

