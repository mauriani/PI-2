import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import theme from './global/styles/theme';

export default function App() {
  useEffect(() => {
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

        console.log('notification: ', notification);
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

  // async function initOneSignal() {
  //   try {
  //     OneSignal.setLogLevel(6, 0);
  //     OneSignal.setAppId('f6edb16c-b451-4a34-8a8b-eca020dbe2d4');
  //     OneSignal.setRequiresUserPrivacyConsent(false);

  //     /* O N E S I G N A L  H A N D L E R S */

  //     OneSignal.setNotificationWillShowInForegroundHandler(
  //       notifReceivedEvent => {
  //         // console.log(
  //         //   'OneSignal: notification will show in foreground:',
  //         //   notifReceivedEvent,
  //         // );
  //         let notif = notifReceivedEvent.getNotification();

  //         const button1 = {
  //           text: 'Cancel',
  //           onPress: () => {
  //             notifReceivedEvent.complete();
  //           },
  //           style: 'cancel',
  //         };

  //         const button2 = {
  //           text: 'Complete',
  //           onPress: () => {
  //             notifReceivedEvent.complete(notif);
  //           },
  //         };

  //         Alert.alert('Complete notification?', 'Test', [button1, button2], {
  //           cancelable: true,
  //         });
  //       },
  //     );
  //     OneSignal.setNotificationOpenedHandler(notification => {
  //       console.log('OneSignal: notification opened:', notification);
  //     });
  //     OneSignal.setInAppMessageClickHandler(event => {
  //       console.log('OneSignal IAM clicked:', event);
  //     });
  //     OneSignal.addEmailSubscriptionObserver(event => {
  //       console.log('OneSignal: email subscription changed: ', event);
  //     });
  //     OneSignal.addSubscriptionObserver(event => {
  //       console.log('OneSignal: subscription changed:', event);
  //     });
  //     OneSignal.addPermissionObserver(event => {
  //       console.log('OneSignal: permission changed:', event);
  //     });

  //     const deviceState = await OneSignal.getDeviceState();

  //     console.log(deviceState);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
