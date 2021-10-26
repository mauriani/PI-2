import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text_dark};

  margin-top: ${RFValue(15)}px;
`;
