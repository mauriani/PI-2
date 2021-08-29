/* eslint-disable prettier/prettier */
import React from 'react';

import { Container, Title } from './styles';

export default function Button({ title, onPress, ...rest }) {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
