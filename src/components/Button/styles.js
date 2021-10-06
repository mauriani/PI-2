/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  align-items: center;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.primary};

  border-radius: 20px;
  padding: 18px;

  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;
