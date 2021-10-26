import React from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import LogoHeader from '../../assets/images/medic04_preto.png';
import Button from '../../components/Button';
import InputForm from '../../components/InputForm';

import { Container, Title, Form, SignUpButton, ButtonText } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  profession: Yup.string().required('Profissão é obrigatório'),
  email: Yup.string().required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

const SignUp = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // força que nossa validação siga um padrão
    resolver: yupResolver(schema),
  });

  async function handleSubmitSignUp(form) {
    await auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;

        const data = {
          id: user.uid,
          name: form.name,
          profession: form.profession,
          email: form.email,
          photo: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
        const usersRef = firestore().collection('users');

        usersRef
          .doc(user.uid)
          .set(data)
          .then(() => {
            navigation.navigate('SignIn');
          });
      })
      .catch(error => {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
          Alert.alert('Atenção', 'Esse e-mail já está em uso');
        }

        if (errorCode === 'auth/invalid-email') {
          Alert.alert('Atenção', 'Esse e-mail é inválido');
        }
      });
  }

  function navigateToSignIn() {
    navigation.navigate('SignIn');
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

          <InputForm
            name="name"
            placeholder="Nome"
            icon="user"
            control={control}
            autoCorrect
            autoCapitalize="words"
            returnKeyType="next"
            error={errors.name && errors.name.message}
          />

          <InputForm
            name="profession"
            placeholder="Profissão"
            icon="user"
            control={control}
            autoCorrect
            autoCapitalize="words"
            returnKeyType="next"
            error={errors.profession && errors.profession.message}
          />
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

          <Button
            title="Cadastrar-se"
            onPress={handleSubmit(handleSubmitSignUp)}
          />

          <SignUpButton onPress={navigateToSignIn}>
            <ButtonText>Voltar para login</ButtonText>
          </SignUpButton>
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
