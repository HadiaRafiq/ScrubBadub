import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';

interface Props extends ActivityIndicatorProps {}

const LoadingSpinner: React.FC<Props> = ({ ...props }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} {...props} />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}));

export default LoadingSpinner;
