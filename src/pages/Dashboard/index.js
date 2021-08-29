/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Container,
  Header,
  Logo,
  Content,
  Card,
  Title,
  SubTitle,
} from './styles';

import LogoHeader from '../../assets/images/medic04_branco.png';

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <Logo source={LogoHeader} resizeMode="cover" />
      </Header>

      <Content>
        <Card>
          <Title>Paciente - Ana Maria</Title>
          <SubTitle>11:05</SubTitle>
        </Card>

        <Card>
          <Title>Paciente 09</Title>
          <SubTitle>11:05</SubTitle>
        </Card>

        <Card>
          <Title>Paciente 09</Title>
          <SubTitle>11:05</SubTitle>
        </Card>

        <Card>
          <Title>Paciente 09</Title>
          <SubTitle>11:05</SubTitle>
        </Card>

        <Card>
          <Title>Paciente 09</Title>
          <SubTitle>11:05</SubTitle>
        </Card>
      </Content>
    </Container>
  );
}
