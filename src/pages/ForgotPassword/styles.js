import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: ${RFValue(60)}px;
  width: 100%;
  margin-bottom: ${RFValue(80)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  padding: 0 16px;

  margin-bottom: 10px;
`;

export const InformationsText = styled.Text`
  padding: 0 20px;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regularRubik};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;

  justify-content: center;
  align-items: center;

  padding: 10px;
`;
