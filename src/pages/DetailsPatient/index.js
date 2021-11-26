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

<<<<<<< HEAD
  const { patientName, age, description, sickness, medication } = route.params;

  console.log(medicine);
=======
  const { patientName, description, sickness, medication } = route.params;
>>>>>>> 253ed4b125770e669c7be910340c8cdc16b0e862

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
<<<<<<< HEAD
        <Title>Remédios</Title>
        <InformationsText>{medication}</InformationsText>
=======
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
>>>>>>> 253ed4b125770e669c7be910340c8cdc16b0e862
      </Information>
    </Container>
  );
}
