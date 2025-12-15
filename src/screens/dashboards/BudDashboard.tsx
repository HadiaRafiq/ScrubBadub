import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '@/components/Header';
import { useAuthStore } from '@/store/auth';

const BudDashboard = () => {
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
            <Text style={styles.welcomeSubtitle}>Customer Dashboard</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons
                name="shirt-outline"
                size={moderateScale(32)}
                color={theme.colors.primary}
              />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons
                name="time-outline"
                size={moderateScale(32)}
                color={theme.colors.warning}
              />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>

          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <View style={styles.actionCard}>
                <Ionicons
                  name="add-circle-outline"
                  size={moderateScale(24)}
                  color={theme.colors.primary}
                />
                <Text style={styles.actionText}>New Order</Text>
              </View>

              <View style={styles.actionCard}>
                <Ionicons
                  name="list-outline"
                  size={moderateScale(24)}
                  color={theme.colors.primary}
                />
                <Text style={styles.actionText}>My Orders</Text>
              </View>

              <View style={styles.actionCard}>
                <Ionicons
                  name="time-outline"
                  size={moderateScale(24)}
                  color={theme.colors.primary}
                />
                <Text style={styles.actionText}>Order History</Text>
              </View>

              <View style={styles.actionCard}>
                <Ionicons
                  name="person-outline"
                  size={moderateScale(24)}
                  color={theme.colors.primary}
                />
                <Text style={styles.actionText}>Profile</Text>
              </View>
            </View>
          </View>
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
  statCard: {
    flex: 1,
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
  },
  statValue: {
    fontSize: moderateScale(24),
    fontWeight: '700',
      color: theme.colors.grey2,
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
    textAlign: 'center',
  },
  quickActionsContainer: {
    marginTop: verticalScale(8),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
      color: theme.colors.grey2,
    marginBottom: verticalScale(16),
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(12),
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
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
  },
  actionText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
      color: theme.colors.grey2,
    marginTop: verticalScale(8),
    textAlign: 'center',
  },
}));

export default BudDashboard;

