// React/React Native imports
import React from 'react';

// Navigation libs imports
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens components imports
import { Home } from '../screens/Home';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes(): React.JSX.Element {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}