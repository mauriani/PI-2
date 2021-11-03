import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  const [update, setUpdate] = useState([]);

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
      const currentTime = dateHour.getHours();
      const hourBreak = currentTime + 4;
      let hour;

      for (const variavel in item.hours) {
        if (variavel >= currentTime && variavel <= hourBreak) {
          hour = variavel;
        }
      }

      return {
        id: item.id,
        patientName: item.patientName,
        hour: `${hour}:00`,
      };
    });

    setDataFormatted(formatted);

    // verifica se tem algum horário dentro da hora atual

    formatted.map(item => {
      const currentTime = dateHour.getHours() + ':' + '00';

      const currentTimeFormatted =
        currentTime >= 0 && currentTime < 10 ? `0${currentTime}` : currentTime;

      console.log('c', currentTimeFormatted);
      console.log(item.hour);

      if (currentTimeFormatted == item.hour) {
        console.log('entrei aqui');
        alarm(item.hour, item.id, item.patientName);
      }
    });

    setIsLoading(true);
  }

  async function alarm(hour, id, paciente) {
    const data = new Date();
    const dia =
      data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();

    setCurrentTime(`${dia} ${hour}:00`);

    const alarmNotifData = {
      title: 'Medic Alarme',
      message: `Hora de aplicar medicação para o paciente ${paciente}`,
      channel: 'wakeup',
      small_icon: 'ic_launcher',
      data: { content: 'my notification id is 22' },
    };

    // set alarm

    const details = { ...alarmNotifData, fire_date: currentTime };
    console.log(`alarm set: ${currentTime}`);

    try {
      const alarm = await ReactNativeAN.scheduleAlarm(details);

      if (alarm) {
        setUpdate([
          ...update,
          { date: `alarm set: ${currentTime}`, id: alarm.id },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleNotification() {
    const formatted = dataPacient.map(item => {
      return {
        id: item.id,
        patientName: item.patientName,
        hour: item.createdAt,
      };
    });

    setDataPacient(formatted);
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

          <Scheduling
            data={dataFormatted}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              item.hour != undefined && (
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
              )
            }
          />
        </Container>
      )}
    </>
  );
}
