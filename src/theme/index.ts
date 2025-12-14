import { I18nManager } from 'react-native';
import { createTheme } from '@rneui/themed';

import { DARK_COLORS, LIGHT_COLORS } from './colors';
import { FONT_FAMILY, font_size } from './fonts';
import { SPACING } from './spacing';

export const theme = createTheme({
  lightColors: LIGHT_COLORS,
  darkColors: DARK_COLORS,
  font_family: FONT_FAMILY,
  font_size: font_size,
  spacing: SPACING,
  mode: 'light',
  components: {
    Text: (_props, themeContext) => ({
      style: {
        fontFamily: themeContext.font_family.montserratRegular,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
      },
      h2Style: {
        fontFamily: themeContext.font_family.oswaldSemiBold,
        fontSize: themeContext.font_size.xxl,
        letterSpacing: 0.25,
        color: themeContext.colors.primary,
      },
      h3Style: {
        fontFamily: themeContext.font_family.oswaldSemiBold,
        fontSize: themeContext.font_size.sm,
        letterSpacing: 0.25,
        color: themeContext.colors.primary,
      },
      // Link Style
      h4Style: {
        fontSize: themeContext.font_size.sm,
        color: themeContext.colors.black,
        fontFamily: themeContext.font_family.montserratSemiBold,
        textDecorationLine: 'underline',
      },
    }),
    Button: (props, themeContext) => ({
      disabledStyle: {
        backgroundColor:
          props.type === 'outline'
            ? `${themeContext.colors.background}66`
            : `${themeContext.colors.primary}66`,
      },
      disabledTitleStyle: {
        color:
          props.type === 'outline'
            ? `${themeContext.colors.primary}88`
            : `${themeContext.colors.background}88`,
      },
      buttonStyle: {
        paddingVertical: 0,
        backgroundColor:
          props.type === 'outline'
            ? themeContext.colors.background
            : themeContext.colors.primary,
        height: 50,
        borderRadius: 20,
        gap: themeContext.spacing.sm,
      },
      titleStyle: {
        fontSize: themeContext.font_size.md,
        fontFamily:
          props.type === 'outline'
            ? themeContext.font_family.oswaldRegular
            : themeContext.font_family.oswaldSemiBold,
        color:
          props.type === 'outline'
            ? themeContext.colors.primary
            : themeContext.colors.background,
      },
    }),
    Input: (_props, themeContext) => ({
      renderErrorMessage: false,
      maxLength: 50,
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 20,
        height: 50,
        borderColor: themeContext.colors.border,
        padding: themeContext.spacing.sm,
      },
      inputStyle: {
        fontFamily: themeContext.font_family.montserratRegular,
        fontSize: themeContext.font_size.sm,
        color: themeContext.colors.grey0,
      },
      labelStyle: {
        fontFamily: themeContext.font_family.oswaldSemiBold,
        fontSize: themeContext.font_size.sm,
        marginBottom: themeContext.spacing.xs,
        color: themeContext.colors.primary,
      },
      errorStyle: {
        fontFamily: themeContext.font_family.montserratRegular,
        fontSize: themeContext.font_size.xs,
        color: themeContext.colors.error,
      },
    }),
  },
});
