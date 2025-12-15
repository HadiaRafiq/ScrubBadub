import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { ErrorMessage } from '@hookform/error-message';
import {
  CheckBox as RNCheckbox,
  CheckBoxProps,
  makeStyles,
  Text,
  useTheme,
} from '@rneui/themed';

interface Props extends Omit<CheckBoxProps, 'children'> {
  name: string;
  errors?: FieldErrors;
}

const Checkbox: React.FC<Props> = ({
  title,
  name,
  checked,
  onPress,
  errors,
  containerStyle,
  wrapperStyle,
  ...props
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <>
      <RNCheckbox
        checked={checked}
        onPress={onPress}
        title={title}
        containerStyle={containerStyle}
        wrapperStyle={wrapperStyle}
        checkedIcon={
          <Icon
            name="checkbox-outline"
            size={22}
            color={theme.colors.primary}
          />
        }
        uncheckedIcon={
          <Icon name="square-outline" size={22} color={theme.colors.primary} />
        }
        {...props}
      />
      {errors ? (
        <ErrorMessage
          errors={errors}
          name={String(name)}
          render={({ message }) => (
            <Text style={styles.errorMessage}>{message}</Text>
          )}
        />
      ) : null}
    </>
  );
};

export default Checkbox;

const useStyles = makeStyles(theme => ({
  errorMessage: {
    color: theme.colors.error,
    fontSize: moderateScale(14),
    fontWeight: '400',
  },
}));
