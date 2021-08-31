import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: ${RFValue(60)}px;
  width: 100%;
  margin-bottom: ${RFValue(100)}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.medium};
  padding: 0 16px;

  margin-bottom: 20px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;

  justify-content: center;
  align-items: center;

  padding: 10px;
`;

export const SignInButton = styled.TouchableOpacity`
  margin-top: 100px;
`;

export const ButtonText = styled.Text`
  color: #845ec2;
  font-size: 20px;
`;
