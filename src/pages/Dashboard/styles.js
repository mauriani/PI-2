import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const InformationsText = styled.Text`
  padding: 0 16px;
  margin-top: 8px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regularRubik};
  color: ${({ theme }) => theme.colors.text};

  margin-bottom: 8px;
`;

export const List = styled.View``;

export const Card = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;

  height: ${RFValue(120)}px;
  width: 100%;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-top: 10px;
  padding: 10px;
`;

export const ContentDados = styled.View`
  flex-direction: column;
  justify-content: center;

  width: 0px;
  flex-grow: 1;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.base};
  padding: 0 10px;
`;

export const TitleMedication = styled.Text`
  flex-shrink: 1;
  font-size: ${RFValue(13)}px;

  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.medium};

  padding: 0 10px;
  margin-top: 5px;
`;

export const ContainerHour = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.base};
  padding: 0 10px;
  font-weight: 700;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.attention};

  margin-right: 20px;
`;
