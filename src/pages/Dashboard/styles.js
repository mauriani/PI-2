import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: #F0EDF5;
`;

export const Header = styled.View`
  height: ${RFValue(120)}px;
  width: 100%;
  background-color: transparent;

  justify-content: center;
  align-items: center;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Logo = styled.Image`
  height: ${RFValue(60)}px;
  width: 100%;
  
`;

