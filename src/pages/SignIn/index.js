import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import LogoHeader from '../../assets/images/medic04_preto.png';

import {
  Container,
  Logo,
  Title,
  Form,
  SignInButton,
  ButtonText,
} from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

export default function SignIn() {
  const { navigate } = useNavigation();

  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  const navigateToSignUp = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  return (
    <Container>
      <Form>
        <Logo source={LogoHeader} resizeMode="cover" />

        <Title>Faça o seu Login</Title>

        <Input placeholder="Usuário" />
        <Input placeholder="Senha" />

        <Button title="Login" onPress={navigateToDashboard} />

        <SignInButton onPress={navigateToSignUp}>
          <ButtonText>Cadastrar-se</ButtonText>
        </SignInButton>
      </Form>
    </Container>
  );
}
