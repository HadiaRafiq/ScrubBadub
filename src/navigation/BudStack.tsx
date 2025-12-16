import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BudDashboard from '@/screens/dashboards/BudDashboard';
import MyDeliveries from '@/screens/duber/MyDeliveries';
import MyOrders from '@/screens/duber/MyOrders';
import OrderDetail from '@/screens/duber/OrderDetail';
import PlaceOrder from '@/screens/duber/PlaceOrder';
import DuberProfile from '@/screens/duber/Profile';
import { useAuthStore } from '@/store/auth';
import { BUD_ROUTES, BudStackParamList } from '@/types/routes';
import { ROLES } from '@/types/user';

const OrdersStack = createNativeStackNavigator<BudStackParamList>();

const OrdersStackNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStack.Screen name={BUD_ROUTES.MY_ORDERS} component={MyOrders} />
      <OrdersStack.Screen
        name={BUD_ROUTES.ORDER_DETAIL}
        component={OrderDetail}
      />
    </OrdersStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<BudStackParamList>();

const BudStack = () => {
  const { user, token } = useAuthStore();

  // Guard: only render tabs when authenticated as BUD
  if (!token || user?.role !== ROLES.BUD) {
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
            case BUD_ROUTES.HOME:
              iconName = 'home-outline';
              break;
            case BUD_ROUTES.MY_DELIVERIES:
              iconName = 'cube-outline';
              break;
            case BUD_ROUTES.PLACE_ORDER:
              iconName = 'add-circle-outline';
              break;
            case BUD_ROUTES.MY_ORDERS:
              iconName = 'briefcase-outline';
              break;
            case BUD_ROUTES.PROFILE:
              iconName = 'person-outline';
              break;
            default:
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={BUD_ROUTES.HOME}
        component={BudDashboard}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={BUD_ROUTES.MY_DELIVERIES}
        component={MyDeliveries}
        options={{ tabBarLabel: 'My Deliveries' }}
      />
      <Tab.Screen
        name={BUD_ROUTES.PLACE_ORDER}
        component={PlaceOrder}
        options={{ tabBarLabel: 'Place Order' }}
      />
      <Tab.Screen
        name={BUD_ROUTES.MY_ORDERS}
        component={OrdersStackNavigator}
        options={{ tabBarLabel: 'My Orders' }}
      />
      <Tab.Screen
        name={BUD_ROUTES.PROFILE}
        component={DuberProfile}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BudStack;
