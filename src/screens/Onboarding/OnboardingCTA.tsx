import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { makeStyles, Text } from '@rneui/themed';


type OnboardingCTAProps = {
  label: string;
  onPress: () => void;
};

const OnboardingCTA: React.FC<OnboardingCTAProps> = ({ label, onPress }) => {
  const styles = useStyles();
  // const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.ctaButton}
      onPress={onPress}>
      <Text style={styles.ctaLabel}>{label}</Text>
      <View style={styles.ctaIcon}>
        <Icon name="chevron-forward" color={'#FFFFFF'} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(({
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
    justifyContent: 'flex-end',
    marginRight: -moderateScale(26),
  },
  ctaLabel: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    // color: theme.colors.grey2,
    // fontFamily: FONTS.INTER,
  },
  ctaIcon: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    // backgroundColor: theme.colors.grey2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(5),
    // borderColor:
    // theme.colors.primary,
    // shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: moderateScale(-1) },
    shadowOpacity: 0.35,
    shadowRadius: moderateScale(5.8),
    elevation: 6,
  },
}));

export default OnboardingCTA;


