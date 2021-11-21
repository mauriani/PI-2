import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(150)}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const HeaderText = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(23)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Content = styled.ScrollView`
  width: 100%;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const GoBackButton = styled(BorderlessButton)`
  justify-content: flex-start;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
