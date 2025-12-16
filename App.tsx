import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from '@/navigation/AppNavigator';
import { theme } from '@/theme';
import { queryClient } from '@/api/queryClient';

function App() {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppNavigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
