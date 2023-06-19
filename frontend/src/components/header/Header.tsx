import { Icon } from '@iconify/react';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../../auth/firebase';
import { RootState } from '../../store/store';
import { resetUserCreds } from '../../store/userCredsSlice';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { AppHeader, HeaderSection, AppTitle } from './Header.styled';
import { ThemePrefs } from '../../services/bff/types';

interface HeaderProps {
  theme?: ThemePrefs;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
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
    <AppHeader theme={theme}>
      <HeaderSection theme={theme}>
        <Icon icon="uil:react" fontSize="24" />
        <AppTitle theme={theme} onClick={navigateDashboard}>
          TaskBoard
        </AppTitle>
      </HeaderSection>
      <HeaderSection>{photo && <ProfileMenu profileThumb={photo} logoutHandler={logOut} />}</HeaderSection>
    </AppHeader>
  );
};

export default Header;
