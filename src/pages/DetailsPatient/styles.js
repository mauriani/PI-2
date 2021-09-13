import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Information = styled.View``;

export const InformationsText = styled.Text`
  padding: 0 20px;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regularRubik};
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.boldRubik};
  color: ${({ theme }) => theme.colors.title};
  padding: 0 16px;

  margin-top: 10px;
  margin-bottom: 10px; ;
`;
