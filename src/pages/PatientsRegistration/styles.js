import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(150)}px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Topo = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  margin-top: ${getStatusBarHeight() + RFValue(14)}px;

  padding: 24px;
  margin-bottom: 24px;
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

  margin-top: 10px;
`;
export const GoBackButton = styled(BorderlessButton)`
  justify-content: flex-start;
`;

export const Icon = styled(Ionicons)`
  font-size: ${RFValue(24)}px;
`;

export const DateBlock = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const ButtonDate = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 30px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
  padding: 0 16px;
`;

export const ButtonDateTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
