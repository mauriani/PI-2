import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import { FlatList } from 'react-native';

import {
  Container,
  Content,
  InformationsText,
  Card,
  Title,
  ContainerHour,
  SubTitle,
  Icon,
} from './styles';

import Header from '../../components/Header';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [dateHour] = useState(new Date());

  async function getDados() {
    setLoading(false);

    const snapshot = await firestore().collection('patients').get();

    setData(snapshot.docs.map(doc => doc.data()));

    setLoading(true);
  }

  useEffect(() => {
    getDados();
  }, []);

  const dataFormatted = data.map(item => {
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
      hour: hour,
    };
  });

  async function handleNotification() {
    const patients = await firestore().collection('patients').get();

    const patient = patients.docs.map(doc => doc.data());
  }

  useEffect(() => {
    handleNotification();
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <InformationsText>
          Horários exibidos dentro do prazo de 4 horas.
        </InformationsText>
        <FlatList
          data={dataFormatted}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          renderItem={({ item }) =>
            item.hour != undefined && (
              <Card key={item.id}>
                <Title>{item.patientName}</Title>
                <ContainerHour>
                  <SubTitle>{item.hour}:00</SubTitle>
                  <Icon name="bell" />
                </ContainerHour>
              </Card>
            )
          }
        />
      </Content>
    </Container>
  );
}
