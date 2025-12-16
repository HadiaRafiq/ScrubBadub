import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles, Text } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuthStore } from '@/store/auth';

const DuberProfile = () => {
  const styles = useStyles();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                    },
                },
            ],
        );
    };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <View style={styles.headerBar}>
              <Text style={styles.headerTitle}>Profile Settings</Text>
              <View style={styles.headerIcons}>
                  <TouchableOpacity style={styles.iconButton}>
                      <Ionicons
                          name="refresh-outline"
                          size={moderateScale(20)}
                          color="#4B5563"
                      />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                      <Ionicons
                          name="log-out-outline"
                          size={moderateScale(20)}
                          color="#4B5563"
                      />
                  </TouchableOpacity>
              </View>
          </View>
      <View style={styles.content}>
              {/* Add profile settings content here */}
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
        backgroundColor: theme.colors.background || '#F5F5F5',
    },
    headerBar: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(16),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#111827',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    iconButton: {
        padding: moderateScale(4),
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(24),
    },
}));

export default DuberProfile;

