import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '@/screens/welcome';
import SignUp from '@/screens/signup';
import SignIn from '@/screens/signin';
import ForgotPassword from '@/screens/forgotPassword';
import OtpVerification from '@/screens/otpVerification';
import ResetPassword from '@/screens/resetPassword';
import {
  AuthStackNavigatorParamList,
  AUTH_ROUTES,
} from '@/types/routes';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={AUTH_ROUTES.WELCOME} component={Welcome} />
      <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={SignUp} />
      <Stack.Screen name={AUTH_ROUTES.SIGNIN} component={SignIn} />
      <Stack.Screen
        name={AUTH_ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={AUTH_ROUTES.OTP_VERIFICATION}
        component={OtpVerification}
      />
      <Stack.Screen
        name={AUTH_ROUTES.RESET_PASSWORD}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

