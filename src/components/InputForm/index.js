import React from 'react';
import { Controller } from 'react-hook-form';

import Input from '../Input';

import { Container, Error } from './styles';

export default function InputForm({ control, name, error, ...rest }) {
  return (
    <Container>
      <Controller
        /** quem ta controlando o nosso input  */
        control={control}
        /** qual input vai ser renderizado */
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        /** onChange -> modificar o valor, value o proprio valor */
        name={name}
      />

      {/** só exibir se tiver conteudo na minha variavel error */}
      {error && <Error>{error}</Error>}
    </Container>
  );
}
