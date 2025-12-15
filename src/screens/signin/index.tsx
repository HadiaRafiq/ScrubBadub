import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from '@/utils/i18n';
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
import { signIn as signInAPI } from '@/api/authService';
import { signInSchema } from '@/schemas/validationSchema';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';
import { useAuthStore } from '@/store/auth';

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const { setUser, setToken } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signInAPI({
        email: data.email,
        password: data.password,
      });

      if (response.status && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        // Navigation will automatically switch to APP stack (dashboard) via NavigationContainer
      } else {
        // TODO: Show error message to user
        console.error('Sign in failed:', response.message);
      }
    } catch (error) {
      // TODO: Show error message to user
      console.error('Sign in error:', error);
    }
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
              <Text style={styles.title}>{t('auth.signIn.title')}</Text>
              <Text style={styles.subtitle}>{t('auth.signIn.subtitle')}</Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.signIn.emailLabel')}
                    placeholder={t('auth.signIn.emailPlaceholder')}
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
                    errorMessage={errors.email ? t(errors.email.message!) : ''}
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
                    label={t('auth.signIn.passwordLabel')}
                    placeholder={t('auth.signIn.passwordPlaceholder')}
                    leftIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={moderateScale(20)}
                        // color={styles.iconColor.color}
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    errorMessage={
                      errors.password ? t(errors.password.message!) : ''
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
                    {t('auth.signIn.keepSignedIn')}
                  </Text>
                </View>

                <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
                  {t('auth.signIn.forgotPassword')}
                </Text>
              </View>

              <Button
                title={t('auth.signIn.signInButton')}
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                disabled={isSubmitting}
                containerStyle={styles.buttonContainer}
              />

            </View>

            <View style={styles.footerSpacer} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('auth.signIn.noAccount')} </Text>
          <Text style={styles.link} onPress={handleNavigateToSignUp}>
            {t('auth.signIn.signUpLink')}
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
    color: (theme.colors as any).inputIcon || theme.colors.grey1 || '#5A5A5A',
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
