import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from '@/utils/i18n';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Theme } from '@rneui/base';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import Button from '@/components/Button';
import Header from '@/components/Header';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

type OtpRoute = RouteProp<
  AuthStackNavigatorParamList,
  AUTH_ROUTES.OTP_VERIFICATION
>;

const OTP_LENGTH = 4;

const OtpVerification = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();
  const route = useRoute<OtpRoute>();

  const email = route.params?.email ?? t('auth.signIn.emailPlaceholder');

  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(OTP_LENGTH).fill(''),
  );

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const subtitle = useMemo(
    () => t('auth.otpVerification.subtitle', { email }),
    [email, t],
  );

  const handleChangeDigit = (value: string, index: number) => {
    const digit = value.slice(-1);
    const updated = [...otpValues];
    updated[index] = digit;
    setOtpValues(updated);

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (value === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otpValues.join('');
    // TODO: Verify OTP with API
    console.log('Verifying OTP:', code);
    navigation.navigate(AUTH_ROUTES.RESET_PASSWORD, { email });
  };

  const handleResend = () => {
    // TODO: Trigger resend code API
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="" isBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {t('auth.otpVerification.title')}
              </Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <Text style={styles.label}>
              {t('auth.otpVerification.enterOtpLabel')}
            </Text>
            <View style={styles.otpContainer}>
              {otpValues.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={ref => {
                    inputsRef.current[idx] = ref;
                  }}
                  value={digit}
                  onChangeText={val => handleChangeDigit(val, idx)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(digit, idx);
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.otpInput}
                  textAlign="center"
                  selectionColor={theme.colors.primary}
                  autoFocus={idx === 0}
                />
              ))}
            </View>

            <View style={styles.resendRow}>
              <Text style={styles.resendPrompt}>
                {t('auth.otpVerification.resendPrompt')}
              </Text>
              <Text style={styles.resendAction} onPress={handleResend}>
                {t('auth.otpVerification.resendAction')}
              </Text>
            </View>

            <Button
              title={t('auth.otpVerification.verifyButton')}
              onPress={handleVerify}
              containerStyle={styles.verifyButtonContainer}
              icon={
                <Ionicons
                  name="arrow-forward"
                  size={moderateScale(24)}
                  color={theme.colors.white}
                  style={styles.iconStyle}
                />
              }
              iconPosition="right"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;

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
  label: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: theme.colors.black,
    marginBottom: verticalScale(12),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(12),
    marginBottom: verticalScale(16),
  },
  otpInput: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: moderateScale(10),
    fontSize: moderateScale(20),
    color: theme.colors.black,
    backgroundColor: theme.colors.background,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  resendPrompt: {
    fontSize: moderateScale(16),
    color: theme.colors.black,
    fontWeight: '400',
  },
  resendAction: {
    fontSize: moderateScale(16),
    color: theme.colors.primary,
    fontWeight: '600',
  },
  verifyButtonContainer: {
    marginTop: verticalScale(8),
  },
  iconStyle: {
    marginLeft: moderateScale(6),
  },
}));
