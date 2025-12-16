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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import {
  LocationsSection,
  OrderStatusSection,
  PriceBreakdownSection,
  ServiceDetailsSection,
  ServiceProviderSection,
} from '@/components/OrderDetail';
import { useScrubOrderDetail } from '@/hooks/useScrubOrderDetail';
import { OrderStatus } from '@/types/order';
import { BUD_ROUTES, BudStackParamList } from '@/types/routes';

type OrderDetailRouteProp = RouteProp<
  BudStackParamList,
  BUD_ROUTES.ORDER_DETAIL
>;

const OrderDetail = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<OrderDetailRouteProp>();
  const { orderId } = route.params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useScrubOrderDetail(orderId);

  const currentStatus = useMemo(() => {
    if (!order?.statusHistory || order.statusHistory.length === 0) {
      return OrderStatus.REQUESTED;
    }
    const latestStatus = order.statusHistory[order.statusHistory.length - 1];

    return latestStatus.status as OrderStatus;
  }, [order]);

  const totalPrice = useMemo(() => {
    if (!order?.price) return 0;
    const { loadPrice, delivery, pickup, platformFee, taxes } = order.price;

    return loadPrice + delivery + pickup + platformFee + taxes;
  }, [order]);

  const handleRefresh = () => {
    refetch();
  };

  const handleMessagePress = () => {
    // TODO: Navigate to chat screen
    console.log('Open chat with service provider');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={moderateScale(24)}
            color={theme.colors.grey1 || '#111827'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Order Detail</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !order) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={moderateScale(24)}
            color={theme.colors.grey1 || '#111827'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Order Detail</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error
              ? 'Failed to load order details. Please try again.'
              : 'Order not found'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={moderateScale(24)}
          color={theme.colors.grey1 || '#111827'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Order Detail</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons
            name="refresh-outline"
            size={moderateScale(24)}
            color={theme.colors.grey1 || '#111827'}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <OrderStatusSection
            statusHistory={order.statusHistory}
            currentStatus={currentStatus}
          />
          <ServiceProviderSection
            fullname={order.scrub.fullname}
            profileImage={order.scrub.profileImage}
            rating={4.9}
            onMessagePress={handleMessagePress}
          />
          <ServiceDetailsSection
            loadSize={order.loadSize}
            orderDate={order.createdAt}
            orderInstructions={order.orderInstructions}
          />
          {order.scrub.addresses && order.scrub.addresses.length > 0 && (
            <LocationsSection
              pickupLocation={order.budAddress}
              deliveryLocation={order.scrub.addresses[0]}
            />
          )}
          <PriceBreakdownSection price={order.price} total={totalPrice} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background || '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(16),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: theme.colors.grey1 || '#111827',
  },
  headerRight: {
    width: moderateScale(24),
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  errorText: {
    fontSize: moderateScale(16),
    color: theme.colors.grey2 || '#6B7280',
    textAlign: 'center',
  },
}));

export default OrderDetail;
