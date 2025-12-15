import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles, Text } from '@rneui/themed';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const MyOrders = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Review your accepted orders.</Text>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(24),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: theme.colors.grey2,
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: theme.colors.grey2,
  },
}));

export default MyOrders;

