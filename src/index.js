/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import Routes from './routes/index';

export default function App() {
  return (
    <SafeAreaView>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6548A3"
          translucent
        />
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  );
}
