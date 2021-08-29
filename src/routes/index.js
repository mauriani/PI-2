/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { TabsNavigator } from './TabsNavigator';

const App = createStackNavigator();

export default function routes() {
  return (
    <>
      <App.Navigator screenOptions={{ headerShown: false }}>
        <App.Screen name="SignIn" component={SignIn} />
        <App.Screen name="SignUp" component={SignUp} />
        <App.Screen name="Dashboard" component={TabsNavigator} />
      </App.Navigator>
    </>
  );
}
