import React from 'react';

import { ScrollView } from 'react-native';

import { Container, Content, Card, Title, SubTitle } from './styles';

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
            <SubTitle>12:00</SubTitle>
          </Card>

          <Card>
            <Title>Antônio Carlos Silva</Title>
            <SubTitle>11:05</SubTitle>
          </Card>

          <Card>
            <Title>Mariana De Almeida</Title>
            <SubTitle>10:00</SubTitle>
          </Card>
        </ScrollView>
      </Content>
    </Container>
  );
}
