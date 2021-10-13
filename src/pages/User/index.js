import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function getPerson() {
    setLoading(false);

    const dataKey = '@medic:user';

    const dados = JSON.parse(await AsyncStorage.getItem(dataKey));

    setData(dados);

    setLoading(true);
  }

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <>
      <Container>
        <ContainerProfile>
          <Profile>
            <Title>Meu perfil</Title>

            <UserAvatar
              source={{
                uri: '',
              }}
            />
          </Profile>
        </ContainerProfile>

        <Informations>
          <InformationsText>Nome</InformationsText>
          <InformationsSub>{data.name}</InformationsSub>
          <InformationsText>Email</InformationsText>
          <InformationsSub>{data.email}</InformationsSub>
          <InformationsText>Profissão</InformationsText>
          <InformationsSub>{data.profession}</InformationsSub>
        </Informations>
      </Container>
    </>
  );
}
