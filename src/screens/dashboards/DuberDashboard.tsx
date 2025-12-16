import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import Header from '@/components/Header';
import { useAuthStore } from '@/store/auth';
import StatsCard from '@/components/StatsCard';
import OrderCard from '@/components/OrderCard';
import { OrderStatus } from '@/types/order';

const DuberDashboard = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <Header title="Dashboard" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome, {user?.fullname}!</Text>
            <Text style={styles.welcomeSubtitle}>Driver Dashboard</Text>
          </View>

          <View style={styles.statsContainer}>
                      <StatsCard icon="cube-outline" label="Total Order" value="18" />
                      <StatsCard icon="cash-outline" iconColor="#8E68F3" bgColor="#F3E8FF" label="Total Spent" value="$2795.64" />
                  </View>
                  <View style={styles.statsContainer}>
                      <StatsCard icon="time-outline" iconColor="#F4A41D" bgColor="#FFF7E6" label="Active Order" value="0" />
                      <StatsCard icon="checkmark-done-outline" iconColor="#28A745" bgColor="#E8F9EE" label="Completed" value="3" />
          </View>

                  <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Your Current Orders</Text>
                      <Text style={styles.actionLink}>+ Place New Order</Text>
                  </View>
                  <OrderCard
                      title="Order #scrub-odr-q21bx87y"
                      status={OrderStatus.REQUESTED}
                      date="Jul 15, 2023"
                      loadSize="5"
                      price="$24.99"
                      primaryLabel="View Details"
                  />
                  <View style={{ height: verticalScale(12) }} />
                  <OrderCard
                      title="Order #scrub-odr-q21bx87y"
                      status={OrderStatus.IN_PROGRESS}
                      date="Jul 15, 2023"
                      loadSize="5"
                      price="$24.99"
                      primaryLabel="View Details"
                  />

                  <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Past Orders</Text>
                      <Text style={styles.actionLink}>View All</Text>
                  </View>
                  <OrderCard
                      title="Order #scrub-odr-q21bx87y"
                      status={OrderStatus.COMPLETED}
                      date="Jul 15, 2023"
                      loadSize="5"
                      price="$24.99"
                      primaryLabel="View Details"
                      secondaryLabel="Order Again"
                  />
                  <View style={{ height: verticalScale(12) }} />
                  <OrderCard
                      title="Order #scrub-odr-q21bx88z"
                      status={OrderStatus.ACCEPTED}
                      date="Jul 18, 2023"
                      loadSize="2"
                      price="$34.99"
                      primaryLabel="View Details"
                      secondaryLabel="Order Now"
                  />
                  <View style={{ height: verticalScale(12) }} />
                  <OrderCard
                      title="Order #scrub-odr-q21bx89a"
                      status={OrderStatus.CANCELLED}
                      date="Jul 20, 2023"
                      loadSize="19"
                      price="$19.99"
                      primaryLabel="View Details"
                      secondaryLabel="Reorder"
                  />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  welcomeSection: {
    marginBottom: verticalScale(24),
  },
  welcomeTitle: {
    fontSize: moderateScale(28),
    fontWeight: '700',
      color: theme.colors.grey2,
    marginBottom: verticalScale(8),
  },
  welcomeSubtitle: {
    fontSize: moderateScale(16),
    color: theme.colors.grey2,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginBottom: verticalScale(32),
  },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    alignItems: 'center',
        marginBottom: verticalScale(8),
    },
    sectionTitle: {
        fontSize: moderateScale(16),
    fontWeight: '700',
      color: '#111827',
  },
    actionLink: {
        fontSize: moderateScale(13),
        color: theme.colors.primary,
      fontWeight: '600',
  },
}));

export default DuberDashboard;

