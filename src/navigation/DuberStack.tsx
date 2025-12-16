/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DuberDashboard from '@/screens/dashboards/DuberDashboard';
import MyDeliveries from '@/screens/duber/MyDeliveries';
import PlaceOrder from '@/screens/duber/PlaceOrder';
import DuberProfile from '@/screens/duber/Profile';
import { DuberStackParamList, DUBER_ROUTES } from '@/types/routes';
import { useAuthStore } from '@/store/auth';
import { ROLES } from '@/types/user';

const Tab = createBottomTabNavigator<DuberStackParamList>();

const DuberStack = () => {
    const { user, token } = useAuthStore();

    // Guard: only render tabs when authenticated as Duber
    if (!token || user?.role !== ROLES.DUBER) {
        return null;
    }

  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
        headerShown: false,
              tabBarShowLabel: true,
              tabBarStyle: {
                  height: 64,
                  paddingBottom: 8,
                  paddingTop: 6,
                  borderTopWidth: 1,
                  borderTopColor: '#E6E6E6',
                  backgroundColor: '#FFFFFF',
              },
              tabBarActiveTintColor: '#10C8BB',
              tabBarInactiveTintColor: '#7A7A7A',
              tabBarIcon: ({ color, size }) => {
                  let iconName: string = 'home-outline';
                  switch (route.name) {
                      case DUBER_ROUTES.HOME:
                          iconName = 'home-outline';
                          break;
                      case DUBER_ROUTES.HISTORY:
                          iconName = 'cube-outline';
                          break;
                      case DUBER_ROUTES.ORDERS:
                          iconName = 'add-circle-outline';
                          break;
                      default:
                          break;
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
          })}>
          <Tab.Screen
              name={DUBER_ROUTES.HOME}
        component={DuberDashboard}
              options={{ tabBarLabel: 'Home' }}
          />
          <Tab.Screen
              name={DUBER_ROUTES.HISTORY}
              component={MyDeliveries}
              options={{ tabBarLabel: 'My Deliveries' }}
          />    
          <Tab.Screen
              name={DUBER_ROUTES.ORDERS}
              component={PlaceOrder}
              options={{ tabBarLabel: 'Place Order' }}
          />
          <Tab.Screen
              name={DUBER_ROUTES.PROFILE}
              component={DuberProfile}
              options={{ tabBarLabel: 'Profile' }}
      />
      </Tab.Navigator>
  );
};

export default DuberStack;

