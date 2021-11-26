import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Alert } from 'react-native';
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
  InformationContainer,
  Information,
  PatientsName,
  PatientsTextBold,
  PatientsText,
  RegisterButton,
  RegisterIcon,
  RemovePatientButton,
  Icon,
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

  async function handleRemovePatientData() {
    Alert.alert(
      'Remover paciente',
      'Tem certeza que voce deseja remover este paciente?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            const updatedPatients = data.filter(task => task.id !== id);

            setData(updatedPatients);

            await firestore().collection('patients').delete(updatedPatients);
          },
        },
      ],
    );
  }

  function handleNavigate(item) {
    const { patientName, sickness, description, medication } = item;

    navigate('DetailsPatient', {
      patientName,
      description,
      sickness,
      medication,
    });
  }

  useEffect(() => {
    getDados();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDados();
    }, []),
  );

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

                  <InformationContainer>
                    <Information>
                      <PatientsName>{item.patientName}</PatientsName>
                      <PatientsText>
                        <PatientsTextBold>Idade - </PatientsTextBold> {item.age}
                      </PatientsText>
                      <PatientsText>
                        <PatientsTextBold>Sexo - </PatientsTextBold> {item.sex}
                      </PatientsText>
                    </Information>

                    <RemovePatientButton onPress={handleRemovePatientData}>
                      <Icon name="trash" />
                    </RemovePatientButton>
                  </InformationContainer>
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
