import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, makeStyles, Text, useTheme } from '@rneui/themed';

import OrderCard from '@/components/OrderCard';
import StatsCard from '@/components/StatsCard';
import { useScrubOrders } from '@/hooks/useScrubOrders';
import { useAuthStore } from '@/store/auth';
import { OrderStatus } from '@/types/order';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

const BudDashboard = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { user } = useAuthStore();

  const {
    data: ordersData,
    isLoading,
    error,
  } = useScrubOrders({
    pageNumber: 1,
    pageSize: 10,
    sortField: 'createdAt',
    sortDirection: 'desc',
  });

  const stats = useMemo(() => {
    if (!ordersData?.data?.items) {
      return {
        totalOrders: 0,
        totalSpent: 0,
        activeOrders: 0,
        completedOrders: 0,
      };
    }

    const { items, totalCount } = ordersData.data;
    const totalOrders = totalCount || 0;
    const totalSpent = items.reduce(
      (sum, order) => sum + order.totalRevenue,
      0,
    );
    const activeOrders = items.filter(
      order =>
        order.status === OrderStatus.REQUESTED ||
        order.status === OrderStatus.ACCEPTED ||
        order.status === OrderStatus.IN_PROGRESS,
    ).length;
    const completedOrders = items.filter(
      order => order.status === OrderStatus.COMPLETED,
    ).length;

    return {
      totalOrders,
      totalSpent,
      activeOrders,
      completedOrders,
    };
  }, [ordersData]);

  const latestOrders = useMemo(() => {
    if (!ordersData?.data?.items) {
      return [];
    }

    return ordersData.data.items.slice(0, 2).map(order => ({
      id: order.id,
      title: `Order #${order.id}`,
      status: order.status,
      date: formatDate(order.createdAt),
      loadSize: order.loadSize.toString(),
      price: formatPrice(order.totalRevenue),
    }));
  }, [ordersData]);

  const renderOrdersContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Failed to load orders. Please try again.
          </Text>
        </View>
      );
    }

    if (latestOrders.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      );
    }

    return latestOrders.map((order, index) => (
      <View key={order.id} style={index > 0 ? styles.orderCardSpacing : {}}>
        <OrderCard
          title={order.title}
          status={order.status}
          date={order.date}
          loadSize={order.loadSize}
          price={order.price}
          primaryLabel="View Details"
          onPrimary={() => {
            // Handle view details action
          }}
        />
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Welcome Card Section */}
          <View style={styles.welcomeCard}>
            <Avatar
              rounded
              size={moderateScale(56)}
              source={
                user?.profileImage ? { uri: user.profileImage } : undefined
              }
              title={user?.fullname?.charAt(0).toUpperCase() || 'U'}
              containerStyle={styles.avatar}
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeBackText}>Welcome Back</Text>
              <Text style={styles.userNameText}>
                {user?.fullname || 'User'}
              </Text>
            </View>
            <TouchableOpacity style={styles.notificationIconContainer}>
              <Ionicons
                name="notifications-outline"
                size={moderateScale(24)}
                color={theme.colors.grey1}
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <StatsCard
              icon="cube-outline"
              iconColor="#10C8BB"
              bgColor="#E8F9EE"
              label="Total Order"
              value={stats.totalOrders.toString()}
            />
            <StatsCard
              icon="cash-outline"
              iconColor="#8E68F3"
              bgColor="#F3E8FF"
              label="Total Spent"
              value={formatPrice(stats.totalSpent)}
            />
          </View>
          <View style={styles.statsContainer}>
            <StatsCard
              icon="time-outline"
              iconColor="#F4A41D"
              bgColor="#FFF7E6"
              label="Active Order"
              value={stats.activeOrders.toString()}
            />
            <StatsCard
              icon="checkmark-done-outline"
              iconColor="#28A745"
              bgColor="#E8F9EE"
              label="Completed"
              value={stats.completedOrders.toString()}
            />
          </View>

          {/* Current Orders Section */}
          <View style={styles.currentOrdersSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lastest Orders</Text>
              <TouchableOpacity style={styles.placeOrderButton}>
                <Ionicons name="add" size={moderateScale(16)} color="#FFFFFF" />
                <Text style={styles.placeOrderButtonText}>Place New Order</Text>
              </TouchableOpacity>
            </View>

            {renderOrdersContent()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey5 || '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: verticalScale(40),
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: moderateScale(24),
    borderBottomRightRadius: moderateScale(24),
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    marginRight: moderateScale(16),
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeBackText: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: theme.colors.grey1 || '#333333',
    marginBottom: verticalScale(4),
  },
  userNameText: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: theme.colors.grey1 || '#333333',
  },
  notificationIconContainer: {
    position: 'relative',
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    borderWidth: 1,
    borderColor: theme.colors.grey4 || '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: theme.colors.grey1 || '#333333',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginBottom: verticalScale(12),
    paddingHorizontal: moderateScale(20),
  },
  currentOrdersSection: {
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(8),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111827',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10C8BB',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    gap: moderateScale(6),
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  orderCardSpacing: {
    marginTop: verticalScale(12),
  },
  pastOrdersSection: {
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(32),
  },
  viewAllLink: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#10C8BB',
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
  actionIconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    backgroundColor: '#E8F9EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  actionText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: theme.colors.grey2,
    textAlign: 'center',
  },
  loadingContainer: {
    paddingVertical: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    paddingVertical: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: moderateScale(14),
    color: '#C55050',
    textAlign: 'center',
  },
  emptyContainer: {
    paddingVertical: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
    textAlign: 'center',
  },
}));

export default BudDashboard;
