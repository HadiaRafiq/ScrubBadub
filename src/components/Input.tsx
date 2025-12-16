import React, { useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Input as RNEInput,
  InputProps,
  makeStyles,
  useTheme,
} from '@rneui/themed';

interface Props extends InputProps {}

const Input: React.FC<Props> = props => {
  const {
    leftIcon,
    label,
    placeholder,
    secureTextEntry,
    errorMessage,
    rightIcon: propRightIcon,
    ...restProps
  } = props;

  const [isPasswordHidden, setPasswordHidden] = useState(!!secureTextEntry);

  const { theme } = useTheme();
  const styles = useStyles();

  // Use provided rightIcon if exists, otherwise use eye icon for password fields
  const rightIcon =
    propRightIcon ||
    (secureTextEntry ? (
      <Icon
        name={isPasswordHidden ? 'eye-outline' : 'eye-off-outline'}
        color={theme.colors.black}
        size={moderateScale(20)}
        onPress={() => setPasswordHidden(!isPasswordHidden)}
      />
    ) : undefined);

  return (
    <RNEInput
      {...restProps}
      label={label}
      labelStyle={styles.label}
      inputContainerStyle={styles.input}
      inputStyle={styles.inputText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.grey3}
      errorMessage={errorMessage}
      errorStyle={styles.error}
      secureTextEntry={isPasswordHidden && !!secureTextEntry}
      rightIcon={rightIcon}
      rightIconContainerStyle={styles.rightIconContainer}
      leftIcon={leftIcon}
      leftIconContainerStyle={styles.leftIconContainer}
    />
  );
};

export default Input;

const useStyles = makeStyles(theme => ({
  input: {
    borderWidth: 1,
    borderRadius: theme.spacing.lg,
    borderColor: theme.colors.grey4,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(5),
    backgroundColor: theme.colors.background,
    marginHorizontal: moderateScale(-8),
  },
  inputText: {
    // fontFamily: FONTS.INTER,
    fontSize: moderateScale(16),
  },
  label: {
    // fontFamily: FONTS.INTER,
    fontWeight: '400',
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
    color: theme.colors.grey3,
    marginHorizontal: moderateScale(-8),
  },
  rightIconContainer: {
    height: 30,
  },
  error: {
    // fontFamily: FONTS.INTER,
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(-8),
  },
  leftIconContainer: {
    height: 30,
    marginRight: moderateScale(8),
  },
}));
