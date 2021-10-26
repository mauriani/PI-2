import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContainerProfile = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(280)}px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ProfilePhoto = styled.View`
  margin-top: ${getStatusBarHeight() + RFValue(15)}px;
`;

export const UserAvatarButton = styled(RectButton)`
  align-self: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: 'RobotoSlab-Medium';
  color: ${({ theme }) => theme.colors.shape};
  padding: 0 16px;
`;

export const Informations = styled.View``;

export const InformationsText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: 'RobotoSlab-Medium';
  color: ${({ theme }) => theme.colors.title};
  padding: 0 16px;

  margin-top: 10px;
`;

export const InformationsSub = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: 'RobotoSlab-Medium';
  color: ${({ theme }) => theme.colors.text};
  padding: 0 30px;

  margin-top: 10px;
`;
