import React, { Fragment } from 'react';
import { useRoute } from '@react-navigation/native';
import HeaderGoBack from '../../components/HeaderGoBack';

import { Container, Title, Information, InformationsText } from './styles';

export default function DetailsPatient() {
  const route = useRoute();

  const { patientName, age, description, sickness, medicine } = route.params;

  return (
    <Container>
      <HeaderGoBack title={patientName} />
      <Information>
        <Title>Descrição</Title>
        <InformationsText>{description} </InformationsText>
      </Information>

      <Information>
        {sickness.length > 1 ? <Title>Doenças</Title> : <Title>Doença</Title>}
        {sickness &&
          sickness.map((item, key) => (
            <Fragment key={key}>
              <InformationsText>- {item}</InformationsText>
            </Fragment>
          ))}
      </Information>

      <Information>
        <Title>Remédios</Title>
        <InformationsText>{medicine}</InformationsText>
      </Information>
    </Container>
  );
}
