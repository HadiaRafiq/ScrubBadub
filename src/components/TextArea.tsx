import React from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Input, InputProps, makeStyles } from '@rneui/themed';

import { FONTS } from '@/theme/fonts';

interface Props extends InputProps {}

const TextArea: React.FC<Props> = ({
  label,
  placeholder,
  errorMessage,
  ...props
}) => {
  const styles = useStyles();

  return (
    <Input
      label={label}
      labelStyle={styles.label}
      inputContainerStyle={styles.descriptionInput}
      inputStyle={styles.inputStyle}
      style={styles.textArea}
      placeholder={placeholder}
      textAlignVertical="top"
      multiline
      numberOfLines={4}
      leftIconContainerStyle={styles.leftIconContainer}
      errorMessage={errorMessage}
      errorStyle={styles.error}
      {...props}
    />
  );
};

const useStyles = makeStyles(theme => ({
  label: {
    fontFamily: FONTS.INTER,
    fontWeight: '400',
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
    color: theme.colors.grey3,
    marginHorizontal: moderateScale(-8),
  },
  textArea: {
    height: 120,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(-8),
    backgroundColor: theme.colors.background,
    verticalAlign: 'top',
  },
  inputStyle: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    // fontFamily: FONTS.INTER,
  },
  leftIconContainer: {
    height: 30,
    marginRight: moderateScale(8),
    alignSelf: 'flex-start',
  },
  error: {
    // fontFamily: FONTS.INTER,
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(-8),
  },
}));

export default TextArea;
