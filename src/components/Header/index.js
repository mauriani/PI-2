import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Topo, Image, LogoutButton, Icon } from './styles';

import firebase from '../../config/firebaseconfig';
import logo from '../../assets/images/medic04_branco.png';

export default function Header() {
  const { navigate } = useNavigation();

  const handleLogOut = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('SignIn');
      })
      .catch(error => {});
  });

  return (
    <>
      <StatusBar
        backgroundColor={'#845ec2'}
        translucent
        barStyle="light-content"
      />
      <Container>
        <Topo>
          <Image source={logo} />
          <LogoutButton onPress={handleLogOut}>
            <Icon name="power" />
          </LogoutButton>
        </Topo>
      </Container>
    </>
  );
}
