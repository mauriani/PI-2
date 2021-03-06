import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  height: ${RFValue(70)}px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.medium};
  padding: 0 16px;

  margin-top: 5px;
  margin-bottom: 8px;
`;

export const List = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 3px 10px 6px 10px;
`;

export const CardAcess = styled.TouchableOpacity`
  flex-direction: row;

  height: ${RFValue(100)}px;
  width: 90%;
`;

export const Card = styled.View`
  flex-direction: row;

  background: ${({ theme }) => theme.colors.shape};

  border-radius: 10px;
`;

export const CardPattients = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-radius: 98px;
  margin-left: 5px;
`;

export const InformationContainer = styled.View`
  width: 75%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Information = styled.View`
  flex-direction: column;
  justify-content: center;

  padding: 0 10px;
`;

export const RemovePatientButton = styled(BorderlessButton)`
  width: 10%;
  height: ${RFValue(100)}px;

  align-items: center;
  justify-content: center;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  background-color: ${({ theme }) => theme.colors.attention};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.shape};
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

export const RegisterButton = styled(BorderlessButton)`
  justify-content: center;
  align-items: center;
`;

export const RegisterIcon = styled(Feather)`
  font-size: ${RFValue(50)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
