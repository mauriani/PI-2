import React from 'react';

import {
  Container,
  ContainerProfile,
  Profile,
  UserAvatar,
  Title,
  Informations,
  InformationsText,
  InformationsSub,
} from './styles';

export default function User() {
  return (
    <Container>
      <ContainerProfile>
        <Profile>
          <Title>Meu perfil</Title>

          <UserAvatar
            source={{
              uri: 'https://cdn.dribbble.com/users/916023/screenshots/14873242/media/a379bc040ab7f090580ed39c6e13c551.png?compress=1&resize=1200x900',
            }}
          />
        </Profile>
      </ContainerProfile>

      <Informations>
        <InformationsText>Nome</InformationsText>
        <InformationsSub>Antônio Carlos Moura</InformationsSub>
        <InformationsText>Email</InformationsText>
        <InformationsSub>antonio@gmail.com</InformationsSub>
        <InformationsText>Profissão</InformationsText>
        <InformationsSub>Enfermeiro</InformationsSub>
      </Informations>
    </Container>
  );
}
