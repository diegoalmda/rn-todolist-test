// React/React Native imports
import React from 'react';

// Navigation libs imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens components imports
import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';

const { Screen, Navigator } = createNativeStackNavigator();

export function Routes(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}
