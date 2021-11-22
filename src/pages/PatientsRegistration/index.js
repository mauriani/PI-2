import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from "react-native-uuid";

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
  sex: Yup.mixed().oneOf(['Masculino', 'Feminino']),
  profession: Yup.string(),
  description: Yup.string().required('Descrição é obrigatória'),
  sickness: Yup.string().required('Doença é obrigatória'),
  medicine: Yup.string(),
  hour: Yup.string(),
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
      const docData = {
        id: String(uuid.v4()),
        patientName: form.name,
        age: form.age,
        sex: form.sex,
        profession: form.profession,
        description: form.description,
        sickness: form.sickness,
        photo: `https://ui-avatars.com/api/?name=${form.name}`,
        medication: [
          {
            hour: form.hour,
            medicine: form.medicine,
          },
        ],
        createdAt: firestore.Timestamp.fromDate(new Date()).toDate(),
        updatedAt: '',
      };

      await await firestore()
        .collection('patients')
        .add(JSON.parse(JSON.stringify(docData)));

      navigation.goBack();
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
          name="sex"
          placeholder="Gênero"
          control={control}
          autoCorrect
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.sex && errors.sex.message}
        />
        <InputForm
          name="profession"
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
          name="medicine"
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
