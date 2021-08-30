/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import Routes from './routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6548A3"
        translucent
      />
      <Routes />
    </SafeAreaProvider>
  );
}
