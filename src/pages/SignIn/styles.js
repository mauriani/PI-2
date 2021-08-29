/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: ${RFValue(60)}px;
  width: 100%;
  margin-bottom: ${RFValue(100)}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  padding: 0 16px;

  margin-bottom: 20px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;

  justify-content: center;
  align-items: center;

  padding: 10px;
`;
