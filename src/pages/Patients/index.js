import React from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';

import Header from '../../components/Header';

import {
  Container,
  Title,
  Card,
  CardPattients,
  UserAvatar,
  Information,
  PatientsName,
  PatientsTextBold,
  PatientsText,
} from './styles';

export default function Patients() {
  const { navigate } = useNavigation();

  const usersCollection = firestore().collection('patients').get();

  console.log(usersCollection);

  const data = [
    {
      id: '1',
      patientName: 'Maria Luiza Rodrigues',
      age: '67 anos',
      sex: 'Feminino',
      sickness: 'Ansiedade',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image:
        'https://cdn.dribbble.com/users/403631/screenshots/14517923/media/0fd032a739adf9bec98b6af71a5b85d7.jpg?compress=1&resize=800x600',
    },

    {
      id: '2',
      patientName: 'João Paulo Loureiro',
      age: '70 anos',
      sex: 'Masculino',
      sickness: 'Ansiedade',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image:
        'https://cdn.dribbble.com/users/1174720/screenshots/15718185/media/b54ee56400b00386f558b6a6f465d5b0.png?compress=1&resize=1200x900',
    },
    {
      id: '3',
      patientName: 'Abraham Jebediah "Abe"',
      age: '83 anos',
      sex: 'Masculino',
      sickness: 'Perda de audição',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image:
        'https://i.pinimg.com/originals/f4/56/2b/f4562b43cc01d2ad74273e3f2820f173.jpg',
    },
    {
      id: '4',
      patientName: 'Jacqueline Gurney-Bouvier',
      age: '80 anos',
      sex: 'Feminino',
      sickness: 'Diabetes',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image:
        'https://1.bp.blogspot.com/_NepJ0LrRrLU/SB3SxrLyNaI/AAAAAAAAACI/9MiSgfRVzDY/s320/Jacqueline+Bouvier.png',
    },

    {
      id: '5',
      patientName: 'Jacqueline Gurney-Bouvier',
      age: '80 anos',
      sex: 'Feminino',
      sickness: 'Diabetes',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image:
        'https://1.bp.blogspot.com/_NepJ0LrRrLU/SB3SxrLyNaI/AAAAAAAAACI/9MiSgfRVzDY/s320/Jacqueline+Bouvier.png',
    },
    {
      id: '6',
      patientName: 'Jacqueline Gurney-Bouvier',
      age: '80 anos',
      sex: 'Feminino',
      sickness: 'Diabetes',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      image:
        'https://1.bp.blogspot.com/_NepJ0LrRrLU/SB3SxrLyNaI/AAAAAAAAACI/9MiSgfRVzDY/s320/Jacqueline+Bouvier.png',
    },
  ];

  function handleNavigate(patientName, description, sickness) {
    navigate('DetailsPatient', { patientName, description, sickness });
  }

  return (
    <Container>
      <Header />
      <Title>Pacientes</Title>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              handleNavigate(item.patientName, item.description, item.sickness)
            }
            key={item.id}
          >
            <CardPattients>
              <UserAvatar
                source={{
                  uri: `${item.image}`,
                }}
              />
            </CardPattients>

            <Information>
              <PatientsName>{item.patientName}</PatientsName>
              <PatientsText>
                <PatientsTextBold>Idade - </PatientsTextBold> {item.age}
              </PatientsText>
              <PatientsText>
                <PatientsTextBold>Sexo - </PatientsTextBold> {item.sex}
              </PatientsText>
            </Information>
          </Card>
        )}
      />
    </Container>
  );
}
