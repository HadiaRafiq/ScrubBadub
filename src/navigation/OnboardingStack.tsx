import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '@/screens/Onboarding';
import { ONBOARDING_ROUTES, OnboardingStackParamList } from '@/types/routes';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={ONBOARDING_ROUTES.ONBOARDING}
        component={Onboarding}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
