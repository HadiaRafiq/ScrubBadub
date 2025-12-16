import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPassword from '@/screens/forgotPassword';
import SignIn from '@/screens/signin';
import SignUp from '@/screens/signup';
import Welcome from '@/screens/welcome';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={AUTH_ROUTES.WELCOME} component={Welcome} />
      <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={SignUp} />
      <Stack.Screen name={AUTH_ROUTES.SIGNIN} component={SignIn} />
      <Stack.Screen
        name={AUTH_ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
