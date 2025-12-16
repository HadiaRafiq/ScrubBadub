import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type SignUpStyles = Record<
  string,
  StyleProp<ViewStyle | TextStyle> | { color: string }
>;
export type { ScrubSignUpForm } from '.';
