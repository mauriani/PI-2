import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

import {
  Container,
  Content,
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

  function handleNavigate(item) {
    const { patientName, sickness, description, medication } = item;

    navigate('DetailsPatient', {
      patientName,
      description,
      sickness,
      medication,
    });
  }

  return (
    <>
      {loading === true ? (
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
                <Card onPress={() => handleNavigate(item)} key={item.id}>
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

            <Content>
              <RegisterButton rippleColor={'#a589d2'} exclusive={'#a589d2'}>
                <RegisterIcon
                  name="plus-circle"
                  onPress={() => navigate('PatientsRegistration')}
                />
              </RegisterButton>
            </Content>
          </Container>
        </>
      ) : (
        <Loading title={'Carregando'} />
      )}
    </>
  );
}
