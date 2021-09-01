import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, Form, SignUpButton, ButtonText } from './styles';

export default function SignUp() {
  const { navigate } = useNavigation();

  const navigateToSignIn = useCallback(() => {
    navigate('SignIn');
  }, [navigate]);

  return (
    <Container>
      <Form>
        <Title>Faça o seu Cadastro</Title>

        <Input placeholder="Nome" placeholderTextColor="#3D3D4C" />
        <Input placeholder="E-mail" placeholderTextColor="#3D3D4C" />
        <Input placeholder="Digite uma Senha" placeholderTextColor="#3D3D4C" />

        <Button title="Cadastrar-se" onPress={() => {}} />

        <SignUpButton onPress={navigateToSignIn}>
          <ButtonText>Voltar para login</ButtonText>
        </SignUpButton>
      </Form>
    </Container>
  );
}
