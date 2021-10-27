import React from 'react';

import {
  Container,
  Header,
  HeaderText,
  Content,
  InputName,
  InputDescription,
  InputDesease,
  InputMedicine,
} from './styles';

export default function PatientsRegistration() {
  return (
    <Container>
      <Header>
        <HeaderText>Preencha as informações abaixo</HeaderText>
      </Header>

      <Content>
        <InputName />
        <InputDescription />
        <InputDesease />
        <InputMedicine />
      </Content>
    </Container>
  );
}
