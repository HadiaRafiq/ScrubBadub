import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '@/store/auth';
import { useOnboardingStore } from '@/store/onboarding';
import { ROLES } from '@/types/user';
import { STACKS } from '@/types/routes';

import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';
import ScrubStack from './ScrubStack';
import BudStack from './BudStack';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, token } = useAuthStore();
  const { onboardingCompleted, hydrated } = useOnboardingStore();

  // Wait for hydration before rendering
  if (!hydrated) {
    return null;
  }

  // Determine which stack to show based on auth and onboarding state
  const getCurrentStack = () => {
    // If user is not onboarded, show onboarding
    if (!onboardingCompleted) {
      return STACKS.ONBOARDING;
    }

    // If user is not authenticated, show auth stack
    if (!user || !token) {
      return STACKS.AUTH;
    }

    // If user is authenticated, show role-based stack
    switch (user.role) {
      case ROLES.SCRUB:
        return STACKS.SCRUB;
      case ROLES.BUD:
        return STACKS.BUD;
      case ROLES.DUBER:
        return STACKS.DUBER;
      default:
        return STACKS.AUTH;
    }
  };

  const currentStack = getCurrentStack();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none', // Disable animation for stack switching
        }}
        initialRouteName={currentStack}>
        <RootStack.Screen
          name={STACKS.ONBOARDING}
          component={OnboardingStack}
        />
        <RootStack.Screen name={STACKS.AUTH} component={AuthStack} />
        <RootStack.Screen name={STACKS.SCRUB} component={ScrubStack} />
        <RootStack.Screen name={STACKS.BUD} component={BudStack} />
              {/* <RootStack.Screen name={STACKS.DUBER} component={BudStack} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

