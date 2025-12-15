import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { makeStyles, Text } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export type StatsCardProps = {
  icon: string;
  iconColor?: string;
  bgColor?: string;
  label: string;
  value: string | number;
};

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  iconColor = '#10C8BB',
  bgColor = '#F7FFFE',
  label,
  value,
}) => {
  const styles = useStyles();
  return (
    <View style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
      <View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={moderateScale(20)} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    flex: 1,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    gap: verticalScale(6),
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  value: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
  },
}));

export default StatsCard;

