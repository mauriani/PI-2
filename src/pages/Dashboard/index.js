import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, BackHandler } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

import {
  Container,
  InformationsText,
  Card,
  List,
  ContentDados,
  Title,
  ContainerHour,
  SubTitle,
  TitleMedication,
} from './styles';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dateHour] = useState(new Date());

  const [currentTime, setCurrentTime] = useState();
  const [hourBreak, setHourBreak] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState(0);

  const [alarmActive, setAlarmActive] = useState('');

  useEffect(() => {
    backHandlerRemove();
    ConfigHourBreak();
    loadPatientData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPatientData();
    }, []),
  );

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);

    checkAlarmClock();
  }, [time]);

  function backHandlerRemove() {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }

  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  function ConfigHourBreak() {
    const data = new Date();

    let hour = addZero(dateHour.getHours());
    let hourBreak = addZero(dateHour.getHours() + 4);
    let date =
      data.getDate().toString().padStart(2, '0') +
      '-' +
      (data.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      data.getFullYear();

    setHourBreak(hourBreak + ':' + '00');
    setCurrentTime(hour + ':' + '00');
    setDate(date);
  }

  async function loadPatientData() {
    try {
      const snapshot = await firestore().collection('patients').get();
      const data = snapshot.docs.map(doc => doc.data());

      const myData = Object.entries(data).map(([key, value]) => {
        const medic = Object.entries(value.medication).map(([index, item]) => {
          return {
            index: String(index),
            hour: item.hour,
            medication: item.medicine,
          };
        });

        return {
          id: value.id,
          patientName: value.patientName,
          medications: medic,
        };
      });

      setData(myData);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function checkAlarmClock() {
    // console.log('time', time);

    data.map(item => {
      item.medications.map(medic => {
        //  console.log(`teste ${medic.hour}:00`);

        if (time === `${medic.hour}:00`) {
          setAlarmActive(item.id);

          const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));

          const alarmNotifData = {
            title: 'Medic Alarme',
            message: `Medicação para ${item.patientName}`,
            channel: 'wakeup',
            small_icon: 'ic_launcher',
            vibrate: true,
            play_sound: true,
            schedule_type: 'repeat',
            repeat_interval: 'minutely',
            data: { content: 'my notification id is 22' },
            fire_date: fireDate,
          };
          method();
          async function method() {
            const alarm = await ReactNativeAN.scheduleAlarm(alarmNotifData);
            //Delete Scheduled Alarm
            ReactNativeAN.deleteAlarm(alarm.id);
            //Delete Repeating Alarm
            ReactNativeAN.deleteRepeatingAlarm(alarm.id);
            //Send Local Notification Now
            ReactNativeAN.sendNotification(alarmNotifData);
            //Clear Notification(s) From Notification Center/Tray
            ReactNativeAN.removeFiredNotification(alarm.id);
          }
        } else {
          return;
        }
      });
    });
  }

  return (
    <>
      {isLoading === false ? (
        <Loading title={'Carregando'} />
      ) : (
        <Container>
          <Header />

          <InformationsText>
            Horários exibidos dentro do prazo de 4 horas.
          </InformationsText>

          <InformationsText>Horário atual: {time}</InformationsText>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
          >
            {data.map((item, key) => (
              <List key={String(key)} style={{ paddingHorizontal: 10 }}>
                {item.medications.map((medic, index) =>
                  medic.hour != undefined &&
                  medic.hour >= currentTime &&
                  medic.hour <= hourBreak ? (
                    <Card
                      key={medic.hour}
                      onPress={ReactNativeAN.stopAlarmSound()}
                      // style={{
                      //   backgroundColor:
                      //     alarmActive == item.id ? 'blue' : '#ffffff',
                      // }}
                      onPress={PushNotification.cancelLocalNotification()}
                    >
                      <ContentDados>
                        <Title>{item.patientName}</Title>
                        <TitleMedication>
                          Medicação {medic.medication}
                        </TitleMedication>
                      </ContentDados>

                      <ContainerHour>
                        <SubTitle>{medic.hour}</SubTitle>
                      </ContainerHour>
                    </Card>
                  ) : null,
                )}
              </List>
            ))}
          </ScrollView>
        </Container>
      )}
    </>
  );
}
