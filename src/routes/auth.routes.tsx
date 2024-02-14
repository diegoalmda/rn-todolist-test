import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from "../screens/SignIn";

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
      <Screen
        name="SignIn"
        component={SignIn}
      />
    </Navigator>
  );
}