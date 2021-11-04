import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  InformationsText,
  Card,
  Title,
  ContainerHour,
  SubTitle,
  Icon,
  Scheduling,
} from './styles';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dataFormatted, setDataFormatted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataPacient, setDataPacient] = useState([]);
  const [dateHour] = useState(new Date());

  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    getDados();
  }, []);

  useLayoutEffect(() => {
    getHours();
    handleNotification();
  }, [data]);

  async function getDados() {
    const snapshot = await firestore().collection('patients').get();
    const data = snapshot.docs.map(doc => doc.data());
    setData(data);
    setDataPacient(data);
    setIsLoading(true);
  }

  function getHours() {
    const formatted = data.map(item => {
      const currentTime = dateHour.getHours() + ':' + '00';
      const hourBreak = dateHour.getHours() + 4 + ':' + '00';
      let hours = [];

      for (const variavel in item.hours) {
        if (variavel >= currentTime && variavel <= hourBreak) {
          hours.push(variavel);
        }
      }

      return {
        id: item.id,
        patientName: item.patientName,
        hours,
      };
    });

    setDataFormatted(formatted);

    // verifica se tem algum horário dentro da hora atual

    formatted.map(item => {
      const currentTime = dateHour.getHours() + ':' + '00';

      for (var i = 0; i < item.hours.length; i++) {
        if (item.hours[i] != undefined) {
          if (currentTime == item.hours[i]) {
            console.log(item.hours[i], item.patientName);
            alarm(item.hours[i], item.patientName[i]);
          }
        }
      }
    });

    setIsLoading(true);
  }

  async function alarm(hour, patient) {
    const data = new Date();
    const dia =
      data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();

    setCurrentTime(`${dia} ${hour}:00`);

    const alarmNotifData = {
      title: 'Medic Alarme',
      message: `Hora de aplicar medicação para o paciente ${patient}`,
      channel: 'wakeup',
      small_icon: 'ic_launcher',
      vibrate: true,
      play_sound: true,
      data: { content: 'my notification id is 22' },
    };

    // set alarm
    console.log(`alarm set: ${currentTime}`);

    try {
      const alarm = await ReactNativeAN.scheduleAlarm({
        ...alarmNotifData,
        fire_date: currentTime,
      });

      //Delete Scheduled Alarm
      ReactNativeAN.deleteAlarm(alarm.id);

      //Delete Repeating Alarm
      ReactNativeAN.deleteRepeatingAlarm(alarm.id);

      //Stop Alarm
      ReactNativeAN.stopAlarmSound();

      //Send Local Notification Now
      ReactNativeAN.sendNotification(alarmNotifData);

      //Clear Notification(s) From Notification Center/Tray
      ReactNativeAN.removeFiredNotification(alarm.id);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleNotification() {
    const formatted = dataPacient.map(item => {
      const created = item.createdAt.getDay();
      const firstUpdate = created + 15;

      setUpdate(firstUpdate);

      return {
        updatedAt: item.update,
      };
    });

    setDataPacient(formatted);
  }

  console.log(typeof dataFormatted);

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

          {Object.values(dataFormatted).map((item, key) => {
            <Card key={key}>
              <Title>{item.patientName}</Title>
            </Card>;
          })}

          <Scheduling
            data={dataFormatted}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card
                key={item.id}
                onPress={() => {
                  ReactNativeAN.stopAlarmSound();
                }}
              >
                <Title>{item.patientName}</Title>
                <ContainerHour>
                  <SubTitle>{item.hour}</SubTitle>
                  <Icon name="bell" />
                </ContainerHour>
              </Card>
            )}
          />
        </Container>
      )}
    </>
  );
}
