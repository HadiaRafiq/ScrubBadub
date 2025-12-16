import React from 'react';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { makeStyles, Text, useTheme } from '@rneui/themed';

import { formatOrderDate } from '@/utils/dateFormatter';

export interface ServiceDetailsSectionProps {
  loadSize: number;
  orderDate: string;
  orderInstructions?: string | null;
}

const ServiceDetailsSection: React.FC<ServiceDetailsSectionProps> = ({
  loadSize,
  orderDate,
  orderInstructions,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Details</Text>
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons
            name="cube-outline"
            size={moderateScale(24)}
            color={theme.colors.grey2 || '#6B7280'}
          />
          <Text style={styles.detailLabel}>Load Size</Text>
          <Text style={styles.detailValue}>{loadSize}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons
            name="time-outline"
            size={moderateScale(24)}
            color={theme.colors.grey2 || '#6B7280'}
          />
          <Text style={styles.detailLabel}>Order Date</Text>
          <Text style={styles.detailValue}>{formatOrderDate(orderDate)}</Text>
        </View>
      </View>
      {orderInstructions && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsLabel}>Order Instructions</Text>
          <Text style={styles.instructionsText}>{orderInstructions}</Text>
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles({
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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  detailValue: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111827',
  },
  instructionsContainer: {
    marginTop: verticalScale(8),
    paddingTop: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  instructionsLabel: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    marginBottom: verticalScale(8),
  },
  instructionsText: {
    fontSize: moderateScale(14),
    color: '#111827',
    lineHeight: moderateScale(20),
  },
});

export default ServiceDetailsSection;
