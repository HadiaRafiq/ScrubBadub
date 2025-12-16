import React, { useRef } from 'react';
import { View } from 'react-native';
import PhoneInputComponent from 'react-native-phone-number-input';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text, useTheme } from '@rneui/themed';

interface Props {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

const PhoneInput: React.FC<Props> = ({
  value,
  onChange,
  label,
  placeholder,
  errorMessage,
  disabled,
}) => {
  const phoneInput = useRef<PhoneInputComponent>(null);

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: verticalScale(8) }}>
      <Text style={styles.label}>{label}</Text>
      <PhoneInputComponent
        ref={phoneInput}
        defaultValue={value}
        value={value}
        defaultCode="US"
        onChangeFormattedText={text => {
          onChange?.(text);
        }}
        placeholder={placeholder}
        withDarkTheme={theme.mode === 'dark'}
        withShadow={false}
        countryPickerProps={{
          renderFlagButton: undefined,
        }}
        containerStyle={styles.container}
        flagButtonStyle={styles.flagButtonStyle}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
        disabled={disabled}
        textInputProps={{
          placeholderTextColor: theme.colors.grey3,
        }}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  );
};

export default PhoneInput;

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    borderWidth: 0.2,
    borderRadius: moderateScale(50),
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
  },
  label: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(8),
    color: theme.colors.black,
    fontWeight: '700',
  },
  flagButtonStyle: {
    paddingHorizontal: moderateScale(-4),
    paddingVertical: verticalScale(5),
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingLeft: moderateScale(0),
    height: verticalScale(48),
  },
  textInput: {
    fontSize: moderateScale(14),
    color: theme.colors.black,
    fontWeight: '400',
    height: verticalScale(48),
  },
  codeText: {
    fontSize: moderateScale(16),
    color: theme.colors.black,
    marginLeft: moderateScale(2),
    fontWeight: '400',
  },
  error: {
    fontSize: moderateScale(12),
    color: theme.colors.error,
    marginTop: verticalScale(4),
    fontWeight: '400',
  },
}));
