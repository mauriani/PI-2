/* eslint-disable prettier/prettier */
import React from 'react';

import { Container, Title } from './styles';

export function Button({ onPress, ...rest }) {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>Enviar</Title>
    </Container>
  );
}
