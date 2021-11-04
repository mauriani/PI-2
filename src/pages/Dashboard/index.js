import React, { useState, useEffect } from 'react';
import { ScrollView, BackHandler } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import firestore from '@react-native-firebase/firestore';

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
  Icon,
  TitleMedication,
} from './styles';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dateHour] = useState(new Date());

  const [currentTime] = useState(dateHour.getHours() + ':' + '00');
  const [hourBreak] = useState(dateHour.getHours() + 4 + ':' + '00');

  const [time] = useState(
    dateHour.getHours() +
      ':' +
      (dateHour.getMinutes() + 1).toString().padStart(2, '0'),
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    loadPatientData();
  }, []);

  useEffect(() => {
    alarm();
  }, [dateHour.getMinutes(), dateHour.getHours()]);

  async function loadPatientData() {
    const snapshot = await firestore().collection('patients').get();
    const data = snapshot.docs.map(doc => doc.data());

    const medication = Object.values(data).map((item, key) => {
      const medications = Object.keys(item.medication).map(
        (medication, index) => {
          alarm(medication, item.patientName);

          return {
            index: String(index),
            hour: medication,
            medication: item.medication[medication].medication,
          };
        },
      );

      return {
        id: item.id,
        patientName: item.patientName,
        medications: medications,
      };
    });

    setData(medication);
    setIsLoading(true);
  }

  async function alarm(hour, patient) {
    const data = new Date();
    const dia =
      data.getDate().toString().padStart(2, '0') +
      '-' +
      (data.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      data.getFullYear();

    let fireDate = `${dia} ${hour}:00`;

    // const alarmNotifData = {
    //   title: 'Medic Alarme',
    //   message: `Hora de aplicar medicação para o paciente ${hour} ${patient}`,
    //   channel: 'wakeup',
    //   small_icon: 'ic_launcher',
    //   vibrate: true,
    //   play_sound: true,
    //   data: { content: 'my notification id is 22' },
    // };

    // if (hour != undefined) {
    //   if (hour >= time) {
    //     const alarm = await ReactNativeAN.scheduleAlarm({
    //       ...alarmNotifData,
    //       fire_date: fireDate,
    //     });

    //     //Delete Scheduled Alarm
    //     ReactNativeAN.deleteAlarm(alarm.id);
    //     //Delete Repeating Alarm
    //     ReactNativeAN.deleteRepeatingAlarm(alarm.id);
    //     //Stop Alarm
    //     ReactNativeAN.stopAlarmSound();
    //     //Send Local Notification Now
    //     ReactNativeAN.sendNotification(alarmNotifData);
    //     //Clear Notification(s) From Notification Center/Tray
    //     ReactNativeAN.removeFiredNotification(alarm.id);
    //     console.log(alarms);
    //   }
    // }
  }

  return (
    <>
      {isLoading === false ? (
        <Loading title={'Carregando dashboard ...'} />
      ) : (
        <Container>
          <Header />

          <InformationsText>
            Horários exibidos dentro do prazo de 4 horas.
          </InformationsText>

          <ScrollView showsHorizontalScrollIndicator={false}>
            {data.map((item, key) => (
              <List key={String(key)} style={{ paddingHorizontal: 10 }}>
                {item.medications.map((medic, index) =>
                  medic.hour != undefined &&
                  medic.hour >= currentTime &&
                  medic.hour <= hourBreak ? (
                    <Card
                      key={medic.hour}
                      onPress={ReactNativeAN.stopAlarmSound()}
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
