import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Title,
  Content,
  Card,
  CardPattients,
  UserAvatar,
  Information,
  PatientsName,
  PatientsText,
} from './styles';

import Header from '../../components/Header';

export default function Patients() {
  const data = [
    {
      id: '1',
      patientName: 'Maria Luiza Rodrigues',
      treatment: 'Ansiedade',
      medicine: 'Buspirona',
      allergy: 'Não',
      image:
        'https://cdn.dribbble.com/users/403631/screenshots/14517923/media/0fd032a739adf9bec98b6af71a5b85d7.jpg?compress=1&resize=800x600',
    },

    {
      id: '2',
      patientName: 'João Paulo Loureiro',
      treatment: 'Ansiedade',
      medicine: 'Buspirona',
      allergy: 'Não',
      image:
        'https://cdn.dribbble.com/users/1174720/screenshots/15718185/media/b54ee56400b00386f558b6a6f465d5b0.png?compress=1&resize=1200x900',
    },
  ];
  return (
    <Container>
      <Header />
      <Title>Patients</Title>
      <Content>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          renderItem={({ item }) => (
            <Card>
              <CardPattients>
                <UserAvatar
                  source={{
                    uri: `${item.image}`,
                  }}
                />
                <Information>
                  <PatientsName>{item.patientName}</PatientsName>
                  <PatientsText>Tratamento - {item.treatment}</PatientsText>
                  <PatientsText>Medicamento - {item.medicine}</PatientsText>
                  <PatientsText>Alérgia - {item.allergy}</PatientsText>
                </Information>
              </CardPattients>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}
