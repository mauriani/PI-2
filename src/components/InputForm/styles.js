import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.attention_light};
  font-family: ${({ theme }) => theme.fonts.mediumRubik};
  font-size: ${RFValue(14)}px;

  margin-bottom: 10px;

  padding: 0 16px;
`;
