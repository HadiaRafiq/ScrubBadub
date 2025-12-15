import React from 'react';
import { Image, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { makeStyles, Text } from '@rneui/themed';


import { Slide } from './onboardingData';

type OnboardingSlideProps = {
  slide: Slide;
  width: number;
};

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ slide, width }) => {
  const styles = useStyles();

  return (
    <View style={[styles.slide, { width }]}>
      <Image source={slide.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.description}>{slide.description}</Text>
    </View>
  );
};

const useStyles = makeStyles(({
  slide: {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
    justifyContent: 'center',
  },
  image: {
    height: moderateScale(300),
    width: '100%',
    marginBottom: moderateScale(24),
    alignSelf: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    // color: theme.colors.grey2,
    marginBottom: moderateScale(12),
    // fontFamily: FONTS.INTER,
  },
  description: {
    fontSize: moderateScale(13),
    // color: theme.colors.grey2,
    fontWeight: '300',
    lineHeight: moderateScale(22),
    // fontFamily: FONTS.INTER,
  },
}));

export default OnboardingSlide;
