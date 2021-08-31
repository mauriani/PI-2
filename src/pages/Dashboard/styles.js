import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Card = styled.View`
  height: ${RFValue(100)}px;
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

export const SubTitle = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.base};

  font-weight: 700;
  padding: 0 16px;
`;
