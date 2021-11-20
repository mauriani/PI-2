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
  sex: Yup.string(),
  profession: Yup.string(),
  description: Yup.string().required('Descrição é obrigatória'),
  sickness: Yup.string().required('Doença é obrigatória'),
});

export default function PatientsRegistration() {
  const [medication, setMedication] = useState('');
  const [hour, setHour] = useState('');

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
      const h = hour;
      const med = [{ h: { medication: 'Alprazolam' } }];

      await firestore()
        .collection('patients')
        .add({
          patientName: 'Juliana',
          age: '70',
          sex: 'Feminino',
          profession: 'aposentada',
          description: 'sdadasdasdasd',
          sickness: 'wadawdad',
          medicine: 'dasdadas',
          medication: [{ hour: { medication: 'Alprazolam' } }],
          photo: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: '',
        });

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
          onChangeText={setMedication}
          error={errors.medication && errors.medication.message}
        />
        <InputForm
          name="hour"
          placeholder="Horários"
          onChangeText={setHour}
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
