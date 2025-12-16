import React from 'react';
import { Controller, useForm } from 'react-hook-form';

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
import { AuthStackNavigatorParamList } from '@/types/routes';
import { useForgotPassword } from '@/hooks/useForgotPassword';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const forgotPasswordSchema = signInSchema.pick({ email: true });

const ForgotPassword = () => {
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const forgotPasswordMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate({
      email: data.email,
    });
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
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your password.
              </Text>
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
                        color={styles.iconColor.color}
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

              <Button
                title="Continue"
                onPress={handleSubmit(onSubmit)}
                loading={forgotPasswordMutation.isPending}
                disabled={forgotPasswordMutation.isPending}
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
