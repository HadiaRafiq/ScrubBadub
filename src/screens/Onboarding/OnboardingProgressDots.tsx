import React from 'react';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { makeStyles } from '@rneui/themed';

import { Slide } from './onboardingData';

type OnboardingProgressDotsProps = {
  slides: Slide[];
  activeIndex: number;
};

const OnboardingProgressDots: React.FC<OnboardingProgressDotsProps> = ({
  slides,
  activeIndex,
}) => {
  const styles = useStyles();
  // const { theme } = useTheme();

  if (activeIndex === 0) {
    return null;
  }

  return (
    <View style={styles.progressContainer}>
      {slides.slice(1).map((slide, index) => {
        const slideIndex = index + 1; // offset because first slide has no dot
        const isActive = slideIndex === activeIndex;

        return (
          <View
            key={slide.key}
            style={[
              styles.dot,
              isActive && {
                // backgroundColor: theme.colors.secondary,
                width: moderateScale(16),
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const useStyles = makeStyles({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    flex: 1,
  },
  dot: {
    height: moderateScale(6),
    width: moderateScale(14),
    borderRadius: moderateScale(4),
    // backgroundColor: theme.colors.accentLight,
  },
});

export default OnboardingProgressDots;
