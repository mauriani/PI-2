import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigator from './TabsNavigator';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DetailsPatient from '../pages/DetailsPatient';
import ForgotPassword from '../pages/ForgotPassword';
import PatientsRegistration from '../pages/PatientsRegistration';
import EditProfile from '../pages/EditProfile';

const App = createStackNavigator();

export default function Routes() {
  return (
    <App.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <App.Screen name="SignIn" component={SignIn} />
      <App.Screen name="SignUp" component={SignUp} />
      <App.Screen name="Dashboard" component={TabsNavigator} />
      <App.Screen name="DetailsPatient" component={DetailsPatient} />
      <App.Screen name="ForgotPassword" component={ForgotPassword} />
      <App.Screen
        name="PatientsRegistration"
        component={PatientsRegistration}
      />
      <App.Screen name="EditProfile" component={EditProfile} />
    </App.Navigator>
  );
}
