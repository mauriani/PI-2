import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import LogoHeader from '../../assets/images/medic04_preto.png';
import firebase from '../../config/firebaseconfig';
import Button from '../../components/Button';
import InputForm from '../../components/InputForm';

import {
  Container,
  Logo,
  Title,
  Form,
  SignInButton,
  ButtonText,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
});

export default function SignIn() {
  const [error, setError] = useState('');

  const { navigate } = useNavigation();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // força que nossa validação siga um padrão
    resolver: yupResolver(schema),
  });

  async function handleLogin(form) {
    console.log(form);
    auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;

        navigate('Dashboard', { idUser: user.uid });
      })
      .catch(error => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;

        Alert.alert('Atenção', errorMessage);
      });
  }

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

            <InputForm
              name="email"
              placeholder="E-mail"
              icon="mail"
              control={control}
              underlineColorAndroid="transparent"
              error={errors.email && errors.email.message}
              returnKeyType="next"
            />
            <InputForm
              name="password"
              placeholder="Senha"
              secureTextEntry={true}
              autoCorrect={false}
              control={control}
              error={errors.password && errors.password.message}
            />

            <Button title="Login" onPress={handleSubmit(handleLogin)} />

            <SignInButton onPress={navigateToSignUp}>
              <ButtonText>Cadastrar-se</ButtonText>
            </SignInButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
