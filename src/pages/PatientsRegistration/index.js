import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import InputForm from '../../components/InputForm';
import Button from '../../components/Button';

import {
  Container,
  Header,
  Topo,
  HeaderText,
  Content,
  Icon,
  GoBackButton,
  DateBlock,
  ButtonDate,
  ButtonDateTitle,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  age: Yup.string().required('Idade é obrigatória'),
  sex: Yup.mixed().oneOf(['Masculino', 'Feminino']),
  profession: Yup.string(),
  description: Yup.string().required('Descrição é obrigatória'),
  sickness: Yup.string().required('Doença é obrigatória'),
  medicine: Yup.string(),
});

export default function PatientsRegistration() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [hour, setHour] = useState('');
  const [listPatients, setListPatients] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getPatients();
  }, []);

  async function getPatients() {
    const snapshot = await firestore().collection('patients').get();
    const patients = snapshot.docs.map(doc => doc.data());

    setListPatients(patients);
  }

  async function handleSubmitPatientsRegistration(form) {
    if (cpf == '') {
      Alert.alert('Atenção', 'Informe o CPF do paciente para continuar.');
      return;
    }

    if (hour == '') {
      Alert.alert('Atenção', 'Informe o horário da medicação do paciente.');
      return;
    }

    if (cpf != '') {
      const value = listPatients.find(elem => elem.cpf === cpf);

      if (value) {
        Alert.alert('Atenção', 'Esse CPF já foi cadastrado.');
        return;
      }
    }

    try {
      const docData = {
        id: String(uuid.v4()),
        patientName: form.name,
        cpf: cpf,
        age: form.age,
        sex: form.sex,
        profession: form.profession,
        description: form.description,
        sickness: [form.sickness],
        photo: `https://ui-avatars.com/api/?background=f0f2f5&name=${form.name}`,
        medication: [
          {
            hour: hour,
            medicine: form.medicine,
          },
        ],
        createdAt: firestore.Timestamp.fromDate(new Date()).toDate(),
        updatedAt: '',
      };

      await firestore()
        .collection('patients')
        .add(JSON.parse(JSON.stringify(docData)));

      Alert.alert('Sucesso', 'Paciente cadastrado');

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  const showStartDateTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    setHour(time.getHours() + ':' + time.getMinutes());

    hideDatePicker();
  };

  return (
    <Container>
      <Header>
        <Topo>
          <GoBackButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </GoBackButton>
          <HeaderText>Cadastro de paciente</HeaderText>
        </Topo>
      </Header>

      <Content>
        <InputForm
          name="name"
          placeholder="Nome completo"
          control={control}
          autoCorrect
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.name && errors.name.message}
        />

        <TextInputMask
          type={'cpf'}
          placeholder={'CPF'}
          style={[styles.input]}
          value={cpf}
          onChangeText={text => {
            setCpf(text);
          }}
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

        <DateBlock>
          <ButtonDate onPress={showStartDateTimePicker}>
            <Icon name="clock" color={'#1ab563'} />
            {hour == '' ? (
              <ButtonDateTitle>Horário medicação</ButtonDateTitle>
            ) : (
              <ButtonDateTitle>{hour}</ButtonDateTitle>
            )}
          </ButtonDate>
        </DateBlock>

        <DateTimePicker
          mode={'time'}
          locale="pt-BR"
          format="h:m A"
          is24Hour={true}
          isVisible={isDatePickerVisible}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Button
          title="Salvar"
          onPress={handleSubmit(handleSubmitPatientsRegistration)}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    height: 62,
    borderRadius: 30,
    color: '#363f5f',
    fontSize: 17,
    marginBottom: 10,
    fontFamily: 'RobotoSlab-Medium',
    padding: 20,
  },
});
