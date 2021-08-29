/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Header = styled.View`
  height: ${RFValue(120)}px;
  width: 100%;
  background-color: transparent;

  justify-content: center;
  align-items: center;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Logo = styled.Image`
  height: ${RFValue(60)}px;
  width: 80%;
`;

export const Content = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Card = styled.View`
  height: ${RFValue(100)}px;
  width: 100%;
  background-color: #b0a8b9;

  border-radius: 10px;

  margin-top: 10px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  color: #fff;
  padding: 0 16px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(30)}px;
  color: #fff;

  font-weight: 700;
  padding: 0 16px;
`;
