import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Button as RNEButton, ButtonProps, makeStyles } from '@rneui/themed';

interface Props extends ButtonProps {}

const Button: React.FC<Props> = ({ ...props }) => {
  const styles = useStyles(props.type);

  return (
    <RNEButton
      {...props}
      buttonStyle={[styles.button, props.buttonStyle]}
      titleStyle={[styles.buttonTitle, props.titleStyle]}
      loadingStyle={styles.loadingStyle}
      disabledStyle={[
        props.type === 'outline'
          ? styles.disabledButtonOutline
          : styles.disabledButton,
      ]}
      disabledTitleStyle={[
        props.type === 'outline'
          ? styles.disabledButtonOutlineTitle
          : styles.disabledButtonTitle,
      ]}
    />
  );
};

const useStyles = makeStyles({
  button: {
    borderRadius: 12,
    padding: moderateScale(14),
    // backgroundColor: type === 'outline' ? 'transparent' : theme.colors.primary,
    // borderWidth: type === 'outline' ? 1.5 : 0,
    // borderColor: type === 'outline' ? theme.colors.primary : 'transparent',
  },
  buttonTitle: {
    // color: type === 'outline' ? theme.colors.grey2 : theme.colors.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  loadingStyle: {
    paddingVertical: 0.7,
  },
  disabledButton: {
    // backgroundColor: `${theme.colors.primary}80`,
  },
  disabledButtonTitle: {
    // color: theme.colors.white,
  },
  disabledButtonOutline: {
    // borderColor: `${theme.colors.primary}80`,
    backgroundColor: 'transparent',
  },
  disabledButtonOutlineTitle: {
    // color: `${theme.colors.grey2}80`,
  },
});

export default Button;
