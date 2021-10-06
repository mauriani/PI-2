import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width: 100%;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};

  border-radius: 30px;

  flex-direction: row;
  align-items: center;

  padding: 0 26px;

  margin-bottom: 10px;
`;
