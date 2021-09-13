import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Topo, Title, GoBackButton, Icon } from './styles';

export default function HeaderGoBack(item) {
  return (
    <>
      <StatusBar
        backgroundColor={'#845ec2'}
        translucent
        barStyle="light-content"
      />
      <Container>
        <Topo>
          <GoBackButton onPress={() => {}}>
            <Icon name="arrow-back" />
          </GoBackButton>
          <Title>{item.title}</Title>
        </Topo>
      </Container>
    </>
  );
}
