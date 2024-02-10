// React/React Native imports
import React, { useCallback } from 'react';
import { StatusBar, View } from 'react-native';

// External libs imports
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';

// Fonts imports
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

// Local imports
import theme from './src/styles/theme';
import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync()
  .then((result) => {
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`);
  })
  .catch(console.warn);

export default function App(): React.JSX.Element {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme}>
      <View onLayout={onLayoutRootView} />
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Routes />
    </ThemeProvider>
  );
}
