import React, { useState, useEffect } from 'react';
import { ScrollView, BackHandler } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import firestore from '@react-native-firebase/firestore';

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

  const [currentTime, setCurrentTime] = useState();
  const [hourBreak, setHourBreak] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const clock = setTimeout(() => {
      const now = new Date().toLocaleTimeString('pt-BR', { hour12: false });
      setTime(`${date} ${now}`);
    }, 1000);

    const interval = setTimeout(() => {
      loadPatientData();
    }, 1000);
    return () => { 
      clearTimeout(interval);
      clearTimeout(clock);
    };
  }, [time]);

  useEffect(() => {
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
  }, []);

  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  async function loadPatientData() {
    const snapshot = await firestore().collection('patients').get();
    const data = snapshot.docs.map(doc => doc.data());

    const medication = Object.values(data).map((item, key) => {
      const medications = Object.keys(item.medication).map(
        (medication, index) => {
          checkAlarmClock(
            medication,
            item.patientName,
            item.medication[medication].medication,
          );

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

  async function checkAlarmClock(hour, patient, medication) {
    let fireDate = `${date} ${hour}:00`;

    console.log(fireDate == time);

    if (fireDate != undefined) {
      if (fireDate == time) {
        console.log('entrei');
        const alarmNotifData = {
          title: 'Medic Alarme',
          message: `Hora de aplicar medicação para o paciente ${patient}`,
          channel: 'wakeup',
          small_icon: 'ic_launcher',
          vibrate: true,
          play_sound: true,
          data: { content: 'my notification id is 22' },
          fire_date: fireDate,
        };

        const alarm = await ReactNativeAN.scheduleAlarm(alarmNotifData);

        console.log(alarm);
        // //Delete Scheduled Alarm
        // ReactNativeAN.deleteAlarm(alarm.id);
        // //Delete Repeating Alarm
        // ReactNativeAN.deleteRepeatingAlarm(alarm.id);
        // //Stop Alarm
        // ReactNativeAN.stopAlarmSound();
        // //Send Local Notification Now
        // ReactNativeAN.sendNotification(alarmNotifData);
        // //Clear Notification(s) From Notification Center/Tray
        // ReactNativeAN.removeFiredNotification(alarm.id);
      }
    }
  }

  return (
    <>
      {isLoading === false ? (
        <Loading title={'Carregando dashboard ...'} />
      ) : (
        <Container>
          <Header />

          <InformationsText>
            Horários exibidos dentro do prazo de 4 horas. {time}
          </InformationsText>

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
