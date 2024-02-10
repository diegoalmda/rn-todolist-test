// React/React Native and expo imports
import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

// External libs imports
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';

// Fonts imports
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

// Local imports
import theme from './src/styles/theme';

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
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text>Hello World!!!</Text>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F4287',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
