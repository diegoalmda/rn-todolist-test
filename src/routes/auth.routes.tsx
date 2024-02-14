// React/React Native imports
import React from 'react';

// Navigation libs imports
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens components imports
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(): React.JSX.Element {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
      }}
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
