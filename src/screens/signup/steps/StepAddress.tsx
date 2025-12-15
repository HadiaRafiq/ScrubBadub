import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Text } from '@rneui/themed';

import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import { ScrubSignUpForm } from '..';
import { SignUpStyles } from '../types';

type CountryOption = { label: string; value: string };

type Props = {
  styles: SignUpStyles;
  theme: any;
  control: Control<ScrubSignUpForm>;
  errors: FieldErrors<ScrubSignUpForm>;
  countryOptions: CountryOption[];
};

const StepAddress: React.FC<Props> = ({
  styles,
  theme,
  control,
  errors,
  countryOptions,
}) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Address Information</Text>

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Address Line"
            placeholder="Enter Your Street Address"
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
            placeholder="Auto-Filled City"
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
        name="state"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="State"
            placeholder="Auto-Filled State"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.state?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <Dropdown
            label="Country"
            placeholder="Select Country"
            data={countryOptions}
            value={value}
            onChange={onChange}
            labelField="label"
            valueField="value"
            errorMessage={errors.country?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Postal Code"
            placeholder="Enter Postal Code"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.postalCode?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      <Controller
        control={control}
        name="pinLocation"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Pin Location"
            value={value}
            onChangeText={onChange}
            leftIcon={<Ionicons name="pin-outline" size={20} color={theme.colors.grey2} />}
            rightIcon={<Ionicons name="pencil-outline" size={20} color={theme.colors.primary} />}
            containerStyle={styles.inputContainer}
          />
        )}
      />
    </View>
  );
};

export default StepAddress;

