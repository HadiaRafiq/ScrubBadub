import React from 'react';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text } from '@rneui/themed';

import { OrderStatus, OrderStatusHistory } from '@/types/order';
import { formatOrderDate } from '@/utils/dateFormatter';

export interface OrderStatusSectionProps {
  statusHistory: OrderStatusHistory[];
  currentStatus: OrderStatus;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
  statusHistory,
  currentStatus,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Status</Text>
      {statusHistory.map((statusItem, index) => {
        const isActive =
          index === statusHistory.length - 1 ||
          statusItem.status === currentStatus;

        return (
          <View
            key={statusItem.id || `${statusItem.status}-${index}`}
            style={styles.statusRow}
          >
            <View
              style={[
                styles.statusIndicator,
                isActive && styles.statusIndicatorActive,
              ]}
            />
            <View style={styles.statusContent}>
              <Text style={styles.statusLabel}>{statusItem.status}</Text>
              <Text style={styles.statusDate}>
                {formatOrderDate(statusItem.createdAt)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const useStyles = makeStyles(theme => ({
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  statusIndicator: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: '#E5E7EB',
    marginRight: moderateScale(12),
    marginTop: moderateScale(4),
  },
  statusIndicatorActive: {
    backgroundColor: theme.colors.primary || '#10C8BB',
  },
  statusContent: {
    flex: 1,
  },
  statusLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111827',
    marginBottom: verticalScale(4),
  },
  statusDate: {
    fontSize: moderateScale(14),
    color: '#6B7280',
  },
}));

export default OrderStatusSection;
