import styled from 'styled-components/native';
import { FlatList } from 'react-native';
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

export const Card = styled.TouchableOpacity`
  height: ${RFValue(120)}px;
  width: 100%;
  background: ${({ theme }) => theme.colors.shape};

  border-radius: 10px;

  margin-top: 10px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.base};
  padding: 0 16px;
`;

export const ContainerHour = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 5px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.base};

  font-weight: 700;
  padding: 0 16px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.attention};

  margin-right: 20px;
`;

export const Scheduling = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  padding: ${RFValue(15)}px;
`;
