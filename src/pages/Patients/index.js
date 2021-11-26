import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

import {
  Container,
  Content,
  Title,
  Card,
  List,
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

  async function handleRemovePatientData(id) {
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
          onPress: () => handleDelete(id),
        },
      ],
    );
  }

  async function handleDelete(id) {
    console.log('cheguei', id);

    const updatedPatients = data.filter(task => task.id !== id);

    await firestore().collection('patients').delete(updatedPatients);

    getDados();
    // firestore()
    //   .collection('patients')
    //   .doc(`${id}`)
    //   .delete()
    //   .then(() => {
    //     console.log('User deleted!');
    //     getDados();
    //   });
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

  console.log(data);

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
              renderItem={({ item }) => (
                <>
                  <List>
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
                            <PatientsTextBold>Idade - </PatientsTextBold>{' '}
                            {item.age}
                          </PatientsText>
                          <PatientsText>
                            <PatientsTextBold>Sexo - </PatientsTextBold>{' '}
                            {item.sex}
                          </PatientsText>
                        </Information>
                      </InformationContainer>
                    </Card>

                    <RemovePatientButton
                      onPress={() => handleRemovePatientData(item.id)}
                    >
                      <Icon name="trash" />
                    </RemovePatientButton>
                  </List>
                </>
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
