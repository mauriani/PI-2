import React from 'react';
import {SafeAreaView} from 'react-native';
import Dashboard from './pages/Dashboard';


export default function App(){
  return(
    <SafeAreaView style={{flex:1}}>
      <Dashboard/>
    </SafeAreaView>
  )
}