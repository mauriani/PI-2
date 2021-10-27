import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

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
  RegisterIcon,
} from './styles';

export default function Patients() {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
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

  function handleNavigate(patientName, description, sickness) {
    navigate('DetailsPatient', { patientName, description, sickness });
  }

  return (
    <>
      {loading == false ? (
        <ActivityIndicator size="large" color="#111111" />
      ) : (
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

          <RegisterIcon
            name="pluscircle"
            onPress={navigate('PatientsResgistration')}
          />
        </Container>
      )}
    </>
  );
}
