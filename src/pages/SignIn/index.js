import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoHeader from '../../assets/images/medic04_preto.png';
import firebase from '../../config/firebaseconfig';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { navigate } = useNavigation();
  const navigation = useNavigation();

  const handleSubmit = useCallback(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        navigate('Dashboard', { idUser: user.uid });
      })
      .catch(error => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, [navigate]);

  // const navigateToSignUp = useCallback(() => {
  //   navigate('SignUp');
  // }, [navigate]);

  function navigateToSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Form>
            <Logo source={LogoHeader} resizeMode="cover" />

            <Title>Faça o seu Login</Title>

            <Input
              value={email}
              icon="mail"
              placeholder="E-mail"
              onChangeText={text => setEmail(text)}
              returnKeyType="next"
            />
            <Input
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />

            {email === '' || password === '' ? (
              <Button title="Login" disabled={true} />
            ) : (
              <Button title="Login" onPress={handleSubmit} />
            )}

            <SignInButton onPress={navigateToSignUp}>
              <ButtonText>Cadastrar-se</ButtonText>
            </SignInButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
