import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from '@/utils/i18n';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { z } from 'zod';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { signInSchema } from '@/schemas/validationSchema';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const forgotPasswordSchema = signInSchema.pick({ email: true });

const ForgotPassword = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    // TODO: Implement forgot password API call
    navigation.navigate(AUTH_ROUTES.OTP_VERIFICATION, { email: data.email });
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="" isBack onBackPress={handleNavigateBack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t('auth.forgotPassword.title')}</Text>
              <Text style={styles.subtitle}>
                {t('auth.forgotPassword.subtitle')}
              </Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.forgotPassword.emailLabel')}
                    placeholder={t('auth.forgotPassword.emailPlaceholder')}
                    leftIcon={
                      <Ionicons
                        name="mail-outline"
                        size={moderateScale(20)}
                        color={styles.iconColor.color}
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

              <Button
                title={t('auth.forgotPassword.continueButton')}
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

export default ForgotPassword;

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
  },
  buttonContainer: {
    marginTop: verticalScale(12),
  },
  iconColor: {
    color: theme.colors.grey2,
  },
}));
