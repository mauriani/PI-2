import React, { useState, useEffect, useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  InformationsText,
  Card,
  Title,
  ContainerHour,
  SubTitle,
  Icon,
  Scheduling,
} from './styles';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dataFormatted, setDataFormatted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dateHour] = useState(new Date());

  useEffect(() => {
    getDados();
  }, []);

  useLayoutEffect(() => {
    getHours();
  }, [data]);

  async function getDados() {
    const snapshot = await firestore().collection('patients').get();

    setData(snapshot.docs.map(doc => doc.data()));
  }

  function getHours() {
    const formatted = data.map(item => {
      const currentTime = dateHour.getHours();
      const hourBreak = currentTime + 4;
      let hour;

      for (const variavel in item.hours) {
        if (variavel >= currentTime && variavel <= hourBreak) {
          hour = variavel;
        }
      }

      return {
        id: item.id,
        patientName: item.patientName,
        hour: hour,
      };
    });

    setDataFormatted(formatted);
    setIsLoading(true);
  }

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

          <Scheduling
            data={dataFormatted}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              item.hour != undefined && (
                <Card key={item.id}>
                  <Title>{item.patientName}</Title>
                  <ContainerHour>
                    <SubTitle>{item.hour}:00</SubTitle>
                    <Icon name="bell" />
                  </ContainerHour>
                </Card>
              )
            }
          />
        </Container>
      )}
    </>
  );
}
