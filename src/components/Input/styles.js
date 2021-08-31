import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 30px;

  flex-direction: row;
  align-items: center;

  padding: 0 26px;

  margin-bottom: 10px;
`;

export const InputText = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
