import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Title } from './styles';

export default function Loading({title}) {
  return (
    <Container>
      <ActivityIndicator size="large" color="#845ec2" />
      <Title>{title}</Title>
    </Container>
  );
}
