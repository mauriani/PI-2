import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container, Topo, Image, LogoutButton, Icon } from './styles';

import logo from '../../assets/images/medic04_branco.png';

export default function Header() {
  const { navigate } = useNavigation();

  const handleLogOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => {
        const dataKey = '@medic:user';
        AsyncStorage.removeItem(dataKey);
        navigate('SignIn');
      })
      .catch(error => {
        
      });
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
