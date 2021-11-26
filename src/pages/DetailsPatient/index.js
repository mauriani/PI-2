import React, { Fragment } from 'react';
import { useRoute } from '@react-navigation/native';
import HeaderGoBack from '../../components/HeaderGoBack';

import {
  Container,
  Title,
  Information,
  InformationsText,
  InformationsTextBold,
} from './styles';

export default function DetailsPatient() {
  const route = useRoute();

  const { patientName, description, sickness, medication } = route.params;

  return (
    <Container>
      <HeaderGoBack title={patientName} />
      <Information>
        <Title>Descrição</Title>
        <InformationsText>{description}.</InformationsText>
      </Information>

      <Information>
        {sickness.length > 1 ? <Title>Doenças</Title> : <Title>Doença</Title>}
        {sickness &&
          sickness.map((item, key) =>
            item.length >= 1 ? (
              <Fragment key={key}>
                <InformationsText>- {item}</InformationsText>
              </Fragment>
            ) : (
              <Fragment key={key}>
                <InformationsText>- Nenhuma doença cadastrada</InformationsText>
              </Fragment>
            ),
          )}
      </Information>

      <Information>
        {medication.length > 1 ? (
          <Title>Remédios</Title>
        ) : (
          <Title>Remédio</Title>
        )}
        {medication &&
          medication.map((item, key) => (
            <Fragment key={key}>
              <InformationsText>- {item.medicine}</InformationsText>
            </Fragment>
          ))}
      </Information>
    </Container>
  );
}
