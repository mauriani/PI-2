import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import { FlatList } from 'react-native';

import {
  Container,
  Content,
  Card,
  Title,
  ContainerHour,
  SubTitle,
  Icon,
} from './styles';

import Header from '../../components/Header';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
    return {
      id: item.id,
      patientName: item.patientName,
      hours: item.hours,
    };
  });

  console.log(dataFormatted);

  return (
    <Container>
      <Header />

      <Content>
        <FlatList
          data={dataFormatted}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          renderItem={({ item }) => (
            <Card key={item.id}>
              <Title>{item.patientName}</Title>
              <ContainerHour>
                <SubTitle>{item.hours.hour}</SubTitle>
                <Icon name="bell" />
              </ContainerHour>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}
