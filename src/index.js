import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import theme from './global/styles/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#f0f2f5"
        translucent
        barStyle="dark-content"
      />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
