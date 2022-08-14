import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createTheme, ThemeProvider } from '@rneui/themed';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/layout/Navigation';
import { SidebarContainer, Sidebar } from './src/layout/Sidebar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useWindowDimensions } from 'react-native';
import { useFonts } from 'expo-font';

const theme = createTheme({
  lightColors: {
    primary: '#4D7CFE',
    black: '#252631',
    secondary: '#778CA2',
    grey0: '#98A9BC',
    grey4: '#F2F4F6',
    grey5: '#F8FAFB',
    greyOutline: '#E8ECEF',
    warning: '#FFAB2B',
    success: '#6DD230',
    error: '#FE4D97',
    info: '#2CE5F6',
  } as any,
  darkColors: {},
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    LineAwesome: require('./assets/fonts/LineAwesome.ttf'),
  });

  if (!loaded) {
    return null;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation colorScheme={colorScheme} />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
