import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';

import HeaderGoBack from '../../components/HeaderGoBack';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { Alert } from 'react-native';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');

  const title = 'Editar informações';

  const route = useRoute();
  const navigation = useNavigation();
  const { data } = route.params;

  function handleSave() {
    firestore()
      .collection('users')
      .doc(data.id)
      .set({
        email: data.email,
        id: data.id,
        name: name,
        profession: profession,
      })
      .then(() => {
        Alert.alert('Sucesso', 'Dados salvos');
        navigation.goBack();
      });
  }

  useEffect(() => {
    setProfession(data.profession);
    setName(data.name);
  }, []);

  return (
    <Container>
      <HeaderGoBack title={title} />

      <Content>
        <Input value={name} editable onChangeText={text => setName(text)} />

        <Input
          value={profession}
          editable
          onChangeText={text => setProfession(text)}
        />

        <Button title="Salvar" onPress={handleSave} />
      </Content>
    </Container>
  );
}
