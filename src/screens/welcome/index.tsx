import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { makeStyles, Text } from '@rneui/themed';

import Button from '@/components/Button';
import { AUTH_ROUTES, AuthStackNavigatorParamList } from '@/types/routes';

interface UserRoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({
  icon,
  title,
  description,
  iconBgColor,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const Welcome = () => {
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AuthStackNavigatorParamList>>();

  // Simple icon components (can be replaced with proper icons later)
  const CustomerIcon = () => (
    <View style={styles.iconContent}>
      <Text style={styles.iconText}>👥</Text>
    </View>
  );

  const ServiceProviderIcon = () => (
    <View style={styles.iconContent}>
      <Text style={styles.iconText}>⭐</Text>
    </View>
  );

  const DriverIcon = () => (
    <View style={styles.iconContent}>
      <Text style={styles.iconText}>🚚</Text>
    </View>
  );

  const handleGetStarted = () => {
    navigation.navigate(AUTH_ROUTES.SIGNUP);
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate(AUTH_ROUTES.SIGNIN);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient Background */}
        <View style={styles.gradientContainer}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>Welcome to Scrub-Badub</Text>
            <Text style={styles.subtitle}>
              The complete laundry service platform connecting customers,
              service providers, and delivery drivers.
            </Text>
          </View>

          {/* User Role Cards */}
          <View style={styles.cardsContainer}>
            <UserRoleCard
              icon={<CustomerIcon />}
              title="Bud (Customer)"
              description="Get your laundry done by professional service providers"
              iconBgColor="#A7F3E0"
            />
            <UserRoleCard
              icon={<ServiceProviderIcon />}
              title="Scrub (Service Provider)"
              description="Offer laundry services and earn money on your schedule"
              iconBgColor="#BBF7D0"
            />
            <UserRoleCard
              icon={<DriverIcon />}
              title="Duber (Driver)"
              description="Deliver laundry and earn money with flexible hours"
              iconBgColor="#E9D5FF"
            />
          </View>

          {/* Call to Action Section */}
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Ready to get started?</Text>
            <Button
              title="Get Started - Create Account"
              onPress={handleGetStarted}
              containerStyle={styles.primaryButtonContainer}
            />
            <Button
              title="I Already Have an Account"
              onPress={handleAlreadyHaveAccount}
              type="outline"
              containerStyle={styles.secondaryButtonContainer}
            />
          </View>

          {/* Trust Statement */}
          <Text style={styles.trustStatement}>
            Join thousands of users who trust Scrub-Badub for their laundry
            needs.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  gradientContainer: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(40),
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  mainTitle: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    // color: theme.colors.text,
    textAlign: 'center',
    marginBottom: verticalScale(12),
  },
  subtitle: {
    fontSize: moderateScale(16),
    // color: theme.colors.text,
    textAlign: 'center',
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(8),
  },
  cardsContainer: {
    flexDirection: 'column',
    marginBottom: verticalScale(40),
    gap: moderateScale(16),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  iconContainer: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  iconContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: moderateScale(32),
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    // color: theme.colors.text,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  cardDescription: {
    fontSize: moderateScale(14),
    // color: theme.colors.text,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  ctaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: moderateScale(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: verticalScale(24),
  },
  ctaTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    // color: theme.colors.text,
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  primaryButtonContainer: {
    width: '100%',
    marginBottom: verticalScale(12),
  },
  secondaryButtonContainer: {
    width: '100%',
  },
  trustStatement: {
    fontSize: moderateScale(14),
    // color: theme.colors.text,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});

export default Welcome;
