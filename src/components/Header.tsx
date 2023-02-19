import { Icon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';
import AppButton from './ui/AppButton';

const AppHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  height: 45px;
  background-color: #d0cfda;
  box-shadow: 0 1px 0 #b1b1b1;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 1rem;
  }
`;

const AppTitle = styled.h1`
  font-size: large;
  margin: 0 .5rem;
`;

const Header: React.FC = () => {
  return (
    <AppHeader>
      <HeaderSection>
        <Icon icon='uil:react' fontSize='24'/>
        <AppTitle>TaskBoard</AppTitle>
        <AppButton isTransparent>Boards <Icon icon='uil:angle-down' /></AppButton>
        <AppButton>Create</AppButton>
      </HeaderSection>
      <HeaderSection>
        <AppButton>Log In</AppButton>
      </HeaderSection>
    </AppHeader>
  )
};

export default Header;