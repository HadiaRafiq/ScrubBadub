import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, makeStyles, Text } from '@rneui/themed';

export interface ServiceProviderSectionProps {
  fullname: string;
  profileImage?: string;
  rating?: number;
  onMessagePress?: () => void;
}

const ServiceProviderSection: React.FC<ServiceProviderSectionProps> = ({
  fullname,
  profileImage,
  rating = 0,
  onMessagePress,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Provider</Text>
      <View style={styles.content}>
        <Avatar
          rounded
          size={moderateScale(48)}
          source={profileImage ? { uri: profileImage } : undefined}
          title={fullname?.charAt(0).toUpperCase() || 'U'}
          containerStyle={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{fullname}</Text>
          {rating > 0 && (
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                size={moderateScale(16)}
                color="#FBBF24"
                style={styles.starIcon}
              />
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
        {onMessagePress && (
          <TouchableOpacity
            style={styles.messageButton}
            onPress={onMessagePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chatbubble-outline"
              size={moderateScale(20)}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>
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
    marginBottom: verticalScale(12),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: moderateScale(12),
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#111827',
    marginBottom: verticalScale(4),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: moderateScale(4),
  },
  rating: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#111827',
  },
  messageButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: theme.colors.primary || '#10C8BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default ServiceProviderSection;
