import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScrubDashboard from '@/screens/dashboards/ScrubDashboard';
import { ScrubStackParamList, SCRUB_ROUTES } from '@/types/routes';

const Stack = createNativeStackNavigator<ScrubStackParamList>();

const ScrubStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
              name={SCRUB_ROUTES.HOME}
        component={ScrubDashboard}
      />
    </Stack.Navigator>
  );
};

export default ScrubStack;

