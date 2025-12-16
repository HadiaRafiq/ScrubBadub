import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { UseFormWatch } from 'react-hook-form';

import { ScrubSignUpForm } from '..';
import { SignUpStyles } from '../types';
import { ROLES } from '@/types/user';

type Props = {
  styles: SignUpStyles;
  theme: any;
  watch: UseFormWatch<ScrubSignUpForm>;
  genderValue?: 'male' | 'female' | 'other';
  roleValue?: ROLES;
};

const StepReview: React.FC<Props> = ({
  styles,
  theme,
  watch,
  genderValue,
  roleValue,
}) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Review Your Information</Text>
      <Text style={styles.stepSubtitle}>
        Let the driver check all details before completing onboarding
      </Text>
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTitle}>Personal Info</Text>
          <Text style={[styles.reviewEdit, { color: theme.colors.primary }]}>Edit</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Name:</Text>
          <Text style={styles.reviewValue}>{watch('fullName') || '-'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Gender:</Text>
          <Text style={styles.reviewValue}>{genderValue || '-'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Phone:</Text>
          <Text style={styles.reviewValue}>{watch('phone') || '-'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Email:</Text>
          <Text style={styles.reviewValue}>{watch('email') || '-'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Date of Birth:</Text>
          <Text style={styles.reviewValue}>{watch('dob') || '-'}</Text>
        </View>
        <View style={styles.reviewRow}>
          <Text style={styles.reviewLabel}>Address:</Text>
          <Text style={styles.reviewValue}>{watch('address') || '-'}</Text>
        </View>
        {(roleValue === ROLES.SCRUB || roleValue === ROLES.DUBER) && (
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>
              {roleValue === ROLES.SCRUB ? 'Laundry Info:' : 'Additional:'}
            </Text>
            <Text style={styles.reviewValue}>{watch('additionalInfo') || '-'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default StepReview;

