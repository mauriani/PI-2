import React from 'react';

import { ScrollView } from 'react-native';

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
  return (
    <Container>
      <Header />

      <Content>
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
        >
          <Card>
            <Title>Ana Maria Rodrigues Silva</Title>
            <ContainerHour>
              <SubTitle>12:00</SubTitle>
              <Icon name="bell" />
            </ContainerHour>
          </Card>

          <Card>
            <Title>Antônio Carlos Silva</Title>
            <ContainerHour>
              <SubTitle>13:00</SubTitle>
              <Icon name="bell" />
            </ContainerHour>
          </Card>

          <Card>
            <Title>Mariana De Almeida</Title>
            <ContainerHour>
              <SubTitle>14:00</SubTitle>
              <Icon name="bell" />
            </ContainerHour>
          </Card>
        </ScrollView>
      </Content>
    </Container>
  );
}
