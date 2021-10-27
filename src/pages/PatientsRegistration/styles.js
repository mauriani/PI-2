import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

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

export const HeaderText = styled.Text`
  color: red;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  align-items: center;
  justify-content: flex-end;
`;

export const Content = styled.View`
  width: 100%;
`;

export const InputName = styled.View``;

export const InputDescription = styled.View``;

export const InputDesease = styled.View``;

export const InputMedicine = styled.View``;
