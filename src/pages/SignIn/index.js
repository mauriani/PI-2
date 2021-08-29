/* eslint-disable prettier/prettier */
import React from 'react';

import LogoHeader from '../../assets/images/medic04_preto.png';

import { Container, Logo, Title, Form } from './styles';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function SignIn() {
  return (
    <Container>
      <Form>
        <Logo source={LogoHeader} resizeMode="cover" />

        <Title>Faça o seu Login</Title>

        <Input placeholder="Usuário" placeholderTextColor="#000" />
        <Input placeholder="Digite Senha" placeholderTextColor="#000" />

        <Button />
      </Form>
    </Container>
  );
}
