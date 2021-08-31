import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, Form, SignUpButton, ButtonText } from './styles';

export default function SignUp() {
  return (
    <Container>
      <Form>
        <Title>Faça o seu Cadastro</Title>

        <Input placeholder="Nome" placeholderTextColor="#000" />
        <Input placeholder="E-mail" placeholderTextColor="#000" />
        <Input placeholder="Digite uma Senha" placeholderTextColor="#000" />

        <Button title="Login" onPress={() => {}} />

        <SignUpButton onPress={() => {}}>
          <ButtonText>Voltar para login</ButtonText>
        </SignUpButton>
      </Form>
    </Container>
  );
}
