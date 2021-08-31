/* eslint-disable prettier/prettier */
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import User from '../pages/User';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#845ec2',
        inactiveTintColor: '#B0A8B9',
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 60,
          backgroundColor: '#f0f2f5',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Pacientes"
        component={Patients}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Conta"
        component={User}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
