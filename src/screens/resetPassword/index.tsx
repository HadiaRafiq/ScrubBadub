import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from '@/utils/i18n';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { z } from 'zod';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { signUpSchema } from '@/schemas/validationSchema';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

type ResetPasswordRoute = RouteProp<
  AuthStackNavigatorParamList,
  AUTH_ROUTES.RESET_PASSWORD
>;

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const resetPasswordSchema = signUpSchema.pick({
  password: true,
  confirmPassword: true,
});

const ResetPassword = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const route = useRoute<ResetPasswordRoute>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data: ResetPasswordFormData) => {
    // TODO: Call reset password API
    console.log('Reset password for:', route.params?.email);
    console.log('New password data:', data);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="" isBack onBackPress={handleBack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t('auth.resetPassword.title')}</Text>
              <Text style={styles.subtitle}>
                {t('auth.resetPassword.subtitle')}
              </Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.resetPassword.passwordLabel')}
                    placeholder={t('auth.resetPassword.passwordPlaceholder')}
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
                      errors.password ? t(errors.password.message!) : ''
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.resetPassword.confirmPasswordLabel')}
                    placeholder={t(
                      'auth.resetPassword.confirmPasswordPlaceholder',
                    )}
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
                      errors.confirmPassword
                        ? t(errors.confirmPassword.message!)
                        : ''
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
              />

              <Button
                title={t('auth.resetPassword.resetButton')}
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                disabled={isSubmitting}
                containerStyle={styles.buttonContainer}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
    paddingTop: verticalScale(12),
  },
  titleContainer: {
    marginBottom: verticalScale(24),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: verticalScale(12),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: theme.colors.grey2,
  },
  form: {
    marginTop: verticalScale(8),
    gap: verticalScale(4),
  },
  buttonContainer: {
    marginTop: verticalScale(4),
  },
  iconColor: {
    color: (theme.colors as any).inputIcon || theme.colors.grey1 || '#5A5A5A',
  },
}));
