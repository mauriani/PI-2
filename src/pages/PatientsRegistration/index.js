import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import InputForm from '../../components/InputForm';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderText,
  Content,
  Icon,
  GoBackButton,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  age: Yup.string().required('Idade é obrigatória'),
  description: Yup.string().required('Descrição é obrigatória'),
  sickness: Yup.string().required('Doença é obrigatória'),
  medication: Yup.string().required('Remédios são obrigatórios'),
  hour: Yup.string().required('Horários são obrigatorios'),
});

export default function PatientsRegistration() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSubmitPatientsRegistration(form) {
    try {
      await firestore()
        .collection('patients')
        .add({
          patientName: form.name,
          age: form.age,
          sex: form.sex,
          profession: form.profession,
          description: form.description,
          sickness: form.sickness,
          medication: [{ hour: { medication: '' } }],
          photo: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: '',
        });

      navigation.navigate('Patients');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Header>
        <GoBackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </GoBackButton>
        <HeaderText>Cadastro de paciente</HeaderText>
      </Header>

      <Content>
        <InputForm
          name="name"
          placeholder="Nome"
          control={control}
          autoCorrect
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.name && errors.name.message}
        />
        <InputForm
          name="age"
          placeholder="Idade"
          control={control}
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.age && errors.age.message}
        />
        <InputForm
          name="Sex"
          placeholder="Gênero"
          control={control}
          autoCorrect
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.sex && errors.sex.message}
        />
        <InputForm
          name="Profession"
          placeholder="Profissão"
          control={control}
          autoCorrect
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.profession && errors.profession.message}
        />
        <InputForm
          name="description"
          placeholder="Descrição"
          control={control}
          autoCorrect
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.description && errors.description.message}
        />
        <InputForm
          name="sickness"
          placeholder="Doenças"
          control={control}
          error={errors.sickness && errors.sickness.message}
          returnKeyType="next"
        />
        <InputForm
          name="medication"
          placeholder="Medicação"
          control={control}
          error={errors.medicine && errors.medicine.message}
        />
        <InputForm
          name="hour"
          placeholder="Horários"
          control={control}
          error={errors.hour && errors.hour.message}
        />

        <Button
          title="Salvar"
          onPress={handleSubmit(handleSubmitPatientsRegistration)}
        />
      </Content>
    </Container>
  );
}
