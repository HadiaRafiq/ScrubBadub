import React, { useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { makeStyles } from '@rneui/themed';

import OnboardingRail from '@/assets/svgs/OnboardingRail';
import { useAuthStore } from '@/store/auth';
import { useOnboardingStore } from '@/store/onboarding';
import { RootStackParamList, STACKS } from '@/types/routes';

import OnboardingCTA from './OnboardingCTA';
import { Slide, slides } from './onboardingData';
import OnboardingProgressDots from './OnboardingProgressDots';
import OnboardingSkipButton from './OnboardingSkipButton';
import OnboardingSlide from './OnboardingSlide';

const getCTALabel = (activeIndex: number, totalSlides: number): string => {
  if (activeIndex === totalSlides - 1) {
    return 'Get Started';
  }
  if (activeIndex === 0) {
    return 'Start';
  }

  return 'Next';
};

const Onboarding = () => {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Slide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuthStore();
  const { completeOnboarding } = useOnboardingStore();

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setActiveIndex(index);
  };

  const goToIndex = (index: number) => {
    listRef.current?.scrollToIndex({ animated: true, index });
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      completeOnboarding();
      navigation.replace(user?._id ? STACKS.APP : STACKS.AUTH);

      return;
    }
    goToIndex(activeIndex + 1);
  };

  const handleSkip = () => {
    completeOnboarding();
    navigation.replace(user?._id ? STACKS.APP : STACKS.AUTH);
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <OnboardingSlide slide={item} width={width} />
  );

  const ctaLabel = getCTALabel(activeIndex, slides.length);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.railContainer} pointerEvents="none">
        <OnboardingRail height="100%" />
      </View>

      <OnboardingSkipButton onPress={handleSkip} />

      <FlatList
        ref={listRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
        bounces={false}
      />

      <View style={styles.footer}>
        <OnboardingProgressDots slides={slides} activeIndex={activeIndex} />
        <OnboardingCTA label={ctaLabel} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  railContainer: {
    position: 'absolute',
    top: moderateScale(15),
    bottom: -moderateScale(15),
    right: -moderateScale(5),
    width: moderateScale(68),
    zIndex: 0,
    overflow: 'hidden',
    borderTopLeftRadius: moderateScale(16),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(20),
    zIndex: 1,
    paddingRight: moderateScale(32),
  },
}));

export default Onboarding;


