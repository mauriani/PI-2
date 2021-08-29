/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput).attrs({
  placeholderTextColor: '#111',
})`
  width: 100%;
  padding: 16px 18px;
  height: ${RFValue(50)}px;

  font-size: ${RFValue(16)}px;
  color: #111;

  background-color: #c4c4c4;
  border-radius: 5px;

  margin-bottom: 8px;
`;
