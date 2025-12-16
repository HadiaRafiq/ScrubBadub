import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuthStore } from '@/store/auth';
import { useOnboardingStore } from '@/store/onboarding';
import { STACKS } from '@/types/routes';
import { ROLES } from '@/types/user';

import AuthStack from './AuthStack';
import BudStack from './BudStack';
import DuberStack from './DuberStack';
import OnboardingStack from './OnboardingStack';
import ScrubStack from './ScrubStack';

const AppNavigator = () => {
  const { user, token } = useAuthStore();
  const { onboardingCompleted, hydrated } = useOnboardingStore();

  // Determine which stack to show based on auth and onboarding state
  const currentStack = useMemo(() => {
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
  }, [onboardingCompleted, user, token]);

  // Wait for hydration before rendering
  if (!hydrated) {
    return null;
  }

  // Conditionally render the appropriate stack based on currentStack
  const renderStack = () => {
    switch (currentStack) {
      case STACKS.ONBOARDING:
        return <OnboardingStack />;
      case STACKS.AUTH:
        return <AuthStack />;
      case STACKS.SCRUB:
        return <ScrubStack />;
      case STACKS.BUD:
        return <BudStack />;
      case STACKS.DUBER:
        return <DuberStack />;
      default:
        return <AuthStack />;
    }
  };

  return (
    <NavigationContainer key={currentStack}>
      {renderStack()}
    </NavigationContainer>
  );
};

export default AppNavigator;
