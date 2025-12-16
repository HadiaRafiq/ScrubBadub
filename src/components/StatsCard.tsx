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
      <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
              <Ionicons name={icon} size={moderateScale(24)} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        padding: moderateScale(16),
        gap: verticalScale(12),
    shadowColor: '#000',
        shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
        elevation: 3,
  },
  iconWrap: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
      fontSize: moderateScale(14),
      fontWeight: '400',
    color: '#6B7280',
      marginTop: verticalScale(4),
  },
  value: {
      fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#111827',
      marginTop: verticalScale(4),
  },
}));

export default StatsCard;

