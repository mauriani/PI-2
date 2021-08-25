import React from 'react';

import {Container, Header, Logo} from './styles';

import LogoHeader from '../../assets/images/medic04.jpg';

export default function Dashboard(){
  return(
    <Container>
     <Header>
       <Logo source={LogoHeader} resizeMode="cover"/>
     </Header>
    </Container>
  )
}