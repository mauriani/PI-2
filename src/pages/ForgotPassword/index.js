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

import Button from '../../components/Button';
import InputForm from '../../components/InputForm';

import { Container, Logo, Title, InformationsText, Form } from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('E-mail é obrigatório'),
});

export default function ForgotPassword() {
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // força que nossa validação siga um padrão
    resolver: yupResolver(schema),
  });

  async function handleForgotPassword(form) {
    auth()
      .sendPasswordResetEmail(form.email)
      .then(function (user) {
        console.log(user);
        Alert.alert(
          'Sucesso',
          'Por favor verifique se email, acabamos de enviar as orientações para recuperação de senha !',
        );
        navigation.navigate('SignIn');
      })
      .catch(function (e) {
        console.log(e);
      });
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

            <Title>Recuperar senha</Title>
            <InformationsText>
              Entre com o email associado á sua conta.E um email será enviado
              com instuções para que a recuperação seja feita.
            </InformationsText>

            <InputForm
              name="email"
              placeholder="E-mail"
              icon="mail"
              control={control}
              underlineColorAndroid="transparent"
              error={errors.email && errors.email.message}
              returnKeyType="next"
            />

            <Button
              title="Recuperar"
              onPress={handleSubmit(handleForgotPassword)}
            />
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
