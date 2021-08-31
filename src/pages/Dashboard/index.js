import React from 'react';

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
  const data = [
    {
      id: '1',
      patientName: 'Maria Luiza Rodrigues',
      hour: '16:00',
    },
    {
      id: '2',
      patientName: 'Luiz Fernando De Paula',
      hour: '17:00',
    },
    {
      id: '3',
      patientName: 'João Paulo Loureiro',
      hour: '18:00',
    },
    {
      id: '4',
      patientName: 'João Paulo Loureiro',
      hour: '18:00',
    },
    {
      id: '5',
      patientName: 'Maria Luiza',
      hour: '18:00',
    },
    {
      id: '6',
      patientName: 'Pedro Antônio',
      hour: '18:00',
    },
    {
      id: '7',
      patientName: 'João Paulo Loureiro',
      hour: '18:00',
    },
  ];

  return (
    <Container>
      <Header />

      <Content>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          renderItem={({ item }) => (
            <Card>
              <Title>{item.patientName}</Title>
              <ContainerHour>
                <SubTitle>{item.hour}</SubTitle>
                <Icon name="bell" />
              </ContainerHour>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}
