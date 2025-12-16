import React from 'react';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import { OrderPrice } from '@/types/order';

export interface PriceBreakdownSectionProps {
  price: OrderPrice;
  total: number;
}

const formatPrice = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

const PriceBreakdownSection: React.FC<PriceBreakdownSectionProps> = ({
  price,
  total,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const priceItems = [
    { label: 'Service Charge', value: price.loadPrice },
    { label: 'Delivery Fee', value: price.delivery },
    { label: 'Pickup Fee', value: price.pickup },
    { label: 'Platform Fee', value: price.platformFee },
    { label: 'Taxes', value: price.taxes },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Breakdown</Text>
      {priceItems.map((item, index) => (
        <View key={index} style={styles.priceRow}>
          <Text style={styles.priceLabel}>{item.label}</Text>
          <Text style={styles.priceValue}>{formatPrice(item.value)}</Text>
        </View>
      ))}
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text
          style={[
            styles.totalValue,
            { color: theme.colors.primary || '#10C8BB' },
          ]}
        >
          {formatPrice(total)}
        </Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(16),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  priceLabel: {
    fontSize: moderateScale(14),
    color: '#6B7280',
  },
  priceValue: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: verticalScale(12),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
}));

export default PriceBreakdownSection;
