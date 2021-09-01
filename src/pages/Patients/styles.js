import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  padding: 0 16px;

  margin-top: 5px;
  margin-bottom: 8px;
`;

export const Card = styled.View`
  height: ${RFValue(120)}px;
  width: 100%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.shape};

  margin-bottom: 10px;
  justify-content: center;
`;

export const CardPattients = styled.View`
  padding: 10px;
  flex-direction: row;
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: 98px;
`;

export const PatientsName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: 'RobotoSlab-Medium';
  padding: 0 16px;
`;

export const Information = styled.View`
  flex-direction: column;
  padding: 8px;
`;

export const PatientsText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: 'RobotoSlab-Regular';
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.text};
`;
