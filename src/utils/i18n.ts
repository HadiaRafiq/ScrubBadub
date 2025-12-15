// Simple i18n stub - replace with react-i18next when ready
// This provides a basic translation function that returns the key or a default value

const translations: Record<string, string> = {
  // Auth translations
  'auth.signIn.title': 'Sign In',
  'auth.signIn.subtitle': 'Welcome back! Please sign in to continue',
  'auth.signIn.emailLabel': 'Email',
  'auth.signIn.emailPlaceholder': 'Enter your email',
  'auth.signIn.passwordLabel': 'Password',
  'auth.signIn.passwordPlaceholder': 'Enter your password',
  'auth.signIn.keepSignedIn': 'Keep me signed in',
  'auth.signIn.forgotPassword': 'Forgot Password?',
  'auth.signIn.signInButton': 'Sign In',
  'auth.signIn.noAccount': "Don't have an account?",
  'auth.signIn.signUpLink': 'Sign Up',

  'auth.forgotPassword.title': 'Forgot Password',
  'auth.forgotPassword.subtitle':
    'Enter your email address and we will send you a code to reset your password',
  'auth.forgotPassword.emailLabel': 'Email',
  'auth.forgotPassword.emailPlaceholder': 'Enter your email',
  'auth.forgotPassword.continueButton': 'Continue',

  'auth.otpVerification.title': 'Verify Your Email',
  'auth.otpVerification.subtitle': 'We sent a verification code to {email}',
  'auth.otpVerification.enterOtpLabel': 'Enter Verification Code',
  'auth.otpVerification.resendPrompt': "Didn't receive the code?",
  'auth.otpVerification.resendAction': 'Resend',
  'auth.otpVerification.verifyButton': 'Verify',

  'auth.resetPassword.title': 'Reset Password',
  'auth.resetPassword.subtitle': 'Please enter your new password',
  'auth.resetPassword.passwordLabel': 'New Password',
  'auth.resetPassword.passwordPlaceholder': 'Enter new password',
  'auth.resetPassword.confirmPasswordLabel': 'Confirm Password',
  'auth.resetPassword.confirmPasswordPlaceholder': 'Confirm new password',
  'auth.resetPassword.resetButton': 'Reset Password',
};

export const useTranslation = () => {
  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[key] || key;

    // Simple parameter replacement
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(
          new RegExp(`\\{${param}\\}`, 'g'),
          params[param],
        );
      });
    }

    return translation;
  };

  return { t };
};

