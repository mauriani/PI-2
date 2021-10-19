import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';
import firebase from '@react-native-firebase/app';
import 'firebase/storage';

import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import theme from './global/styles/theme';

const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER,
  APP_ID,
  MEASURMENT_ID,
} = process.env;

export default function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: `${API_KEY}`,
      authDomain: `${AUTH_DOMAIN}`,
      databaseURL: `${DATABASE_URL}`,
      projectId: `${PROJECT_ID}`,
      storageBucket: `${STORAGE_BUCKET}`,
      messagingSenderId: `${MESSAGING_SENDER}`,
      appId: `${APP_ID}`,
      measurementId: `${MEASURMENT_ID}`,
    };

    firebase.initializeApp(firebaseConfig);
    initOneSignal();
  }, []);

  async function initOneSignal() {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('f6edb16c-b451-4a34-8a8b-eca020dbe2d4');
    OneSignal.setRequiresUserPrivacyConsent(false);

    //Lida com as notificações enquanto o mesmo está aberto
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: exibida em primeiro plano:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();

        const data = notification.additionalData;

        console.log('additionalData: ', data);

        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }

  return (
    <SafeAreaProvider>
      <>
        <StatusBar
          backgroundColor="#f0f2f5"
          translucent
          barStyle="dark-content"
        />
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </>
    </SafeAreaProvider>
  );
}
