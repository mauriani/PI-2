import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigator from './TabsNavigator';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const App = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <App.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SignIn"
      >
        <App.Screen name="SignIn" component={SignIn} />
        <App.Screen name="SignUp" component={SignUp} />
        <App.Screen name="Dashboard" component={TabsNavigator} />
      </App.Navigator>
    </NavigationContainer>
  );
}
