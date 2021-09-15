import React, { useState, useCallback } from 'react';
import firebase from 'react-native-firebase';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, Form, SignUpButton, ButtonText } from './styles';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { navigate } = useNavigation();

  const handleSubmit = useCallback(() => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(name, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigate('SignIn', { idUser: user.uid });
      })
      .catch(error => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, [navigate]);

  function navigateToSignIn() {
    navigate('SignIn');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Container>
        <Form>
          <Title>Faça o seu cadastro</Title>
          <Input
            value={name}
            placeholder="Nome"
            placeholderTextColor="#3D3D4C"
            onChangeText={text => setName(text)}
            returnKeyType="next"
          />
          <Input
            value={email}
            placeholder="E-mail"
            placeholderTextColor="#3D3D4C"
            onChangeText={text => setEmail(text)}
            returnKeyType="next"
          />
          <Input
            value={password}
            placeholder="Digite uma Senha"
            placeholderTextColor="#3D3D4C"
            onChangeText={text => setPassword(text)}
            //onSubmitEditing={handleSubmit}
          />

          <Button title="Cadastrar-se" onPress={handleSubmit} />

          <SignUpButton onPress={navigateToSignIn}>
            <ButtonText>Voltar para login</ButtonText>
          </SignUpButton>
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
