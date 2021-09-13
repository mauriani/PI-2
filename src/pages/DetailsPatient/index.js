import React from 'react';
import { useRoute } from '@react-navigation/native';
import HeaderGoBack from '../../components/HeaderGoBack';

import { Container, Title, Information, InformationsText } from './styles';

export default function DetailsPatient() {
  const route = useRoute();

  const { patientName, description, sickness } = route.params;

  return (
    <Container>
      <HeaderGoBack title={patientName} />
      <Information>
        <Title>Descrição</Title>
        <InformationsText>{description}</InformationsText>
      </Information>

      <Information>
        <Title>Doença</Title>
        <InformationsText>{sickness}</InformationsText>
      </Information>
    </Container>
  );
}
