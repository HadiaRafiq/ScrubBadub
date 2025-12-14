import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { makeStyles, Text } from '@rneui/themed';

import { FONTS } from '@/constants/fonts';

type OnboardingSkipButtonProps = {
  onPress: () => void;
};

const OnboardingSkipButton: React.FC<OnboardingSkipButtonProps> = ({
  onPress,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.skipRow}>
      <TouchableOpacity onPress={onPress} hitSlop={8} activeOpacity={0.8}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  skipRow: {
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(8),
    zIndex: 1,
  },
  skipText: {
    color: theme.colors.text,
    opacity: 0.6,
    fontSize: moderateScale(14),
    fontFamily: FONTS.INTER,
  },
}));

export default OnboardingSkipButton;


