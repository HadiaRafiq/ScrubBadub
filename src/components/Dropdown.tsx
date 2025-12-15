import React, { useState } from 'react';
import { Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Theme } from '@rneui/base';
import { Icon, makeStyles, Text, useTheme } from '@rneui/themed';

interface DropdownProps extends React.ComponentProps<typeof RNEDropdown> {
  label: string;
  errorMessage?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ ...props }) => {
  const { value, onChange, label, errorMessage } = props;

  const [isFocused, setIsFocused] = useState(false);

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <RNEDropdown
        {...props}
        style={[styles.dropdown, props.style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search={false}
        maxHeight={400}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={item => {
          onChange(item.value);
        }}
        renderRightIcon={() => (
          <Icon
            name={isFocused ? 'chevron-up' : 'chevron-down'}
            type="feather"
            size={20}
            color={theme.colors.primary}
          />
        )}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.dropdownItemContainer}
        activeColor={`${theme.colors.primary}40`}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </>
  );
};

export default Dropdown;

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
    marginBottom: verticalScale(8),
  },
  dropdown: {
    borderRadius: 12,
    padding: moderateScale(14),
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.grey4,
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.black,
  },
  inputSearchStyle: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey3,
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    color: theme.colors.grey3,
  },
  dropdownContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    marginBottom: verticalScale(20),
  },
  dropdownItemContainer: {
    borderRadius: 12,
  },
  errorMessage: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: theme.colors.error,
    marginVertical: verticalScale(4),
  },
}));
