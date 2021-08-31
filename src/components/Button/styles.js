/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  background-color: #845ec2;
  width: 100%;
  border-radius: 20px;
  padding: 18px;
  align-items: center;

  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  color: #fff;
`;
