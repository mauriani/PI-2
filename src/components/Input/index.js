import React from 'react';
import { Container, InputText } from './styles';

export default function Input({ ...rest }) {
  return (
    <Container>
      <InputText {...rest} />
    </Container>
  );
}
