import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

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
  RegisterButton,
  RegisterIcon,
} from './styles';

export default function Patients() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { navigate } = useNavigation();

  async function getDados() {
    setLoading(false);

    const snapshot = await firestore().collection('patients').get();

    setData(snapshot.docs.map(doc => doc.data()));

    setLoading(true);
  }

  useEffect(() => {
    getDados();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, []),
  );

  function handleNavigate(patientName, description, sickness) {
    navigate('DetailsPatient', { patientName, description, sickness });
  }

  return (
    <>
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
                handleNavigate(
                  item.patientName,
                  item.description,
                  item.sickness,
                )
              }
              key={item.id}
            >
              <CardPattients>
                <UserAvatar
                  source={{
                    uri: `${item.photo}`,
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

        <RegisterButton>
          <RegisterIcon
            name="plus-circle"
            onPress={() => navigate('PatientsRegistration')}
          />
        </RegisterButton>
      </Container>
    </>
  );
}
