import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text, Button } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { OrderStatus } from '@/types/order';

export type OrderCardProps = {
  title: string;
  status: OrderStatus;
  date: string;
  loadSize: string;
  price: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
};

const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
    [OrderStatus.REQUESTED]: { bg: '#FCEEC3', text: '#AD7A05' },
    [OrderStatus.ACCEPTED]: { bg: '#E2E8F8', text: '#3150AA' },
    [OrderStatus.REJECTED]: { bg: '#FAD7D7', text: '#C55050' },
    [OrderStatus.IN_PROGRESS]: { bg: '#E2E8F8', text: '#3150AA' },
    [OrderStatus.COMPLETED]: { bg: '#DBF6DF', text: '#3A9150' },
    [OrderStatus.CANCELLED]: { bg: '#FAD7D7', text: '#C55050' },
};

const formatStatusLabel = (status: OrderStatus): string => {
    return status.replace('_', ' ');
};

const OrderCard: React.FC<OrderCardProps> = ({
  title,
  status,
  date,
  loadSize,
  price,
  onPrimary,
  onSecondary,
  primaryLabel = 'View Details',
  secondaryLabel,
}) => {
  const styles = useStyles();
    const colors = statusColors[status] || statusColors[OrderStatus.REQUESTED];

  return (
    <View style={styles.card}>
          <View style={styles.topRow}>
              <View style={styles.leftColumn}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.metaText}>{date}</Text>
                  <Text style={styles.metaText}>Load Size: {loadSize}</Text>
              </View>
              <View style={styles.rightColumn}>
                  <View style={[styles.statusPill, { backgroundColor: colors.bg }]}>
                      <Text style={[styles.statusText, { color: colors.text }]}>
                          {formatStatusLabel(status)}
                      </Text>
                  </View>
                  <Text style={styles.price}>{price}</Text>
              </View>
          </View>
      <View style={styles.actionsRow}>
        {secondaryLabel && onSecondary && (
          <Button
                      title={secondaryLabel}
            onPress={onSecondary}
            buttonStyle={styles.secondaryBtn}
            titleStyle={styles.secondaryTitle}
          />
        )}
              {primaryLabel && onPrimary && (
                  <Button
                      title={primaryLabel}
                      onPress={onPrimary}
                      type="outline"
                      buttonStyle={styles.primaryBtn}
                      titleStyle={styles.primaryTitle}
                  />
              )}
      </View>
    </View>
  );
};

const useStyles = makeStyles(({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    gap: verticalScale(6),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
    topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(12),
    },
    leftColumn: {
        flex: 1,
        gap: verticalScale(4),
    },
    rightColumn: {
        alignItems: 'flex-end',
        gap: verticalScale(8),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#111827',
  },
  statusPill: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
      borderRadius: moderateScale(6),
  },
  statusText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    },
  metaText: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  price: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#111827',
  },
  actionsRow: {
    flexDirection: 'row',
      justifyContent: 'flex-start',
    gap: moderateScale(10),
    marginTop: verticalScale(4),
  },
  primaryBtn: {
      borderColor: '#E5E7EB',
      borderWidth: 1,
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(8),
      borderRadius: moderateScale(8),
      backgroundColor: 'transparent',
  },
  primaryTitle: {
    fontSize: moderateScale(13),
    fontWeight: '600',
      color: '#111827',
  },
    secondaryBtn: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(8),
      borderRadius: moderateScale(8),
      backgroundColor: '#10C8BB',
  },
  secondaryTitle: {
    fontSize: moderateScale(13),
    fontWeight: '600',
      color: '#FFFFFF',
  },
}));

export default OrderCard;

