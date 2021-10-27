import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.medium};
  padding: 0 16px;

  margin-top: 5px;
  margin-bottom: 8px;
`;

export const Card = styled.TouchableOpacity`
  flex-direction: row;

  height: ${RFValue(100)}px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.shape};

  padding: 10px;

  margin: 0px 10px 9px 10px;
`;

export const CardPattients = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: 98px;
`;

export const Information = styled.View`
  flex-direction: column;
  justify-content: center;

  padding: 0 10px;
`;

export const PatientsName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text_dark};
  margin-bottom: 5px;
`;

export const PatientsTextBold = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.boldRubik};
  color: ${({ theme }) => theme.colors.text};
`;

export const PatientsText = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const RegisterIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.primary};
`;
