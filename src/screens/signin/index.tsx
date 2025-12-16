import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import { z } from 'zod';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '@/components/Header';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import { signInSchema } from '@/schemas/validationSchema';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { useSignin } from '@/hooks/useSignin';

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const signinMutation = useSignin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signinMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate(AUTH_ROUTES.SIGNUP);
  };

  const handleForgotPassword = () => {
    navigation.navigate(AUTH_ROUTES.FORGOT_PASSWORD);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Sign In" isBack onBackPress={handleNavigateToSignUp} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>Welcome back! Please sign in to your account.</Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    leftIcon={
                      <Ionicons
                        name="mail-outline"
                        size={moderateScale(20)}
                        // color={styles.iconColor.color}
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    errorMessage={errors.email ? errors.email.message : ''}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    leftIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={moderateScale(20)}
                        color={styles.iconColor.color}
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    errorMessage={
                      errors.password ? errors.password.message : ''
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
              />

              <View style={styles.inlineActions}>
                <View style={styles.keepSignedIn}>
                  <Checkbox
                    name="keepSignedIn"
                    checked={keepSignedIn}
                    onPress={() => setKeepSignedIn(prev => !prev)}
                    containerStyle={styles.checkboxContainer}
                    checkedColor={theme.colors.primary}
                    uncheckedColor={theme.colors.grey4}
                  />
                  <Text style={styles.keepSignedInText}>
                    Keep me signed in
                  </Text>
                </View>

                <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
                  Forgot Password?
                </Text>
              </View>

              <Button
                title="Sign In"
                onPress={handleSubmit(onSubmit)}
                loading={signinMutation.isPending}
                disabled={signinMutation.isPending}
                containerStyle={styles.buttonContainer}
              />

            </View>

            <View style={styles.footerSpacer} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Text style={styles.link} onPress={handleNavigateToSignUp}>
            Sign Up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(24),
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(24),
  },
  titleContainer: {
    marginBottom: verticalScale(40),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: (theme.colors as any).text || theme.colors.black || '#111',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: theme.colors.grey2,
  },
  form: {
    marginBottom: verticalScale(24),
  },
  buttonContainer: {
    marginTop: verticalScale(8),
  },
  iconColor: {
    color: theme.colors.grey1
  },
  inlineActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(16),
  },
  keepSignedIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(-8),

  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
  },
  keepSignedInText: {
    fontSize: moderateScale(16),
    color: theme.colors.grey1,
    fontWeight: '400',
  },
  forgotPassword: {
    fontSize: moderateScale(16),
    color: theme.colors.primary,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingBottom: verticalScale(20),
  },
  footerSpacer: {
    height: verticalScale(40),
  },
  footerText: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
  },
  link: {
    fontSize: moderateScale(14),
    color: theme.colors.primary,
    fontWeight: '600',
  },
}));
