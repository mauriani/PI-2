import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: 'RobotoSlab-Medium';
  padding: 0 16px;

  margin-bottom: 20px;
`;
