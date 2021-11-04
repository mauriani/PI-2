import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ScrollView } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  InformationsText,
  Card,
  ContentDados,
  Title,
  ContainerHour,
  SubTitle,
  Icon,
  TitleMedication,
} from './styles';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dateHour] = useState(new Date());

  const [currentTime] = useState(dateHour.getHours() + ':' + '00');
  const [hourBreak] = useState(dateHour.getHours() + 4 + ':' + '00');

  useEffect(() => {
    loadPatientData();
  }, []);

  async function loadPatientData() {
    const snapshot = await firestore().collection('patients').get();
    const data = snapshot.docs.map(doc => doc.data());

    const medication = Object.values(data).map((item, key) => {
      const medications = Object.keys(item.medication).map(
        (medication, index) => {
          currentTime == medication && alarm(medication, item.patientName);

          return {
            index: index,
            hour: medication,
            medication: item.medication[medication].medication,
          };
        },
      );

      return {
        id: item.id,
        patientName: item.patientName,
        medications: medications,
      };
    });

    console.log(medication);
    setData(medication);
    setIsLoading(true);
  }

  function alarm(medication, patientName) {}

  return (
    <>
      {isLoading === false ? (
        <Loading title={'Carregando dashboard ...'} />
      ) : (
        <Container>
          <Header />

          <InformationsText>
            Horários exibidos dentro do prazo de 4 horas.
          </InformationsText>

          <ScrollView showsHorizontalScrollIndicator={false}>
            {data.map((item, key) => (
              <View style={key} style={{ paddingHorizontal: 10 }}>
                {item.medications.map((medic, index) =>
                  medic.hour != undefined &&
                  medic.hour >= currentTime &&
                  medic.hour <= hourBreak ? (
                    <>
                      <Card key={index}>
                        <ContentDados>
                          <Title>{item.patientName}</Title>
                          <TitleMedication>
                            Medicação {medic.medication}
                          </TitleMedication>
                        </ContentDados>

                        <ContainerHour>
                          <SubTitle>{medic.hour}</SubTitle>
                        </ContainerHour>
                      </Card>
                    </>
                  ) : null,
                )}
              </View>
            ))}
          </ScrollView>
        </Container>
      )}
    </>
  );
}
