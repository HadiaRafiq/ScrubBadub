import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { RouteProp, useRoute } from '@react-navigation/native';
import { makeStyles, Text } from '@rneui/themed';

import Header from '@/components/Header';
import { BUD_ROUTES, BudStackParamList } from '@/types/routes';

type OrderDetailRouteProp = RouteProp<
  BudStackParamList,
  BUD_ROUTES.ORDER_DETAIL
>;

const OrderDetail = () => {
  const styles = useStyles();
  const route = useRoute<OrderDetailRouteProp>();
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Header title="Order Details" isBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.orderId}>Order ID: {orderId}</Text>
          {/* Add order details content here */}
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  orderId: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: theme.colors.grey1 || '#333333',
  },
}));

export default OrderDetail;
