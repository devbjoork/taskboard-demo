import { Icon } from '@iconify/react';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseApp } from '../auth/firebase';
import { RootState } from '../store/store';
import { resetUserCreds } from '../store/userCredsSlice';

const AppHeader = styled.nav`
  display: flex;
  color: #fff;
  justify-content: space-between;
  padding: 0 1rem;
  height: 45px;
  background-color: #62b6ff;
  box-shadow: 0 1px 10px #3e98e7;
  position: relative;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 1rem;
  }
`;

const UserButton = styled.button`
  display: flex;
  border: 3px solid rgba(255, 255, 255, 0.01);
  border-radius: 2rem;

  &:hover {
    border: 3px solid rgba(255, 255, 255, 1);
  }

  img {
    border-radius: 1rem;
  }
`;

const AppTitle = styled.h1`
  font-size: large;
  margin: 0 0.5rem;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photo = useSelector((state: RootState) => state.userCreds.photoURL);
  const navigateDashboard = () => {
    navigate('/dashboard');
  };

  const logOut = () => {
    const auth = getAuth(firebaseApp);
    dispatch(resetUserCreds());
    auth.signOut();
  };

  return (
    <AppHeader>
      <HeaderSection>
        <Icon icon="uil:react" fontSize="24" />
        <AppTitle onClick={navigateDashboard}>TaskBoard</AppTitle>
      </HeaderSection>
      <HeaderSection>
        {/* <AppButton>Log in</AppButton> */}
        {photo && (
          <UserButton onClick={logOut}>
            <img src={photo} height="32" width="32" />
          </UserButton>
        )}
      </HeaderSection>
    </AppHeader>
  );
};

export default Header;
