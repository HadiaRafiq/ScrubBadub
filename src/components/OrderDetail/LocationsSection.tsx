import React from 'react';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { makeStyles, Text } from '@rneui/themed';

import { OrderAddress } from '@/types/order';

export interface LocationsSectionProps {
  pickupLocation: OrderAddress;
  deliveryLocation: OrderAddress;
}

const formatAddress = (address: OrderAddress): string => {
  const parts = [address.address];
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.zipCode) parts.push(address.zipCode);

  return parts.join(', ');
};

const LocationsSection: React.FC<LocationsSectionProps> = ({
  pickupLocation,
  deliveryLocation,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      <View style={styles.locationRow}>
        <Ionicons
          name="location"
          size={moderateScale(20)}
          color="#10B981"
          style={styles.locationIcon}
        />
        <View style={styles.locationContent}>
          <Text style={styles.locationLabel}>Pickup Location</Text>
          <Text style={styles.locationAddress}>
            {formatAddress(pickupLocation)}
          </Text>
        </View>
      </View>
      <View style={styles.locationRow}>
        <Ionicons
          name="location"
          size={moderateScale(20)}
          color="#3B82F6"
          style={styles.locationIcon}
        />
        <View style={styles.locationContent}>
          <Text style={styles.locationLabel}>Delivery Location</Text>
          <Text style={styles.locationAddress}>
            {formatAddress(deliveryLocation)}
          </Text>
        </View>
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(16),
  },
  locationIcon: {
    marginRight: moderateScale(12),
    marginTop: moderateScale(2),
  },
  locationContent: {
    flex: 1,
  },
  locationLabel: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    marginBottom: verticalScale(4),
  },
  locationAddress: {
    fontSize: moderateScale(14),
    color: '#111827',
    lineHeight: moderateScale(20),
  },
}));

export default LocationsSection;
