import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Topo, Image, LogoutButton, Icon } from './styles';

import logo from '../../assets/images/medic04_branco.png';

export default function Header() {
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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </Topo>
      </Container>
    </>
  );
}
